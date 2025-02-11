// Required for @artsy/react-html-parser which is included by @artsy/reaction
// TODO: Find a way to remove JSDOM from our server.
import "./lib/DOMParser"

// Setup sharify
// TODO: Export a function instead of loading on import.
import "./lib/setup_sharify"

import artsyPassport from "@artsy/passport"
import addRequestId from "express-request-id"
import compression from "compression"
import cookieParser from "cookie-parser"
import express from "express"
import favicon from "serve-favicon"
import glob from "glob"
import helmet from "helmet"
import path from "path"
import sharify from "sharify"
import siteAssociation from "artsy-eigen-web-association"
import timeout from "connect-timeout"
import bodyParser from "body-parser"
import RavenServer from "raven"
import config from "./config"

import { morganMiddleware } from "./lib/middleware/morgan"
import { ensureSslMiddleware } from "./lib/middleware/ensureSsl"
import { hstsMiddleware } from "./lib/middleware/hsts"
import { ipFilter } from "./lib/middleware/ipFilter"
import { sessionMiddleware } from "./lib/middleware/session"
import { assetMiddleware } from "./lib/middleware/asset"
import { csrfTokenMiddleware } from "./lib/middleware/csrfToken"
import { asyncLocalsMiddleware } from "./lib/middleware/asyncLocalMiddleware"
import { bootstrapSharifyAndContextLocalsMiddleware } from "./lib/middleware/bootstrapSharifyAndContextLocalsMiddleware"
import { userRequiredMiddleware } from "lib/middleware/userRequiredMiddleware"
import { backboneErrorHandlerMiddleware } from "./lib/middleware/backboneErrorHandler"
import { downcaseMiddleware } from "./lib/middleware/downcase"
import { escapedFragmentMiddleware } from "./lib/middleware/escapedFragment"
import { hardcodedRedirectsMiddleware } from "./lib/middleware/hardcodedRedirects"
import { localsMiddleware } from "./lib/middleware/locals"
import { marketingModalsMiddleware } from "./lib/middleware/marketingModals"
import { proxyReflectionMiddleware } from "./lib/middleware/proxyReflection"
import { sameOriginMiddleware } from "./lib/middleware/sameOrigin"
import { unsupportedBrowserMiddleware } from "./lib/middleware/unsupportedBrowser"
import { backboneSync } from "lib/backboneSync"

// App-specific V2 server-side functionality
import { artistMiddleware } from "lib/middleware/artistMiddleware"
import { collectionToArtistSeriesRedirect } from "lib/middleware/artistSeriesRedirect"
import { handleArtworkImageDownload } from "lib/middleware/artworkMiddleware"
import { searchMiddleware } from "lib/middleware/searchMiddleware"
import { splitTestMiddleware } from "desktop/components/split_test/splitTestMiddleware"

// FIXME: When deploying new Sentry SDK to prod we quickly start to see errors
// like "`CURRENT_USER` is undefined". We need more investigation because this
// only appears in prod, under load, and seems fine on staging.
// import * as Sentry from "@sentry/node"

const CurrentUser = require("./lib/current_user.coffee")

const {
  APP_TIMEOUT,
  IP_DENYLIST,
  NODE_ENV,
  CLIENT_ID,
  CLIENT_SECRET,
  API_URL,
  SEGMENT_WRITE_KEY_SERVER,
  SENTRY_PRIVATE_DSN,
} = config

export function initializeMiddleware(app) {
  app.set("trust proxy", true)

  // Setup error handling
  // TODO: This is a deprecated lib; replace with @sentry/node
  if (SENTRY_PRIVATE_DSN) {
    RavenServer.config(SENTRY_PRIVATE_DSN).install()
    app.use(RavenServer.requestHandler())
  }

  // Cookie parser
  app.use(cookieParser())

  // Ensure all responses are gzip compressed
  app.use(compression())

  // Ensure basic security settings
  applySecurityMiddleware(app)

  // Sharify and async locals
  app.use(bootstrapSharifyAndContextLocalsMiddleware)

  app.use(proxyReflectionMiddleware)

  app.use(
    morganMiddleware({
      development: process.env.NODE_ENV === "development",
      logAssets: process.env.LOG_ASSETS === "true",
    })
  )

  backboneSync()

  // Redirect requests before they even have to deal with Force routing
  app.use(downcaseMiddleware)
  app.use(hardcodedRedirectsMiddleware)
  app.use(localsMiddleware)
  app.use(backboneErrorHandlerMiddleware)
  app.use(sameOriginMiddleware)
  app.use(escapedFragmentMiddleware)
  app.use(unsupportedBrowserMiddleware)

  /**
   * Blank page used by Eigen for caching web views.
   * See: https://github.com/artsy/microgravity-private/pull/1138
   * TODO: Does this need to come before middleware?
   */
  app.use(require("./desktop/apps/blank"))

  /**
   * Routes for pinging system time and up
   */
  app.get("/system/time", (req, res) =>
    res.status(200).send({ time: Date.now() })
  )
  app.get("/system/up", (req, res) => {
    res.status(200).send({ nodejs: true })
  })

  // Sets up mobile marketing signup modal
  app.use(marketingModalsMiddleware)

  if (process.env.NODE_ENV !== "test") {
    app.use(splitTestMiddleware)
  }

  // Static assets
  applyStaticAssetMiddlewares(app)

  // Redirects
  app.get("/collection/:collectionSlug", collectionToArtistSeriesRedirect)

  /**
   * FIXME: Move this into function
   * Mount middleware for handling server-side portions of apps mounted into
   * global router.
   */
  app.get("/artist/*", artistMiddleware)
  app.get("/search*", searchMiddleware)

  // TODO: Artwork download, does this belong here.
  app.get("/artwork/:artworkID/download/:filename", handleArtworkImageDownload)
}

function applySecurityMiddleware(app) {
  // Denied IPs
  if (IP_DENYLIST && IP_DENYLIST.length > 0) {
    app.use(ipFilter(IP_DENYLIST))
  }

  // Timeout middleware
  if (process.env.NODE_ENV === "production") {
    app.use(timeout(APP_TIMEOUT || "29s"))
  }

  // Make sure we're using SSL and prevent clickjacking
  app.use(ensureSslMiddleware)

  // Use HSTS to prevent downgrade attacks.
  app.use(hstsMiddleware)

  // Prevent frame nesting in development and production.
  if (NODE_ENV !== "test") {
    app.use(helmet.frameguard())
  }

  // Inject UUID for each request into the X-Request-Id header
  app.use(addRequestId())

  // Session cookie
  app.use(sessionMiddleware())

  // JSON Body Parser is required for getting the `_csurf` token for passport.
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // Initialize async context for the request
  app.use(asyncLocalsMiddleware)

  // Inject sharify data and asset middleware before any app code so that when
  // crashing errors occur we'll at least get a 500 error page.
  // Attach sharify object to `locals` because almost all other middleware
  // relies on it existing.
  app.use(sharify)

  // Static asset routing, required for all legacy code and must come early
  // because `local.asset` is required to render the error page.
  app.use(assetMiddleware())

  // Passport middleware for authentication.
  app.use(
    artsyPassport({
      ...config,
      ...{
        ARTSY_ID: CLIENT_ID,
        ARTSY_SECRET: CLIENT_SECRET,
        ARTSY_URL: API_URL,
        CurrentUser: CurrentUser,
        SEGMENT_WRITE_KEY: SEGMENT_WRITE_KEY_SERVER,
        userKeys: [
          "collector_level",
          "default_profile_id",
          "email",
          "has_partner_access",
          "id",
          "lab_features",
          "name",
          "paddle_number",
          "phone",
          "roles",
          "type",
        ],
      },
    })
  )

  // Add CSRF to the cookie and remove it from the page. This will allows the
  // caching on the html and is used by the Login Modal to make secure requests.
  app.use(csrfTokenMiddleware)

  // Require a user for these routes
  app.use(userRequiredMiddleware)
}

function applyStaticAssetMiddlewares(app) {
  // Mount static assets from root public folder
  app.use(express.static("public"))

  // Mount static assets from sub-app /app `public` folders
  glob
    .sync(`${__dirname}/{public,{desktop,mobile}/**/public}`)
    .forEach(folder => {
      app.use(express.static(folder))
    })

  // TODO: Move to ./public/images
  app.use(favicon(path.resolve(__dirname, "mobile/public/images/favicon.ico")))
  app.use("/(.well-known/)?apple-app-site-association", siteAssociation)
}

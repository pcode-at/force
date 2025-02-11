import { artistRoutes } from "v2/Apps/Artist/artistRoutes"
import { artistSeriesRoutes } from "v2/Apps/ArtistSeries/artistSeriesRoutes"
import { artistsRoutes } from "v2/Apps/Artists/artistsRoutes"
import { artworkRoutes } from "v2/Apps/Artwork/artworkRoutes"
import { auctionsRoutes } from "v2/Apps/Auctions/auctionsRoutes"
import { buildAppRoutes } from "v2/Artsy/Router/buildAppRoutes"
import { buyerGuaranteeRoutes } from "v2/Apps/BuyerGuarantee/buyerGuaranteeRoutes"
import { collectRoutes } from "v2/Apps/Collect/collectRoutes"
import { consignRoutes } from "v2/Apps/Consign/consignRoutes"
import { conversationRoutes } from "v2/Apps/Conversation/conversationRoutes"
import { debugRoutes } from "v2/Apps/Debug/debugRoutes"
import { exampleRoutes } from "v2/Apps/Example/exampleRoutes"
import { fairRoutes } from "v2/Apps/Fair/fairRoutes"
import { fairsRoutes } from "v2/Apps/Fairs/fairsRoutes"
import { featureRoutes } from "v2/Apps/Feature/featureRoutes"
import { geneRoutes } from "v2/Apps/Gene/geneRoutes"
import { identityVerificationRoutes } from "v2/Apps/IdentityVerification/identityVerificationRoutes"
import { orderRoutes } from "v2/Apps/Order/orderRoutes"
import { partnerRoutes } from "v2/Apps/Partner/partnerRoutes"
import { paymentRoutes } from "v2/Apps/Payment/paymentRoutes"
import { purchaseRoutes } from "v2/Apps/Purchase/purchaseRoutes"
import { AppRouteConfig } from "v2/Artsy/Router/Route"
import { searchRoutes } from "v2/Apps/Search/searchRoutes"
import { showRoutes } from "v2/Apps/Show/showRoutes"
import { viewingRoomRoutes } from "v2/Apps/ViewingRoom/viewingRoomRoutes"
import { tagRoutes } from "./Apps/Tag/tagRoutes"

/**
 * **WARNING***
 *
 * When adding a new route to this file, be sure to add route to
 * `src/desktop/lib/webpackPublicPath.ts` as well. This is temporary until the
 * assets paths have stabilized.
 */
export function getAppRoutes(): AppRouteConfig[] {
  return buildAppRoutes([
    {
      routes: artistRoutes,
    },
    {
      routes: artistsRoutes,
    },
    {
      routes: artistSeriesRoutes,
    },
    {
      routes: artworkRoutes,
    },
    {
      routes: auctionsRoutes,
    },
    {
      routes: buyerGuaranteeRoutes,
    },
    {
      routes: collectRoutes,
    },
    {
      routes: consignRoutes,
    },
    {
      routes: conversationRoutes,
    },
    {
      routes: exampleRoutes,
    },
    {
      routes: fairRoutes,
    },
    {
      routes: fairsRoutes,
    },
    {
      routes: featureRoutes,
    },
    {
      routes: geneRoutes,
    },
    {
      routes: identityVerificationRoutes,
    },
    {
      routes: orderRoutes,
    },
    {
      routes: paymentRoutes,
    },
    {
      routes: partnerRoutes,
    },
    {
      routes: purchaseRoutes,
    },
    {
      routes: searchRoutes,
    },
    {
      routes: showRoutes,
    },
    {
      routes: tagRoutes,
    },
    {
      routes: viewingRoomRoutes,
    },

    // For debugging baseline app shell stuff
    {
      routes: debugRoutes,
    },
  ])
}

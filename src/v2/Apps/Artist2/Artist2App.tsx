import { Box } from "@artsy/palette"
import { Match } from "found"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import {
  AnalyticsContext,
  AnalyticsSchema,
  useAnalyticsContext,
} from "v2/Artsy"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { findCurrentRoute } from "v2/Artsy/Router/Utils/findCurrentRoute"
import { Artist2App_artist } from "v2/__generated__/Artist2App_artist.graphql"
import { Artist2MetaFragmentContainer } from "./Components/Artist2Meta"

interface Artist2AppProps {
  artist: Artist2App_artist
  match: Match
}

const Artist2App: React.FC<Artist2AppProps> = ({ artist, children, match }) => {
  const { trackEvent } = useTracking()
  const route = findCurrentRoute(match)!
  const PageWrapper = getPageWrapper(artist)

  /**
   * Full page takes over the whole sub app
   */
  if (route.displayFullPage) {
    return <PageWrapper>{children}</PageWrapper>
  }

  /**
   * Hiding navigation tabs presumes we've navigated to a page we need to then
   * navigate back from. Shows a back arrow.
   */
  if (route.hideNavigationTabs) {
    return (
      <PageWrapper>
        <RouterLink
          to={`/artist/${artist.slug}`}
          onClick={() =>
            trackEvent({
              action_type: AnalyticsSchema.ActionType.Click,
              destination_path: `/artist/${artist.slug}`,
              subject: "Back to artist link",
            })
          }
        >
          <ChevronButton direction="left">Back to {artist.name}</ChevronButton>
        </RouterLink>
        {children}
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      Hi Artist 2 <br />
      <Box>{children}</Box>
    </PageWrapper>
  )
}

export const Artist2AppFragmentContainer = createFragmentContainer(Artist2App, {
  artist: graphql`
    fragment Artist2App_artist on Artist {
      ...Artist2Meta_artist

      internalID
      name
      slug
    }
  `,
})

const getPageWrapper = artist => {
  return ({ children }) => {
    const { contextPageOwnerType, contextPageOwnerSlug } = useAnalyticsContext()

    return (
      <AnalyticsContext.Provider
        value={{
          contextPageOwnerId: artist.internalID,
          contextPageOwnerSlug,
          contextPageOwnerType,
        }}
      >
        <>
          <Artist2MetaFragmentContainer artist={artist} />
          {children}
        </>
      </AnalyticsContext.Provider>
    )
  }
}

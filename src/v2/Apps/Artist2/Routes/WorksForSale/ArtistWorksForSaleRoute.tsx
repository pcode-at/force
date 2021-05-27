import React from "react"
import { Box } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { Artist2ArtworkFilterRefetchContainer } from "./Components/Artist2ArtworkFilter"
import { ArtistWorksForSaleRoute_artist } from "v2/__generated__/ArtistWorksForSaleRoute_artist.graphql"
import { SharedArtworkFilterContextProps } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { ArtistSeriesRailFragmentContainer } from "v2/Components/ArtistSeriesRail/ArtistSeriesRail"
import { ContextModule } from "@artsy/cohesion"

interface ArtistWorksForSaleRouteProps {
  artist: ArtistWorksForSaleRoute_artist
}

const ArtistWorksForSaleRoute: React.FC<ArtistWorksForSaleRouteProps> = ({
  artist,
}) => {
  return (
    <>
      <Box mt={4} mb={6}>
        <ArtistSeriesRailFragmentContainer
          artist={artist}
          contextModule={ContextModule.artistSeriesRail}
          showProgress
        />
      </Box>
      <Artist2ArtworkFilterRefetchContainer
        artist={artist}
        aggregations={
          artist.sidebarAggregations
            ?.aggregations as SharedArtworkFilterContextProps["aggregations"]
        }
      />
    </>
  )
}

export const ArtistWorksForSaleRouteFragmentContainer = createFragmentContainer(
  ArtistWorksForSaleRoute,
  {
    artist: graphql`
      fragment ArtistWorksForSaleRoute_artist on Artist
        @argumentDefinitions(
          aggregations: { type: "[ArtworkAggregation]" }
          input: { type: "FilterArtworksInput" }
        ) {
        ...ArtistSeriesRail_artist
        ...Artist2ArtworkFilter_artist @arguments(input: $input)
        sidebarAggregations: filterArtworksConnection(
          aggregations: $aggregations
          first: 1
        ) {
          aggregations {
            slice
            counts {
              name
              value
              count
            }
          }
        }
        internalID
        slug
        id
      }
    `,
  }
)

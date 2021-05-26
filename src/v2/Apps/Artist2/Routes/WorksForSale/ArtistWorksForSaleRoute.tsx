import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtistWorksForSaleRouteProps {
  artist: any
}

const ArtistWorksForSaleRoute: React.FC<ArtistWorksForSaleRouteProps> = props => {
  return <></>
}

export const ArtistWorksForSaleRouteFragmentContainer = createFragmentContainer(
  ArtistWorksForSaleRoute,
  {
    artist: graphql`
      fragment ArtistWorksForSaleRoute_artist on Artist
        @argumentDefinitions(
          input: { type: "FilterArtworksInput" }
          sort: { type: "String" }
          page: { type: "Int" }
          aggregations: { type: "[ArtworkAggregation]" }
        ) {
        ...Artist2ArtworkFilter_artist @arguments(input: $input)

        sidebarAggregations: filterArtworksConnection(
          sort: $sort
          page: $page
          aggregations: $aggregations
          first: 1
          after: ""
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

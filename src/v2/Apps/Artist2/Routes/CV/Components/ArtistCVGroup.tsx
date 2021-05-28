import { Text, Flex, Box, Image } from "@artsy/palette"
import React from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtistCVGroup_artist } from "v2/__generated__/ArtistCVGroup_artist.graphql"

const REFETCH_PAGE_SIZE = 10

interface ArtistCVGroupProps {
  artist: ArtistCVGroup_artist
  relay: RelayPaginationProp
  title: string
  sort: string
  status: string
}

const ArtistCVGroup: React.FC<ArtistCVGroupProps> = ({
  artist,
  relay,
  sort,
  status,
}) => {
  const loadAfter = cursor => {
    relay.loadMore(REFETCH_PAGE_SIZE, error => {
      if (error) {
        console.error(error)
      }
    })
  }

  const nodes = extractNodes(artist.showsConnection)

  if (nodes.length === 0) {
    return null
  }

  return <></>
}

export const ArtistCVGroupRefetchContainer = createPaginationContainer(
  ArtistCVGroup,
  {
    artist: graphql`
      fragment ArtistCVGroup_artist on Artist
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String" }
          sort: { type: "ShowSorts", defaultValue: START_AT_DESC }
          atAFair: { type: "Boolean", defaultValue: false }
          soloShow: { type: "Boolean", defaultValue: false }
          isReference: { type: "Boolean", defaultValue: true }
          visibleToPublic: { type: "Boolean", defaultValue: false }
        ) {
        slug
        showsConnection(
          first: $count
          after: $cursor
          sort: $sort
          atAFair: $atAFair
          soloShow: $soloShow
          isReference: $isReference
          visibleToPublic: $visibleToPublic
        ) @connection(key: "ArtistCVGroup_showsConnection") {
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              id
              partner {
                ... on ExternalPartner {
                  name
                }
                ... on Partner {
                  name
                  href
                }
              }
              name
              startAt(format: "YYYY")
              city
              href
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        ...fragmentVariables,
        count,
        cursor,
        slug: props.artist.slug,
      }
    },
    query: graphql`
      query ArtistCVGroupQuery(
        $count: Int
        $cursor: String
        $slug: String!
        $sort: ShowSorts
        $atAFair: Boolean
        $soloShow: Boolean
        $isReference: Boolean
        $visibleToPublic: Boolean
      ) {
        artist(id: $slug) {
          ...CVItem_artist
            @arguments(
              sort: $sort
              count: $count
              cursor: $cursor
              atAFair: $atAFair
              soloShow: $soloShow
              isReference: $isReference
              visibleToPublic: $visibleToPublic
            )
        }
      }
    `,
  }
)

import { Column, GridColumns, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtistArticlesRouteProps {
  artist: any
}

const ArtistArticlesRoute: React.FC<ArtistArticlesRouteProps> = ({
  artist,
}) => {
  return (
    <>
      <Text variant="xl">{artist.name} Articles</Text>

      <GridColumns>
        <Column span={2}>Hi</Column>
        <Column span={4}>hello</Column>
        <Column span={4}>there</Column>
      </GridColumns>
    </>
  )
}

export const ArtistArticlesRouteFragmentContainer = createFragmentContainer(
  ArtistArticlesRoute,
  {
    artist: graphql`
      fragment ArtistArticlesRoute_artist on Artist {
        name
      }
    `,
  }
)

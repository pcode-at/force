import { Shelf, Spacer, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistSeriesRail_artist } from "v2/__generated__/ArtistSeriesRail_artist.graphql"
import { ArtistSeriesItemFragmentContainer as ArtistSeriesItem } from "./ArtistSeriesItem"
import { ContextModule } from "@artsy/cohesion"
import { extractNodes } from "v2/Utils/extractNodes"

interface Props {
  artist: ArtistSeriesRail_artist
  title?: string
  contextModule: ContextModule
  showProgress?: boolean
}

const ArtistSeriesRail: React.FC<Props> = ({
  artist,
  contextModule,
  title,
  showProgress,
}) => {
  if (!artist) return null

  const { artistSeriesConnection } = artist
  const series = extractNodes(artistSeriesConnection)

  return (
    <>
      <Text variant="lg" as="h3">
        {title ?? "Artist Series"}
      </Text>

      <Spacer mt={4} />

      <Shelf showProgress={showProgress}>
        {series.map((node, index) => {
          return (
            <ArtistSeriesItem
              key={node.internalID}
              artistSeries={node}
              index={index}
              contextModule={contextModule}
            />
          )
        })}
      </Shelf>
    </>
  )
}

export const ArtistSeriesRailFragmentContainer = createFragmentContainer(
  ArtistSeriesRail as React.FC<Props>,
  {
    artist: graphql`
      fragment ArtistSeriesRail_artist on Artist {
        artistSeriesConnection(first: 50) {
          edges {
            node {
              internalID
              ...ArtistSeriesItem_artistSeries
            }
          }
        }
      }
    `,
  }
)

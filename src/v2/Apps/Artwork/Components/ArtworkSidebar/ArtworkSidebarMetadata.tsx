import { Box, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebarClassificationFragmentContainer as Classification } from "./ArtworkSidebarClassification"
import { ArtworkSidebarSizeInfoFragmentContainer as SizeInfo } from "./ArtworkSidebarSizeInfo"
import { ArtworkSidebarTitleInfoFragmentContainer as TitleInfo } from "./ArtworkSidebarTitleInfo"
import { ArtworkSidebarMetadata_artwork } from "v2/__generated__/ArtworkSidebarMetadata_artwork.graphql"

// TODO:
// - Check an auction lot

export interface ArtworkSidebarMetadataProps {
  artwork: ArtworkSidebarMetadata_artwork
}

export class ArtworkSidebarMetadata extends React.Component<
  ArtworkSidebarMetadataProps
> {
  render() {
    const { artwork } = this.props

    const lotLabel = artwork.is_biddable
      ? artwork.sale_artwork?.lot_label
      : null

    return (
      <Box>
        {lotLabel && (
          <Text variant="xs" color="black100">
            Lot {lotLabel}
          </Text>
        )}

        <TitleInfo artwork={artwork} />

        {(artwork.edition_sets?.length ?? 0) < 2 && (
          <SizeInfo piece={artwork} />
        )}

        <Classification artwork={artwork} />
      </Box>
    )
  }
}

export const ArtworkSidebarMetadataFragmentContainer = createFragmentContainer(
  ArtworkSidebarMetadata,
  {
    artwork: graphql`
      fragment ArtworkSidebarMetadata_artwork on Artwork {
        is_biddable: isBiddable
        edition_sets: editionSets {
          __typename
        }
        sale_artwork: saleArtwork {
          lot_label: lotLabel
        }
        ...ArtworkSidebarTitleInfo_artwork
        ...ArtworkSidebarSizeInfo_piece
        ...ArtworkSidebarClassification_artwork
      }
    `,
  }
)

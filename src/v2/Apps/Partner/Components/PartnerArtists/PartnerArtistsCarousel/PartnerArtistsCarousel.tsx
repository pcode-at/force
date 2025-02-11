import React, { useState } from "react"
import { Box, Text, Flex } from "@artsy/palette"
import { flatten } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/Artsy"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { PartnerArtistsCarouselRendererQuery } from "v2/__generated__/PartnerArtistsCarouselRendererQuery.graphql"
import { PartnerArtistsCarousel_partner } from "v2/__generated__/PartnerArtistsCarousel_partner.graphql"
import {
  PartnerArtistsCarouselItemFragmentContainer,
  ResponsiveImage,
} from "./PartnerArtistsCarouselItem"
import { PartnerArtistsCarouselPlaceholder } from "./PartnerArtistsCarouselPlaceholder"
import { ScrollToPartnerHeader } from "../../ScrollToPartnerHeader"
import { Carousel } from "../../Carousel"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"

const PAGE_SIZE = 19

export interface PartnerArtistsCarouselProps {
  partner: PartnerArtistsCarousel_partner
}

export const PartnerArtistsCarousel: React.FC<PartnerArtistsCarouselProps> = ({
  partner,
}) => {
  // @ts-expect-error STRICT_NULL_CHECK
  const [isSeeAllAvaliable, setIsSeeAllAvaliable] = useState<boolean>(undefined)

  if (!partner || !partner.artists || !partner.artists.edges) {
    return null
  }

  const { artists, slug } = partner

  return (
    <Carousel
      onRailOverflowChange={setIsSeeAllAvaliable}
      itemsPerViewport={[2, 2, 3, 4]}
    >
      {/* @ts-expect-error STRICT_NULL_CHECK */}
      {flatten([
        // @ts-expect-error STRICT_NULL_CHECK
        artists.edges.map(edge => {
          return (
            <PartnerArtistsCarouselItemFragmentContainer
              // @ts-expect-error STRICT_NULL_CHECK
              key={edge.node.id}
              // @ts-expect-error STRICT_NULL_CHECK
              artist={edge.node}
              // @ts-expect-error STRICT_NULL_CHECK
              partnerArtistHref={`/partner2/${slug}/artists/${edge.node.slug}`}
            />
          )
        }),
        isSeeAllAvaliable && (
          <Box key="see-all-button" width={[300, "100%"]}>
            <RouterLink to={`/partner2/${slug}/artists`}>
              <ScrollToPartnerHeader width="100%">
                <ResponsiveImage>
                  <Flex
                    height="100%"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text style={{ textDecoration: "underline" }}>
                      See all artists
                    </Text>
                  </Flex>
                </ResponsiveImage>
              </ScrollToPartnerHeader>
            </RouterLink>
          </Box>
        ),
      ])}
    </Carousel>
  )
}

export const PartnerArtistsCarouselFragmentContainer = createFragmentContainer(
  PartnerArtistsCarousel,
  {
    partner: graphql`
      fragment PartnerArtistsCarousel_partner on Partner {
        slug
        artists: artistsConnection(
          first: 19
          hasPublishedArtworks: true
          displayOnPartnerProfile: true
        ) {
          edges {
            counts {
              artworks
            }
            node {
              id
              slug
              ...PartnerArtistsCarouselItem_artist
            }
          }
        }
      }
    `,
  }
)

export const PartnerArtistsCarouselRenderer: React.FC<{
  partnerId: string
}> = ({ partnerId, ...rest }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <QueryRenderer<PartnerArtistsCarouselRendererQuery>
      environment={relayEnvironment}
      query={graphql`
        query PartnerArtistsCarouselRendererQuery($partnerId: String!) {
          partner(id: $partnerId) @principalField {
            ...PartnerArtistsCarousel_partner
          }
        }
      `}
      variables={{ partnerId }}
      placeholder={<PartnerArtistsCarouselPlaceholder count={PAGE_SIZE} />}
      render={({ error, props }) => {
        if (error || !props)
          return <PartnerArtistsCarouselPlaceholder count={PAGE_SIZE} />

        return <PartnerArtistsCarouselFragmentContainer {...rest} {...props} />
      }}
    />
  )
}

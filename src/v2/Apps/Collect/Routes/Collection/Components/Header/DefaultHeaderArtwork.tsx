import { Image } from "@artsy/palette"
import { DefaultHeaderArtwork_artwork } from "v2/__generated__/DefaultHeaderArtwork_artwork.graphql"
import { AnalyticsSchema } from "v2/Artsy/Analytics"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface DefaultHeaderArtworkProps {
  artwork: DefaultHeaderArtwork_artwork
  collectionId: string
  collectionSlug: string
}

export const DefaultHeaderArtwork: React.FC<DefaultHeaderArtworkProps> = ({
  artwork,
  collectionId,
  collectionSlug,
}) => {
  const { trackEvent } = useTracking()

  if (!artwork.image?.resized) return null

  const handleClick = () => {
    trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      // @ts-expect-error STRICT_NULL_CHECK
      context_module: AnalyticsSchema.ContextModule.ArtworkBanner,
      // @ts-expect-error STRICT_NULL_CHECK
      context_page_owner_type: AnalyticsSchema.OwnerType.Collection,
      context_page: AnalyticsSchema.PageName.CollectionPage,
      context_page_owner_id: collectionId,
      context_page_owner_slug: collectionSlug,
      // @ts-expect-error STRICT_NULL_CHECK
      destination_path: artwork.href,
    })
  }

  return (
    <RouterLink
      to={artwork.href!}
      key={artwork.href!}
      onClick={handleClick}
      style={{ display: "block" }}
    >
      <Image
        width={artwork.image.resized.width}
        height={artwork.image.resized.height}
        src={artwork.image.resized.src}
        srcSet={artwork.image.resized.srcSet}
        alt={artwork.title ?? ""}
        lazyLoad
      />
    </RouterLink>
  )
}

export const DefaultHeaderArtworkFragmentContainer = createFragmentContainer(
  DefaultHeaderArtwork,
  {
    artwork: graphql`
      fragment DefaultHeaderArtwork_artwork on Artwork {
        id
        title
        href
        slug
        image {
          resized(width: 300, height: 450) {
            src
            srcSet
            width
            height
          }
        }
      }
    `,
  }
)

import { Text, Image } from "@artsy/palette"
import { OtherCollectionEntity_member } from "v2/__generated__/OtherCollectionEntity_member.graphql"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ContextModule, clickedCollectionGroup } from "@artsy/cohesion"
import { useAnalyticsContext } from "v2/Artsy/Analytics/AnalyticsContext"
import { cropped } from "v2/Utils/resized"

export interface CollectionProps {
  member: OtherCollectionEntity_member
  itemNumber: number
}

export const OtherCollectionEntity: React.FC<CollectionProps> = ({
  itemNumber,
  member: { id, slug, thumbnail, title },
}) => {
  const { trackEvent } = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const handleClick = () => {
    trackEvent(
      clickedCollectionGroup({
        contextModule: ContextModule.otherCollectionsRail,
        contextPageOwnerId,
        contextPageOwnerSlug,
        // @ts-expect-error STRICT_NULL_CHECK
        contextPageOwnerType,
        destinationPageOwnerId: id,
        destinationPageOwnerSlug: slug,
        horizontalSlidePosition: itemNumber,
      })
    )
  }

  if (!thumbnail) return null

  const { src, srcSet } = cropped(thumbnail, {
    width: 325,
    height: 244,
    quality: 75,
    convert_to: "jpg",
  })

  return (
    <RouterLink to={`/collection/${slug}`} onClick={handleClick} noUnderline>
      <Image
        src={src}
        srcSet={srcSet}
        width={325}
        height={244}
        alt=""
        lazyLoad
      />

      <Text variant="md" overflowEllipsis maxWidth={300} mt={1}>
        {title}
      </Text>
    </RouterLink>
  )
}

export const OtherCollectionsRailsContainer = createFragmentContainer(
  OtherCollectionEntity as React.FC<CollectionProps>,
  {
    member: graphql`
      fragment OtherCollectionEntity_member on MarketingCollection {
        id
        slug
        thumbnail
        title
      }
    `,
  }
)

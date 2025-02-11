import { Checkbox, Flex } from "@artsy/palette"
import { sortBy } from "lodash"
import React, { FC, useEffect, useState } from "react"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import {
  FollowedArtistList,
  fetchFollowedArtists,
} from "../Utils/fetchFollowedArtists"
import { FilterExpandable } from "./FilterExpandable"
import { ShowMore } from "./ShowMore"

export interface ArtistsFilterProps {
  expanded?: boolean
  relayEnvironment?: any
  fairID?: string
  user?: User
}

const ArtistItem: React.FC<{
  slug: string
  name: string
  followedArtistSlugs: string[]
  isFollowedArtistCheckboxSelected: boolean
}> = ({
  slug,
  name,
  followedArtistSlugs,
  isFollowedArtistCheckboxSelected,
}) => {
  const { currentlySelectedFilters, setFilter } = useArtworkFilterContext()
  const toggleArtistSelection = (selected, slug) => {
    // @ts-expect-error STRICT_NULL_CHECK
    let artistIDs = currentlySelectedFilters().artistIDs.slice()
    if (selected) {
      artistIDs.push(slug)
    } else {
      // When an artist is de-selected, if it is a followed artist _and_ that filter
      // is also checked, we want to de-select it as well, and move remaining followed
      // artists to the explicit `artistIDs` list.
      artistIDs = artistIDs.filter(item => item !== slug)
      if (followedArtistSlugs.includes(slug)) {
        setFilter("includeArtworksByFollowedArtists", false)
        artistIDs = artistIDs.concat(followedArtistSlugs)
        artistIDs = artistIDs.filter(item => item !== slug)
      }
    }
    setFilter("artistIDs", artistIDs)
  }

  const isFollowedArtist = followedArtistSlugs.includes(slug)

  return (
    <Checkbox
      selected={
        // @ts-expect-error STRICT_NULL_CHECK
        currentlySelectedFilters().artistIDs.includes(slug) ||
        (isFollowedArtistCheckboxSelected && isFollowedArtist)
      }
      onSelect={selected => {
        return toggleArtistSelection(selected, slug)
      }}
    >
      {name}
    </Checkbox>
  )
}

export const ArtistsFilter: FC<ArtistsFilterProps> = ({
  expanded,
  fairID,
  relayEnvironment,
  user,
}) => {
  const { aggregations, ...filterContext } = useArtworkFilterContext()
  // @ts-expect-error STRICT_NULL_CHECK
  const artists = aggregations.find(agg => agg.slice === "ARTIST")

  const [followedArtists, setFollowedArtists] = useState<FollowedArtistList>([])
  const followedArtistSlugs = followedArtists.map(({ slug }) => slug)

  useEffect(() => {
    if (relayEnvironment && user) {
      // @ts-expect-error STRICT_NULL_CHECK
      fetchFollowedArtists({ relayEnvironment, fairID }).then(data => {
        setFollowedArtists(data)
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!(artists && artists.counts)) {
    return null
  }

  const artistsSorted = sortBy(artists.counts, ["name"])

  const isFollowedArtistCheckboxSelected =
    !!user &&
    // @ts-expect-error STRICT_NULL_CHECK
    filterContext.currentlySelectedFilters()["includeArtworksByFollowedArtists"]
  const followedArtistArtworkCount = filterContext?.counts?.followedArtists ?? 0

  // @ts-expect-error STRICT_NULL_CHECK
  const selection = filterContext.currentlySelectedFilters().artistIDs
  const hasSelection =
    (selection && selection.length > 0) || isFollowedArtistCheckboxSelected

  return (
    <FilterExpandable label="Artists" expanded={hasSelection || expanded}>
      <Flex flexDirection="column">
        <Checkbox
          disabled={!followedArtistArtworkCount}
          selected={isFollowedArtistCheckboxSelected}
          onSelect={value =>
            filterContext.setFilter("includeArtworksByFollowedArtists", value)
          }
        >
          Artists I follow ({followedArtistArtworkCount})
        </Checkbox>

        <ShowMore>
          {artistsSorted.map(({ value: slug, name }, index) => {
            return (
              <ArtistItem
                key={index}
                slug={slug}
                name={name}
                followedArtistSlugs={followedArtistSlugs}
                // @ts-expect-error STRICT_NULL_CHECK
                isFollowedArtistCheckboxSelected={
                  isFollowedArtistCheckboxSelected
                }
              />
            )
          })}
        </ShowMore>
      </Flex>
    </FilterExpandable>
  )
}

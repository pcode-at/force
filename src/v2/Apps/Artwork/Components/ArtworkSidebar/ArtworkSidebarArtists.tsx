import { Box, EntityHeader, Join, Spacer, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ContextModule } from "@artsy/cohesion"
import { ArtworkSidebarArtists_artwork } from "v2/__generated__/ArtworkSidebarArtists_artwork.graphql"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"

// TODO:
// - Convert to FC
// - Check an artwork with a cultural maker
// - Check an artwork with no artist
// - Move h1 out of this component and into artwork title

export interface ArtistsProps {
  artwork: ArtworkSidebarArtists_artwork
}

// @ts-expect-error STRICT_NULL_CHECK
type Artist = ArtworkSidebarArtists_artwork["artists"][0]

export class ArtworkSidebarArtists extends React.Component<ArtistsProps> {
  private renderArtistName(artist: Artist, multiple = false) {
    return (
      <EntityHeader
        name={artist.name}
        href={artist.href}
        meta={artist.formattedNationalityAndBirthday}
        FollowButton={
          <FollowArtistButton
            artist={artist}
            contextModule={ContextModule.artworkSidebar}
            triggerSuggestions
            buttonProps={{ size: "small", variant: "secondaryOutline" }}
          >
            Follow
          </FollowArtistButton>
        }
      />
    )
  }

  private renderSingleArtist = (artist: Artist) => {
    return <>{this.renderArtistName(artist)}</>
  }

  renderMultipleArtists() {
    const {
      artwork: { artists },
    } = this.props

    if (!artists) return null

    return (
      <Box as="h1">
        <Join separator={<Spacer mt={2} />}>
          {artists.map((artist, index) => {
            if (!artist) return null

            return (
              <React.Fragment key={artist.id}>
                {this.renderArtistName(artist, true)}
              </React.Fragment>
            )
          })}
        </Join>
      </Box>
    )
  }

  renderCulturalMaker(cultural_maker: string) {
    return (
      <Text variant="lg" as="h1">
        {cultural_maker}
      </Text>
    )
  }
  render() {
    const {
      artwork: { artists, cultural_maker },
    } = this.props

    if (!artists) return null

    return (
      <>
        {artists.length === 1
          ? this.renderSingleArtist(artists[0])
          : this.renderMultipleArtists()}

        {artists.length === 0 &&
          cultural_maker &&
          this.renderCulturalMaker(cultural_maker)}
      </>
    )
  }
}

export const ArtworkSidebarArtistsFragmentContainer = createFragmentContainer(
  ArtworkSidebarArtists,
  {
    artwork: graphql`
      fragment ArtworkSidebarArtists_artwork on Artwork
        @argumentDefinitions(
          showFollowSuggestions: { type: "Boolean", defaultValue: true }
        ) {
        cultural_maker: culturalMaker
        artists {
          id
          internalID
          slug
          name
          formattedNationalityAndBirthday
          href
          ...FollowArtistButton_artist
            @arguments(showFollowSuggestions: $showFollowSuggestions)
        }
      }
    `,
  }
)

import { Button, Column, GridColumns, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Artist2Header_artist } from "v2/__generated__/Artist2Header_artist.graphql"

interface Artist2HeaderProps {
  artist: Artist2Header_artist
}

const Artist2Header: React.FC<Artist2HeaderProps> = props => {
  return (
    <GridColumns mt={4}>
      <Column span={6}>
        <Text variant="xl">Wolfgang Tillmans</Text>

        <Text variant="xl" color="black60" mb={2}>
          German, b. 1968
        </Text>

        <GridColumns>
          <Column span={[6, 6, 3]}>
            <Button variant="secondaryOutline" width="100%">
              Follow
            </Button>
          </Column>

          <Column span={[6, 6, 9]} display="flex" alignItems="center">
            <Text variant="xs" color="black60">
              10k Following
            </Text>
          </Column>
        </GridColumns>
      </Column>

      <Column span={6}>
        <Text variant="xs" textTransform="uppercase" mb={1}>
          Bio
        </Text>

        <Text variant="sm" mb={2}>
          With titles such as Susanne, No Bra (2006) and Anders pulling splinter
          from his foot (2004), Wolfgang Tillmans’s oeuvre is distinguished by
          unabashed emotion and a tension between strangeness and familiarity.
          Using all the photographic technology at his disposal, Tillmans shoots
          portraits, still-lifes, and landscapes in which the subjects range
          from partially-nude friends in seemingly private moments to modest
          arrangements of domestic items on windowsills. Tillmans’s abstractions
          reveal studies in color, as seen in the magenta liquid lines of
          Urgency XXIV (2006).
        </Text>

        <Text variant="xs" textTransform="uppercase" mb={1}>
          Stats
        </Text>

        <Text variant="sm">
          £549k Auction Record
          <br />
          Blue Chip Representation
        </Text>
      </Column>
    </GridColumns>
  )
}

export const Artist2HeaderFragmentContainer = createFragmentContainer(
  Artist2Header,
  {
    artist: graphql`
      fragment Artist2Header_artist on Artist {
        id
      }
    `,
  }
)

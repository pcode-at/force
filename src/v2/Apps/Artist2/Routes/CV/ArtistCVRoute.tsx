import { Join, Spacer } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistCVGroupRefetchContainer } from "./Components/ArtistCVGroup"
import { ArtistCVRoute_viewer } from "v2/__generated__/ArtistCVRoute_viewer.graphql"

interface ArtistCVRouteProps {
  viewer: ArtistCVRoute_viewer
}

const ArtistCVRoute: React.FC<ArtistCVRouteProps> = ({ viewer }) => {
  return (
    <>
      <Join separator={<Spacer mb={4} />}>
        <ArtistCVGroupRefetchContainer
          artist={viewer.soloShows!}
          title="Current Shows"
          sort="END_AT_ASC"
          status="running"
        />
        <ArtistCVGroupRefetchContainer
          artist={viewer.groupShows!}
          title="Upcoming Shows"
          sort="START_AT_ASC"
          status="upcoming"
        />
        <ArtistCVGroupRefetchContainer
          artist={viewer.fairBooths!}
          title="Upcoming Shows"
          sort="START_AT_ASC"
          status="upcoming"
        />
      </Join>
    </>
  )
}

export const ArtistCVRouteFragmentContainer = createFragmentContainer(
  ArtistCVRoute,
  {
    viewer: graphql`
      fragment ArtistCVRoute_viewer on Viewer
        @argumentDefinitions(
          soloShowsAtAFair: { type: "Boolean", defaultValue: false }
          soloShowsSoloShow: { type: "Boolean", defaultValue: true }
          groupShowsAtAFair: { type: "Boolean", defaultValue: false }
          fairBoothsAtAFair: { type: "Boolean", defaultValue: true }
        ) {
        soloShows: artist(id: $artistID) {
          ...ArtistCVGroup_artist
            @arguments(atAFair: $soloShowsAtAFair, soloShow: $soloShowsSoloShow)
        }
        groupShows: artist(id: $artistID) {
          ...ArtistCVGroup_artist @arguments(atAFair: $groupShowsAtAFair)
        }
        fairBooths: artist(id: $artistID) {
          ...ArtistCVGroup_artist @arguments(atAFair: $fairBoothsAtAFair)
        }
      }
    `,
  }
)

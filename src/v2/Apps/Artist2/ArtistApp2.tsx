import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtistApp2Props {
  artist: any
}

const ArtistApp2: React.FC<ArtistApp2Props> = props => {
  return <></>
}

export const ArtistApp2FragmentContainer = createFragmentContainer(ArtistApp2, {
  artist: graphql`
    fragment ArtistApp2_artist on Artist {
      id
    }
  `,
})

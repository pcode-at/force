import { Box } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface Artist2AppProps {
  artist: any
}

const Artist2App: React.FC<Artist2AppProps> = ({ children }) => {
  return (
    <Box>
      Hi Artist 2 <br />
      <Box>{children}</Box>
    </Box>
  )
}

export const Artist2AppFragmentContainer = createFragmentContainer(Artist2App, {
  artist: graphql`
    fragment Artist2App_artist on Artist {
      id
    }
  `,
})

import styled from "styled-components"
import { Box } from "@artsy/palette"
import React, { useEffect, useRef, useState } from "react"
import { NAV_BAR_HEIGHT, MOBILE_NAV_HEIGHT } from "v2/Components/NavBar"
import { useSticky } from "./StickyProvider"

export const Sticky: React.FC = ({ children }) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    if (sentinelRef.current === null) return

    if (!("IntersectionObserver" in window)) return

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries
        if (
          // Intersecting
          entry.intersectionRatio === 0 &&
          // Only stick when scrolling down
          entry.boundingClientRect.y < 0
        ) {
          setStuck(true)
        } else if (entry.intersectionRatio === 1) {
          setStuck(false)
        }
      },
      { threshold: [0, 1] }
    )

    observer.observe(sentinelRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  const { offsetTop, registerSticky, deregisterSticky } = useSticky()

  useEffect(() => {
    registerSticky(containerRef.current?.clientHeight)
    return deregisterSticky
  }, [registerSticky, deregisterSticky])

  return (
    <>
      <Sentinel
        ref={sentinelRef as any}
        top={[-(MOBILE_NAV_HEIGHT + offsetTop), -(NAV_BAR_HEIGHT + offsetTop)]}
      />

      <Container
        ref={containerRef as any}
        bg="white100"
        position={stuck ? "fixed" : "static"}
        top={[MOBILE_NAV_HEIGHT + offsetTop, NAV_BAR_HEIGHT + offsetTop]}
      >
        {typeof children === "function" ? children({ stuck }) : children}
      </Container>

      {stuck && (
        // Insert placeholder the same height as the container to prevent scroll from changing
        <div style={{ height: containerRef.current?.clientHeight }} />
      )}
    </>
  )
}

export const Container = styled(Box)`
  z-index: 1;
  left: 0;
  right: 0;
`

// This <div> is positioned such that when it leaves the top of
// the browser the <Container> reaches it's `top` value and sticking.
const Sentinel = styled(Box)`
  position: relative;
  width: 100%;
  height: 0;
`

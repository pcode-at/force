import { RelaySSREnvironment } from "v2/Artsy/Relay/createRelaySSREnvironment"
import { FarceCreateRouterArgs } from "found"
import { SystemContextProps } from "../SystemContext"
import { AppRouteConfig } from "./Route"

export { Link } from "found"
export { Boot } from "./Boot"
export { SystemContextProvider, SystemContextConsumer } from "v2/Artsy"

/**
 * Configuration used when creating a new Router app
 */
export interface RouterConfig {
  /**
   * Context values to be passed to ArtsyContext
   */
  context?: SystemContextProps & { relayEnvironment?: RelaySSREnvironment }

  /**
   * Configuration options to be passed to Found router
   */
  history?: {
    /**
     * Defines the type of history to use, depending on router environment.
     */
    protocol?: "browser" | "hash" | "memory"

    options?: FarceCreateRouterArgs["historyOptions"]
  }

  /**
   * Initial route for router on boot
   */
  initialRoute?: string

  /**
   * Array of routes to be passed to Found
   */
  routes: AppRouteConfig[]

  /**
   * URL passed from server
   */
  url?: string
}

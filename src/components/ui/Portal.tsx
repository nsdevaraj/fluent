/**
 * Portal — Render children outside the normal DOM tree.
 *
 * Wraps Fluent UI v9 `Portal`. Mounts children into a separate DOM node
 * (defaults to `document.body`) so they are unaffected by ancestor overflow,
 * z-index stacking, or CSS clipping.
 *
 * NOTE: Use Portal to render children outside the normal DOM tree — useful
 * for custom overlays and tooltips. Most DS overlay components (Dialog,
 * Drawer, Popover) use Portal internally.
 *
 * Usage:
 *   import { Portal } from "../components/ui";
 *
 *   // Render into document.body (default):
 *   <Portal>
 *     <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)" }} />
 *   </Portal>
 *
 *   // Render into a specific container:
 *   const overlayRoot = document.getElementById("overlay-root");
 *   <Portal mountNode={overlayRoot}>
 *     <CustomOverlay />
 *   </Portal>
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import {
  Portal as FluentPortal,
  PortalMountNodeProvider as FluentPortalMountNodeProvider,
} from "@fluentui/react-components";

// Re-export PortalMountNodeProvider for advanced portal target overrides
export { FluentPortalMountNodeProvider as PortalMountNodeProvider };

export interface PortalProps {
  children: React.ReactNode;
  /**
   * Target DOM node to mount into. Defaults to `document.body`.
   * Pass `null` to suppress mounting entirely (useful in SSR or tests).
   */
  mountNode?: HTMLElement | null;
  /**
   * className is forwarded to the portal's wrapper element when Fluent
   * injects one. Not all Fluent versions render a wrapper; pass inline
   * styles via a wrapping element if you need reliable styling.
   */
  className?: string;
}

export const Portal = React.forwardRef<HTMLDivElement, PortalProps>(
  ({ children, mountNode, className }: PortalProps, _ref) => {
    return (
      <FluentPortal mountNode={mountNode ?? undefined}>
        {children}
      </FluentPortal>
    );
  }
);
Portal.displayName = "Portal";

/**
 * Overflow — Responsive container utility that hides items that don't fit
 * and surfaces a "…more" menu for the hidden ones.
 *
 * Overflow is a utility for responsive containers that hides items that don't
 * fit and shows a '...more' menu. Wrap the container in Overflow and each item
 * in OverflowItem.
 *
 * Composable usage:
 *   import { Overflow, OverflowItem, OverflowDivider,
 *            useOverflowMenu, useIsOverflowItemVisible,
 *            useIsOverflowGroupVisible } from "../components/ui";
 *
 *   <Overflow>
 *     <div style={{ display: "flex" }}>
 *       <OverflowItem id="item-1">
 *         <Button>Item 1</Button>
 *       </OverflowItem>
 *       <OverflowItem id="item-2">
 *         <Button>Item 2</Button>
 *       </OverflowItem>
 *       <OverflowMenu />   {/* your custom overflow menu *\/}
 *     </div>
 *   </Overflow>
 *
 * Composite usage:
 *   <OverflowWrapper>
 *     <OverflowItem id="a"><Button>A</Button></OverflowItem>
 *     <OverflowItem id="b"><Button>B</Button></OverflowItem>
 *   </OverflowWrapper>
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import {
  Overflow as FluentOverflow,
  OverflowItem as FluentOverflowItem,
  OverflowDivider as FluentOverflowDivider,
  OverflowReorderObserver as FluentOverflowReorderObserver,
  useOverflowMenu,
  useIsOverflowItemVisible,
  useIsOverflowGroupVisible,
  OverflowProps,
  OverflowItemProps,
} from "@fluentui/react-components";

// ── Re-exports for composable usage ──────────────────────────────────────────
export {
  FluentOverflow               as Overflow,
  FluentOverflowItem           as OverflowItem,
  FluentOverflowDivider        as OverflowDivider,
  FluentOverflowReorderObserver as OverflowReorderObserver,
};

export type { OverflowProps, OverflowItemProps };

// ── Hook re-exports ───────────────────────────────────────────────────────────
export { useOverflowMenu, useIsOverflowItemVisible, useIsOverflowGroupVisible };

// ── Composite: OverflowWrapper ────────────────────────────────────────────────

export interface OverflowWrapperProps {
  /** Items to render inside the overflow container. Wrap each with OverflowItem. */
  children: React.ReactNode;
  /** Minimum visible items before overflow kicks in. */
  minimumVisible?: number;
  /** Overflow direction: horizontal (default) or vertical. */
  overflowAxis?: "horizontal" | "vertical";
  className?: string;
  style?: React.CSSProperties;
}

/**
 * OverflowWrapper — Thin convenience wrapper around Fluent's Overflow.
 *
 * Provides a flex container that automatically hides children that don't fit.
 * Each direct child should be wrapped in <OverflowItem id="…"> so the
 * Overflow engine can track and hide individual items.
 */
export const OverflowWrapper: React.FC<OverflowWrapperProps> = ({
  children,
  minimumVisible,
  overflowAxis = "horizontal",
  className,
  style,
}) => {
  return (
    <FluentOverflow minimumVisible={minimumVisible} overflowAxis={overflowAxis}>
      <div
        className={className}
        style={{
          display: "flex",
          flexWrap: "nowrap",
          overflow: "hidden",
          ...style,
        }}
      >
        {children}
      </div>
    </FluentOverflow>
  );
};

OverflowWrapper.displayName = "OverflowWrapper";

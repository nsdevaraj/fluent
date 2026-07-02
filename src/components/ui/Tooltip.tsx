/**
 * Tooltip — Accessible hover/focus tooltip wrapper
 *
 * Usage:
 *   import { Tooltip } from "../components/ui";
 *   <Tooltip content="Save changes" relationship="label">
 *     <Button icon={<Save20Regular />} />
 *   </Tooltip>
 *
 * Dependencies: @fluentui/react-components
 */

import React from "react";
import {
  Tooltip as FluentTooltip,
} from "@fluentui/react-components";
import type { PositioningShorthand } from "@fluentui/react-components";

export interface TooltipProps {
  /** Tooltip text or content */
  content: React.ReactNode;
  /** The trigger element — must be a single focusable element */
  children: React.ReactElement;
  /**
   * "label"      — tooltip IS the accessible name (use for icon-only buttons)
   * "description"— tooltip supplements the accessible name (default)
   * "inaccessible"— tooltip is decorative only
   */
  relationship?: "label" | "description" | "inaccessible";
  positioning?: PositioningShorthand;
  /** Delay before showing tooltip, ms. Default 250 */
  showDelay?: number;
  /** Delay before hiding tooltip, ms. Default 250 */
  hideDelay?: number;
  withArrow?: boolean;
  /** Additional CSS class name(s) to apply to the root element */
  className?: string;
}

/**
 * Tooltip is a brief, non-interactive floating label appearing on hover or focus to clarify the purpose of a UI element. It is dismissed when the pointer moves away or focus leaves.
 *
 * **When to use:** Clarifying icon-only buttons, truncated text, or ambiguous controls. Particularly valuable for toolbar icons where adding a visible label would break the layout.
 * **When NOT to use:** Interactive content like links or buttons (use Popover). Essential information that should not be hidden from keyboard/touch users. Long explanations (use TeachingPopover or helper text).
 */
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({
  content,
  children,
  relationship = "description",
  positioning,
  showDelay = 250,
  hideDelay = 250,
  withArrow = true,
}: TooltipProps, ref) => {
  return (
    <FluentTooltip
      content={<>{content}</>}
      relationship={relationship}
      positioning={positioning}
      showDelay={showDelay}
      hideDelay={hideDelay}
      withArrow={withArrow}
    >
      {children}
    </FluentTooltip>
  );
}
);
Tooltip.displayName = "Tooltip";

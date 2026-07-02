/**
 * Popover — Floating content panel anchored to a trigger element
 *
 * Usage:
 *   import { Popover } from "../components/ui";
 *   <Popover
 *     trigger={<Button>Open</Button>}
 *     content={<p>Popover content here</p>}
 *   />
 *
 * Dependencies: @fluentui/react-components
 */

import React from "react";
import {
  Popover as FluentPopover,
  PopoverTrigger,
  PopoverSurface,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import type { PositioningShorthand } from "@fluentui/react-components";
import { DS_POPOVER_MAX_WIDTH } from "./CONSTANTS";

const useStyles = makeStyles({
  surface: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    padding: tokens.spacingVerticalM,
    maxWidth: DS_POPOVER_MAX_WIDTH,
  },
  header: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  body: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },
});

export interface PopoverProps {
  /** The element that triggers the popover */
  trigger: React.ReactElement;
  /** Popover content */
  content: React.ReactNode;
  /** Optional heading inside the popover */
  heading?: React.ReactNode;
  /** Controlled open state */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  positioning?: PositioningShorthand;
  /** Show an arrow pointing to the trigger. Default: true */
  withArrow?: boolean;
  /** Whether the popover traps focus (true = modal, false = non-modal). Default: false */
  trapFocus?: boolean;
  /** Close on outside click. Default: true */
  closeOnScroll?: boolean;
}

/**
 * Popover is a non-modal floating surface anchored to a trigger, displaying additional interactive content or controls on click. Unlike Tooltip, Popover can contain buttons, forms, and other interactive elements.
 *
 * **When to use:** Supplemental interactive content for a specific trigger — overflow menus, contextual action panels, mini forms, date pickers. Content that is secondary and anchored to an element.
 * **When NOT to use:** Simple text descriptions (use Tooltip). Content critical to the task that needs focus (use Dialog). Application navigation (use Menu or NavDrawer). Content the user needs to interact with simultaneously alongside the trigger.
 */
export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  ({
  trigger,
  content,
  heading,
  open,
  onOpenChange,
  positioning = "below-start",
  withArrow = true,
  trapFocus = false,
  closeOnScroll = false,
}: PopoverProps, ref) => {
  const styles = useStyles();

  const controlledProps =
    open !== undefined
      ? {
          open,
          onOpenChange: (_: React.SyntheticEvent | Event, data: { open: boolean }) =>
            onOpenChange?.(data.open),
        }
      : {};

  return (
    <FluentPopover
      withArrow={withArrow}
      trapFocus={trapFocus}
      closeOnScroll={closeOnScroll}
      positioning={positioning}
      {...controlledProps}
    >
      <PopoverTrigger disableButtonEnhancement>{trigger}</PopoverTrigger>
      <PopoverSurface>
        <div className={styles.surface}>
          {heading && <div className={styles.header}>{heading}</div>}
          <div className={styles.body}>{content}</div>
        </div>
      </PopoverSurface>
    </FluentPopover>
  );
}
);
Popover.displayName = "Popover";

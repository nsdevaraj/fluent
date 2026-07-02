/**
 * MessageBar — Inline persistent alert / notification banner
 *
 * Usage:
 *   import { MessageBar } from "../components/ui";
 *   <MessageBar intent="success" title="Saved!" onDismiss={() => setVisible(false)}>
 *     Your changes have been saved successfully.
 *   </MessageBar>
 *
 * Dependencies: @fluentui/react-components
 */

import React from "react";
import {
  MessageBar as FluentMessageBar,
  MessageBarTitle,
  MessageBarBody,
  MessageBarActions,
  MessageBarGroup as FluentMessageBarGroup,
} from "@fluentui/react-components";
import { Dismiss16Regular } from "@fluentui/react-icons";
import { Button } from "./Button";

export type MessageBarIntent = "info" | "success" | "warning" | "error";

export interface MessageBarAction {
  label: string;
  onClick: () => void;
}

export interface MessageBarProps {
  intent?: MessageBarIntent;
  /** Bold title line at the top of the message */
  title?: string;
  /** Message body content */
  children: React.ReactNode;
  /** Inline action buttons rendered inside the bar */
  actions?: MessageBarAction[];
  /** Called when the dismiss button is clicked */
  onDismiss?: () => void;
  /** Show the dismiss (×) button */
  dismissible?: boolean;
  /** Additional CSS class name(s) to apply to the root element */
  className?: string;
}

/**
 * MessageBar communicates important state or contextual information about the entire application or a specific surface. Information persists until the user performs a required action — it is not transient like a Toast.
 *
 * **When to use:** Persistent status information important enough to stay on screen until dismissed or acted upon — unsaved changes warnings, service degradation banners, feature info notes.
 *
 * **When NOT to use:** Brief transient notifications that auto-dismiss (use Toast). Very long message content (keep under 100 characters). Multiple unrelated messages (group related ones in a MessageBarGroup).
 */
export const MessageBar = React.forwardRef<HTMLDivElement, MessageBarProps>(
  ({
  intent = "info",
  title,
  children,
  actions = [],
  onDismiss,
  dismissible = false,
}: MessageBarProps, ref) => {
  const hasSideContent = dismissible || actions.length > 0;

  return (
    <FluentMessageBar intent={intent} layout="multiline">
      <MessageBarBody>
        {title && <MessageBarTitle>{title}</MessageBarTitle>}
        {children}
      </MessageBarBody>

      {hasSideContent && (
        <MessageBarActions
          containerAction={
            dismissible ? (
              <Button
                appearance="subtle"
                icon={<Dismiss16Regular />}
                aria-label="Dismiss"
                onClick={onDismiss}
                size="small"
              />
            ) : undefined
          }
        >
          {actions.map((action, i) => (
            <Button
              key={i}
              appearance="subtle"
              size="small"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </MessageBarActions>
      )}
    </FluentMessageBar>
  );
}
);
MessageBar.displayName = "MessageBar";

export interface MessageBarGroupProps {
  children: React.ReactNode;
  /** Animation for entering/exiting bars. Default: "both" */
  animate?: "both" | "exit-only";
  className?: string;
  style?: React.CSSProperties;
}

export const MessageBarGroup = React.forwardRef<HTMLDivElement, MessageBarGroupProps>(
  ({ children, animate = "both", className, style }, ref) => (
    <FluentMessageBarGroup ref={ref} animate={animate} className={className} style={style}>
      {children as React.ReactElement | React.ReactElement[]}
    </FluentMessageBarGroup>
  )
);
MessageBarGroup.displayName = "MessageBarGroup";

/**
 * Toast — Notification toast system with DSToaster provider and useToast hook
 *
 * Usage:
 *   // 1. Wrap your app (or a section) with DSToaster:
 *   <DSToaster />
 *
 *   // 2. In any child component, use the hook:
 *   const { showToast } = useToast();
 *   showToast({ title: "Saved!", intent: "success" });
 *
 * Dependencies: @fluentui/react-components
 */

import React from "react";
import {
  Toaster,
  useToastController,
  useId,
  Toast,
  ToastTitle,
  ToastBody,
  ToastFooter,
} from "@fluentui/react-components";
import type { ToastIntent } from "@fluentui/react-components";
import { Button } from "./Button";

// ─── Shared toaster ID ────────────────────────────────────────────────────────
const TOASTER_ID = "ds-toaster";

// ─── DSToaster provider ───────────────────────────────────────────────────────

export interface DSToasterProps {
  /** Position on screen. Default: "top-end" */
  position?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end";
  /** Max toasts visible at once. Default: 5 */
  limit?: number;
  /** Additional CSS class name(s) to apply to the root element */
  className?: string;
}

/**
 * Mount this once near the root of your app (inside FluentProvider).
 * All `useToast()` calls dispatch to this toaster.
 */
export const DSToaster = React.forwardRef<HTMLDivElement, DSToasterProps>(
  ({ position = "top-end", limit = 5 }: DSToasterProps, ref) => {
  return <Toaster toasterId={TOASTER_ID} position={position} limit={limit} />;
}
);
DSToaster.displayName = "DSToaster";
// ─── Toast action ─────────────────────────────────────────────────────────────

export interface ToastAction {
  label: string;
  onClick: () => void;
}

// ─── useToast hook ────────────────────────────────────────────────────────────

export interface ShowToastOptions {
  /** Toast heading */
  title: React.ReactNode;
  /** Optional body text */
  body?: React.ReactNode;
  intent?: ToastIntent;
  /** Auto-dismiss timeout in ms. Default: 4000 */
  timeout?: number;
  /** Footer action buttons */
  actions?: ToastAction[];
}

export interface UseToastReturn {
  showToast: (options: ShowToastOptions) => void;
  dismissToast: (toastId: string) => void;
  dismissAllToasts: () => void;
}

/**
 * Toast displays temporary, non-blocking notifications as a brief surface overlay. Uses an imperative API via the Toaster component and useToastController hook to dispatch notifications programmatically.
 *
 * **When to use:** Task status updates, progress notifications, non-critical error warnings, application update announcements. Best for transient messages that don't require immediate action and can auto-dismiss.
 *
 * **When NOT to use:** Critical confirmations requiring explicit user acknowledgment. Avoid rendering too many toasts at once or using different positions across the app.
 */
export function useToast(): UseToastReturn {
  const { dispatchToast, dismissToast, dismissAllToasts } =
    useToastController(TOASTER_ID);

  const showToast = React.useCallback(
    ({
      title,
      body,
      intent = "info",
      timeout = 4000,
      actions,
    }: ShowToastOptions) => {
      dispatchToast(
        <Toast>
          <ToastTitle>{title}</ToastTitle>
          {body && <ToastBody>{body}</ToastBody>}
          {actions && actions.length > 0 && (
            <ToastFooter>
              {actions.map((action) => (
                <Button
                  key={action.label}
                  appearance="subtle"
                  size="small"
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ))}
            </ToastFooter>
          )}
        </Toast>,
        { intent, timeout }
      );
    },
    [dispatchToast]
  );

  return {
    showToast,
    dismissToast,
    dismissAllToasts,
  };
}
DSToaster.displayName = "DSToaster";
useToast.displayName = "useToast";

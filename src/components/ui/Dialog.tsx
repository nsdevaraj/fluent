/**
 * Dialog — General-purpose modal with free body/actions composition.
 *
 * This is the full-featured Dialog (contrast with ConfirmDialog which is a
 * locked-down confirm/alert pattern). Use Dialog when you need to compose
 * arbitrary content — forms, media, multi-step flows, etc.
 *
 * Composable sub-components are also re-exported so consumers can use the
 * primitives directly if needed.
 *
 * Usage:
 *   import { Dialog } from "../components/ui";
 *   <Dialog
 *     open={open}
 *     onOpenChange={setOpen}
 *     title="Edit profile"
 *     actions={
 *       <>
 *         <Button appearance="primary" onClick={save}>Save</Button>
 *         <Button onClick={() => setOpen(false)}>Cancel</Button>
 *       </>
 *     }
 *   >
 *     <TextField label="Name" />
 *   </Dialog>
 *
 * Composable:
 *   import { DialogRoot, DialogTrigger, DialogSurface,
 *            DialogTitle, DialogBody, DialogContent, DialogActions } from "../components/ui";
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import {
  Dialog as FluentDialog,
  DialogTrigger as FluentDialogTrigger,
  DialogSurface as FluentDialogSurface,
  DialogTitle as FluentDialogTitle,
  DialogBody as FluentDialogBody,
  DialogContent as FluentDialogContent,
  DialogActions as FluentDialogActions,
  Button as FluentButton,
} from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";

// ── Re-exports for composable usage ──────────────────────────────────────────
export {
  FluentDialog      as DialogRoot,
  FluentDialogTrigger  as DialogTrigger,
  FluentDialogSurface  as DialogSurface,
  FluentDialogTitle    as DialogTitle,
  FluentDialogBody     as DialogBody,
  FluentDialogContent  as DialogContent,
  FluentDialogActions  as DialogActions,
};

// ── Data-driven Dialog ────────────────────────────────────────────────────────

export type DialogSize = "small" | "medium" | "large" | "max";
export type DialogModalType = "modal" | "non-modal" | "alert";

export interface DialogProps {
  /** Dialog open state */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Dialog title */
  title?: React.ReactNode;
  /** Body content */
  children?: React.ReactNode;
  /** Footer actions — renders inside DialogActions */
  actions?: React.ReactNode;
  /** Size of the dialog surface */
  size?: DialogSize;
  /** modal (default) | non-modal | alert (no close button, role="alertdialog") */
  modalType?: DialogModalType;
  /** Show the X close button in the title. Default true for modal/non-modal. */
  showCloseButton?: boolean;
  /** Optional trigger element (uncontrolled mode) */
  trigger?: React.ReactElement;
  className?: string;
  style?: React.CSSProperties;
  "aria-describedby"?: string;
}

/**
 * Dialog is a modal window that requires user attention before they can continue. It makes all content outside it inert and visually dimmed, enforcing focus on a critical decision or short focused task.
 *
 * **When to use:** Critical tasks requiring explicit confirmation before proceeding — destructive actions, authentication prompts, short focused forms that must complete before the user continues.
 * **When NOT to use:** Non-critical information (use MessageBar, Toast, or Tooltip). Complex multi-step workflows (use Drawer or a dedicated page). Stacking multiple dialogs. Confirming every small action.
 */
export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({
    open,
    onOpenChange,
    title,
    children,
    actions,
    size = "medium",
    modalType = "modal",
    showCloseButton = true,
    trigger,
    className,
    style,
    "aria-describedby": ariaDescribedBy,
  }: DialogProps, ref) => {
    return (
      <FluentDialog
        open={open}
        onOpenChange={(_e, data) => onOpenChange?.(data.open)}
        modalType={modalType}
      >
        {trigger ? (
          <FluentDialogTrigger disableButtonEnhancement>
            {trigger}
          </FluentDialogTrigger>
        ) : <></>}
        <FluentDialogSurface
          ref={ref}
          className={className}
          style={style}
          aria-describedby={ariaDescribedBy}
        >
          <FluentDialogBody>
            {title && (
              <FluentDialogTitle
                action={
                  showCloseButton && modalType !== "alert" ? (
                    <FluentDialogTrigger action="close" disableButtonEnhancement>
                      <FluentButton
                        appearance="subtle"
                        aria-label="Close dialog"
                        icon={<Dismiss24Regular />}
                      />
                    </FluentDialogTrigger>
                  ) : null
                }
              >
                {title}
              </FluentDialogTitle>
            )}
            {children && (
              <FluentDialogContent>
                {children}
              </FluentDialogContent>
            )}
            {actions && (
              <FluentDialogActions>
                {actions}
              </FluentDialogActions>
            )}
          </FluentDialogBody>
        </FluentDialogSurface>
      </FluentDialog>
    );
  }
);
Dialog.displayName = "Dialog";

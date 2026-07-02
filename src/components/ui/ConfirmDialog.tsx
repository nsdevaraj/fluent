/**
 * ConfirmDialog — Copy-paste ready confirm/alert dialog
 *
 * Usage:
 *   import { ConfirmDialog } from "./components/ui/ConfirmDialog";
 *
 *   const [open, setOpen] = useState(false);
 *   <Button onClick={() => setOpen(true)}>Delete</Button>
 *   <ConfirmDialog
 *     open={open}
 *     onOpenChange={setOpen}
 *     title="Delete project?"
 *     description="This action cannot be undone."
 *     confirmLabel="Delete"
 *     confirmAppearance="primary"
 *     onConfirm={() => handleDelete()}
 *   />
 *
 * Dependencies: @fluentui/react-components
 */

import React, { useEffect, useRef } from "react";
import {
  Dialog, DialogTrigger, DialogSurface, DialogTitle,
  DialogBody, DialogContent, DialogActions,
} from "@fluentui/react-components";
import { Button } from "./Button";

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Appearance of the confirm button */
  confirmAppearance?: "primary" | "secondary" | "subtle";
  onConfirm: () => void;
  /** Additional CSS class name(s) to apply to the root element */
  className?: string;
}

/**
 * ConfirmDialog is a pre-composed Dialog for confirmation prompts — a title, message, confirm button, and cancel button — providing a consistent pattern for irreversible or high-impact action confirmations.
 *
 * **When to use:** Confirming destructive or irreversible actions — delete, overwrite, permanent removal. Any action where an accidental click would have significant consequences.
 * **When NOT to use:** Informational alerts (use MessageBar or Toast). Non-destructive actions that don't require confirmation. Every small action — reserve for high-impact operations only.
 */
export const ConfirmDialog = React.forwardRef<HTMLDivElement, ConfirmDialogProps>(
  ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmAppearance = "primary",
  onConfirm,
}: ConfirmDialogProps, ref) => {
  // Capture the element that had focus before the dialog opened so we can
  // return focus to it when the dialog closes (WCAG 2.1 SC 2.4.3).
  const returnFocusRef = useRef<Element | null>(null);

  useEffect(() => {
    if (open) {
      returnFocusRef.current = document.activeElement;
    } else if (returnFocusRef.current instanceof HTMLElement) {
      returnFocusRef.current.focus();
      returnFocusRef.current = null;
    }
  }, [open]);

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(_, data) => onOpenChange(data.open)}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogContent>{description}</DialogContent>}
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">{cancelLabel}</Button>
            </DialogTrigger>
            <Button appearance={confirmAppearance} onClick={handleConfirm}>
              {confirmLabel}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
);
ConfirmDialog.displayName = "ConfirmDialog";

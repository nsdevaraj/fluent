/**
 * Drawer — Side panel (overlay) with header, body, and footer slots
 *
 * Usage:
 *   import { Drawer } from "../components/ui";
 *   <Drawer
 *     open={open}
 *     onClose={() => setOpen(false)}
 *     title="Edit Profile"
 *     footer={<Button appearance="primary">Save</Button>}
 *   >
 *     <p>Drawer content here</p>
 *   </Drawer>
 *
 * Dependencies: @fluentui/react-components, DS Button
 */

import React from "react";
import {
  OverlayDrawer,
  InlineDrawer,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerBody,
  DrawerFooter,
  Button as FluentButton,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  subtitle: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    marginTop: tokens.spacingVerticalXS,
  },
  body: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: tokens.spacingVerticalM,
    gap: tokens.spacingVerticalM,
    overflowY: "auto",
  },
  footer: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    justifyContent: "flex-end",
    padding: tokens.spacingVerticalM,
    borderTopWidth: tokens.strokeWidthThin,
    borderTopStyle: "solid",
    borderTopColor: tokens.colorNeutralStroke1,
  },
});

export type DrawerType = "overlay" | "inline";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  /** Subtitle below the title */
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  /** Footer content (typically action buttons) */
  footer?: React.ReactNode;
  position?: "start" | "end" | "bottom";
  size?: "small" | "medium" | "large" | "full";
  /** Whether clicking the overlay backdrop closes the drawer. Default: true */
  modalType?: "modal" | "non-modal" | "alert";
  /** Render as an overlay drawer (default) or an inline drawer */
  type?: DrawerType;
}

/**
 * Drawer is a panel that slides in from the screen edge, retaining context of the underlying page. OverlayDrawer dims the page (Dialog-based); InlineDrawer renders alongside content as a persistent side panel.
 *
 * **When to use:** Supplemental content where retaining page context is beneficial — settings panels, filter configs, detail views, secondary workflows.
 * **When NOT to use:** Critical blocking actions requiring full attention (use Dialog). Very small content that fits in a Popover. Triggering Drawers from within other Drawers.
 */
export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  ({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  position = "end",
  size = "medium",
  modalType = "modal",
  type = "overlay",
}: DrawerProps, ref) => {
  const styles = useStyles();

  const drawerContent = (
    <>
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <FluentButton
              appearance="subtle"
              aria-label="Close"
              icon={<Dismiss24Regular />}
              onClick={onClose}
            />
          }
        >
          {title}
        </DrawerHeaderTitle>
        {subtitle && (
          <div className={styles.subtitle}>{subtitle}</div>
        )}
      </DrawerHeader>

      <DrawerBody className={styles.body}>{children}</DrawerBody>

      {footer && <DrawerFooter className={styles.footer}>{footer}</DrawerFooter>}
    </>
  );

  if (type === "inline") {
    return (
      <InlineDrawer
        open={open}
        position={position}
        size={size}
      >
        {drawerContent}
      </InlineDrawer>
    );
  }

  return (
    <OverlayDrawer
      open={open}
      onOpenChange={(_, data) => {
        if (!data.open) onClose();
      }}
      position={position}
      size={size}
      modalType={modalType}
    >
      {drawerContent}
    </OverlayDrawer>
  );
}
);
Drawer.displayName = "Drawer";

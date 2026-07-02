/**
 * Breadcrumb — Navigation trail showing the current page hierarchy.
 *
 * Wraps Fluent UI v9 Breadcrumb primitives. Supports:
 *  - Data-driven (pass an array of items)
 *  - Composable (use BreadcrumbRoot, BreadcrumbItem, BreadcrumbBtn, BreadcrumbLink, BreadcrumbDivider)
 *  - Automatic truncation of long labels
 *  - RTL (Fluent handles chevron direction)
 *  - High contrast (Fluent primitives)
 *
 * Usage:
 *   import { Breadcrumb } from "../components/ui";
 *   <Breadcrumb
 *     items={[
 *       { id: "home", label: "Home", href: "/" },
 *       { id: "projects", label: "Projects", href: "/projects" },
 *       { id: "current", label: "Design System", current: true },
 *     ]}
 *   />
 *
 * Composable:
 *   import { BreadcrumbRoot, BreadcrumbItem, BreadcrumbBtn, BreadcrumbDivider } from "../components/ui";
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import {
  Breadcrumb as FluentBreadcrumb,
  BreadcrumbItem as FluentBreadcrumbItem,
  BreadcrumbButton as FluentBreadcrumbButton,
  BreadcrumbDivider as FluentBreadcrumbDivider,
} from "@fluentui/react-components";

// ── Re-exports ────────────────────────────────────────────────────────────────
export {
  FluentBreadcrumb      as BreadcrumbRoot,
  FluentBreadcrumbItem  as BreadcrumbItem,
  FluentBreadcrumbButton as BreadcrumbBtn,
  FluentBreadcrumbDivider as BreadcrumbDivider,
};

// ── Data-driven types ─────────────────────────────────────────────────────────

export interface BreadcrumbItemDef {
  id: string;
  label: React.ReactNode;
  /** URL — renders as anchor when provided */
  href?: string;
  /** Click handler for SPA navigation */
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  /** Mark this item as the current page (aria-current="page") */
  current?: boolean;
  icon?: React.ReactElement;
}

export type BreadcrumbSize = "small" | "medium";

export interface BreadcrumbProps {
  items: BreadcrumbItemDef[];
  size?: BreadcrumbSize;
  /** aria-label for the breadcrumb nav landmark */
  "aria-label"?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Breadcrumb is a navigation aid showing the user's current location within a hierarchy and providing links to parent levels. Rendered as a horizontal trail of links separated by dividers.
 *
 * **When to use:** Applications with deep hierarchies (3+ levels) — file explorers, category drill-downs, settings trees. When users need to orient themselves and navigate upward.
 * **When NOT to use:** Flat navigation with only 1–2 levels. Primary navigation (use NavMenu or Tabs). Single-page apps with no real page hierarchy. The root/home page itself.
 */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({
    items,
    size = "medium",
    "aria-label": ariaLabel = "Breadcrumb",
    className,
    style,
  }: BreadcrumbProps, ref) => {
    return (
      <FluentBreadcrumb
        ref={ref as React.Ref<HTMLDivElement>}
        size={size}
        aria-label={ariaLabel}
        className={className}
        style={style}
      >
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <FluentBreadcrumbItem>
              <FluentBreadcrumbButton
                href={item.href}
                onClick={item.onClick as React.MouseEventHandler<HTMLButtonElement>}
                current={item.current}
                icon={item.icon}
                aria-current={item.current ? "page" : undefined}
              >
                {item.label}
              </FluentBreadcrumbButton>
            </FluentBreadcrumbItem>
            {index < items.length - 1 && (
              <FluentBreadcrumbDivider aria-hidden="true" />
            )}
          </React.Fragment>
        ))}
      </FluentBreadcrumb>
    );
  }
);
Breadcrumb.displayName = "Breadcrumb";

/**
 * Link — Accessible inline hyperlink with visited, external, and disabled states.
 *
 * Wraps Fluent UI v9 `Link` with DS constraints:
 *  - `inline` prop defaults to true for text-flow usage
 *  - `external` automatically adds aria-label suffix and opens in new tab
 *  - Disabled state sets `aria-disabled` and blocks navigation
 *  - Full RTL support via Fluent primitives
 *
 * Usage:
 *   import { Link } from "../components/ui";
 *   <Link href="/dashboard">Go to Dashboard</Link>
 *   <Link href="https://example.com" external>External site</Link>
 *   <Link disabled>Disabled link</Link>
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import { Link as FluentLink } from "@fluentui/react-components";

export type LinkAppearance = "default" | "subtle";

export interface LinkProps {
  /** URL to navigate to */
  href?: string;
  /** Render inline (within text flow). Defaults true. */
  inline?: boolean;
  /** Opens in new tab and appends external aria label hint */
  external?: boolean;
  /** Prevents navigation and renders as disabled */
  disabled?: boolean;
  /** Visual appearance */
  appearance?: LinkAppearance;
  /** Click handler (use instead of href for SPA navigation) */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

/**
 * Link renders as an anchor element for navigation to a URL or as an inline textual action following hyperlink conventions — visually distinguished by color and optional underline.
 *
 * **When to use:** Actions that result in navigation to a new page or URL. Inline textual actions within a paragraph of body copy where a button would be visually disruptive. Use the `inline` prop when inside running text.
 * **When NOT to use:** Actions that trigger operations rather than navigation (use a subtle/transparent Button). Primary call-to-action on a surface (use Button). Bulk or destructive actions.
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({
    href,
    inline = true,
    external = false,
    disabled = false,
    appearance = "default",
    onClick,
    children,
    className,
    style,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
  }: LinkProps, ref) => {
    const target = external ? "_blank" : undefined;
    const rel = external ? "noopener noreferrer" : undefined;
    const externalLabel = external && !ariaLabel
      ? `${typeof children === "string" ? children + " " : ""}(opens in new tab)`
      : ariaLabel;

    return (
      <FluentLink
        ref={ref}
        href={disabled ? undefined : href}
        inline={inline}
        disabled={disabled}
        appearance={appearance === "subtle" ? "subtle" : undefined}
        target={target}
        rel={rel}
        onClick={disabled ? undefined : onClick}
        className={className}
        style={style}
        aria-label={external ? externalLabel : ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-disabled={disabled || undefined}
      >
        {children}
      </FluentLink>
    );
  }
);
Link.displayName = "Link";

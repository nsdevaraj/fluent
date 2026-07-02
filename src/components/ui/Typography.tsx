/**
 * Typography primitives — Heading, Body, Caption, Label
 *
 * All consume the typography token system from Phase 1.
 * Never hardcode font values — always use these components.
 *
 * Usage:
 *   import { Heading, Body, Caption, DSLabel } from "../components/ui";
 *   <Heading level={1}>Page Title</Heading>
 *   <Body weight="semibold" color="brand">Bold brand text</Body>
 *   <Caption>12px muted caption</Caption>
 *   <DSLabel required>Field label</DSLabel>
 */
import React from "react";
import { makeStyles, tokens, mergeClasses } from "@fluentui/react-components";
import {
  Display as FluentDisplay,
  LargeTitle as FluentLargeTitle,
  Title1 as FluentTitle1,
  Title2 as FluentTitle2,
  Title3 as FluentTitle3,
  Subtitle1 as FluentSubtitle1,
  Subtitle2 as FluentSubtitle2,
  Subtitle2Stronger as FluentSubtitle2Stronger,
  Body1Strong as FluentBody1Strong,
  Body1Stronger as FluentBody1Stronger,
  Body2 as FluentBody2,
  Caption1Strong as FluentCaption1Strong,
  Caption1Stronger as FluentCaption1Stronger,
  Caption2 as FluentCaption2,
  Caption2Strong as FluentCaption2Strong,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  // Heading levels
  h1: { fontSize: tokens.fontSizeBase600, fontWeight: tokens.fontWeightSemibold, lineHeight: tokens.lineHeightBase600, margin: 0 },
  h2: { fontSize: tokens.fontSizeBase500, fontWeight: tokens.fontWeightSemibold, lineHeight: tokens.lineHeightBase500, margin: 0 },
  h3: { fontSize: tokens.fontSizeBase400, fontWeight: tokens.fontWeightSemibold, lineHeight: tokens.lineHeightBase400, margin: 0 },
  h4: { fontSize: tokens.fontSizeBase300, fontWeight: tokens.fontWeightSemibold, lineHeight: tokens.lineHeightBase300, margin: 0 },

  // Body
  bodyBase:     { fontSize: tokens.fontSizeBase300, lineHeight: tokens.lineHeightBase300 },
  bodySm:       { fontSize: tokens.fontSizeBase200, lineHeight: tokens.lineHeightBase200 },

  // Caption
  caption:      { fontSize: tokens.fontSizeBase100, lineHeight: tokens.lineHeightBase100 },

  // Weights
  regular:      { fontWeight: tokens.fontWeightRegular },
  medium:       { fontWeight: tokens.fontWeightMedium },
  semibold:     { fontWeight: tokens.fontWeightSemibold },
  bold:         { fontWeight: tokens.fontWeightBold },

  // Colors
  colorDefault: { color: tokens.colorNeutralForeground1 },
  colorMuted:   { color: tokens.colorNeutralForeground2 },
  colorSubtle:  { color: tokens.colorNeutralForeground3 },
  colorBrand:   { color: tokens.colorBrandForeground1 },
  colorSuccess: { color: tokens.colorStatusSuccessForeground1 },
  colorWarning: { color: tokens.colorStatusWarningForeground1 },
  colorDanger:  { color: tokens.colorStatusDangerForeground1 },
  colorInherit: { color: "inherit" },

  // Utilities
  truncate:     { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  block:        { display: "block" },
});

type TextWeight = "regular" | "medium" | "semibold" | "bold";
type TextColor  = "default" | "muted" | "subtle" | "brand" | "success" | "warning" | "danger" | "inherit";

// ── Heading ───────────────────────────────────────────────────────────────────
export interface HeadingProps {
  level?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  color?: TextColor;
  truncate?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

/**
 * Typography provides a set of pre-configured text components (Display, LargeTitle, Title1–Title3, Subtitle1–Subtitle2, Body1–Body2, Caption1–Caption2) that apply Fluent's type ramp tokens consistently.
 *
 * **When to use:** Any text content in the application. Use the appropriate variant to establish visual hierarchy — Display for hero text, Body1/Body2 for content, Caption for metadata.
 * **When NOT to use:** Do not use arbitrary font sizes or weights outside the type ramp — always pick the closest Typography variant to maintain design consistency.
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({
  level = 2,
  children,
  color = "default",
  truncate: shouldTruncate,
  className,
  as,
}: HeadingProps, ref) => {
  const styles = useStyles();
  const sizeClass = styles[`h${level}` as keyof typeof styles] as string;
  const colorClass = styles[`color${color.charAt(0).toUpperCase() + color.slice(1)}` as keyof typeof styles] as string;

  const Tag = (as ?? `h${level}`) as keyof JSX.IntrinsicElements;
  return (
    <Tag
      className={mergeClasses(
        sizeClass,
        colorClass,
        shouldTruncate ? styles.truncate : undefined,
        className
      )}
    >
      {children}
    </Tag>
  );
}
);
Heading.displayName = "Heading";
// ── Body ──────────────────────────────────────────────────────────────────────
export interface BodyProps {
  size?: "base" | "sm";
  weight?: TextWeight;
  color?: TextColor;
  truncate?: boolean;
  block?: boolean;
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "div" | "li";
}

export function Body({
  size = "base",
  weight = "regular",
  color = "default",
  truncate: shouldTruncate,
  block: isBlock,
  children,
  className,
  as = "p",
}: BodyProps) {
  const styles = useStyles();
  const colorClass = styles[`color${color.charAt(0).toUpperCase() + color.slice(1)}` as keyof typeof styles] as string;
  const Tag = as as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={mergeClasses(
        size === "sm" ? styles.bodySm : styles.bodyBase,
        styles[weight],
        colorClass,
        shouldTruncate ? styles.truncate : undefined,
        isBlock ? styles.block : undefined,
        className
      )}
    >
      {children}
    </Tag>
  );
}

// ── Caption ───────────────────────────────────────────────────────────────────
export interface CaptionProps {
  weight?: TextWeight;
  color?: TextColor;
  children: React.ReactNode;
  className?: string;
  as?: "span" | "p" | "div";
}

export function Caption({
  weight = "regular",
  color = "muted",
  children,
  className,
  as = "span",
}: CaptionProps) {
  const styles = useStyles();
  const colorClass = styles[`color${color.charAt(0).toUpperCase() + color.slice(1)}` as keyof typeof styles] as string;
  const Tag = as as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={mergeClasses(styles.caption, styles[weight], colorClass, className)}
    >
      {children}
    </Tag>
  );
}

// ── DSLabel (prefixed to avoid collision with Fluent's Label) ─────────────────
export interface DSLabelProps {
  required?: boolean;
  disabled?: boolean;
  weight?: TextWeight;
  color?: TextColor;
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}

export function DSLabel({
  required,
  disabled,
  weight = "semibold",
  color = "default",
  children,
  htmlFor,
  className,
}: DSLabelProps) {
  const styles = useStyles();
  const colorClass = disabled
    ? styles.colorSubtle
    : (styles[`color${color.charAt(0).toUpperCase() + color.slice(1)}` as keyof typeof styles] as string);

  return (
    <label
      htmlFor={htmlFor}
      className={mergeClasses(styles.bodySm, styles[weight], colorClass, className)}
    >
      {children}
      {required && (
        <span style={{ color: tokens.colorStatusDangerForeground1, marginInlineStart: tokens.spacingHorizontalXXS }}>
          *
        </span>
      )}
    </label>
  );
}
Heading.displayName = "Heading";
Body.displayName = "Body";
Caption.displayName = "Caption";
DSLabel.displayName = "DSLabel";

// ── Extended Fluent Text Scales ─────────────────────────────────────────────
// These map 1:1 to Fluent's named text components.
// Use Display/LargeTitle for hero content, Title1-3 for section headers,
// Subtitle1-2 for sub-headers, and the Strong/Stronger variants for emphasis.

export type FluentTextScaleAs = "pre" | "b" | "em" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "i" | "p" | "span" | "strong";

export interface FluentTextScaleProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: FluentTextScaleAs;
}

export const Display: React.FC<FluentTextScaleProps> = ({ children, className, style, as }) =>
  <FluentDisplay className={className} style={style} as={as}>{children}</FluentDisplay>;
Display.displayName = "Display";

export const LargeTitle: React.FC<FluentTextScaleProps> = ({ children, className, style, as }) =>
  <FluentLargeTitle className={className} style={style} as={as}>{children}</FluentLargeTitle>;
LargeTitle.displayName = "LargeTitle";

export const Title1: React.FC<FluentTextScaleProps> = ({ children, className, style, as }) =>
  <FluentTitle1 className={className} style={style} as={as}>{children}</FluentTitle1>;
Title1.displayName = "Title1";

export const Title2: React.FC<FluentTextScaleProps> = ({ children, className, style, as }) =>
  <FluentTitle2 className={className} style={style} as={as}>{children}</FluentTitle2>;
Title2.displayName = "Title2";

export const Title3: React.FC<FluentTextScaleProps> = ({ children, className, style, as }) =>
  <FluentTitle3 className={className} style={style} as={as}>{children}</FluentTitle3>;
Title3.displayName = "Title3";

export const Subtitle1: React.FC<FluentTextScaleProps> = ({ children, className, style, as }) =>
  <FluentSubtitle1 className={className} style={style} as={as}>{children}</FluentSubtitle1>;
Subtitle1.displayName = "Subtitle1";

export const Subtitle2: React.FC<FluentTextScaleProps> = ({ children, className, style, as }) =>
  <FluentSubtitle2 className={className} style={style} as={as}>{children}</FluentSubtitle2>;
Subtitle2.displayName = "Subtitle2";

export const Subtitle2Stronger: React.FC<FluentTextScaleProps> = ({ children, className, style, as }) =>
  <FluentSubtitle2Stronger className={className} style={style} as={as}>{children}</FluentSubtitle2Stronger>;
Subtitle2Stronger.displayName = "Subtitle2Stronger";

export const Body1Strong: React.FC<FluentTextScaleProps> = ({ children, className, style, as }) =>
  <FluentBody1Strong className={className} style={style} as={as}>{children}</FluentBody1Strong>;
Body1Strong.displayName = "Body1Strong";

export const Body1Stronger: React.FC<FluentTextScaleProps> = ({ children, className, style, as }) =>
  <FluentBody1Stronger className={className} style={style} as={as}>{children}</FluentBody1Stronger>;
Body1Stronger.displayName = "Body1Stronger";

export const Body2: React.FC<FluentTextScaleProps> = ({ children, className, style, as }) =>
  <FluentBody2 className={className} style={style} as={as}>{children}</FluentBody2>;
Body2.displayName = "Body2";

export const Caption1Strong: React.FC<FluentTextScaleProps> = ({ children, className, style, as }) =>
  <FluentCaption1Strong className={className} style={style} as={as}>{children}</FluentCaption1Strong>;
Caption1Strong.displayName = "Caption1Strong";

export const Caption1Stronger: React.FC<FluentTextScaleProps> = ({ children, className, style, as }) =>
  <FluentCaption1Stronger className={className} style={style} as={as}>{children}</FluentCaption1Stronger>;
Caption1Stronger.displayName = "Caption1Stronger";

export const Caption2: React.FC<FluentTextScaleProps> = ({ children, className, style, as }) =>
  <FluentCaption2 className={className} style={style} as={as}>{children}</FluentCaption2>;
Caption2.displayName = "Caption2";

export const Caption2Strong: React.FC<FluentTextScaleProps> = ({ children, className, style, as }) =>
  <FluentCaption2Strong className={className} style={style} as={as}>{children}</FluentCaption2Strong>;
Caption2Strong.displayName = "Caption2Strong";

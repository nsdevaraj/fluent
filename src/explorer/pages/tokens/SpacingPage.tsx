import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Heading, Body, Caption } from "../../../components/ui/Typography";
import { Tag } from "../../../components/ui/Tag";
import { Divider } from "../../../components/ui/Divider";

const useStyles = makeStyles({
  root: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXXL, maxWidth: "900px" },
  section: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalL },
  scaleList: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS },
  scaleRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
  },
  rowMeta: { minWidth: "200px", display: "flex", flexDirection: "column", gap: "2px", flexShrink: 0 },
  bar: {
    height: "24px",
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusSmall,
    minWidth: "4px",
    opacity: "0.7",
  },
  rowValue: { marginInlineStart: tokens.spacingHorizontalXS, minWidth: "40px" },
  // Border radius preview box
  radiusBox: {
    width: "48px",
    height: "48px",
    backgroundColor: tokens.colorBrandBackground,
    opacity: "0.75",
    flexShrink: 0,
  },
  // Stroke width preview line
  strokeLine: {
    width: "120px",
    backgroundColor: tokens.colorNeutralForeground1,
    flexShrink: 0,
    borderRadius: tokens.borderRadiusSmall,
  },
});

const BORDER_RADIUS = [
  { name: "None", token: "borderRadiusNone", px: "0px", usage: "Sharp corners — data tables, inline code blocks" },
  { name: "Small", token: "borderRadiusSmall", px: "2px", usage: "Badges, tags, compact controls" },
  { name: "Medium", token: "borderRadiusMedium", px: "4px", usage: "Buttons, inputs, select controls (default)" },
  { name: "Large", token: "borderRadiusLarge", px: "6px", usage: "Cards, panels, popovers" },
  { name: "XLarge", token: "borderRadiusXLarge", px: "8px", usage: "Modals, drawers, large surfaces" },
  { name: "Circular", token: "borderRadiusCircular", px: "10000px", usage: "Avatars, circular icon buttons, pills" },
];

const BORDER_RADIUS_PX = [0, 2, 4, 6, 8, 48];

const STROKE_WIDTHS = [
  { name: "Thin", token: "strokeWidthThin", px: "1px", usage: "Default borders, dividers, focus rings" },
  { name: "Thick", token: "strokeWidthThick", px: "2px", usage: "Focus ring emphasis, selected borders" },
  { name: "Thicker", token: "strokeWidthThicker", px: "3px", usage: "High-contrast borders, active indicators" },
  { name: "Thickest", token: "strokeWidthThickest", px: "4px", usage: "Strong emphasis borders, error states" },
];

const STROKE_PX = [1, 2, 3, 4];

const SPACING = [
  { name: "xxs", vertical: tokens.spacingVerticalXXS, horizontal: tokens.spacingHorizontalXXS, px: "2px", usage: "Icon gaps, tight inline spacing" },
  { name: "xs", vertical: tokens.spacingVerticalXS, horizontal: tokens.spacingHorizontalXS, px: "4px", usage: "Compact list item gaps" },
  { name: "s", vertical: tokens.spacingVerticalS, horizontal: tokens.spacingHorizontalS, px: "6px", usage: "Button icon gap, badge padding" },
  { name: "m", vertical: tokens.spacingVerticalM, horizontal: tokens.spacingHorizontalM, px: "8px", usage: "Default item padding, nav item padding" },
  { name: "l", vertical: tokens.spacingVerticalL, horizontal: tokens.spacingHorizontalL, px: "12px", usage: "Card padding, section gaps" },
  { name: "xl", vertical: tokens.spacingVerticalXL, horizontal: tokens.spacingHorizontalXL, px: "16px", usage: "Page section gaps, form field spacing" },
  { name: "xxl", vertical: tokens.spacingVerticalXXL, horizontal: tokens.spacingHorizontalXXL, px: "20px", usage: "Major section breaks, page-level gaps" },
  { name: "xxxl", vertical: tokens.spacingVerticalXXXL, horizontal: tokens.spacingHorizontalXXXL, px: "24px", usage: "Page header padding, hero sections" },
];

const SCALE_PX = [2, 4, 6, 8, 12, 16, 20, 24];

export function SpacingPage() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <PageHeader
        title="Spacing"
        description="Spacing, border radius, and stroke width tokens — the geometric foundation of the design system."
        breadcrumbs={["Design System", "Design Tokens", "Spacing"]}
      />

      <div className={styles.section}>
        <div>
          <Heading level={2}>Vertical Spacing Scale</Heading>
          <Body size="sm" color="subtle">Use <code>tokens.spacingVertical*</code> for top/bottom padding, margin, and vertical gap values.</Body>
        </div>
        <div className={styles.scaleList}>
          {SPACING.map(({ name, vertical, px, usage }, i) => (
            <div key={name} className={styles.scaleRow}>
              <div className={styles.rowMeta}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <Tag appearance="brand" size="extra-small">{name}</Tag>
                  <Caption>spacingVertical{name.toUpperCase()}</Caption>
                </div>
                <Caption color="subtle">{usage}</Caption>
              </div>
              <div className={styles.bar} style={{ width: `${SCALE_PX[i] * 4}px` }} aria-hidden="true" />
              <Caption className={styles.rowValue}>{px}</Caption>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      <div className={styles.section}>
        <div>
          <Heading level={2}>Horizontal Spacing Scale</Heading>
          <Body size="sm" color="subtle">Use <code>tokens.spacingHorizontal*</code> for left/right padding, margin, and horizontal gap values. Both scales share the same step values.</Body>
        </div>
        <div className={styles.scaleList}>
          {SPACING.map(({ name, horizontal, px, usage }, i) => (
            <div key={name} className={styles.scaleRow}>
              <div className={styles.rowMeta}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <Tag appearance="outline" size="extra-small">{name}</Tag>
                  <Caption>spacingHorizontal{name.toUpperCase()}</Caption>
                </div>
                <Caption color="subtle">{usage}</Caption>
              </div>
              <div className={styles.bar} style={{ width: `${SCALE_PX[i] * 4}px` }} aria-hidden="true" />
              <Caption className={styles.rowValue}>{px}</Caption>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── Border Radius ─────────────────────────────────────────────────── */}
      <div className={styles.section}>
        <div>
          <Heading level={2}>Border Radius</Heading>
          <Body size="sm" color="subtle">Use <code>tokens.borderRadius*</code> to control corner rounding. Choose based on component size and surface type.</Body>
        </div>
        <div className={styles.scaleList}>
          {BORDER_RADIUS.map(({ name, token, px, usage }, i) => (
            <div key={token} className={styles.scaleRow}>
              <div className={styles.rowMeta}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <Tag appearance="brand" size="extra-small">{name}</Tag>
                  <Caption>{token}</Caption>
                </div>
                <Caption color="subtle">{usage}</Caption>
              </div>
              <div
                className={styles.radiusBox}
                style={{ borderRadius: `${BORDER_RADIUS_PX[i]}px` }}
                aria-hidden="true"
              />
              <Caption className={styles.rowValue}>{px}</Caption>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── Stroke Width ──────────────────────────────────────────────────── */}
      <div className={styles.section}>
        <div>
          <Heading level={2}>Stroke Width</Heading>
          <Body size="sm" color="subtle">Use <code>tokens.strokeWidth*</code> for borders, dividers, and focus rings. Never use hardcoded pixel values for stroke widths.</Body>
        </div>
        <div className={styles.scaleList}>
          {STROKE_WIDTHS.map(({ name, token, px, usage }, i) => (
            <div key={token} className={styles.scaleRow}>
              <div className={styles.rowMeta}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <Tag appearance="outline" size="extra-small">{name}</Tag>
                  <Caption>{token}</Caption>
                </div>
                <Caption color="subtle">{usage}</Caption>
              </div>
              <div
                className={styles.strokeLine}
                style={{ height: `${STROKE_PX[i]}px` }}
                aria-hidden="true"
              />
              <Caption className={styles.rowValue}>{px}</Caption>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

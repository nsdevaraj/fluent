import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Card } from "../../../components/ui/Card";
import { Heading, Body, Caption } from "../../../components/ui/Typography";
import { Divider } from "../../../components/ui/Divider";
import { Tag } from "../../../components/ui/Tag";
import { ribbonColorsLight, ribbonColorsDark } from "../../../tokens/ribbonColors";
import { dataVizColorsLight, dataVizColorsDark } from "../../../tokens/dataVizColors";

const useStyles = makeStyles({
  root: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXXL, maxWidth: "1100px" },
  section: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalL },

  // ── Section header row ────────────────────────────────────────────────────
  sectionHeader: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXS },

  // ── Palette card wrapper ──────────────────────────────────────────────────
  paletteCard: {
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  paletteCardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
  },
  paletteCardMeta: { display: "flex", flexDirection: "column", gap: "2px" },

  // ── Brand ramp ────────────────────────────────────────────────────────────
  brandGrid: {
    display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: tokens.spacingHorizontalXS,
    "@media (max-width: 700px)": { gridTemplateColumns: "repeat(4, 1fr)" },
  },
  brandSwatch: {
    display: "flex", flexDirection: "column",
    borderRadius: tokens.borderRadiusMedium,
    overflow: "hidden",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  brandSwatchColor: { height: "52px" },
  brandSwatchLabel: {
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalXS}`,
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex", flexDirection: "column", gap: "1px",
  },

  // ── Semantic cards ────────────────────────────────────────────────────────
  semanticGrid: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: tokens.spacingHorizontalM,
    "@media (max-width: 800px)": { gridTemplateColumns: "repeat(2, 1fr)" },
  },
  semanticInner: {
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
    display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXS,
  },
  semanticSwatch: { height: "44px", borderRadius: tokens.borderRadiusMedium, marginBottom: tokens.spacingVerticalXS },
  tokenChip: { display: "flex", alignItems: "center", gap: tokens.spacingHorizontalXS, marginTop: "2px" },
  colorDot: {
    width: "10px", height: "10px", borderRadius: "50%", flexShrink: 0,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },

  // ── Neutral scale ─────────────────────────────────────────────────────────
  neutralGrid: {
    display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: tokens.spacingHorizontalXS,
    "@media (max-width: 600px)": { gridTemplateColumns: "repeat(3, 1fr)" },
  },
  neutralSwatch: {
    display: "flex", flexDirection: "column",
    borderRadius: tokens.borderRadiusMedium, overflow: "hidden",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  neutralLabel: {
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalXS}`,
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex", flexDirection: "column", gap: "1px",
  },

  // ── Ribbon icon ───────────────────────────────────────────────────────────
  ribbonGrid: {
    display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: tokens.spacingHorizontalS,
    "@media (max-width: 600px)": { gridTemplateColumns: "1fr" },
  },
  ribbonRow: {
    display: "flex", alignItems: "center", gap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  ribbonSwatches: { display: "flex", gap: "4px", flexShrink: 0 },
  ribbonSwatch: {
    width: "36px", height: "36px",
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  ribbonMeta: { display: "flex", flexDirection: "column", gap: "2px", flex: 1, minWidth: 0 },

  // ── Data viz: 40-slot grid ────────────────────────────────────────────────
  slotGrid: {
    display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: tokens.spacingHorizontalXS,
    "@media (max-width: 700px)": { gridTemplateColumns: "repeat(5, 1fr)" },
  },
  slot: {
    display: "flex", flexDirection: "column",
    borderRadius: tokens.borderRadiusMedium, overflow: "hidden",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  slotLabel: {
    padding: "3px 5px",
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex", flexDirection: "column", gap: "0px",
  },

  // ── Data viz: sequential / diverging swatch rows ──────────────────────────
  seqRow: {
    display: "flex", gap: "3px",
  },
  seqCell: {
    flex: 1,
    display: "flex", flexDirection: "column",
    borderRadius: tokens.borderRadiusSmall, overflow: "hidden",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  seqLabel: {
    padding: "3px 4px",
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex", flexDirection: "column", gap: "0px",
  },

  // ── Alert colors ──────────────────────────────────────────────────────────
  alertRow: {
    display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: tokens.spacingHorizontalXS,
    "@media (max-width: 600px)": { gridTemplateColumns: "repeat(4, 1fr)" },
  },
  alertCell: {
    display: "flex", flexDirection: "column",
    borderRadius: tokens.borderRadiusMedium, overflow: "hidden",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  alertPair: { display: "flex" },
  alertHalf: { height: "44px", flex: 1 },
  alertLabel: {
    padding: "3px 5px",
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex", flexDirection: "column", gap: "0px",
  },

  // ── Transparency slots ────────────────────────────────────────────────────
  transpGrid: {
    display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: tokens.spacingHorizontalXS,
    "@media (max-width: 700px)": { gridTemplateColumns: "repeat(5, 1fr)" },
  },
  transpCell: {
    display: "flex", flexDirection: "column",
    borderRadius: tokens.borderRadiusMedium, overflow: "hidden",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  transpLabel: {
    padding: "3px 5px",
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex", flexDirection: "column",
  },
});

// ── Data ──────────────────────────────────────────────────────────────────

const BRAND_SHADES = [
  { shade: 10, hex: "#001919" }, { shade: 20, hex: "#012826" },
  { shade: 30, hex: "#01322E" }, { shade: 40, hex: "#033F38" },
  { shade: 50, hex: "#054D43" }, { shade: 60, hex: "#0A5C50" },
  { shade: 70, hex: "#0C695A" }, { shade: 80, hex: "#117865" },
  { shade: 90, hex: "#1F937E" }, { shade: 100, hex: "#2AAC94" },
  { shade: 110, hex: "#3ABB9F" }, { shade: 120, hex: "#52C7AA" },
  { shade: 130, hex: "#78D3B9" }, { shade: 140, hex: "#9EE0CB" },
  { shade: 150, hex: "#C0ECDD" }, { shade: 160, hex: "#E3F7EF" },
];

const SEMANTIC_COLORS = [
  { label: "Brand",   bg: tokens.colorBrandBackground, fg: tokens.colorBrandForeground1, bgToken: "colorBrandBackground", fgToken: "colorBrandForeground1", bgHex: "#117865", fgHex: "#117865", desc: "CTAs, active states, brand accents" },
  { label: "Success", bg: tokens.colorStatusSuccessBackground1, fg: tokens.colorStatusSuccessForeground1, bgToken: "colorStatusSuccessBackground1", fgToken: "colorStatusSuccessForeground1", bgHex: "#DFF6DD", fgHex: "#107C10", desc: "Positive feedback, completed states", b1: "#9FD89F", b2: "#107C10" },
  { label: "Warning", bg: tokens.colorStatusWarningBackground1, fg: tokens.colorStatusWarningForeground1, bgToken: "colorStatusWarningBackground1", fgToken: "colorStatusWarningForeground1", bgHex: "#FFF4CE", fgHex: "#835B00", desc: "Non-critical alerts, caution", b1: "#F9C000", b2: "#835B00" },
  { label: "Danger",  bg: tokens.colorStatusDangerBackground1, fg: tokens.colorStatusDangerForeground1,  bgToken: "colorStatusDangerBackground1",  fgToken: "colorStatusDangerForeground1",  bgHex: "#FDE7E9", fgHex: "#A4262C", desc: "Errors, destructive actions", b1: "#EEACB2", b2: "#C50F1F" },
  { label: "Info",    bg: tokens.colorNeutralBackground3, fg: tokens.colorNeutralForeground2, bgToken: "colorNeutralBackground3", fgToken: "colorNeutralForeground2", bgHex: "#F5F5F5", fgHex: "#424242", desc: "Informational callouts, helper text" },
  { label: "Neutral", bg: tokens.colorNeutralBackground2, fg: tokens.colorNeutralForeground1, bgToken: "colorNeutralBackground2", fgToken: "colorNeutralForeground1", bgHex: "#F0F0F0", fgHex: "#242424", desc: "Surfaces, borders, secondary content" },
] as const;

const NEUTRAL_SCALE = [
  { token: "colorNeutralBackground1", hex: "#FFFFFF", label: "BG 1" },
  { token: "colorNeutralBackground2", hex: "#F0F0F0", label: "BG 2" },
  { token: "colorNeutralBackground3", hex: "#F5F5F5", label: "BG 3" },
  { token: "colorNeutralBackground4", hex: "#EBEBEB", label: "BG 4" },
  { token: "colorNeutralBackground5", hex: "#E0E0E0", label: "BG 5" },
  { token: "colorNeutralBackground6", hex: "#C8C8C8", label: "BG 6" },
  { token: "colorNeutralForeground4", hex: "#707070", label: "FG 4" },
  { token: "colorNeutralForeground3", hex: "#616161", label: "FG 3" },
  { token: "colorNeutralForeground2", hex: "#424242", label: "FG 2" },
  { token: "colorNeutralForeground1", hex: "#242424", label: "FG 1" },
];

const RIBBON_LIST = [
  { name: "Dismiss", token: "colorRibbonIconDismiss", light: ribbonColorsLight.colorRibbonIconDismiss, dark: ribbonColorsDark.colorRibbonIconDismiss },
  { name: "Manage",  token: "colorRibbonIconManage",  light: ribbonColorsLight.colorRibbonIconManage,  dark: ribbonColorsDark.colorRibbonIconManage  },
  { name: "Move",    token: "colorRibbonIconMove",    light: ribbonColorsLight.colorRibbonIconMove,    dark: ribbonColorsDark.colorRibbonIconMove    },
  { name: "Object",  token: "colorRibbonIconObject",  light: ribbonColorsLight.colorRibbonIconObject,  dark: ribbonColorsDark.colorRibbonIconObject  },
  { name: "Success", token: "colorRibbonIconSuccess", light: ribbonColorsLight.colorRibbonIconSuccess, dark: ribbonColorsDark.colorRibbonIconSuccess },
  { name: "Trigger", token: "colorRibbonIconTrigger", light: ribbonColorsLight.colorRibbonIconTrigger, dark: ribbonColorsDark.colorRibbonIconTrigger },
  { name: "Warning", token: "colorRibbonIconWarning", light: ribbonColorsLight.colorRibbonIconWarning, dark: ribbonColorsDark.colorRibbonIconWarning },
];

const DATA_SLOTS = Array.from({ length: 40 }, (_, i) => {
  const k = `colorDataSlot${i + 1}` as keyof typeof dataVizColorsLight;
  return { n: i + 1, light: dataVizColorsLight[k], dark: dataVizColorsDark[k] };
});
const SEQ1  = Array.from({ length: 10 }, (_, i) => { const k = `colorSequence1color${i + 1}` as keyof typeof dataVizColorsLight; return { n: i + 1, hex: dataVizColorsLight[k] }; });
const SEQ2  = Array.from({ length: 10 }, (_, i) => { const k = `colorSequence2color${i + 1}` as keyof typeof dataVizColorsLight; return { n: i + 1, hex: dataVizColorsLight[k] }; });
const DIV1  = Array.from({ length: 9 },  (_, i) => { const k = `colorDiverging1color${i + 1}` as keyof typeof dataVizColorsLight; return { n: i + 1, hex: dataVizColorsLight[k] }; });
const DIV2  = Array.from({ length: 8 },  (_, i) => { const k = `colorDiverging2color${i + 1}` as keyof typeof dataVizColorsLight; return { n: i + 1, hex: dataVizColorsLight[k] }; });
const ALERTS = Array.from({ length: 7 }, (_, i) => { const k = `colorAlert${i + 1}` as keyof typeof dataVizColorsLight; return { n: i + 1, light: dataVizColorsLight[k], dark: dataVizColorsDark[k] }; });
const TRANSP = Array.from({ length: 10 }, (_, i) => { const k = `colorTransparencyDataSlot${i + 1}` as keyof typeof dataVizColorsLight; return { n: i + 1, hex: dataVizColorsLight[k] }; });

// ── Sub-components ────────────────────────────────────────────────────────

/** Reusable card wrapper for each palette sub-section */
function PaletteCard({ title, count, desc, children }: {
  title: string; count: number; desc: string; children: React.ReactNode;
}) {
  const styles = useStyles();
  return (
    <Card>
      <div className={styles.paletteCard}>
        <div className={styles.paletteCardHeader}>
          <div className={styles.paletteCardMeta}>
            <Body>{title}</Body>
            <Caption color="subtle">{desc}</Caption>
          </div>
          <Tag appearance="outline" size="extra-small">{count} tokens</Tag>
        </div>
        {children}
      </div>
    </Card>
  );
}

export function ColorsPage() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <PageHeader
        title="Colors"
        description="Brand ramp, semantic intent palette, neutral scale, ribbon icon colors, and the full data visualization palette."
        breadcrumbs={["Design System", "Design Tokens", "Colors"]}
      />

      {/* ── Brand ramp ── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Heading level={2}>Brand Color Ramp</Heading>
          <Body size="sm" color="subtle">16-shade scale. Shade 80 (#117865) is the primary brand teal.</Body>
        </div>
        <Card>
          <div className={styles.paletteCard}>
            <div className={styles.brandGrid}>
              {BRAND_SHADES.map(({ shade, hex }) => (
                <div key={shade} className={styles.brandSwatch}>
                  <div className={styles.brandSwatchColor} style={{ backgroundColor: hex }} />
                  <div className={styles.brandSwatchLabel}>
                    <Caption>{shade}</Caption>
                    <Caption color="subtle">{hex}</Caption>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Divider />

      {/* ── Semantic palette ── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Heading level={2}>Semantic Palette</Heading>
          <Body size="sm" color="subtle">Intent-based aliases. Always use semantic tokens — never raw hex — in component styles.</Body>
        </div>
        <div className={styles.semanticGrid}>
          {SEMANTIC_COLORS.map((c) => (
            <Card key={c.label}>
              <div className={styles.semanticInner}>
                <div className={styles.semanticSwatch} style={{ backgroundColor: c.bg, border: `2px solid ${c.fg}` }} aria-hidden="true" />
                <Heading level={4}>{c.label}</Heading>
                <Caption color="subtle">{c.desc}</Caption>
                <div style={{ marginTop: tokens.spacingVerticalXS }}>
                  {[
                    { dot: c.bgHex, label: c.bgToken, val: c.bgHex },
                    { dot: c.fgHex, label: c.fgToken, val: c.fgHex },
                    ...("b1" in c ? [
                      { dot: (c as typeof c & { b1: string }).b1, label: "border1", val: (c as typeof c & { b1: string }).b1 },
                      { dot: (c as typeof c & { b2: string }).b2, label: "border2", val: (c as typeof c & { b2: string }).b2 },
                    ] : []),
                  ].map((row) => (
                    <div key={row.label} className={styles.tokenChip}>
                      <div className={styles.colorDot} style={{ backgroundColor: row.dot }} />
                      <div>
                        <Caption color="subtle"><code style={{ fontSize: "9px", fontFamily: "monospace" }}>{row.label}</code></Caption>
                        <Caption color="subtle"><code style={{ fontSize: "9px", fontFamily: "monospace" }}> · {row.val}</code></Caption>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── Neutral scale ── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Heading level={2}>Neutral Scale</Heading>
          <Body size="sm" color="subtle">Background and foreground neutrals from pure white to near-black.</Body>
        </div>
        <Card>
          <div className={styles.paletteCard}>
            <div className={styles.neutralGrid}>
              {NEUTRAL_SCALE.map(({ token, hex, label }) => (
                <div key={token} className={styles.neutralSwatch}>
                  <div style={{ height: "44px", backgroundColor: hex }} />
                  <div className={styles.neutralLabel}>
                    <Caption>{label}</Caption>
                    <Caption color="subtle">{hex}</Caption>
                    <Caption color="subtle"><code style={{ fontSize: "8px", fontFamily: "monospace", wordBreak: "break-all" as const }}>{token}</code></Caption>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Divider />

      {/* ── Ribbon icon colors ── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Heading level={2}>Ribbon Icon Colors</Heading>
          <Body size="sm" color="subtle">For color icons in ribbons and toolbars. Left swatch = light mode · Right swatch = dark mode.</Body>
        </div>
        <Card>
          <div className={styles.paletteCard}>
            <div className={styles.ribbonGrid}>
              {RIBBON_LIST.map(({ name, token, light, dark }) => (
                <div key={token} className={styles.ribbonRow}>
                  <div className={styles.ribbonSwatches}>
                    <div className={styles.ribbonSwatch} style={{ backgroundColor: light }} title={`Light: ${light}`} />
                    <div className={styles.ribbonSwatch} style={{ backgroundColor: dark }} title={`Dark: ${dark}`} />
                  </div>
                  <div className={styles.ribbonMeta}>
                    <Caption>{name}</Caption>
                    <Caption color="subtle"><code style={{ fontSize: "9px", fontFamily: "monospace" }}>{token}</code></Caption>
                    <Caption color="subtle">{light} · {dark}</Caption>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Divider />

      {/* ── Data visualization ── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Heading level={2}>Data Visualization Colors</Heading>
          <Body size="sm" color="subtle">
            Custom token sets for charts and data viz. Where light ≠ dark, swatches show top = light / bottom = dark.
          </Body>
        </div>

        {/* Data Slots */}
        <PaletteCard
          title="Data Slots — Qualitative Palette"
          count={40}
          desc="Categorical colors for chart series. Slots 1–10 are identical in light and dark; 11–40 differ."
        >
          <div className={styles.slotGrid}>
            {DATA_SLOTS.map(({ n, light, dark }) => (
              <div key={n} className={styles.slot} title={`Slot ${n}  Light: ${light}  Dark: ${dark}`}>
                <div style={{ height: "22px", backgroundColor: light }} />
                <div style={{ height: "22px", backgroundColor: dark }} />
                <div className={styles.slotLabel}>
                  <Caption>{n}</Caption>
                </div>
              </div>
            ))}
          </div>
        </PaletteCard>

        {/* Sequential palettes side-by-side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: tokens.spacingHorizontalM }}>
          <PaletteCard title="Sequential 1 — Teal" count={10} desc="#012728 → #CEF3F5 · Same in light/dark">
            <div className={styles.seqRow}>
              {SEQ1.map(({ n, hex }) => (
                <div key={n} className={styles.seqCell} title={`Color ${n}: ${hex}`}>
                  <div style={{ height: "44px", backgroundColor: hex }} />
                  <div className={styles.seqLabel}>
                    <Caption>{n}</Caption>
                    <Caption color="subtle"><code style={{ fontSize: "8px", fontFamily: "monospace" }}>{hex}</code></Caption>
                  </div>
                </div>
              ))}
            </div>
          </PaletteCard>

          <PaletteCard title="Sequential 2 — Lilac" count={10} desc="#35153A → #F2DCF5 · Same in light/dark">
            <div className={styles.seqRow}>
              {SEQ2.map(({ n, hex }) => (
                <div key={n} className={styles.seqCell} title={`Color ${n}: ${hex}`}>
                  <div style={{ height: "44px", backgroundColor: hex }} />
                  <div className={styles.seqLabel}>
                    <Caption>{n}</Caption>
                    <Caption color="subtle"><code style={{ fontSize: "8px", fontFamily: "monospace" }}>{hex}</code></Caption>
                  </div>
                </div>
              ))}
            </div>
          </PaletteCard>
        </div>

        {/* Diverging palettes side-by-side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: tokens.spacingHorizontalM }}>
          <PaletteCard title="Diverging 1 — Teal ↔ Gold" count={9} desc="Neutral gray center (#D2D0CE) · Same in light/dark">
            <div className={styles.seqRow}>
              {DIV1.map(({ n, hex }) => (
                <div key={n} className={styles.seqCell} title={`Color ${n}: ${hex}`}>
                  <div style={{ height: "44px", backgroundColor: hex }} />
                  <div className={styles.seqLabel}>
                    <Caption>{n}</Caption>
                    <Caption color="subtle"><code style={{ fontSize: "8px", fontFamily: "monospace" }}>{hex}</code></Caption>
                  </div>
                </div>
              ))}
            </div>
          </PaletteCard>

          <PaletteCard title="Diverging 2 — Teal ↔ Pumpkin" count={8} desc="Teal Shd 10 → Gold → Pumpkin Shd 20 · Same in light/dark">
            <div className={styles.seqRow}>
              {DIV2.map(({ n, hex }) => (
                <div key={n} className={styles.seqCell} title={`Color ${n}: ${hex}`}>
                  <div style={{ height: "44px", backgroundColor: hex }} />
                  <div className={styles.seqLabel}>
                    <Caption>{n}</Caption>
                    <Caption color="subtle"><code style={{ fontSize: "8px", fontFamily: "monospace" }}>{hex}</code></Caption>
                  </div>
                </div>
              ))}
            </div>
          </PaletteCard>
        </div>

        {/* Alert + Transparency side-by-side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: tokens.spacingHorizontalM }}>
          <PaletteCard title="Alert Colors" count={7} desc="Data viz status indicators. Left = light · Right = dark.">
            <div className={styles.alertRow}>
              {ALERTS.map(({ n, light, dark }) => (
                <div key={n} className={styles.alertCell} title={`Alert ${n}  Light: ${light}  Dark: ${dark}`}>
                  <div className={styles.alertPair}>
                    <div className={styles.alertHalf} style={{ backgroundColor: light }} />
                    <div className={styles.alertHalf} style={{ backgroundColor: dark }} />
                  </div>
                  <div className={styles.alertLabel}>
                    <Caption>{n}</Caption>
                    <Caption color="subtle"><code style={{ fontSize: "8px", fontFamily: "monospace" }}>{light}</code></Caption>
                    <Caption color="subtle"><code style={{ fontSize: "8px", fontFamily: "monospace" }}>{dark}</code></Caption>
                  </div>
                </div>
              ))}
            </div>
          </PaletteCard>

          <PaletteCard title="Transparency Data Slots" count={10} desc="50% opacity pre-mixed fills for chart areas. Same in light/dark.">
            <div className={styles.transpGrid}>
              {TRANSP.map(({ n, hex }) => (
                <div key={n} className={styles.transpCell} title={`Slot ${n}: ${hex}`}>
                  <div style={{ height: "44px", backgroundColor: hex }} />
                  <div className={styles.transpLabel}>
                    <Caption>{n}</Caption>
                    <Caption color="subtle"><code style={{ fontSize: "8px", fontFamily: "monospace" }}>{hex}</code></Caption>
                  </div>
                </div>
              ))}
            </div>
          </PaletteCard>
        </div>

      </div>
    </div>
  );
}

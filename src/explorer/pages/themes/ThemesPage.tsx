import React from "react";
import { FluentProvider, makeStyles, tokens } from "@fluentui/react-components";
import { WeatherSunny20Regular, WeatherMoon20Regular, CodeBlock20Regular, Accessibility20Regular } from "@fluentui/react-icons";
import { lightTheme, darkTheme, highContrastTheme } from "../../../themes";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { DataCard } from "../../../components/ui/DataCard";
import { Heading, Body, Caption } from "../../../components/ui/Typography";
import { StatusBadge } from "../../../components/ui/StatusBadge";
import { Tag } from "../../../components/ui/Tag";
import { TextField } from "../../../components/ui/TextField";
import { Switch } from "../../../components/ui/Switch";
import { Divider } from "../../../components/ui/Divider";
import { Tabs } from "../../../components/ui/Tabs";
import { MessageBar } from "../../../components/ui/MessageBar";
import { ProgressBar } from "../../../components/ui/ProgressBar";

interface ThemesPageProps {
  initialTab?: "light" | "dark" | "high-contrast" | "compare";
}

const useStyles = makeStyles({
  root: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXXL, maxWidth: "1000px" },
  section: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalL },
  previewWrap: {
    borderRadius: tokens.borderRadiusXLarge,
    overflow: "hidden",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow: tokens.shadow8,
  },
  previewInner: {
    padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXL}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  compareGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    "@media (max-width: 700px)": { gridTemplateColumns: "1fr" },
  },
  compareLabel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    fontWeight: tokens.fontWeightSemibold,
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalM,
    "@media (max-width: 600px)": { gridTemplateColumns: "1fr 1fr" },
  },
  componentRow: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  codeBlock: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    fontFamily: "'SF Mono', 'Consolas', monospace",
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
    overflowX: "auto",
    margin: 0,
  },
});

function ThemePreview() {
  const styles = useStyles();
  return (
    <div className={styles.previewInner}>
      <div className={styles.statsRow}>
        <DataCard label="Components" value="37" trend="+0 this sprint" trendUp />
        <DataCard label="Test Coverage" value="100%" trend="211 passing" trendUp />
        <DataCard label="Audit Score" value="100/100" trend="GO" trendUp />
      </div>
      <div className={styles.componentRow}>
        <Button appearance="primary">Primary</Button>
        <Button appearance="secondary">Secondary</Button>
        <Button appearance="subtle">Subtle</Button>
        <StatusBadge status="completed" />
        <StatusBadge status="in-progress" />
        <Tag appearance="brand">Alpha</Tag>
      </div>
      <TextField label="Search components" placeholder="e.g. Button, TextField…" />
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <Switch label="Dark mode" />
        <Switch label="RTL layout" />
      </div>
      <MessageBar intent="success" title="All checks passed">211 unit tests · 0 violations · 100/100 audit score</MessageBar>
      <ProgressBar label="Build progress" value={1} color="success" />
    </div>
  );
}

export function ThemesPage({ initialTab = "light" }: ThemesPageProps) {
  const styles = useStyles();

  const TABS = [
    { value: "light", label: "Light", icon: <WeatherSunny20Regular /> },
    { value: "dark", label: "Dark", icon: <WeatherMoon20Regular /> },
    { value: "high-contrast", label: "High Contrast", icon: <Accessibility20Regular /> },
    { value: "compare", label: "Compare", icon: <CodeBlock20Regular /> },
  ];

  const PANELS: Record<string, React.ReactNode> = {
    light: (
      <div className={styles.section}>
        <Body size="sm" color="subtle">The default light theme — built with <code>createLightTheme(brandColors)</code>. Uses Fluent's light color system with our brand blue as the primary color.</Body>
        <div className={styles.previewWrap}>
          <FluentProvider theme={lightTheme}><ThemePreview /></FluentProvider>
        </div>
        <div>
          <Heading level={4}>Usage</Heading>
          <pre className={styles.codeBlock}>{`import { FluentProvider } from "@fluentui/react-components";
import { lightTheme } from "@lumel/fluent2-ds";

<FluentProvider theme={lightTheme}>
  {/* your app */}
</FluentProvider>`}</pre>
        </div>
      </div>
    ),
    dark: (
      <div className={styles.section}>
        <Body size="sm" color="subtle">Dark theme — built with <code>createDarkTheme(brandColors)</code> with a WCAG foreground override to ensure AA contrast on dark surfaces.</Body>
        <div className={styles.previewWrap}>
          <FluentProvider theme={darkTheme}><ThemePreview /></FluentProvider>
        </div>
        <div>
          <Heading level={4}>Usage</Heading>
          <pre className={styles.codeBlock}>{`import { FluentProvider } from "@fluentui/react-components";
import { darkTheme } from "@lumel/fluent2-ds";

<FluentProvider theme={darkTheme}>
  {/* your app */}
</FluentProvider>`}</pre>
        </div>
      </div>
    ),
    "high-contrast": (
      <div className={styles.section}>
        <Body size="sm" color="subtle">
          High Contrast theme — built on Fluent UI's <code>teamsHighContrastTheme</code>. All semantic tokens map to Windows/OS
          forced-color system values (<code>Canvas</code>, <code>CanvasText</code>, <code>ButtonText</code>, <code>GrayText</code>,
          <code>Highlight</code>, <code>LinkText</code>). Meets WCAG 2.1 AA for users with visual impairments who require forced colors.
        </Body>
        <div className={styles.previewWrap}>
          <FluentProvider theme={highContrastTheme}><ThemePreview /></FluentProvider>
        </div>
        <div>
          <Heading level={4}>Accessibility Guarantees</Heading>
          <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS }}>
            {[
              { label: "Forced-color safe", detail: "All colors resolve to OS system color keywords — no hardcoded hex values." },
              { label: "GrayText for disabled", detail: "Disabled components use colorNeutralForegroundDisabled which maps to GrayText." },
              { label: "Highlight for focus", detail: "Focus rings use colorBrandStroke1 which maps to Highlight in HC." },
              { label: "Canvas background", detail: "All surfaces use colorNeutralBackground* which maps to Canvas." },
            ].map(({ label, detail }) => (
              <div key={label} style={{ display: "flex", gap: tokens.spacingHorizontalM, alignItems: "flex-start" }}>
                <StatusBadge status="completed" />
                <div>
                  <Body size="sm" weight="semibold">{label}</Body>
                  <Caption color="subtle">{detail}</Caption>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Heading level={4}>Usage</Heading>
          <pre className={styles.codeBlock}>{`import { FluentProvider } from "@fluentui/react-components";
import { highContrastTheme } from "@lumel/fluent2-ds";

// Detect OS high-contrast preference
const preferHC = window.matchMedia("(forced-colors: active)").matches;

<FluentProvider theme={preferHC ? highContrastTheme : lightTheme}>
  {/* your app */}
</FluentProvider>`}</pre>
        </div>
      </div>
    ),
    compare: (
      <div className={styles.section}>
        <Body size="sm" color="subtle">Side-by-side comparison of light and dark themes with identical component compositions.</Body>
        <div className={styles.compareGrid} style={{ border: `1px solid ${tokens.colorNeutralStroke1}`, borderRadius: tokens.borderRadiusXLarge, overflow: "hidden" }}>
          <div style={{ borderInlineEnd: `1px solid ${tokens.colorNeutralStroke1}` }}>
            <FluentProvider theme={lightTheme}>
              <div className={styles.compareLabel} style={{ backgroundColor: lightTheme.colorNeutralBackground2, borderBottom: `1px solid ${lightTheme.colorNeutralStroke1}` }}>
                <WeatherSunny20Regular /> Light Theme
              </div>
              <ThemePreview />
            </FluentProvider>
          </div>
          <FluentProvider theme={darkTheme}>
            <div className={styles.compareLabel} style={{ backgroundColor: darkTheme.colorNeutralBackground2, color: darkTheme.colorNeutralForeground1, borderBottom: `1px solid ${darkTheme.colorNeutralStroke1}` }}>
              <WeatherMoon20Regular /> Dark Theme
            </div>
            <ThemePreview />
          </FluentProvider>
        </div>
      </div>
    ),
  };

  return (
    <div className={styles.root}>
      <PageHeader
        title="Themes"
        description="Light, dark, and high-contrast themes built on Fluent UI's theming system. Switch the global theme at the top right."
        breadcrumbs={["Design System", "Themes"]}
      />
      <Tabs tabs={TABS} panels={PANELS} defaultSelectedValue={initialTab} />
    </div>
  );
}

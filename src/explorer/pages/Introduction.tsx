import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles, tokens } from "@fluentui/react-components";
import {
  AppsListDetail20Regular,
  Color20Regular,
  Accessibility20Regular,
  Rocket20Regular,
  Code20Regular,
  People20Regular,
  CheckmarkCircle20Regular,
  Star20Regular,
  DocumentText20Regular,
  DataArea20Regular,
} from "@fluentui/react-icons";

import { PageHeader } from "../../components/ui/PageHeader";
import { DataCard } from "../../components/ui/DataCard";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Heading, Body, Caption } from "../../components/ui/Typography";
import { Divider } from "../../components/ui/Divider";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { Tag } from "../../components/ui/Tag";
import { Accordion } from "../../components/ui/Accordion";
import { Persona } from "../../components/ui/Persona";
import { MessageBar } from "../../components/ui/MessageBar";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
    maxWidth: "1100px",
  },
  // ── Hero ──────────────────────────────────────────────────────────────────
  hero: {
    background: `linear-gradient(135deg, ${tokens.colorBrandBackground} 0%, ${tokens.colorBrandBackground2} 100%)`,
    borderRadius: tokens.borderRadiusXLarge,
    padding: `${tokens.spacingVerticalXXXL} ${tokens.spacingHorizontalXXXL}`,
    color: tokens.colorNeutralForegroundOnBrand,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    "@media (max-width: 600px)": {
      padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalL}`,
    },
  },
  heroTitle: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightBold,
    lineHeight: tokens.lineHeightBase600,
    "@media (max-width: 600px)": {
      fontSize: tokens.fontSizeBase500,
    },
  },
  heroSubtitle: {
    opacity: "0.9",
    maxWidth: "560px",
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  heroActions: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
  heroBadges: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
    marginTop: tokens.spacingVerticalXS,
  },
  heroBadge: {
    backgroundColor: "rgba(255,255,255,0.15)",
    color: tokens.colorNeutralForegroundOnBrand,
    borderRadius: tokens.borderRadiusMedium,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalS}`,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    backdropFilter: "blur(4px)",
  },
  // ── Stats grid ────────────────────────────────────────────────────────────
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: tokens.spacingHorizontalM,
    "@media (max-width: 900px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (max-width: 480px)": {
      gridTemplateColumns: "1fr",
    },
  },
  // ── Section ───────────────────────────────────────────────────────────────
  section: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  sectionIcon: {
    color: tokens.colorBrandForeground1,
    fontSize: "20px",
    display: "flex",
  },
  // ── Navigation cards ──────────────────────────────────────────────────────
  navGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalM,
    "@media (max-width: 900px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (max-width: 480px)": {
      gridTemplateColumns: "1fr",
    },
  },
  navCard: {
    cursor: "pointer",
    transitionProperty: "transform, box-shadow",
    transitionDuration: tokens.durationFaster,
    transitionTimingFunction: tokens.curveEasyEase,
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: tokens.shadow8,
    },
  },
  navCardIcon: {
    color: tokens.colorBrandForeground1,
    fontSize: "24px",
    marginBottom: tokens.spacingVerticalS,
    display: "flex",
  },
  navCardBody: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
  },
  // ── Principles grid ───────────────────────────────────────────────────────
  principlesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: tokens.spacingHorizontalM,
    "@media (max-width: 600px)": {
      gridTemplateColumns: "1fr",
    },
  },
  principleCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
  },
  principleIcon: {
    color: tokens.colorBrandForeground1,
    fontSize: "24px",
    display: "flex",
    marginBottom: tokens.spacingVerticalXS,
  },
  // ── Team ─────────────────────────────────────────────────────────────────
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: tokens.spacingHorizontalM,
    "@media (max-width: 700px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
  teamCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalM}`,
    gap: tokens.spacingVerticalS,
    textAlign: "center",
  },
});

// ─── Section navigation cards ─────────────────────────────────────────────────
const NAV_CARDS = [
  { label: "Design Tokens", path: "/tokens", icon: <Color20Regular />, desc: "Colors, typography, spacing, shadows, and motion tokens" },
  { label: "Themes", path: "/themes", icon: <Star20Regular />, desc: "Light, dark, and custom brand theme configurations" },
  { label: "Components", path: "/components", icon: <AppsListDetail20Regular />, desc: "74 production-ready Fluent UI v9 components" },
  { label: "Patterns", path: "/patterns", icon: <DocumentText20Regular />, desc: "Real-world usage patterns for common UI scenarios" },
  { label: "Templates", path: "/templates", icon: <DataArea20Regular />, desc: "Full-page templates: dashboard, settings, data management" },
  { label: "Accessibility", path: "/accessibility", icon: <Accessibility20Regular />, desc: "WCAG 2.1 AA compliance, keyboard nav, and test results" },
];

const PRINCIPLES = [
  { icon: <Accessibility20Regular />, title: "Accessible by Default", body: "Every component meets WCAG 2.1 AA. Keyboard navigation, screen reader support, and RTL layout are built in — not bolted on." },
  { icon: <Code20Regular />, title: "Developer First", body: "TypeScript-first API with forwardRef on all 74 components, consistent className prop, and tree-shakeable dual ESM/CJS build." },
  { icon: <Color20Regular />, title: "Fluent Design Language", body: "Built on Microsoft Fluent UI v9 — the same foundation used across Microsoft 365. Familiar, polished, and production-tested." },
  { icon: <Rocket20Regular />, title: "RTL & Theming Ready", body: "Logical CSS throughout means RTL is automatic. Light and dark themes switch instantly via FluentProvider — zero CSS overrides." },
];

const QUICK_START_ITEMS = [
  {
    value: "install",
    header: "1. Install the package",
    content: (
      <div>
        <Body size="sm" color="subtle">Install the design system and its peer dependencies:</Body>
        <pre style={{ marginTop: "8px", padding: "12px", borderRadius: "6px", background: "rgba(0,0,0,0.04)", fontSize: "12px", overflowX: "auto" }}>
          {`npm install @lumel/fluent2-ds
npm install react react-dom @fluentui/react-components @fluentui/react-icons`}
        </pre>
      </div>
    ),
  },
  {
    value: "wrap",
    header: "2. Wrap your app with FluentProvider",
    content: (
      <pre style={{ padding: "12px", borderRadius: "6px", background: "rgba(0,0,0,0.04)", fontSize: "12px", overflowX: "auto" }}>
        {`import { FluentProvider } from "@fluentui/react-components";
import { lightTheme } from "@lumel/fluent2-ds";

function App() {
  return (
    <FluentProvider theme={lightTheme}>
      {/* your app */}
    </FluentProvider>
  );
}`}
      </pre>
    ),
  },
  {
    value: "use",
    header: "3. Import and use components",
    content: (
      <pre style={{ padding: "12px", borderRadius: "6px", background: "rgba(0,0,0,0.04)", fontSize: "12px", overflowX: "auto" }}>
        {`import { Button, TextField, DataCard } from "@lumel/fluent2-ds";

<Button appearance="primary">Submit</Button>
<TextField label="Name" placeholder="Enter your name" />
<DataCard label="Total Users" value="1,284" trend="+12%" trendUp />`}
      </pre>
    ),
  },
];

// ─── Introduction page ────────────────────────────────────────────────────────
export function Introduction() {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      {/* Alpha notice */}
      <MessageBar intent="info" title="Alpha Release" dismissible>
        This design system is in active development. APIs may change before the stable 0.1.0 release. Submit feedback via the Feedback section.
      </MessageBar>

      {/* Hero */}
      <div className={styles.hero} role="banner">
        <div>
          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>v0.1.0-alpha.1</span>
            <span className={styles.heroBadge}>Fluent UI v9</span>
            <span className={styles.heroBadge}>WCAG 2.1 AA</span>
          </div>
        </div>
        <div className={styles.heroTitle}>Lumel Design System</div>
        <div className={styles.heroSubtitle}>
          A production-ready component library built on Microsoft Fluent UI v9.
          74 components, comprehensive design tokens, full RTL support, and WCAG 2.1 AA compliance — ready for your next product.
        </div>
        <div className={styles.heroActions}>
          <Button
            appearance="primary"
            size="medium"
            icon={<AppsListDetail20Regular />}
            onClick={() => navigate("/components")}
          >
            Browse Components
          </Button>
          <Button
            appearance="subtle"
            size="medium"
            icon={<Code20Regular />}
            onClick={() => navigate("/tokens")}
          >
            Design Tokens
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <DataCard label="Components" value="37" trend="All stable" trendUp icon={<AppsListDetail20Regular />} />
        <DataCard label="Unit Tests" value="211" trend="100% passing" trendUp icon={<CheckmarkCircle20Regular />} />
        <DataCard label="Audit Score" value="100" trend="v0.1.0-alpha.1" trendUp icon={<Star20Regular />} />
        <DataCard label="Token Categories" value="7" trend="Fully typed" trendUp icon={<Color20Regular />} />
      </div>

      {/* Quick navigation */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <span className={styles.sectionIcon} aria-hidden="true"><AppsListDetail20Regular /></span>
          <Heading level={2}>Explore the System</Heading>
        </div>
        <div className={styles.navGrid}>
          {NAV_CARDS.map((card) => (
            <div
              key={card.path}
              className={styles.navCard}
              onClick={() => navigate(card.path)}
              role="button"
              tabIndex={0}
              aria-label={`Navigate to ${card.label}`}
              onKeyDown={(e) => e.key === "Enter" && navigate(card.path)}
            >
              <Card>
                <div className={styles.navCardBody}>
                  <span className={styles.navCardIcon} aria-hidden="true">{card.icon}</span>
                  <Heading level={4}>{card.label}</Heading>
                  <Caption color="subtle">{card.desc}</Caption>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Quick start */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <span className={styles.sectionIcon} aria-hidden="true"><Rocket20Regular /></span>
          <Heading level={2}>Quick Start</Heading>
        </div>
        <Accordion items={QUICK_START_ITEMS} multiple />
      </div>

      <Divider />

      {/* Design principles */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <span className={styles.sectionIcon} aria-hidden="true"><Star20Regular /></span>
          <Heading level={2}>Design Principles</Heading>
        </div>
        <div className={styles.principlesGrid}>
          {PRINCIPLES.map((p) => (
            <Card key={p.title}>
              <div className={styles.principleCard}>
                <span className={styles.principleIcon} aria-hidden="true">{p.icon}</span>
                <Heading level={4}>{p.title}</Heading>
                <Body size="sm" color="subtle">{p.body}</Body>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Divider />

      {/* Team */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <span className={styles.sectionIcon} aria-hidden="true"><People20Regular /></span>
          <Heading level={2}>Core Team</Heading>
        </div>
        <div className={styles.teamGrid}>
          {[
            { name: "Muralidharane", role: "Design System Lead", presence: "available" as const },
            { name: "Lumel Engineering", role: "Platform Team", presence: "available" as const },
            { name: "Design Team", role: "UX / Visual Design", presence: "away" as const },
            { name: "Product Team", role: "Requirements & Review", presence: "available" as const },
          ].map((p) => (
            <Card key={p.name}>
              <div className={styles.teamCard}>
                <Persona name={p.name} secondaryText={p.role} presence={p.presence} size="large" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

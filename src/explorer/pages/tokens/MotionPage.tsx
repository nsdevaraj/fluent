import React, { useState } from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Heading, Body, Caption } from "../../../components/ui/Typography";
import { Button } from "../../../components/ui/Button";
import { Tag } from "../../../components/ui/Tag";
import { Divider } from "../../../components/ui/Divider";

const useStyles = makeStyles({
  root: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXXL, maxWidth: "900px" },
  section: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalL },
  durationList: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS },
  durationRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
  },
  meta: { minWidth: "200px", display: "flex", flexDirection: "column", gap: "2px", flexShrink: 0 },
  demoBox: {
    width: "40px",
    height: "40px",
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorBrandBackground,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorNeutralForegroundOnBrand,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    cursor: "pointer",
    userSelect: "none",
  },
  easingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: tokens.spacingHorizontalM,
    "@media (max-width: 600px)": { gridTemplateColumns: "1fr" },
  },
  easingCard: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
});

const DURATIONS = [
  { name: "ultraFast", token: tokens.durationUltraFast, ms: "50ms", usage: "Micro-interactions, cursor blink" },
  { name: "faster", token: tokens.durationFaster, ms: "100ms", usage: "Hover state changes, icon transitions" },
  { name: "fast", token: tokens.durationFast, ms: "150ms", usage: "Tooltips appear, button press feedback" },
  { name: "normal", token: tokens.durationNormal, ms: "200ms", usage: "Default — most transitions, dropdown open" },
  { name: "slow", token: tokens.durationSlow, ms: "300ms", usage: "Panel slides, drawer open" },
  { name: "slower", token: tokens.durationSlower, ms: "400ms", usage: "Page transitions, modal entrance" },
  { name: "ultraSlow", token: tokens.durationUltraSlow, ms: "500ms", usage: "Complex entrance animations" },
];

const CURVES = [
  { name: "curveEasyEase", token: tokens.curveEasyEase, desc: "Default — smooth in/out for most transitions" },
  { name: "curveLinear", token: tokens.curveLinear, desc: "Constant rate — continuous motion, progress bars" },
  { name: "curveDecelerateMid", token: tokens.curveDecelerateMid, desc: "Enter — content entering the screen" },
  { name: "curveAccelerateMid", token: tokens.curveAccelerateMid, desc: "Exit — content leaving the screen" },
];

export function MotionPage() {
  const styles = useStyles();
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const triggerDemo = (name: string, duration: string) => {
    setActiveDemo(name);
    setTimeout(() => setActiveDemo(null), parseInt(duration, 10) + 100);
  };

  return (
    <div className={styles.root}>
      <PageHeader
        title="Motion"
        description="Duration tokens and easing curves for consistent, purposeful animation throughout the interface."
        breadcrumbs={["Design System", "Design Tokens", "Motion"]}
      />

      <div className={styles.section}>
        <div>
          <Heading level={2}>Duration Scale</Heading>
          <Body size="sm" color="subtle">Click any row to see the duration in action. Use <code>tokens.duration*</code> for <code>transitionDuration</code> and <code>animationDuration</code>.</Body>
        </div>
        <div className={styles.durationList}>
          {DURATIONS.map(({ name, token: dur, ms, usage }) => (
            <div
              key={name}
              className={styles.durationRow}
              onClick={() => triggerDemo(name, ms)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && triggerDemo(name, ms)}
              aria-label={`Preview ${name} duration (${ms})`}
            >
              <div className={styles.meta}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <Tag appearance="brand" size="extra-small">{name}</Tag>
                  <Caption>{ms}</Caption>
                </div>
                <Caption color="subtle">{usage}</Caption>
              </div>
              <div
                className={styles.demoBox}
                style={{
                  transitionProperty: "transform, opacity",
                  transitionDuration: dur,
                  transitionTimingFunction: tokens.curveEasyEase,
                  transform: activeDemo === name ? "scale(1.3)" : "scale(1)",
                  opacity: activeDemo === name ? "0.6" : "1",
                }}
                aria-hidden="true"
              >
                ▶
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      <div className={styles.section}>
        <Heading level={2}>Easing Curves</Heading>
        <Body size="sm" color="subtle">Use <code>tokens.curve*</code> for <code>transitionTimingFunction</code>. Always pair an easing curve with a duration token.</Body>
        <div className={styles.easingGrid}>
          {CURVES.map(({ name, token: easing, desc }) => (
            <div key={name} className={styles.easingCard}>
              <Tag appearance="outline" size="extra-small">{name}</Tag>
              <Caption color="subtle">{easing}</Caption>
              <Body size="sm">{desc}</Body>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

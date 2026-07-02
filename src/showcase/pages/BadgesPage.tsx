import React from "react";
import { Badge, CounterBadge, PresenceBadge, Avatar, makeStyles, tokens, Text } from "@fluentui/react-components";
import { CheckmarkCircle16Filled, DismissCircle16Filled, Clock16Regular, Warning16Regular } from "@fluentui/react-icons";
import { ShowcaseSection } from "../ShowcaseSection";

const useStyles = makeStyles({
  group: { display: "flex", flexWrap: "wrap", gap: tokens.spacingHorizontalM, alignItems: "center" },
  col: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS },
});

export function BadgesPage() {
  const styles = useStyles();

  return (
    <>
      <ShowcaseSection
        title="Badge — Colors"
        description="Use semantic colors to communicate meaning consistently."
        preview={
          <div className={styles.group}>
            <Badge color="brand">Brand</Badge>
            <Badge color="success">Success</Badge>
            <Badge color="warning">Warning</Badge>
            <Badge color="danger">Danger</Badge>
            <Badge color="informative">Info</Badge>
            <Badge color="important">Important</Badge>
            <Badge color="severe">Severe</Badge>
            <Badge color="subtle">Subtle</Badge>
          </div>
        }
        code={`import { Badge } from "@fluentui/react-components";

// Colors: brand | success | warning | danger | informative | important | severe | subtle
<Badge color="brand">Brand</Badge>
<Badge color="success">Success</Badge>
<Badge color="warning">Warning</Badge>
<Badge color="danger">Danger</Badge>
<Badge color="informative">Info</Badge>`}
      />

      <ShowcaseSection
        title="Badge — Appearances"
        description="filled (default), tint, ghost, outline — each for different visual weight."
        preview={
          <div className={styles.group}>
            <Badge appearance="filled" color="brand">Filled</Badge>
            <Badge appearance="tint" color="brand">Tint</Badge>
            <Badge appearance="ghost" color="brand">Ghost</Badge>
            <Badge appearance="outline" color="brand">Outline</Badge>
          </div>
        }
        code={`// Appearances: "filled" | "tint" | "ghost" | "outline"
<Badge appearance="filled" color="success">Active</Badge>
<Badge appearance="tint" color="warning">In Review</Badge>
<Badge appearance="ghost" color="brand">Draft</Badge>
<Badge appearance="outline" color="danger">Blocked</Badge>`}
      />

      <ShowcaseSection
        title="Badge — With Icons"
        description="Pair icons with badges for status indicators."
        preview={
          <div className={styles.group}>
            <Badge appearance="tint" color="success" icon={<CheckmarkCircle16Filled />}>Completed</Badge>
            <Badge appearance="tint" color="danger" icon={<DismissCircle16Filled />}>Blocked</Badge>
            <Badge appearance="tint" color="warning" icon={<Clock16Regular />}>In Review</Badge>
            <Badge appearance="tint" color="informative" icon={<Warning16Regular />}>Pending</Badge>
          </div>
        }
        code={`import { CheckmarkCircle16Filled, DismissCircle16Filled } from "@fluentui/react-icons";

<Badge appearance="tint" color="success" icon={<CheckmarkCircle16Filled />}>
  Completed
</Badge>
<Badge appearance="tint" color="danger" icon={<DismissCircle16Filled />}>
  Blocked
</Badge>`}
      />

      <ShowcaseSection
        title="Badge — Sizes"
        description="Small and medium only. Large and extra-large are not used in our design system."
        preview={
          <div className={styles.group}>
            <Badge color="brand" size="small">Small</Badge>
            <Badge color="brand" size="medium">Medium</Badge>
          </div>
        }
        code={`// Use small or medium only
<Badge color="brand" size="small">Small</Badge>
<Badge color="brand" size="medium">Medium</Badge>

// ⚠️ Large and extra-large are NOT used in our design system`}
      />

      <ShowcaseSection
        title="CounterBadge"
        description="For notification counts. Shows a dot when count is 0."
        preview={
          <div className={styles.group}>
            <CounterBadge count={0} />
            <CounterBadge count={5} color="brand" />
            <CounterBadge count={99} color="danger" />
            <CounterBadge count={150} color="danger" overflowCount={99} />
            <div style={{ position: "relative", display: "inline-flex" }}>
              <Avatar name="Alice M." />
              <CounterBadge count={3} color="danger" size="small"
                style={{ position: "absolute", top: -4, right: -4 }} />
            </div>
          </div>
        }
        code={`import { CounterBadge } from "@fluentui/react-components";

<CounterBadge count={5} color="brand" />
<CounterBadge count={150} overflowCount={99} color="danger" />
// Shows "99+" when count > overflowCount

// On an avatar
<div style={{ position: "relative", display: "inline-flex" }}>
  <Avatar name="Alice" />
  <CounterBadge count={3} color="danger" size="small"
    style={{ position: "absolute", top: -4, right: -4 }} />
</div>`}
      />

      <ShowcaseSection
        title="PresenceBadge"
        description="User presence indicators for avatars."
        preview={
          <div className={styles.group}>
            <div className={styles.col}>
              <div style={{ display: "flex", alignItems: "center", gap: tokens.spacingHorizontalS }}>
                <PresenceBadge status="available" /><Text size={300}>Available</Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: tokens.spacingHorizontalS }}>
                <PresenceBadge status="busy" /><Text size={300}>Busy</Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: tokens.spacingHorizontalS }}>
                <PresenceBadge status="away" /><Text size={300}>Away</Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: tokens.spacingHorizontalS }}>
                <PresenceBadge status="offline" /><Text size={300}>Offline</Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: tokens.spacingHorizontalS }}>
                <PresenceBadge status="do-not-disturb" /><Text size={300}>Do Not Disturb</Text>
              </div>
            </div>
          </div>
        }
        code={`import { PresenceBadge } from "@fluentui/react-components";

// Status: "available" | "busy" | "away" | "offline" | "do-not-disturb" | "out-of-office"
<PresenceBadge status="available" />
<PresenceBadge status="busy" />
<PresenceBadge status="away" />
<PresenceBadge status="offline" />`}
      />
    </>
  );
}

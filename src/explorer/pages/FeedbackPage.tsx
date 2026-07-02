import React, { useState } from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { Chat20Regular, Bug20Regular, AppsListDetail20Regular, Star20Regular } from "@fluentui/react-icons";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import { Heading, Body, Caption } from "../../components/ui/Typography";
import { Button } from "../../components/ui/Button";
import { TextField } from "../../components/ui/TextField";
import { Textarea } from "../../components/ui/Textarea";
import { Select } from "../../components/ui/Select";
import { RadioGroup } from "../../components/ui/RadioGroup";
import { Checkbox } from "../../components/ui/Checkbox";
import { Divider } from "../../components/ui/Divider";
import { MessageBar } from "../../components/ui/MessageBar";
import { Tag } from "../../components/ui/Tag";
import { Tabs } from "../../components/ui/Tabs";
import { Heading as H } from "../../components/ui/Typography";

const useStyles = makeStyles({
  root: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXXL, maxWidth: "800px" },
  section: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalL },
  formCard: {
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  formActions: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    justifyContent: "flex-end",
  },
  channelGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalM,
    "@media (max-width: 600px)": { gridTemplateColumns: "1fr" },
  },
  channelCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
    alignItems: "center",
    textAlign: "center",
  },
  channelIcon: {
    color: tokens.colorBrandForeground1,
    fontSize: "28px",
    display: "flex",
  },
});

function GeneralFeedback() {
  const styles = useStyles();
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      {submitted ? (
        <MessageBar intent="success" title="Feedback received — thank you!">
          We review all feedback and use it to improve the design system. Expect a response within 2 business days.
        </MessageBar>
      ) : (
        <Card>
          <div className={styles.formCard}>
            <Heading level={3}>General Feedback</Heading>
            <RadioGroup
              label="Overall rating"
              options={[
                { value: "5", label: "⭐⭐⭐⭐⭐ Excellent" },
                { value: "4", label: "⭐⭐⭐⭐ Good" },
                { value: "3", label: "⭐⭐⭐ Average" },
                { value: "2", label: "⭐⭐ Needs improvement" },
              ]}
              layout="horizontal"
            />
            <Select
              label="Which section are you reviewing?"
              options={[
                { value: "components", label: "Components" },
                { value: "tokens", label: "Design Tokens" },
                { value: "themes", label: "Themes" },
                { value: "patterns", label: "Patterns" },
                { value: "docs", label: "Documentation" },
                { value: "other", label: "Other" },
              ]}
            />
            <Textarea label="Your feedback" placeholder="What's working well? What could be improved?" rows={4} />
            <Checkbox label="I'd like to be contacted for a follow-up discussion" />
            <TextField label="Email (optional)" placeholder="you@company.com" />
            <div className={styles.formActions}>
              <Button appearance="subtle" onClick={() => {}}>Clear</Button>
              <Button appearance="primary" onClick={() => setSubmitted(true)}>Submit feedback</Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}

function ComponentRequest() {
  const styles = useStyles();
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      {submitted ? (
        <MessageBar intent="success" title="Component request logged">
          We'll evaluate this for inclusion in v0.2.0. Check the Release Notes page for roadmap updates.
        </MessageBar>
      ) : (
        <Card>
          <div className={styles.formCard}>
            <Heading level={3}>Request a Component</Heading>
            <TextField label="Component name" placeholder="e.g. DateRangePicker" required />
            <Select
              label="Category"
              options={[
                { value: "form", label: "Form Inputs" },
                { value: "feedback", label: "Feedback" },
                { value: "nav", label: "Navigation" },
                { value: "overlay", label: "Overlay" },
                { value: "data", label: "Data Display" },
                { value: "layout", label: "Layout" },
              ]}
            />
            <Textarea label="Use case" placeholder="Describe how you'd use this component and the problem it solves…" rows={4} required />
            <TextField label="Reference examples (optional)" placeholder="Links to Figma files, similar components, or implementations" />
            <div className={styles.formActions}>
              <Button appearance="primary" onClick={() => setSubmitted(true)}>Submit request</Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}

function BugReport() {
  const styles = useStyles();
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      {submitted ? (
        <MessageBar intent="success" title="Bug report received">
          We'll investigate and update you via the CHANGELOG when fixed.
        </MessageBar>
      ) : (
        <Card>
          <div className={styles.formCard}>
            <Heading level={3}>Report a Bug</Heading>
            <Select
              label="Affected component"
              options={[
                { value: "button", label: "Button" },
                { value: "textfield", label: "TextField" },
                { value: "datatable", label: "DataTable" },
                { value: "sidenav", label: "SideNav" },
                { value: "other", label: "Other" },
              ]}
            />
            <RadioGroup
              label="Severity"
              options={[
                { value: "critical", label: "Critical — Blocking usage" },
                { value: "major", label: "Major — Significant impact" },
                { value: "minor", label: "Minor — Low impact" },
              ]}
              layout="vertical"
            />
            <TextField label="Short description" placeholder="One-line summary of the bug" required />
            <Textarea label="Steps to reproduce" placeholder="1. Navigate to...\n2. Click...\n3. Observe..." rows={4} required />
            <Textarea label="Expected vs actual behavior" placeholder="Expected: ...\nActual: ..." rows={3} />
            <div className={styles.formActions}>
              <Button appearance="primary" onClick={() => setSubmitted(true)}>Submit bug report</Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}

export function FeedbackPage() {
  const styles = useStyles();

  const TABS = [
    { value: "general", label: "General", icon: <Chat20Regular /> },
    { value: "request", label: "Component Request", icon: <AppsListDetail20Regular /> },
    { value: "bug", label: "Bug Report", icon: <Bug20Regular /> },
  ];

  const PANELS = {
    general: (
      <div className={styles.section}>
        <Body size="sm" color="subtle">Rate your experience and share thoughts on any section of the design system.</Body>
        <GeneralFeedback />
      </div>
    ),
    request: (
      <div className={styles.section}>
        <Body size="sm" color="subtle">Missing a component? Submit a request and we'll evaluate it for the roadmap.</Body>
        <ComponentRequest />
      </div>
    ),
    bug: (
      <div className={styles.section}>
        <Body size="sm" color="subtle">Found a bug? Describe it here and we'll investigate.</Body>
        <BugReport />
      </div>
    ),
  };

  return (
    <div className={styles.root}>
      <PageHeader
        title="Feedback"
        description="Help us improve @lumel/fluent2-ds. All feedback is reviewed by the Design System team."
        breadcrumbs={["Design System", "Feedback"]}
      />

      <div className={styles.channelGrid}>
        {[
          { icon: <Chat20Regular />, label: "General Feedback", desc: "Share overall impressions" },
          { icon: <AppsListDetail20Regular />, label: "Component Requests", desc: "Request a new component" },
          { icon: <Bug20Regular />, label: "Bug Reports", desc: "Report a problem" },
        ].map((c) => (
          <Card key={c.label}>
            <div className={styles.channelCard}>
              <span className={styles.channelIcon} aria-hidden="true">{c.icon}</span>
              <Body>{c.label}</Body>
              <Caption color="subtle">{c.desc}</Caption>
            </div>
          </Card>
        ))}
      </div>

      <Divider />

      <Tabs tabs={TABS} panels={PANELS} defaultSelectedValue="general" />
    </div>
  );
}

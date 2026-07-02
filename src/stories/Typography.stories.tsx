import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { tokens } from "@fluentui/react-components";
import { Heading, Body, Caption, DSLabel } from "../components/ui/Typography";

const meta: Meta = {
  title: "Components/Typography",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Typography provides a set of pre-configured text components (Display, LargeTitle, Title1–Title3, Subtitle1–Subtitle2, Body1–Body2, Caption1–Caption2) that apply Fluent's type ramp tokens consistently.",
      },
    },
  },
  argTypes: {
    level:   { control: "select", options: [1, 2, 3, 4] },
    weight:  { control: "select", options: ["regular","medium","semibold","bold"] },
    color:   { control: "select", options: ["default","muted","subtle","brand","success","warning","danger","inherit"] },
    truncate: { control: "boolean" },
  },
};
export default meta;

export const Headings: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM }}>
      <Heading level={1}>Heading 1 — 40px semibold</Heading>
      <Heading level={2}>Heading 2 — 20px semibold</Heading>
      <Heading level={3}>Heading 3 — 16px semibold</Heading>
      <Heading level={4}>Heading 4 — 14px semibold</Heading>
    </div>
  ),
};

export const BodyVariants: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS }}>
      <Body>Default body text — 14px regular</Body>
      <Body weight="semibold">Semibold body</Body>
      <Body weight="bold">Bold body</Body>
      <Body size="sm" color="muted">Small muted body — 12px</Body>
      <Body color="brand">Brand-colored body</Body>
      <Body color="danger">Danger body</Body>
    </div>
  ),
};

export const CaptionVariants: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXS }}>
      <Caption>Default caption — 10px muted</Caption>
      <Caption color="default">Default color caption</Caption>
      <Caption weight="semibold">Semibold caption</Caption>
    </div>
  ),
};

export const Labels: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS }}>
      <DSLabel htmlFor="f1">Regular label</DSLabel>
      <DSLabel htmlFor="f2" required>Required label</DSLabel>
      <DSLabel htmlFor="f3" disabled>Disabled label</DSLabel>
    </div>
  ),
};

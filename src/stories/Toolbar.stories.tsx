import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  AlignLeft20Regular,
  AlignRight20Regular,
  Copy20Regular,
  Cut20Regular,
  Paste20Regular,
  TextAlignCenter20Regular,
  TextBold20Regular,
  TextItalic20Regular,
  TextUnderline20Regular,
} from "@fluentui/react-icons";
import { Toolbar } from "../components/ui/Toolbar";

const meta: Meta<typeof Toolbar> = {
  title: "Components/Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Toolbar groups related action controls — Buttons, ToggleButtons, MenuButtons — into a horizontal band with a single tab stop. Arrow-key navigation within the toolbar reduces keyboard burden and ARIA role='toolbar' communicates grouping to assistive technologies.",
      },
    },
  },
  argTypes: {
    // [NON-STANDARD] "large" removed — Toolbar official sizes: small | medium only
    size: { control: "select", options: ["small", "medium"] },
  },
};
export default meta;

type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {
  args: {
    "aria-label": "Text editing toolbar",
    items: [
      { id: "cut",   type: "button", icon: <Cut20Regular />,   label: "Cut",   onClick: () => {} },
      { id: "copy",  type: "button", icon: <Copy20Regular />,  label: "Copy",  onClick: () => {} },
      { id: "paste", type: "button", icon: <Paste20Regular />, label: "Paste", onClick: () => {} },
    ],
  },
};

export const WithToggles: Story = {
  render: () => {
    const [bold, setBold]   = useState(false);
    const [italic, setItalic] = useState(false);
    const [under, setUnder] = useState(false);
    return (
      <Toolbar
        aria-label="Formatting"
        items={[
          { id: "bold",      type: "toggle", icon: <TextBold20Regular />,      label: "Bold",      checked: bold,   onChange: setBold },
          { id: "italic",    type: "toggle", icon: <TextItalic20Regular />,    label: "Italic",    checked: italic, onChange: setItalic },
          { id: "underline", type: "toggle", icon: <TextUnderline20Regular />, label: "Underline", checked: under,  onChange: setUnder },
        ]}
      />
    );
  },
};

export const MixedWithDivider: Story = {
  render: () => (
    <Toolbar
      aria-label="Rich text"
      items={[
        { id: "bold",   type: "toggle", icon: <TextBold20Regular />,   label: "Bold" },
        { id: "italic", type: "toggle", icon: <TextItalic20Regular />, label: "Italic" },
        { id: "div-1",  type: "divider" },
        { id: "left",   type: "toggle", icon: <AlignLeft20Regular />,       label: "Align left" },
        { id: "center", type: "toggle", icon: <TextAlignCenter20Regular />, label: "Align center" },
        { id: "right",  type: "toggle", icon: <AlignRight20Regular />,      label: "Align right" },
        { id: "div-2",  type: "divider" },
        { id: "copy",   type: "button", icon: <Copy20Regular />,  label: "Copy",  onClick: () => {} },
        { id: "paste",  type: "button", icon: <Paste20Regular />, label: "Paste", onClick: () => {} },
      ]}
    />
  ),
};

export const Small: Story = {
  args: {
    "aria-label": "Small toolbar",
    size: "small",
    items: [
      { id: "bold",   type: "toggle", icon: <TextBold20Regular />,   label: "Bold" },
      { id: "italic", type: "toggle", icon: <TextItalic20Regular />, label: "Italic" },
    ],
  },
};

export const Vertical: Story = {
  args: {
    "aria-label": "Vertical toolbar",
    vertical: true,
    items: [
      { id: "cut",   type: "button", icon: <Cut20Regular />,   label: "Cut" },
      { id: "copy",  type: "button", icon: <Copy20Regular />,  label: "Copy" },
      { id: "paste", type: "button", icon: <Paste20Regular />, label: "Paste" },
    ],
  },
};

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TextBold20Regular, TextItalic20Regular, TextUnderline20Regular } from "@fluentui/react-icons";
import { ToggleButton } from "../components/ui/ToggleButton";

const meta: Meta<typeof ToggleButton> = {
  title: "Components/ToggleButton",
  component: ToggleButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "ToggleButton maintains a checked/unchecked state and visually communicates that state. Ideal for toolbar formatting controls — Bold, Italic, Underline — or any two-state mode switch.",
      },
    },
  },
  argTypes: {
    appearance: { control: "select", options: ["primary", "secondary", "subtle"] },
    size: { control: "select", options: ["small", "medium"] },
  },
};
export default meta;

type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {
  args: { children: "Toggle me", appearance: "secondary" },
};

export const CheckedByDefault: Story = {
  args: { children: "Pinned", appearance: "secondary", checked: true },
};

export const WithIcon: Story = {
  args: { icon: <TextBold20Regular />, "aria-label": "Bold", appearance: "subtle" },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <ToggleButton
        appearance="secondary"
        checked={checked}
        onChange={setChecked}
        icon={<TextBold20Regular />}
      >
        {checked ? "Bold (on)" : "Bold (off)"}
      </ToggleButton>
    );
  },
};

export const FormattingGroup: Story = {
  render: () => {
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);
    return (
      <div style={{ display: "flex", gap: 4 }}>
        <ToggleButton appearance="subtle" icon={<TextBold20Regular />} checked={bold} onChange={setBold} aria-label="Bold" />
        <ToggleButton appearance="subtle" icon={<TextItalic20Regular />} checked={italic} onChange={setItalic} aria-label="Italic" />
        <ToggleButton appearance="subtle" icon={<TextUnderline20Regular />} checked={underline} onChange={setUnderline} aria-label="Underline" />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { children: "Disabled", appearance: "secondary", disabled: true },
};

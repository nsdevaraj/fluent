import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FluentProvider } from "@fluentui/react-components";
import { Add20Regular, Save20Regular } from "@fluentui/react-icons";
import { Button } from "../components/ui/Button";
import { darkTheme } from "../themes";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Button triggers an action or event when activated — such as submitting a form, opening a dialog, or performing an operation. Use the `primary` appearance for the single most important action; `subtle` or `transparent` for lower-emphasis actions.",
      },
    },
  },
  argTypes: {
    appearance: {
      control: "select",
      options: ["primary", "secondary", "subtle"],
    },
    size: { control: "select", options: ["small", "medium"] },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { appearance: "primary", children: "Primary button" },
};

export const Secondary: Story = {
  args: { appearance: "secondary", children: "Secondary button" },
};

export const Subtle: Story = {
  args: { appearance: "subtle", children: "Subtle button" },
};

export const WithIcon: Story = {
  args: { appearance: "primary", icon: <Add20Regular />, children: "Add item" },
};

export const IconAfter: Story = {
  args: { appearance: "secondary", icon: <Save20Regular />, iconPosition: "after", children: "Save" },
};

export const Loading: Story = {
  args: { appearance: "primary", loading: true, loadingLabel: "Saving…", children: "Saving…" },
};

export const Disabled: Story = {
  args: { appearance: "primary", disabled: true, children: "Disabled" },
};

export const Small: Story = {
  args: { appearance: "primary", size: "small", children: "Small" },
};

export const IconOnly: Story = {
  args: { appearance: "subtle", icon: <Add20Regular />, "aria-label": "Add item" },
};

// ── Theme stories ─────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  decorators: [(Story) => <FluentProvider theme={darkTheme}><div style={{padding:"1rem",display:"flex",gap:"8px"}}><Story /></div></FluentProvider>],
  args: { children: "Submit", appearance: "primary" },
};

export const RTL: Story = {
  decorators: [(Story) => <FluentProvider theme={{}} dir="rtl"><div style={{padding:"1rem"}}><Story /></div></FluentProvider>],
  args: { children: "إرسال", appearance: "primary" },
};

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FluentProvider } from "@fluentui/react-components";
import { TextField } from "../components/ui/TextField";
import { darkTheme } from "../themes";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "TextField is a styled single-line text input for capturing short freeform values such as names, email addresses, passwords, and URLs. It wraps Fluent UI's Input with a Field wrapper for consistent label, validation, and hint text support.",
      },
    },
  },
  argTypes: {
    disabled:        { control: "boolean" },
    required:        { control: "boolean" },
    validationState: { control: "select", options: ["none","error","warning","success"] },
    label:           { control: "text" },
    placeholder:     { control: "text" },
    type:            { control: "select", options: ["text","email","password","number","tel","url"] },
  },
};
export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: { label: "Full name", placeholder: "Enter your name" },
};

export const WithHint: Story = {
  args: { label: "Email", hint: "We'll never share your email.", placeholder: "user@example.com", type: "email" },
};

export const Required: Story = {
  args: { label: "Username", required: true, placeholder: "Choose a username" },
};

export const ErrorState: Story = {
  args: { label: "Email", validationState: "error", validationMessage: "Enter a valid email address.", value: "not-an-email" },
};

export const SuccessState: Story = {
  args: { label: "Username", validationState: "success", validationMessage: "Username is available!", value: "johndoe" },
};

export const WarningState: Story = {
  args: { label: "Password", validationState: "warning", validationMessage: "Weak password — consider adding symbols.", value: "password123" },
};

export const WithCharCount: Story = {
  args: { label: "Bio", maxLength: 120, currentLength: 45, placeholder: "Tell us about yourself…" },
};

export const Small: Story = {
  args: { label: "Search query", size: "small", placeholder: "Search…" },
};

// ── Theme & RTL stories ──────────────────────────────────────────────────────

export const DarkMode: Story = {
  decorators: [(Story) => <FluentProvider theme={darkTheme}><div style={{padding:"1rem"}}><Story /></div></FluentProvider>],
  args: { label: "Name", placeholder: "Enter your name", required: true },
};

export const RTL: Story = {
  decorators: [(Story) => <FluentProvider theme={{}} dir="rtl"><div style={{padding:"1rem"}}><Story /></div></FluentProvider>],
  args: { label: "الاسم", placeholder: "أدخل اسمك", required: true },
};

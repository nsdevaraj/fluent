import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "../components/ui/Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Textarea is a multi-line text input for capturing longer freeform content like comments, descriptions, notes, or messages. It wraps Fluent UI's Textarea with configurable resize behavior and row count.",
      },
    },
  },
  argTypes: {
    disabled:        { control: "boolean" },
    required:        { control: "boolean" },
    validationState: { control: "select", options: ["none","error","warning","success"] },
    label:           { control: "text" },
    placeholder:     { control: "text" },
    resize:          { control: "select", options: ["none","vertical","horizontal","both"] },
  },
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: { label: "Description", placeholder: "Enter a description…" },
};

export const Required: Story = {
  args: { label: "Feedback", required: true, placeholder: "Share your thoughts…" },
};

export const WithCharCount: Story = {
  args: { label: "Bio", maxLength: 280, currentLength: 120, placeholder: "Tell us about yourself…", rows: 4 },
};

export const Error: Story = {
  args: { label: "Notes", validationState: "error", validationMessage: "This field is required.", rows: 3 },
};

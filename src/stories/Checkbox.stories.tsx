import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../components/ui/Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Checkbox is a form control with three states (checked, unchecked, indeterminate) for binary yes/no choices or selecting multiple independent items from a group. The indeterminate state represents a parent whose children are partially selected.",
      },
    },
  },
  argTypes: {
    checked:         { control: "boolean" },
    disabled:        { control: "boolean" },
    required:        { control: "boolean" },
    validationState: { control: "select", options: ["none","error","warning","success"] },
    label:           { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { label: "Accept terms and conditions" },
};

export const Checked: Story = {
  args: { label: "Remember me", checked: true },
};

export const Indeterminate: Story = {
  args: { label: "Select all (partial)", checked: "mixed" },
};

export const Disabled: Story = {
  args: { label: "Disabled option", disabled: true },
};

export const WithHint: Story = {
  args: { label: "Subscribe to newsletter", hint: "We send at most one email per week." },
};

import type { Meta, StoryObj } from "@storybook/react";
import { SpinButton } from "../components/ui/SpinButton";

const meta: Meta<typeof SpinButton> = {
  title: "Components/SpinButton",
  component: SpinButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "SpinButton is a numeric input with increment/decrement buttons, bounded between configurable min and max values. Values change via buttons, keyboard arrows, or direct text entry.",
      },
    },
  },
  argTypes: {
    size:       { control: "select", options: ["small", "medium"] },
    // [NON-STANDARD] underline/filled-darker removed — SpinButton uses outline only in this design system
    appearance: { control: "select", options: ["outline"] },
  },
};
export default meta;

type Story = StoryObj<typeof SpinButton>;

export const Default: Story = {
  args: { label: "Quantity", defaultValue: 1, min: 0, max: 100 },
};

export const WithPrecision: Story = {
  args: { label: "Price", defaultValue: 9.99, step: 0.01, precision: 2, prefix: "$" },
};

export const WithSuffix: Story = {
  args: { label: "Weight", defaultValue: 10, step: 0.5, suffix: " kg" },
};

export const Bounded: Story = {
  args: { label: "Percentage", defaultValue: 50, min: 0, max: 100, suffix: "%" },
};

export const Disabled: Story = {
  args: { label: "Disabled", defaultValue: 5, disabled: true },
};

export const WithValidation: Story = {
  args: {
    label: "Score",
    defaultValue: 0,
    min: 0,
    max: 100,
    validationState: "error",
    validationMessage: "Score must be between 0 and 100",
  },
};

// [NON-STANDARD] Underline — removed; SpinButton uses outline only in this design system
// TODO: review for removal
// export const Underline: Story = {
//   args: { label: "Count", defaultValue: 3, appearance: "underline" },
// };

export const Small: Story = {
  args: { label: "Quantity", defaultValue: 1, min: 0, max: 100, size: "small" },
};

export const Medium: Story = {
  args: { label: "Quantity", defaultValue: 1, min: 0, max: 100, size: "medium" },
};

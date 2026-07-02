import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "../components/ui/RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "RadioGroup presents a set of mutually exclusive option buttons where users must pick exactly one choice. All options are visible simultaneously, and the component manages keyboard navigation and ARIA grouping automatically.",
      },
    },
  },
  argTypes: {
    disabled:        { control: "boolean" },
    required:        { control: "boolean" },
    layout:          { control: "select", options: ["vertical","horizontal"] },
    validationState: { control: "select", options: ["none","error","warning","success"] },
    label:           { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof RadioGroup>;

const options = [
  { value: "xs",  label: "Extra small" },
  { value: "sm",  label: "Small" },
  { value: "md",  label: "Medium" },
  { value: "lg",  label: "Large", hint: "Recommended for most use cases" },
];

export const Vertical: Story = {
  args: { label: "T-shirt size", options, layout: "vertical" },
};

export const Horizontal: Story = {
  args: { label: "T-shirt size", options: options.slice(0, 3), layout: "horizontal" },
};

export const WithDefault: Story = {
  args: { label: "Plan", options, defaultValue: "md" },
};

export const Required: Story = {
  args: { label: "Shipping speed", options, required: true },
};

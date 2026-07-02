import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "../components/ui";

const meta: Meta<typeof Slider> = {
  title: "Phase 3/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Slider lets users select a value from a continuous or stepped range by dragging a thumb along a track. Best for settings perceived as relative quantities rather than exact numbers — like volume, brightness, or zoom.",
      },
    },
  },
  argTypes: {
    min:             { control: "number" },
    max:             { control: "number" },
    step:            { control: "number" },
    disabled:        { control: "boolean" },
    validationState: { control: "select", options: ["none","error","warning","success"] },
    label:           { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: { label: "Volume", defaultValue: 50 },
};

export const WithValue: Story = {
  args: { label: "Brightness", defaultValue: 75, showValue: true },
};

export const CustomRange: Story = {
  args: { label: "Zoom", min: 50, max: 200, step: 10, defaultValue: 100, showValue: true, formatValue: (v) => `${v}%` },
};

export const Small: Story = {
  args: { label: "Small slider", defaultValue: 30, size: "small", showValue: true },
};

export const Disabled: Story = {
  args: { label: "Disabled", defaultValue: 40, disabled: true },
};

export const WithValidation: Story = {
  args: {
    label: "Risk level",
    defaultValue: 90,
    showValue: true,
    validationState: "error",
    validationMessage: "Value too high",
  },
};

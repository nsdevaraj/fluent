import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "../components/ui/Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Switch is a toggle control representing a physical on/off switch for binary settings that take immediate effect — no form submission required. The key criterion is immediacy: the action happens the moment the switch is flipped.",
      },
    },
  },
  argTypes: {
    checked:         { control: "boolean" },
    disabled:        { control: "boolean" },
    label:           { control: "text" },
    validationState: { control: "select", options: ["none","error","warning","success"] },
  },
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: { label: "Enable notifications" },
};

export const Checked: Story = {
  args: { label: "Dark mode", checked: true },
};

export const LabelAfter: Story = {
  args: { label: "Auto-save", labelPosition: "after" },
};

export const Disabled: Story = {
  args: { label: "Feature flag", disabled: true, checked: false },
};

export const WithValidation: Story = {
  args: { label: "Accept data sharing", validationState: "error", validationMessage: "You must accept to continue." },
};

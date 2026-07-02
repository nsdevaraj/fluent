import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "../components/ui";

const meta: Meta<typeof Stepper> = {
  title: "Phase 3/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Stepper displays progress through a multi-step sequential workflow, with each step showing a number or icon, label, and completion state. Guides users through wizards, onboarding flows, and checkout processes.",
      },
    },
  },
  argTypes: {
    orientation: { control: "select", options: ["horizontal","vertical"] },
  },
};
export default meta;
type Story = StoryObj<typeof Stepper>;

const steps = [
  { label: "Account", description: "Create your account", status: "completed" as const },
  { label: "Profile", description: "Add your details", status: "current" as const },
  { label: "Review", description: "Confirm everything", status: "upcoming" as const },
  { label: "Submit", status: "upcoming" as const },
];

export const Default: Story = {
  args: { steps },
};

export const Vertical: Story = {
  args: { steps, orientation: "vertical" },
};

export const WithError: Story = {
  args: {
    steps: [
      { label: "Account", status: "completed" as const },
      { label: "Verify", status: "error" as const, description: "Verification failed" },
      { label: "Profile", status: "upcoming" as const },
    ],
  },
};

export const AllCompleted: Story = {
  args: {
    steps: steps.map((s) => ({ ...s, status: "completed" as const })),
  },
};

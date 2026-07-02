import type { Meta, StoryObj } from "@storybook/react";
import { InfoLabel } from "../components/ui/InfoLabel";

const meta: Meta<typeof InfoLabel> = {
  title: "Components/InfoLabel",
  component: InfoLabel,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "InfoLabel combines a label with a small information icon button that opens a Tooltip or Popover with explanatory content. Used to provide supplemental context for form fields or settings without cluttering the UI.",
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["small", "medium", "large"] },
  },
};
export default meta;

type Story = StoryObj<typeof InfoLabel>;

export const Default: Story = {
  args: {
    children: "Email address",
    infoText: "We'll only use this to send important account notifications.",
  },
};

export const Required: Story = {
  args: {
    children: "Password",
    required: true,
    infoText: "Must be at least 8 characters with a number and a symbol.",
  },
};

export const Small: Story = {
  args: {
    children: "Username",
    size: "small",
    infoText: "3–20 characters, letters and numbers only.",
  },
};

export const Large: Story = {
  args: {
    children: "Organization name",
    size: "large",
    infoText: "This will appear on all public-facing documents.",
  },
};

export const LongTooltip: Story = {
  args: {
    children: "API rate limit",
    infoText:
      "The maximum number of requests your integration can make per minute. Exceeding this limit will result in HTTP 429 responses. Contact support to request an increase.",
  },
};

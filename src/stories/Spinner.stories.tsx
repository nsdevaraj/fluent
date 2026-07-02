import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "../components/ui/Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Spinner alerts users that content is loading or processing by rendering an animated circular indicator. Used for indeterminate operations where a progress percentage cannot be provided.\n\n**When to use:** Operations in progress with unknown duration — lazy-loading a panel, submitting a form, waiting for an API response. Best for short or indeterminate loading states.\n\n**When NOT to use:** When the duration is known and representable as a percentage (use ProgressBar). Without an accessible label — screen readers must announce the loading state.",
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["tiny", "extra-small", "small", "medium", "large", "extra-large", "huge"] },
    labelPosition: { control: "select", options: ["above", "below", "before", "after"] },
  },
};
export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story   = { args: {} };
export const WithLabel: Story = { args: { label: "Loading data…" } };
export const LabelAbove: Story  = { args: { label: "Please wait", labelPosition: "above" } };
export const Large: Story     = { args: { size: "large", label: "Loading…" } };
export const Tiny: Story      = { args: { size: "tiny" } };

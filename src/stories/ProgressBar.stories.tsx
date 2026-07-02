import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "../components/ui";

const meta: Meta<typeof ProgressBar> = {
  title: "Phase 3/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "ProgressBar provides a visual representation of loading or processing as a horizontal bar. Supports determinate mode (known percentage) and indeterminate mode (unknown duration, animated shimmer).\n\n**When to use:** Showing meaningful loading/processing progress — file uploads, multi-step form submissions, data loading where a completion percentage can be communicated.\n\n**When NOT to use:** When progress duration is completely unknown and cannot be approximated (use Spinner). Decorative percentage displays unrelated to an active process.",
      },
    },
  },
  argTypes: {
    value:     { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    color:     { control: "select", options: ["brand","success","warning","error"] },
    thickness: { control: "select", options: ["medium","large"] },
    label:     { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: { label: "Loading…", value: 0.4 },
};

export const WithPercentage: Story = {
  args: { label: "Uploading file", value: 0.72, showPercentage: true },
};

export const Indeterminate: Story = {
  args: { label: "Processing…" },
};

export const Success: Story = {
  args: { label: "Complete", value: 1, color: "success", showPercentage: true },
};

export const Error: Story = {
  args: { label: "Failed", value: 0.35, color: "error", hint: "Upload failed. Please retry." },
};

export const Warning: Story = {
  args: { label: "Slow connection", value: 0.6, color: "warning" },
};

export const Large: Story = {
  args: { label: "Thick bar", value: 0.5, thickness: "large" },
};

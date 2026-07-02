import type { Meta, StoryObj } from "@storybook/react";
import { Save20Regular } from "@fluentui/react-icons";
import { SplitButton } from "../components/ui/SplitButton";

const meta: Meta<typeof SplitButton> = {
  title: "Components/SplitButton",
  component: SplitButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "SplitButton combines a primary action button with a chevron that opens a dropdown menu of related secondary actions. The left area executes the default action directly; the right chevron reveals alternatives.",
      },
    },
  },
  argTypes: {
    appearance: { control: "select", options: ["primary", "secondary", "outline"] },
    // [NON-STANDARD] "large" removed — SplitButton official API supports small | medium only
    size: { control: "select", options: ["small", "medium"] },
  },
};
export default meta;

type Story = StoryObj<typeof SplitButton>;

const items = [
  { id: "save",       label: "Save" },
  { id: "save-copy",  label: "Save a copy" },
  { id: "div",        type: "divider" as const },
  { id: "save-pdf",   label: "Export as PDF" },
];

export const Primary: Story = {
  args: { label: "Save", appearance: "primary", items },
};

export const Secondary: Story = {
  args: { label: "Save", appearance: "secondary", items },
};

export const Outline: Story = {
  args: { label: "Save", appearance: "outline", items },
};

export const WithIcon: Story = {
  args: { label: "Save", appearance: "primary", icon: <Save20Regular />, items },
};

export const Disabled: Story = {
  args: { label: "Save", appearance: "primary", disabled: true, items },
};

export const Small: Story = {
  args: { label: "Save", appearance: "primary", size: "small", items },
};

// [NON-STANDARD] Large — removed; SplitButton supports small | medium only
// TODO: review for removal
// export const Large: Story = {
//   args: { label: "Save", appearance: "primary", size: "large", items },
// };

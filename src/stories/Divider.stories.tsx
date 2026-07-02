import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "../components/ui/Divider";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Divider is a thin horizontal or vertical line for visually separating content into sections. Can optionally contain a label or icon centered on the line.\n\n**When to use:** Organizing related content groups within a single surface — separating form sections, menu item groups, or logical groupings in a layout. A labeled Divider serves as a section header within a list.\n\n**When NOT to use:** As a substitute for proper heading hierarchy or whitespace/padding separation — prefer spacing tokens when a semantic section break is not needed.",
      },
    },
  },
  argTypes: {
    vertical:  { control: "boolean" },
    inset:     { control: "boolean" },
    label:     { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = { args: {} };
export const WithLabel: Story = { args: { label: "or continue with" } };
export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", height: 40, alignItems: "center" }}>
      <span>Left</span>
      <Divider vertical />
      <span>Right</span>
    </div>
  ),
};

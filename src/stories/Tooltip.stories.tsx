import type { Meta, StoryObj } from "@storybook/react";
import { Button as FluentButton } from "@fluentui/react-components";
import { Tooltip } from "../components/ui";

const meta: Meta<typeof Tooltip> = {
  title: "Phase 3/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Tooltip is a brief, non-interactive floating label appearing on hover or focus to clarify the purpose of a UI element. It is dismissed when the pointer moves away or focus leaves.",
      },
    },
  },
  argTypes: {
    content:      { control: "text" },
    relationship: { control: "select", options: ["label","description","inaccessible"] },
    positioning:  { control: "select", options: ["above","below","before","after"] },
  },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    children: <FluentButton>Hover me</FluentButton>,
  },
};

export const NoArrow: Story = {
  args: {
    content: "No arrow variant",
    withArrow: false,
    children: <FluentButton>Hover me</FluentButton>,
  },
};

export const LabelRelationship: Story = {
  args: {
    content: "Icon button: add item",
    relationship: "label",
    children: <FluentButton icon={<span>+</span>} />,
  },
};

export const PositionedAbove: Story = {
  args: {
    content: "Positioned above",
    positioning: "above",
    children: <FluentButton>Hover me</FluentButton>,
  },
};

export const SlowReveal: Story = {
  args: {
    content: "Slow to appear",
    showDelay: 1000,
    children: <FluentButton>Hover me</FluentButton>,
  },
};

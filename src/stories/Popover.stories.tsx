import type { Meta, StoryObj } from "@storybook/react";
import { Button as FluentButton } from "@fluentui/react-components";
import { Popover } from "../components/ui";

const meta: Meta<typeof Popover> = {
  title: "Phase 3/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Popover is a non-modal floating surface anchored to a trigger, displaying additional interactive content or controls on click. Unlike Tooltip, Popover can contain buttons, forms, and other interactive elements.",
      },
    },
  },
  argTypes: {
    placement:    { control: "select", options: ["top","bottom","start","end","top-start","top-end"] },
    triggerLabel: { control: "text" },
    title:        { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    trigger: <FluentButton>Open popover</FluentButton>,
    content: "This is popover content. It can contain text or any elements.",
  },
};

export const WithHeading: Story = {
  args: {
    trigger: <FluentButton appearance="primary">Info</FluentButton>,
    heading: "What is this?",
    content: "This feature helps you manage user permissions across the organization.",
  },
};

export const NoArrow: Story = {
  args: {
    trigger: <FluentButton>No arrow</FluentButton>,
    content: "Popover without an arrow pointer.",
    withArrow: false,
  },
};

export const PositionedAbove: Story = {
  args: {
    trigger: <FluentButton>Above</FluentButton>,
    content: "Popover positioned above the trigger.",
    positioning: "above",
  },
};

export const TrapFocus: Story = {
  args: {
    trigger: <FluentButton>Focusable</FluentButton>,
    heading: "Modal popover",
    content: "This popover traps keyboard focus for accessibility.",
    trapFocus: true,
  },
};

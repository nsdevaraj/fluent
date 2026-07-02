import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../components/ui";
import { Button as FluentButton } from "@fluentui/react-components";

const meta: Meta<typeof Card> = {
  title: "Phase 3/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Card is a visually bounded container grouping related content and actions about a single subject — such as a file, person, email, or article. Supports interactive (selectable/clickable) and non-interactive variants.",
      },
    },
  },
  argTypes: {
    size:      { control: "select", options: ["small", "medium", "large"] },
    selected:  { control: "boolean" },
    clickable: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    header: { title: "Project Alpha", subtitle: "Engineering" },
    children: <p style={{ margin: 0 }}>A project card with header and body content.</p>,
  },
};

export const WithFooter: Story = {
  args: {
    header: { title: "Report Q1", subtitle: "Finance" },
    children: <p style={{ margin: 0 }}>Quarterly financial summary.</p>,
    footer: <FluentButton appearance="primary" size="small">View report</FluentButton>,
  },
};

export const FilledAlternative: Story = {
  args: {
    header: { title: "Task Board" },
    children: <p style={{ margin: 0 }}>filled-alternative appearance card.</p>,
    appearance: "filled-alternative",
  },
};

export const Subtle: Story = {
  args: {
    header: { title: "Subtle Card" },
    children: <p style={{ margin: 0 }}>Subtle appearance.</p>,
    appearance: "subtle",
  },
};

export const Clickable: Story = {
  args: {
    header: { title: "Clickable Card" },
    children: <p style={{ margin: 0 }}>Click anywhere on this card.</p>,
    onClick: () => alert("Card clicked"),
  },
};

export const Small: Story = {
  args: {
    header: { title: "Small Card" },
    children: <p style={{ margin: 0 }}>Small size variant.</p>,
    size: "small",
  },
};

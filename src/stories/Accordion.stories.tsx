import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "../components/ui";

const meta: Meta<typeof Accordion> = {
  title: "Phase 3/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Accordion allows users to toggle the display of content by expanding or collapsing sections. It conserves vertical space by hiding content until the user actively needs it — ideal for FAQs, settings panels, and grouped form sections.",
      },
    },
  },
  argTypes: {
    collapsible: { control: "boolean" },
    multiple:    { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Accordion>;

const items = [
  { value: "a", header: "What is Fluent 2?", content: <p>Fluent 2 is Microsoft's design system.</p> },
  { value: "b", header: "How do I use tokens?", content: <p>Import tokens and reference them in makeStyles.</p> },
  { value: "c", header: "Disabled panel", content: <p>You shouldn't see this.</p>, disabled: true },
];

export const Default: Story = {
  args: { items },
};

export const Multiple: Story = {
  args: { items, multiple: true },
};

export const FilledDarker: Story = {
  args: { items, appearance: "filled-darker" },
};

export const FilledAlternative: Story = {
  args: { items, appearance: "filled-alternative" },
};


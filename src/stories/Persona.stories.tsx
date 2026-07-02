import type { Meta, StoryObj } from "@storybook/react";
import { Persona } from "../components/ui/Persona";

const meta: Meta<typeof Persona> = {
  title: "Components/Persona",
  component: Persona,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Persona combines an Avatar with a person's name, secondary text (job title), and tertiary text (status), providing a consistent way to represent a person's identity with contextual information.",
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["extra-small", "small", "medium", "large", "extra-large", "huge"] },
  },
};
export default meta;

type Story = StoryObj<typeof Persona>;

export const Default: Story = {
  args: { name: "Alice Martinez", secondaryText: "Engineering Lead", size: "medium" },
};

export const Available: Story = {
  args: { name: "Bob Kim", secondaryText: "Designer", size: "medium", presence: "available" },
};

export const Busy: Story = {
  args: { name: "Carol Smith", secondaryText: "Product Manager", size: "medium", presence: "busy" },
};

export const Away: Story = {
  args: { name: "David Lee", secondaryText: "Developer", size: "medium", presence: "away" },
};

export const Large: Story = {
  args: { name: "Eva Rodriguez", secondaryText: "Director of Design", size: "large", presence: "available" },
};

export const ExtraLarge: Story = {
  args: { name: "Frank Brown", secondaryText: "VP of Engineering", size: "extra-large" },
};

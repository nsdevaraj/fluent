import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "../components/ui/Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Breadcrumb is a navigation aid showing the user's current location within a hierarchy and providing links to parent levels. Rendered as a horizontal trail of links separated by dividers.",
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["small", "medium"] },
  },
};
export default meta;

type Story = StoryObj<typeof Breadcrumb>;

const items = [
  { key: "home",     text: "Home",     href: "/" },
  { key: "products", text: "Products", href: "/products" },
  { key: "current",  text: "Widget X" },
];

export const Default: Story = {
  args: { items },
};

export const Small: Story = {
  args: { items, size: "small" },
};

export const TwoLevels: Story = {
  args: {
    items: [
      { key: "home",    text: "Home",    href: "/" },
      { key: "current", text: "Settings" },
    ],
  },
};

export const ManyLevels: Story = {
  args: {
    items: [
      { key: "a", text: "Root",      href: "/" },
      { key: "b", text: "Section",   href: "/section" },
      { key: "c", text: "Subsection",href: "/section/sub" },
      { key: "d", text: "Category",  href: "/section/sub/cat" },
      { key: "e", text: "Item" },
    ],
  },
};

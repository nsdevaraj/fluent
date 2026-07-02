import type { Meta, StoryObj } from "@storybook/react";
import { Open20Regular } from "@fluentui/react-icons";
import { Link } from "../components/ui/Link";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Link renders as an anchor element for navigation to a URL or as an inline textual action following hyperlink conventions — visually distinguished by color and optional underline.",
      },
    },
  },
  argTypes: {
    appearance: { control: "select", options: ["default", "subtle"] },
  },
};
export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: { href: "https://fluent2.microsoft.com", children: "Fluent 2 design system" },
};

export const Subtle: Story = {
  args: { href: "#", appearance: "subtle", children: "Subtle link" },
};

export const Inline: Story = {
  render: () => (
    <span>
      Read more about{" "}
      <Link href="https://react.dev" target="_blank">React</Link>{" "}
      and{" "}
      <Link href="https://www.typescriptlang.org" target="_blank">TypeScript</Link>.
    </span>
  ),
};

export const WithIcon: Story = {
  args: {
    href: "https://fluent2.microsoft.com",
    target: "_blank",
    children: (
      <>
        Open in new tab <Open20Regular style={{ verticalAlign: "middle" }} />
      </>
    ),
  },
};

export const Disabled: Story = {
  args: { href: "#", disabled: true, children: "Disabled link" },
};

export const RTL: Story = {
  render: () => (
    <div dir="rtl">
      <Link href="#">اقرأ المزيد</Link>
    </div>
  ),
};

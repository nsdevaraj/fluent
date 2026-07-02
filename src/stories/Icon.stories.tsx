import type { Meta, StoryObj } from "@storybook/react";
import { Add20Regular, Heart20Regular, Warning20Regular } from "@fluentui/react-icons";
import { Icon } from "../components/ui/Icon";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Icon renders Fluent icons from @fluentui/react-icons with consistent sizing and color inheriting from the surrounding text. Provides a thin wrapper for easy integration with design system tokens.",
      },
    },
  },
  argTypes: {
    color: { control: "select", options: ["default", "muted", "brand", "success", "warning", "danger", "inherit"] },
    size:  { control: "number" },
  },
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const Decorative: Story   = { args: { icon: <Add20Regular />, color: "default" } };
export const Meaningful: Story   = { args: { icon: <Add20Regular />, "aria-label": "Add item" } };
export const Brand: Story        = { args: { icon: <Heart20Regular />, color: "brand" } };
export const Warning: Story      = { args: { icon: <Warning20Regular />, color: "warning", size: 24 } };
export const Danger: Story       = { args: { icon: <Warning20Regular />, color: "danger" } };
export const Large: Story        = { args: { icon: <Add20Regular />, size: 32, color: "brand" } };

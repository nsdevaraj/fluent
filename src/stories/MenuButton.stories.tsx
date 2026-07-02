import type { Meta, StoryObj } from "@storybook/react";
import { ChevronDown20Regular } from "@fluentui/react-icons";
import { MenuButton } from "../components/ui/MenuButton";

const meta: Meta<typeof MenuButton> = {
  title: "Components/MenuButton",
  component: MenuButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "MenuButton is a Button with a built-in chevron indicating that clicking it always opens a dropdown menu. Unlike SplitButton, the entire button surface is a single target that always opens the menu — there is no standalone primary action.",
      },
    },
  },
  argTypes: {
    // [NON-STANDARD] "outline" and "transparent" removed — MenuButton official appearances: primary | secondary | subtle
    appearance: { control: "select", options: ["primary", "secondary", "subtle"] },
    // [NON-STANDARD] "large" removed — MenuButton official sizes: small | medium only
    size: { control: "select", options: ["small", "medium"] },
  },
};
export default meta;

type Story = StoryObj<typeof MenuButton>;

const items = [
  { id: "save",     label: "Save" },
  { id: "save-as",  label: "Save as…" },
  { id: "div",      type: "divider" as const },
  { id: "export",   label: "Export to PDF" },
];

export const Primary: Story = {
  args: { label: "Save", appearance: "primary", items },
};

export const Secondary: Story = {
  args: { label: "Options", appearance: "secondary", items },
};

// [NON-STANDARD] Outline — removed; MenuButton does not support outline appearance
// TODO: review for removal
// export const Outline: Story = {
//   args: { label: "Export", appearance: "outline", items },
// };

export const WithIcon: Story = {
  args: {
    label: "Actions",
    appearance: "primary",
    icon: <ChevronDown20Regular />,
    items,
  },
};

export const Disabled: Story = {
  args: { label: "Unavailable", appearance: "primary", disabled: true, items },
};

export const Small: Story = {
  args: { label: "Save", appearance: "secondary", size: "small", items },
};

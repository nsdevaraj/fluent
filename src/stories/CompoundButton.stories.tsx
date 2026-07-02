// [REMOVED] CompoundButton — marked for removal from this design system.
// TODO: review for removal — confirm with team before deleting this file.
import type { Meta } from "@storybook/react";
import { CompoundButton } from "../components/ui/CompoundButton";

const meta: Meta<typeof CompoundButton> = {
  title: "Components/CompoundButton",
  component: CompoundButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "⚠️ This component has been marked for removal from this design system. No stories are active.",
      },
    },
  },
};
export default meta;

// All stories removed — component excluded from this design system scope.
// Original stories (Primary, Secondary, Disabled, Small) preserved below for reference.
// TODO: review for removal
//
// import { Add20Regular, Settings20Regular } from "@fluentui/react-icons";
// import type { StoryObj } from "@storybook/react";
// type Story = StoryObj<typeof CompoundButton>;
//
// export const Primary: Story = {
//   args: { appearance: "primary", children: "New file", secondaryContent: "Create a blank document", icon: <Add20Regular /> },
// };
// export const Secondary: Story = {
//   args: { appearance: "secondary", children: "Settings", secondaryContent: "Configure your preferences", icon: <Settings20Regular /> },
// };
// export const Disabled: Story = {
//   args: { appearance: "primary", children: "Disabled", secondaryContent: "This action is unavailable", disabled: true },
// };
// export const Small: Story = {
//   args: { appearance: "primary", size: "small", children: "Create", secondaryContent: "Quick create" },
// };

import type { Meta, StoryObj } from "@storybook/react";
import { People20Regular, Checkmark20Regular, Clock20Regular } from "@fluentui/react-icons";
import { DataCard } from "../components/ui/DataCard";

const meta: Meta<typeof DataCard> = {
  title: "Components/DataCard",
  component: DataCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "DataCard is a metric display component for showing key performance indicators and summary statistics — a value, a label, and optional trend/comparison data — in a visually consistent card format.",
      },
    },
  },
  argTypes: {
    label:       { control: "text" },
    value:       { control: "text" },
    description: { control: "text" },
    trendUp:     { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof DataCard>;

export const WithTrendUp: Story = {
  args: { label: "Total Users", value: "1,284", trend: "+12%", trendUp: true, icon: <People20Regular /> },
};

export const WithTrendDown: Story = {
  args: { label: "Active Sessions", value: "392", trend: "-8%", trendUp: false, icon: <Clock20Regular /> },
};

export const WithDescription: Story = {
  args: { label: "Completed Tasks", value: "312", description: "This quarter", icon: <Checkmark20Regular /> },
};

export const MinimalNoIcon: Story = {
  args: { label: "Revenue", value: "$48,200" },
};

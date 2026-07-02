import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton, SkeletonItem, SkeletonText, SkeletonCard } from "../components/ui/Skeleton";

const meta: Meta = {
  title: "Components/Skeleton",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Skeleton is a shimmer animation placeholder shown while data loads, mimicking the shape of the incoming content. It reduces perceived wait time by giving users a structural preview of the layout.\n\n**When to use:** In place of actual content while data is loading — cards, lists, feeds, profile sections where the content shape is predictable and a structural preview reduces perceived latency.\n\n**When NOT to use:** Very brief async operations (use Spinner). When skeleton shapes bear no resemblance to actual content. When content loads near-instantly.",
      },
    },
  },
  argTypes: {
    animation: { control: "select", options: ["wave","pulse"] },
    lines:     { control: "number" },
  },
};
export default meta;

export const TextBlock: StoryObj = {
  render: () => <SkeletonText lines={4} />,
};

export const TextBlockPulse: StoryObj = {
  render: () => <SkeletonText lines={3} animation="pulse" />,
};

export const Card: StoryObj = {
  render: () => <SkeletonCard />,
};

export const CustomLayout: StoryObj = {
  render: () => (
    <Skeleton>
      <SkeletonItem shape="circle" size={48} />
      <SkeletonItem shape="rectangle" style={{ width: "100%", height: 20, marginTop: 8 }} />
      <SkeletonItem shape="rectangle" style={{ width: "60%", height: 16, marginTop: 6 }} />
    </Skeleton>
  ),
};

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Rating } from "../components/ui/Rating";

const meta: Meta<typeof Rating> = {
  title: "Components/Rating",
  component: Rating,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Rating allows users to view or input a star-based (or custom icon) score. The `Rating` component is interactive for input; `RatingDisplay` is read-only for showing existing scores.\n\n**When to use:** Capturing user satisfaction scores for products, reviews, or experiences. Displaying aggregate ratings in product cards, listings, or feedback forms.\n\n**When NOT to use:** Precise numeric scale input (use Slider or radio group for NPS surveys). Binary or non-scalar choices (use Checkbox or Switch). More than one interactive Rating per form section without clear labels.",
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["small", "medium", "large"] },
    count: { control: { type: "number", min: 1, max: 10 } },
  },
};
export default meta;

type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  args: { value: 3, count: 5 },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return <Rating value={value} count={5} onChange={setValue} />;
  },
};

export const ReadOnly: Story = {
  args: { value: 4.5, count: 5, readOnly: true },
};

export const Small: Story = {
  args: { value: 3, count: 5, size: "small" },
};

export const Large: Story = {
  args: { value: 3, count: 5, size: "large" },
};

export const TenStars: Story = {
  args: { value: 7, count: 10 },
};

export const Disabled: Story = {
  args: { value: 3, count: 5, disabled: true },
};

export const WithLabel: Story = {
  args: { value: 4, count: 5, label: "Rate this product" },
};

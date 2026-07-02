import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "../components/ui/Image";

const meta: Meta<typeof Image> = {
  title: "Components/Image",
  component: Image,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Image wraps the HTML `<img>` element with Fluent styling support for fit, shape (rounded, circular, square), shadow, and block/inline layout. Handles responsive sizing and aspect-ratio constraints.",
      },
    },
  },
  argTypes: {
    fit: { control: "select", options: ["none", "center", "contain", "cover", "default"] },
    shape: { control: "select", options: ["square", "rounded", "circular"] },
  },
};
export default meta;

type Story = StoryObj<typeof Image>;

const placeholder = "https://via.placeholder.com/400x200";

export const Default: Story = {
  args: { src: placeholder, alt: "Placeholder image", width: 400, height: 200 },
};

export const Rounded: Story = {
  args: { src: placeholder, alt: "Rounded image", shape: "rounded", width: 200, height: 200 },
};

export const Circular: Story = {
  args: { src: placeholder, alt: "Circular image", shape: "circular", width: 120, height: 120 },
};

export const Cover: Story = {
  args: { src: placeholder, alt: "Cover fit", fit: "cover", width: 300, height: 150 },
};

export const Contain: Story = {
  args: { src: placeholder, alt: "Contain fit", fit: "contain", width: 300, height: 150 },
};

export const WithCaption: Story = {
  args: {
    src: placeholder,
    alt: "Image with caption",
    caption: "Figure 1: Example placeholder image",
    width: 400,
    height: 200,
  },
};

export const Bordered: Story = {
  args: { src: placeholder, alt: "Bordered image", bordered: true, width: 300, height: 150 },
};

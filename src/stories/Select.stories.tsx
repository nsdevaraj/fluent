import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "../components/ui/Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Select wraps the native browser `<select>` element with Fluent visual styling, preserving full cross-platform accessibility and mobile-native picker behavior.",
      },
    },
  },
  argTypes: {
    size:            { control: "select", options: ["small","medium"] },
    disabled:        { control: "boolean" },
    required:        { control: "boolean" },
    validationState: { control: "select", options: ["none","error","warning","success"] },
    label:           { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Select>;

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

const grouped = [
  { group: "Fruits",      options: fruits },
  { group: "Vegetables",  options: [{ value: "carrot", label: "Carrot" }, { value: "broccoli", label: "Broccoli" }] },
];

export const Default: Story = {
  args: { label: "Fruit", options: fruits, placeholder: "Choose a fruit" },
};

export const Small: Story = {
  args: { label: "Fruit", options: fruits, placeholder: "Choose a fruit", size: "small" },
};

export const Medium: Story = {
  args: { label: "Fruit", options: fruits, placeholder: "Choose a fruit", size: "medium" },
};

export const Required: Story = {
  args: { label: "Fruit", options: fruits, required: true },
};

export const WithGroups: Story = {
  args: { label: "Food", options: grouped },
};

export const Error: Story = {
  args: { label: "Fruit", options: fruits, validationState: "error", validationMessage: "Please select an option." },
};

export const Disabled: Story = {
  args: { label: "Fruit", options: fruits, disabled: true },
};

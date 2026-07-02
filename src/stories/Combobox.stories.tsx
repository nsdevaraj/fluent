import type { Meta, StoryObj } from "@storybook/react";
import { Combobox } from "../components/ui/Combobox";

const meta: Meta<typeof Combobox> = {
  title: "Components/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Combobox combines a text input with a dropdown list, letting users type to filter options or select from a predefined set. Supports single and multi-select, option grouping, and freeform input.",
      },
    },
  },
  argTypes: {
    size:            { control: "select", options: ["small","medium","large"] },
    disabled:        { control: "boolean" },
    required:        { control: "boolean" },
    validationState: { control: "select", options: ["none","error","warning","success"] },
    label:           { control: "text" },
    placeholder:     { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Combobox>;

const languages = [
  { value: "ts",  label: "TypeScript" },
  { value: "js",  label: "JavaScript" },
  { value: "py",  label: "Python" },
  { value: "go",  label: "Go" },
  { value: "rs",  label: "Rust" },
];

const grouped = [
  { group: "Frontend", options: [{ value: "ts", label: "TypeScript" }, { value: "js", label: "JavaScript" }] },
  { group: "Backend",  options: [{ value: "py", label: "Python" }, { value: "go", label: "Go" }, { value: "rs", label: "Rust" }] },
];

export const Default: Story = {
  args: { label: "Language", options: languages, placeholder: "Select a language" },
};

export const Small: Story = {
  args: { label: "Language", options: languages, placeholder: "Select a language", size: "small" },
};

export const Medium: Story = {
  args: { label: "Language", options: languages, placeholder: "Select a language", size: "medium" },
};

export const Required: Story = {
  args: { label: "Language", options: languages, required: true },
};

export const Grouped: Story = {
  args: { label: "Language by tier", options: grouped },
};

export const Error: Story = {
  args: { label: "Language", options: languages, validationState: "error", validationMessage: "Please select a language." },
};

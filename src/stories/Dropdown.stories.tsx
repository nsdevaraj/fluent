import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FluentProvider } from "@fluentui/react-components";
import { Dropdown } from "../components/ui/Dropdown";
import { darkTheme } from "../themes";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Dropdown is a selection control that presents a bounded list of options in a popup. Unlike Combobox, the trigger is button-like — users pick from the list without typing to filter.",
      },
    },
  },
  argTypes: {
    disabled:     { control: "boolean" },
    multiselect:  { control: "boolean" },
    // [NON-STANDARD] underline/filled-darker/filled-lighter removed — Dropdown uses outline only in this design system
    appearance:   { control: "select", options: ["outline"] },
    // [NON-STANDARD] "large" removed — Dropdown official sizes: small | medium only
    size:         { control: "select", options: ["small", "medium"] },
    placeholder:  { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

// ── Shared data ────────────────────────────────────────────────────────────────

const colors = [
  { value: "red",    text: "Red" },
  { value: "green",  text: "Green" },
  { value: "blue",   text: "Blue" },
  { value: "yellow", text: "Yellow" },
  { value: "purple", text: "Purple" },
];

const roles = [
  { value: "admin",   text: "Admin" },
  { value: "editor",  text: "Editor" },
  { value: "viewer",  text: "Viewer" },
  { value: "guest",   text: "Guest", disabled: true },
];

const groupedFruits = [
  {
    label: "Citrus",
    options: [
      { value: "orange", text: "Orange" },
      { value: "lemon",  text: "Lemon" },
      { value: "lime",   text: "Lime" },
    ],
  },
  {
    label: "Berries",
    options: [
      { value: "strawberry", text: "Strawberry" },
      { value: "blueberry",  text: "Blueberry" },
      { value: "raspberry",  text: "Raspberry" },
    ],
  },
  {
    label: "Tropical",
    options: [
      { value: "mango",     text: "Mango" },
      { value: "pineapple", text: "Pineapple" },
    ],
  },
];

const tags = [
  { value: "design",      text: "Design" },
  { value: "engineering", text: "Engineering" },
  { value: "product",     text: "Product" },
  { value: "marketing",   text: "Marketing" },
  { value: "sales",       text: "Sales" },
];

// ── Stories ────────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    options: colors,
    placeholder: "Select a color",
    "aria-label": "Color",
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: colors,
    defaultValue: "blue",
    "aria-label": "Color",
  },
};

export const Grouped: Story = {
  args: {
    groups: groupedFruits,
    placeholder: "Select a fruit",
    "aria-label": "Fruit",
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: roles,
    placeholder: "Select a role",
    "aria-label": "Role",
  },
};

export const Multiselect: Story = {
  args: {
    options: tags,
    multiselect: true,
    placeholder: "Select tags",
    "aria-label": "Tags",
  },
};

export const MultiselectWithDefaults: Story = {
  args: {
    options: tags,
    multiselect: true,
    defaultValue: ["design", "engineering"],
    "aria-label": "Tags",
  },
};

export const Small: Story = {
  args: {
    options: colors,
    size: "small",
    placeholder: "Select a color",
    "aria-label": "Color",
  },
};

// [NON-STANDARD] Large — removed; Dropdown supports small | medium only in this design system
// TODO: review for removal
// export const Large: Story = {
//   args: { options: colors, size: "large", placeholder: "Select a color", "aria-label": "Color" },
// };

// [NON-STANDARD] FilledDarker — removed; only outline appearance used in this design system
// TODO: review for removal
// export const FilledDarker: Story = {
//   args: { options: colors, appearance: "filled-darker", placeholder: "Select a color", "aria-label": "Color" },
// };

// [NON-STANDARD] Underline — removed; only outline appearance used in this design system
// TODO: review for removal
// export const Underline: Story = {
//   args: { options: colors, appearance: "underline", placeholder: "Select a color", "aria-label": "Color" },
// };

export const Disabled: Story = {
  args: {
    options: colors,
    disabled: true,
    defaultValue: "blue",
    "aria-label": "Color",
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <FluentProvider theme={darkTheme}>
        <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "12px", width: "280px" }}>
          <Story />
        </div>
      </FluentProvider>
    ),
  ],
  args: {
    options: colors,
    placeholder: "Select a color",
    "aria-label": "Color",
  },
};

// [NON-STANDARD] AllAppearances — updated to outline only; underline/filled-darker/filled-lighter removed
// TODO: review for removal if single appearance is not useful as a story
export const AllAppearances: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "280px" }}>
      <Dropdown options={colors} appearance="outline" placeholder="Outline" aria-label="Outline" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "280px" }}>
      <Dropdown options={colors} size="small"  placeholder="Small"  aria-label="Small" />
      <Dropdown options={colors} size="medium" placeholder="Medium" aria-label="Medium" />
      {/* [NON-STANDARD] large removed — Dropdown supports small | medium only */}
    </div>
  ),
};

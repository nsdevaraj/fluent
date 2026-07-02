import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { tokens } from "@fluentui/react-components";
import { SearchInput } from "../components/ui/SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "Components/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "SearchInput is a text input pre-configured for search interactions, with a built-in search icon and dismiss button. It exposes the correct ARIA role='searchbox' semantics for assistive technologies.",
      },
    },
  },
  argTypes: {
    placeholder: { control: "text" },
    disabled:    { control: "boolean" },
    // [NON-STANDARD] "large" removed — official SearchBox API supports small | medium only
    size:        { control: "select", options: ["small","medium"] },
  },
};
export default meta;

export const Default: StoryObj = {
  render: () => {
    const [q, setQ] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS }}>
        <SearchInput onSearch={setQ} placeholder="Search projects…" />
        {q && <span style={{ fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3 }}>Query: {q}</span>}
      </div>
    );
  },
};

export const Debounced: StoryObj = {
  render: () => {
    const [q, setQ] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS }}>
        <SearchInput onSearch={setQ} placeholder="Search (300ms debounce)…" debounceMs={300} />
        {q && <span style={{ fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3 }}>Debounced: {q}</span>}
      </div>
    );
  },
};

export const Disabled: StoryObj = {
  render: () => <SearchInput onSearch={() => {}} placeholder="Disabled search" disabled />,
};

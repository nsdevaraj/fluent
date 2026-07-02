import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FluentProvider } from "@fluentui/react-components";
import { TimePicker } from "../components/ui/TimePicker";
import { darkTheme } from "../themes";

const meta: Meta<typeof TimePicker> = {
  title: "Components/TimePicker",
  component: TimePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "TimePicker is a dropdown/freeform input (from @fluentui/react-timepicker-compat) for selecting a time value. Supports 12-hour and 24-hour clock formats and configurable minute increments such as every 15 or 30 minutes.",
      },
    },
  },
  argTypes: {
    disabled:        { control: "boolean" },
    required:        { control: "boolean" },
    validationState: { control: "select", options: ["none", "error", "warning", "success"] },
    hourCycle:       { control: "select", options: [12, 24] },
    increment:       { control: "select", options: [15, 30, 60] },
    appearance:      { control: "select", options: ["outline", "underline", "filled-darker", "filled-lighter"] },
    size:            { control: "select", options: ["small", "medium"] },
    label:           { control: "text" },
    placeholder:     { control: "text" },
    validationMessage: { control: "text" },
    hint:            { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof TimePicker>;

// ── Stories ────────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: "Meeting time",
    placeholder: "Select a time",
  },
};

export const TwelveHourClock: Story = {
  args: {
    label: "Appointment time",
    hourCycle: 12,
    placeholder: "Select a time",
  },
};

export const FifteenMinuteIncrements: Story = {
  args: {
    label: "Booking slot",
    increment: 15,
    placeholder: "Select a time",
  },
};

export const BusinessHoursOnly: Story = {
  args: {
    label: "Office hours",
    startHour: 9,
    endHour: 18,
    increment: 30,
    placeholder: "Select a time",
  },
};

export const Required: Story = {
  args: {
    label: "Start time",
    required: true,
    placeholder: "Select a time",
  },
};

export const WithHint: Story = {
  args: {
    label: "Reminder time",
    hint: "Times are shown in your local timezone.",
    placeholder: "Select a time",
  },
};

export const Error: Story = {
  args: {
    label: "Departure time",
    validationState: "error",
    validationMessage: "Please select a valid time.",
    placeholder: "Select a time",
  },
};

export const Warning: Story = {
  args: {
    label: "Departure time",
    validationState: "warning",
    validationMessage: "This time slot may conflict with another booking.",
    placeholder: "Select a time",
  },
};

export const Success: Story = {
  args: {
    label: "Departure time",
    validationState: "success",
    validationMessage: "Time slot is available.",
    placeholder: "Select a time",
  },
};

export const Disabled: Story = {
  args: {
    label: "Meeting time",
    disabled: true,
    placeholder: "Select a time",
  },
};

export const Small: Story = {
  args: {
    label: "Meeting time",
    size: "small",
    placeholder: "Select a time",
  },
};

export const Underline: Story = {
  args: {
    label: "Meeting time",
    appearance: "underline",
    placeholder: "Select a time",
  },
};

export const FilledDarker: Story = {
  args: {
    label: "Meeting time",
    appearance: "filled-darker",
    placeholder: "Select a time",
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <FluentProvider theme={darkTheme}>
        <div style={{ padding: "1rem", width: "280px" }}>
          <Story />
        </div>
      </FluentProvider>
    ),
  ],
  args: {
    label: "Meeting time",
    placeholder: "Select a time",
  },
};

export const AllValidationStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
      <TimePicker label="Default"  placeholder="Select a time" />
      <TimePicker label="Error"    validationState="error"   validationMessage="Required field." placeholder="Select a time" />
      <TimePicker label="Warning"  validationState="warning" validationMessage="Conflicts with another booking." placeholder="Select a time" />
      <TimePicker label="Success"  validationState="success" validationMessage="Slot available." placeholder="Select a time" />
      <TimePicker label="Disabled" disabled placeholder="Select a time" />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "../components/ui";

const meta: Meta<typeof DatePicker> = {
  title: "Phase 3/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "DatePicker is a popup calendar control (from @fluentui/react-datepicker-compat) for selecting a single date. It shows a calendar view where day-of-week context is important — ideal for appointments, scheduling, and date-range bounded inputs.",
      },
    },
  },
  argTypes: {
    disabled:        { control: "boolean" },
    required:        { control: "boolean" },
    validationState: { control: "select", options: ["none","error","warning","success"] },
    label:           { control: "text" },
    placeholder:     { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: { label: "Select date", placeholder: "Choose a date" },
};

export const Required: Story = {
  args: { label: "Due date", required: true },
};

export const WithMinMax: Story = {
  args: {
    label: "Booking date",
    minDate: new Date(),
    maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    hint: "Bookings available for the next 30 days",
  },
};

export const AllowTextInput: Story = {
  args: { label: "Date (text input)", allowTextInput: true },
};

export const ErrorState: Story = {
  args: {
    label: "Start date",
    validationState: "error",
    validationMessage: "Start date is required",
  },
};

export const MondayStart: Story = {
  args: { label: "Week starts Monday", firstDayOfWeek: 1 },
};

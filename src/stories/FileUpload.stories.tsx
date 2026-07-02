import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "../components/ui";

const meta: Meta<typeof FileUpload> = {
  title: "Phase 3/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "FileUpload provides a drag-and-drop zone and file input button for uploading files. Displays selected file names and supports single or multiple file selection with MIME type filtering.",
      },
    },
  },
  argTypes: {
    label:           { control: "text" },
    hint:            { control: "text" },
    multiple:        { control: "boolean" },
    disabled:        { control: "boolean" },
    validationState: { control: "select", options: ["none","error","warning","success"] },
  },
};
export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: { label: "Upload file", onFilesSelected: (files) => console.log(files) },
};

export const Multiple: Story = {
  args: { label: "Upload documents", multiple: true, accept: ".pdf,.docx" },
};

export const WithSizeLimit: Story = {
  args: { label: "Profile picture", accept: "image/*", maxSizeBytes: 5 * 1024 * 1024 },
};

export const Required: Story = {
  args: { label: "Supporting document", required: true },
};

export const Disabled: Story = {
  args: { label: "Upload disabled", disabled: true },
};

export const WithError: Story = {
  args: {
    label: "Invoice",
    validationState: "error",
    validationMessage: "File is required",
  },
};

export const CustomPrompt: Story = {
  args: {
    label: "Drag CSV here",
    accept: ".csv",
    promptText: "Drop your CSV export here",
  },
};

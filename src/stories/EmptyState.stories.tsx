import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Search48Regular, DocumentRegular, FolderOpenRegular } from "@fluentui/react-icons";
import { Button } from "@fluentui/react-components";
import { EmptyState } from "../components/ui/EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "EmptyState displays a placeholder illustration, title, and description when a content area has no items — such as an empty search result, an empty inbox, or a first-run experience.",
      },
    },
  },
  argTypes: {
    title:       { control: "text" },
    description: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof EmptyState>;

export const NoResults: Story = {
  args: {
    icon: <Search48Regular />,
    title: "No results found",
    description: "Try adjusting your search or filters to find what you're looking for.",
    action: <Button appearance="primary">Clear filters</Button>,
  },
};

export const EmptyFolder: Story = {
  args: {
    icon: <FolderOpenRegular />,
    title: "This folder is empty",
    description: "Upload files or create a new document to get started.",
    action: <Button appearance="primary">Upload files</Button>,
  },
};

export const NoDocuments: Story = {
  args: {
    icon: <DocumentRegular />,
    title: "No documents yet",
    description: "Create your first document to see it here.",
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Button } from "@fluentui/react-components";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";

const meta: Meta = {
  title: "Components/ConfirmDialog",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "ConfirmDialog is a pre-composed Dialog for confirmation prompts — a title, message, confirm button, and cancel button — providing a consistent pattern for irreversible or high-impact action confirmations.",
      },
    },
  },
  argTypes: {
    intent:        { control: "select", options: ["none","error","warning","success","info"] },
    confirmLabel:  { control: "text" },
    cancelLabel:   { control: "text" },
    title:         { control: "text" },
  },
};
export default meta;

function DialogDemo({
  title,
  description,
  confirmLabel,
  confirmAppearance,
}: {
  title: string;
  description?: string;
  confirmLabel?: string;
  confirmAppearance?: "primary" | "secondary" | "outline";
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button appearance="primary" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={title}
        description={description}
        confirmLabel={confirmLabel ?? "Confirm"}
        confirmAppearance={confirmAppearance ?? "primary"}
        onConfirm={() => alert("Confirmed!")}
      />
    </div>
  );
}

export const Default: StoryObj = {
  render: () => (
    <DialogDemo
      title="Confirm action?"
      description="This will apply the selected changes. Are you sure?"
    />
  ),
};

export const DestructiveDelete: StoryObj = {
  render: () => (
    <DialogDemo
      title="Delete project?"
      description="This action cannot be undone. All tasks and files will be permanently removed."
      confirmLabel="Delete"
    />
  ),
};

export const NoDescription: StoryObj = {
  render: () => <DialogDemo title="Are you sure?" confirmLabel="Yes, proceed" />,
};

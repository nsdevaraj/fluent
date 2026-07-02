import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/ui/Button";
import { Dialog } from "../components/ui/Dialog";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Dialog is a modal window that requires user attention before they can continue. It makes all content outside it inert and visually dimmed, enforcing focus on a critical decision or short focused task.",
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["small", "medium", "large", "full"] },
    modalType: { control: "select", options: ["modal", "non-modal", "alert"] },
  },
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const WithTrigger: Story = {
  args: {
    trigger: <Button appearance="primary">Open dialog</Button>,
    title: "Confirm action",
    children: "Are you sure you want to proceed? This action cannot be undone.",
    actions: (
      <>
        <Button appearance="primary">Confirm</Button>
        <Button appearance="secondary">Cancel</Button>
      </>
    ),
  },
};

export const Small: Story = {
  args: {
    trigger: <Button appearance="primary">Small dialog</Button>,
    title: "Quick note",
    size: "small",
    children: "This is a small dialog.",
    actions: <Button appearance="primary">OK</Button>,
  },
};

export const Large: Story = {
  args: {
    trigger: <Button appearance="primary">Large dialog</Button>,
    title: "Review document",
    size: "large",
    children: "This dialog has more space for content.",
    actions: (
      <>
        <Button appearance="primary">Accept</Button>
        <Button appearance="secondary">Reject</Button>
      </>
    ),
  },
};

export const Alert: Story = {
  args: {
    trigger: <Button appearance="primary">Alert dialog</Button>,
    title: "Delete permanently?",
    modalType: "alert",
    children: "This will delete all selected items and cannot be undone.",
    actions: (
      <>
        <Button appearance="primary">Delete</Button>
        <Button appearance="secondary">Cancel</Button>
      </>
    ),
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button appearance="primary" onClick={() => setOpen(true)}>Open controlled</Button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          title="Controlled dialog"
          actions={<Button appearance="primary" onClick={() => setOpen(false)}>Close</Button>}
        >
          This dialog is controlled via external state.
        </Dialog>
      </>
    );
  },
};

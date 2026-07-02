import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button as FluentButton } from "@fluentui/react-components";
import { Drawer } from "../components/ui";

function DrawerDemo({ position, size, title, subtitle }: {
  position?: "start" | "end" | "bottom";
  size?: "small" | "medium" | "large" | "full";
  title?: string;
  subtitle?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <FluentButton appearance="primary" onClick={() => setOpen(true)}>Open Drawer</FluentButton>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={title ?? "Drawer Title"}
        subtitle={subtitle}
        position={position}
        size={size}
        footer={
          <>
            <FluentButton appearance="primary" onClick={() => setOpen(false)}>Save</FluentButton>
            <FluentButton onClick={() => setOpen(false)}>Cancel</FluentButton>
          </>
        }
      >
        <p>Drawer body content goes here.</p>
        <p>Add form fields, details, or any content.</p>
      </Drawer>
    </>
  );
}

const meta: Meta = {
  title: "Phase 3/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Drawer is a panel that slides in from the screen edge, retaining context of the underlying page. OverlayDrawer dims the page (Dialog-based); InlineDrawer renders alongside content as a persistent side panel.",
      },
    },
  },
  argTypes: {
    open:     { control: "boolean" },
    position: { control: "select", options: ["start","end","bottom"] },
    size:     { control: "select", options: ["small","medium","large","full"] },
    title:    { control: "text" },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <DrawerDemo />,
};

export const Start: Story = {
  render: () => <DrawerDemo position="start" title="Left Drawer" />,
};

export const Small: Story = {
  render: () => <DrawerDemo size="small" title="Small Drawer" />,
};

export const Large: Story = {
  render: () => <DrawerDemo size="large" title="Large Drawer" />,
};

export const WithSubtitle: Story = {
  render: () => <DrawerDemo title="Edit User" subtitle="Modify user account details" />,
};

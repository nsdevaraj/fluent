import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "../components/ui/Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Pagination lets users move through a large, paged data set one page at a time — the standard control beneath data tables and long lists. It shows the current page, nearby pages, and shortcuts to the first/last page.\n\n**When to use:** Client- or server-paged tables and lists where the total page count is known. Pair with `DataTable`.\n\n**When NOT to use:** Infinite scrolling feeds (use lazy loading). Unknown total counts (use \"Load more\"). Fewer than two pages — the control auto-hides.",
      },
    },
  },
  argTypes: {
    page: { control: { type: "number", min: 1 } },
    count: { control: { type: "number", min: 1 } },
    siblingCount: { control: { type: "number", min: 0 } },
    boundaryCount: { control: { type: "number", min: 1 } },
    size: { control: "radio", options: ["small", "medium"] },
    showFirstLast: { control: "boolean" },
    hidePrevNext: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

/** Interactive, controlled example — click through the pages. */
export const Default: Story = {
  args: { count: 10, showFirstLast: true },
  render: (args) => {
    const [page, setPage] = React.useState(args.page ?? 1);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};

export const WithFirstLast: Story = {
  args: { page: 5, count: 12, showFirstLast: true },
};

export const ManyPagesWithEllipses: Story = {
  args: { page: 7, count: 24, siblingCount: 1, boundaryCount: 1 },
};

export const Small: Story = {
  args: { page: 3, count: 8, size: "small", showFirstLast: true },
};

export const Disabled: Story = {
  args: { page: 2, count: 6, disabled: true, showFirstLast: true },
};

/** Compact variant without previous/next arrows — numbers only. */
export const NumbersOnly: Story = {
  args: { page: 4, count: 9, hidePrevNext: true },
};

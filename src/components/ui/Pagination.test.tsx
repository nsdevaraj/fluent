import React from "react";
import { render, screen, fireEvent, checkA11y } from "../../test-utils";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders a navigation landmark with an accessible label", () => {
    render(<Pagination page={1} count={5} aria-label="Table pages" />);
    expect(screen.getByRole("navigation", { name: "Table pages" })).toBeInTheDocument();
  });

  it("marks the active page with aria-current", () => {
    render(<Pagination page={3} count={10} />);
    expect(screen.getByRole("button", { name: "Page 3" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("calls onPageChange with the next page", () => {
    const onPageChange = jest.fn();
    render(<Pagination page={2} count={10} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("disables previous navigation on the first page", () => {
    render(<Pagination page={1} count={10} />);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
  });

  it("disables next navigation on the last page", () => {
    render(<Pagination page={10} count={10} />);
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("renders nothing when there is a single page", () => {
    const { container } = render(<Pagination page={1} count={1} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Pagination page={3} count={10} showFirstLast />);
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});

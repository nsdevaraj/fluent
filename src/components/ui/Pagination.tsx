/**
 * Pagination — Design System page navigator built on Fluent 2 tokens.
 *
 * Renders an accessible list of page controls (first / previous / numbered
 * pages with ellipses / next / last). Purpose-built to pair with `DataTable`
 * and any server- or client-paged list.
 *
 * Usage:
 *   import { Pagination } from "../components/ui";
 *   const [page, setPage] = React.useState(1);
 *   <Pagination page={page} count={12} onPageChange={setPage} showFirstLast />
 *
 * Dependencies: @fluentui/react-components, @fluentui/react-icons
 */
import React from "react";
import { Button, makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import {
  ChevronLeft20Regular,
  ChevronRight20Regular,
  ChevronDoubleLeft20Regular,
  ChevronDoubleRight20Regular,
  MoreHorizontal20Regular,
} from "@fluentui/react-icons";

export type PaginationSize = "small" | "medium";

export interface PaginationProps {
  /** Current page, 1-based. */
  page: number;
  /** Total number of pages (>= 1). */
  count: number;
  /** Called with the next page (1-based) when the user navigates. */
  onPageChange?: (page: number) => void;
  /** Number of page buttons to show on each side of the current page. Default 1. */
  siblingCount?: number;
  /** Number of page buttons always shown at the start and end. Default 1. */
  boundaryCount?: number;
  /** Show the jump-to-first and jump-to-last buttons. Default false. */
  showFirstLast?: boolean;
  /** Hide the previous / next buttons. Default false. */
  hidePrevNext?: boolean;
  /** Control size. Default "medium". */
  size?: PaginationSize;
  /** Disable the entire control. */
  disabled?: boolean;
  /** Accessible label for the navigation landmark. Default "Pagination". */
  "aria-label"?: string;
  /** Additional CSS class name(s) to apply to the root `<nav>`. */
  className?: string;
}

type PageItem = number | "start-ellipsis" | "end-ellipsis";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
  },
  list: {
    display: "flex",
    alignItems: "center",
    listStyleType: "none",
    margin: 0,
    padding: 0,
    columnGap: tokens.spacingHorizontalXS,
  },
  item: {
    display: "flex",
  },
  page: {
    minWidth: "32px",
  },
  pageSmall: {
    minWidth: "24px",
  },
  ellipsis: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "32px",
    color: tokens.colorNeutralForeground3,
  },
  ellipsisSmall: {
    minWidth: "24px",
  },
});

function range(start: number, end: number): number[] {
  return Array.from({ length: Math.max(end - start + 1, 0) }, (_, i) => start + i);
}

/**
 * Computes which page items to render, mirroring the well-known
 * boundary/sibling/ellipsis algorithm used by common pagination libraries.
 */
function usePaginationRange(
  page: number,
  count: number,
  siblingCount: number,
  boundaryCount: number
): PageItem[] {
  return React.useMemo(() => {
    const startPages = range(1, Math.min(boundaryCount, count));
    const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

    const siblingsStart = Math.max(
      Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
      boundaryCount + 2
    );
    const siblingsEnd = Math.min(
      Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
      endPages.length > 0 ? endPages[0] - 2 : count - 1
    );

    return [
      ...startPages,
      ...(siblingsStart > boundaryCount + 2
        ? (["start-ellipsis"] as PageItem[])
        : boundaryCount + 1 < count - boundaryCount
          ? [boundaryCount + 1]
          : []),
      ...range(siblingsStart, siblingsEnd),
      ...(siblingsEnd < count - boundaryCount - 1
        ? (["end-ellipsis"] as PageItem[])
        : count - boundaryCount > boundaryCount
          ? [count - boundaryCount]
          : []),
      ...endPages,
    ];
  }, [page, count, siblingCount, boundaryCount]);
}

/**
 * Pagination lets users move through a large, paged data set one page at a time — the standard control beneath data tables and long lists. It shows the current page, nearby pages, and shortcuts to the first/last page.
 *
 * **When to use:** Client- or server-paged tables and lists where the total page count is known. Pair with `DataTable` for admin grids and dashboards.
 *
 * **When NOT to use:** Infinite/continuous scrolling feeds (use lazy loading). An unknown total count (use "Load more"). Fewer than two pages — the control auto-hides.
 */
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      page,
      count,
      onPageChange,
      siblingCount = 1,
      boundaryCount = 1,
      showFirstLast = false,
      hidePrevNext = false,
      size = "medium",
      disabled = false,
      "aria-label": ariaLabel = "Pagination",
      className,
    }: PaginationProps,
    ref
  ) => {
    const styles = useStyles();

    const totalPages = Math.max(1, Math.floor(count));
    const current = Math.min(Math.max(1, Math.floor(page)), totalPages);
    const items = usePaginationRange(current, totalPages, siblingCount, boundaryCount);
    const btnSize = size === "small" ? "small" : "medium";

    // A single page needs no navigator.
    if (totalPages <= 1) return null;

    const go = (next: number) => {
      const clamped = Math.min(Math.max(1, next), totalPages);
      if (!disabled && clamped !== current) onPageChange?.(clamped);
    };

    const atStart = current <= 1;
    const atEnd = current >= totalPages;

    return (
      <nav ref={ref} aria-label={ariaLabel} className={mergeClasses(styles.root, className)}>
        <ul className={styles.list}>
          {showFirstLast && (
            <li className={styles.item}>
              <Button
                appearance="subtle"
                size={btnSize}
                icon={<ChevronDoubleLeft20Regular />}
                aria-label="First page"
                disabled={disabled || atStart}
                onClick={() => go(1)}
              />
            </li>
          )}

          {!hidePrevNext && (
            <li className={styles.item}>
              <Button
                appearance="subtle"
                size={btnSize}
                icon={<ChevronLeft20Regular />}
                aria-label="Previous page"
                disabled={disabled || atStart}
                onClick={() => go(current - 1)}
              />
            </li>
          )}

          {items.map((item, i) => {
            if (item === "start-ellipsis" || item === "end-ellipsis") {
              return (
                <li
                  key={`${item}-${i}`}
                  className={mergeClasses(styles.ellipsis, size === "small" && styles.ellipsisSmall)}
                  aria-hidden="true"
                >
                  <MoreHorizontal20Regular />
                </li>
              );
            }
            const isCurrent = item === current;
            return (
              <li key={item} className={styles.item}>
                <Button
                  appearance={isCurrent ? "primary" : "subtle"}
                  size={btnSize}
                  className={mergeClasses(styles.page, size === "small" && styles.pageSmall)}
                  aria-label={`Page ${item}`}
                  aria-current={isCurrent ? "page" : undefined}
                  disabled={disabled}
                  onClick={() => go(item)}
                >
                  {item}
                </Button>
              </li>
            );
          })}

          {!hidePrevNext && (
            <li className={styles.item}>
              <Button
                appearance="subtle"
                size={btnSize}
                icon={<ChevronRight20Regular />}
                aria-label="Next page"
                disabled={disabled || atEnd}
                onClick={() => go(current + 1)}
              />
            </li>
          )}

          {showFirstLast && (
            <li className={styles.item}>
              <Button
                appearance="subtle"
                size={btnSize}
                icon={<ChevronDoubleRight20Regular />}
                aria-label="Last page"
                disabled={disabled || atEnd}
                onClick={() => go(totalPages)}
              />
            </li>
          )}
        </ul>
      </nav>
    );
  }
);
Pagination.displayName = "Pagination";

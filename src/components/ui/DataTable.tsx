/**
 * DataTable — Feature-rich data grid with sorting, selection, and pagination
 *
 * Usage:
 *   import { DataTable } from "../components/ui";
 *   <DataTable
 *     columns={[
 *       { columnId: "name", label: "Name", renderCell: (row) => row.name, sortable: true },
 *       { columnId: "status", label: "Status", renderCell: (row) => <StatusBadge status={row.status} /> },
 *     ]}
 *     items={data}
 *     selectionMode="multiselect"
 *     onSelectionChange={(keys) => setSelected(keys)}
 *   />
 *
 * Dependencies: @fluentui/react-components
 */

import React, { useMemo, useState } from "react";
import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  createTableColumn,
  makeStyles,
  tokens,
  Button as FluentButton,
  mergeClasses,
  shorthands,
} from "@fluentui/react-components";
import type {
  TableColumnDefinition,
  OnSelectionChangeData,
  SortDirection,
} from "@fluentui/react-components";
import { Caption } from "./Typography";
import {
  ChevronLeft20Regular,
  ChevronRight20Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    width: "100%",
  },
  tableWrap: {
    width: "100%",
    overflowX: "auto",
  },
  tableWrapStickyHeader: {
    width: "100%",
    overflowX: "auto",
    overflowY: "auto",
  },
  stickyHeader: {
    position: "sticky",
    top: 0,
    zIndex: 1,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  emptyState: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: tokens.spacingVerticalXXL,
    color: tokens.colorNeutralForeground3,
    ...shorthands.border(tokens.strokeWidthThin, "solid", tokens.colorNeutralStroke1),
    borderRadius: tokens.borderRadiusMedium,
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalS,
  },
  pageInfo: {
    color: tokens.colorNeutralForeground2,
  },
  pageButtons: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  loadingRow: {
    opacity: "0.5",
    pointerEvents: "none",
  },
  groupHeader: {
    backgroundColor: tokens.colorNeutralBackground2,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
});

// ─── Column definition ────────────────────────────────────────────────────────

export interface DataTableColumn<T> {
  /** Unique column identifier */
  columnId: string;
  /** Header label */
  label: React.ReactNode;
  /** Render the cell content for a row */
  renderCell: (item: T) => React.ReactNode;
  /** Enable column sorting */
  sortable?: boolean;
  /** Minimum column width (CSS value) */
  minWidth?: string;
  /** Override cell compare function for sorting */
  compare?: (a: T, b: T) => number;
}

export type DataTableSelectionMode = "single" | "multiselect";

export interface DataTableGroup<T> {
  /** Group label displayed as a row header */
  label: React.ReactNode;
  /** Items in this group */
  items: T[];
}

export interface DataTableProps<T extends { id: string | number }> {
  columns: DataTableColumn<T>[];
  items: T[];
  /** Enable row selection */
  selectionMode?: DataTableSelectionMode;
  /** Controlled selected row IDs */
  selectedItems?: Set<string | number>;
  onSelectionChange?: (selectedIds: Set<string | number>) => void;
  /** Items per page. Omit to disable pagination. */
  pageSize?: number;
  /** Loading skeleton rows count */
  loading?: boolean;
  /** Message shown when items array is empty */
  emptyMessage?: React.ReactNode;
  /** Default sort column */
  defaultSortColumn?: string;
  defaultSortDirection?: SortDirection;
  /**
   * Group items by a key. Pass a function that returns the group label for
   * each item. Rows with the same label are grouped together.
   * Note: groupBy disables client-side pagination.
   */
  groupBy?: (item: T) => string;
  /** Render group headers in a sticky position when scrolling */
  stickyHeader?: boolean;
  /** Max height of the table scroll container (CSS value, e.g. "400px"). Required for stickyHeader to work. */
  maxHeight?: string;
  /** Forward a ref to the root container element */
  innerRef?: React.Ref<HTMLDivElement>;
}

/**
 * DataTable is a full-featured data grid built on Fluent's Table components, supporting sorting, selection, pagination, and custom cell rendering for structured datasets.
 *
 * **When to use:** Displaying structured datasets with multiple columns — records, logs, inventories. When users need to sort, filter, or select rows.
 * **When NOT to use:** Simple key-value pairs (use a description list). Hierarchical data (use Tree). Small sets of 3 or fewer items (use a Card or list instead).
 */
export function DataTable<T extends { id: string | number }>({
  columns,
  items,
  selectionMode,
  selectedItems,
  onSelectionChange,
  pageSize,
  loading = false,
  emptyMessage = "No data to display",
  defaultSortColumn,
  defaultSortDirection = "ascending",
  groupBy,
  stickyHeader = false,
  maxHeight,
  innerRef,
}: DataTableProps<T>) {
  const styles = useStyles();

  // Pagination state
  const [page, setPage] = useState(0);

  // Build grouped structure if groupBy is provided
  const groups = useMemo<DataTableGroup<T>[] | null>(() => {
    if (!groupBy) return null;
    const map = new Map<string, T[]>();
    for (const item of items) {
      const key = groupBy(item);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(item);
    }
    return Array.from(map.entries()).map(([label, groupItems]) => ({ label, items: groupItems }));
  }, [items, groupBy]);

  // Build Fluent column definitions
  const tableColumns: TableColumnDefinition<T>[] = columns.map((col) =>
    createTableColumn<T>({
      columnId: col.columnId,
      renderHeaderCell: () => col.label,
      renderCell: (item) => col.renderCell(item),
      compare: col.compare,
    })
  );

  // Paginate items
  const totalItems = items.length;
  const totalPages = pageSize ? Math.ceil(totalItems / pageSize) : 1;
  const pagedItems = pageSize
    ? items.slice(page * pageSize, (page + 1) * pageSize)
    : items;

  const handleSelectionChange = (
    _: React.SyntheticEvent,
    data: OnSelectionChangeData
  ) => {
    if (!onSelectionChange) return;
    const ids = new Set<string | number>();
    data.selectedItems.forEach((key) => ids.add(key as string | number));
    onSelectionChange(ids);
  };

  // Controlled selection props
  const selectionProps =
    selectedItems !== undefined
      ? {
          selectedItems: new Set(selectedItems),
          onSelectionChange: handleSelectionChange,
        }
      : {};

  const sortProps =
    defaultSortColumn
      ? {
          defaultSortState: {
            sortColumn: defaultSortColumn,
            sortDirection: defaultSortDirection,
          },
        }
      : {};

  if (!loading && items.length === 0) {
    return (
      <div className={styles.root}>
        <div className={styles.emptyState}>
          <Caption color="subtle">{emptyMessage}</Caption>
        </div>
      </div>
    );
  }

  const wrapClass = mergeClasses(
    stickyHeader ? styles.tableWrapStickyHeader : styles.tableWrap,
    loading ? styles.loadingRow : undefined
  );

  const renderGrid = (gridItems: T[]) => (
    <DataGrid
      items={gridItems}
      columns={tableColumns}
      sortable={columns.some((c) => c.sortable)}
      selectionMode={selectionMode}
      focusMode="composite"
      resizableColumns
      aria-busy={loading}
      {...selectionProps}
      {...sortProps}
    >
      <DataGridHeader className={stickyHeader ? styles.stickyHeader : undefined}>
        <DataGridRow
          selectionCell={{ checkboxIndicator: { "aria-label": "Select all rows" } }}
        >
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>

      <DataGridBody<T>>
        {({ item, rowId }) => (
          <DataGridRow<T>
            key={rowId}
            selectionCell={{ checkboxIndicator: { "aria-label": `Select row ${rowId}` } }}
          >
            {({ renderCell }) => (
              <DataGridCell>{renderCell(item)}</DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );

  return (
    <div className={styles.root}>
      <div
        className={wrapClass}
        style={maxHeight ? { maxHeight } : undefined}
      >
        {groups ? (
          // Grouped rendering — one DataGrid per group, preceded by a group header row
          groups.map((group) => (
            <div key={String(group.label)}>
              <div className={styles.groupHeader} role="rowgroup" aria-label={String(group.label)}>
                {group.label}
              </div>
              {renderGrid(group.items)}
            </div>
          ))
        ) : (
          renderGrid(pagedItems)
        )}
      </div>

      {pageSize && totalPages > 1 && (
        <div className={styles.pagination}>
          <Caption color="subtle" className={styles.pageInfo}>
            {page * pageSize + 1}–{Math.min((page + 1) * pageSize, totalItems)} of {totalItems}
          </Caption>
          <div className={styles.pageButtons}>
            <FluentButton
              appearance="subtle"
              icon={<ChevronLeft20Regular />}
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              aria-label="Previous page"
            />
            <Caption>
              Page {page + 1} of {totalPages}
            </Caption>
            <FluentButton
              appearance="subtle"
              icon={<ChevronRight20Regular />}
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
              aria-label="Next page"
            />
          </div>
        </div>
      )}
    </div>
  );
}
DataTable.displayName = "DataTable";

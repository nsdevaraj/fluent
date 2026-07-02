/**
 * Table — Low-level table primitives for custom table layouts.
 *
 * These are distinct from DataTable which provides a full-featured data grid.
 * Use Table primitives when you need full control over table structure,
 * custom column layouts, or integrating with your own state management.
 *
 * Usage:
 *   import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell, TableCellLayout } from "../components/ui";
 *
 *   <Table sortable aria-label="Employees">
 *     <TableHeader>
 *       <TableRow>
 *         <TableHeaderCell>Name</TableHeaderCell>
 *         <TableHeaderCell>Role</TableHeaderCell>
 *       </TableRow>
 *     </TableHeader>
 *     <TableBody>
 *       <TableRow>
 *         <TableCell><TableCellLayout>Alice</TableCellLayout></TableCell>
 *         <TableCell><TableCellLayout>Engineer</TableCellLayout></TableCell>
 *       </TableRow>
 *     </TableBody>
 *   </Table>
 */

import {
  Table as FluentTable,
  TableBody as FluentTableBody,
  TableRow as FluentTableRow,
  TableCell as FluentTableCell,
  TableHeader as FluentTableHeader,
  TableHeaderCell as FluentTableHeaderCell,
  TableSelectionCell as FluentTableSelectionCell,
  TableCellLayout as FluentTableCellLayout,
  TableCellActions as FluentTableCellActions,
  TableResizeHandle as FluentTableResizeHandle,
  useTableFeatures,
  useTableSort,
  useTableSelection,
  useTableColumnSizing_unstable,
  createTableColumn,
} from "@fluentui/react-components";

export {
  FluentTable as Table,
  FluentTableBody as TableBody,
  FluentTableRow as TableRow,
  FluentTableCell as TableCell,
  FluentTableHeader as TableHeader,
  FluentTableHeaderCell as TableHeaderCell,
  FluentTableSelectionCell as TableSelectionCell,
  FluentTableCellLayout as TableCellLayout,
  FluentTableCellActions as TableCellActions,
  FluentTableResizeHandle as TableResizeHandle,
  useTableFeatures,
  useTableSort,
  useTableSelection,
  useTableColumnSizing_unstable,
  createTableColumn,
};

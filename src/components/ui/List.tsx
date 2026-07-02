/**
 * List / ListItem — Accessible ordered or unordered list.
 *
 * Wraps Fluent UI v9 `List` and `ListItem`. Use for navigation lists,
 * option lists, or any semantically structured sequence of items.
 * For interactive data rows with sorting/selection use `DataTable` instead.
 *
 * Usage:
 *   import { List, ListItem } from "../components/ui";
 *
 *   <List>
 *     <ListItem>First item</ListItem>
 *     <ListItem>Second item</ListItem>
 *     <ListItem>Third item</ListItem>
 *   </List>
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import {
  List as FluentList,
  ListItem as FluentListItem,
} from "@fluentui/react-components";

// ── ListItem ──────────────────────────────────────────────────────────────────

export interface ListItemProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, className, style }: ListItemProps, ref) => {
    return (
      <FluentListItem ref={ref} className={className} style={style}>
        {children}
      </FluentListItem>
    );
  }
);
ListItem.displayName = "ListItem";

// ── List ──────────────────────────────────────────────────────────────────────

export interface ListProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ children, className, style }: ListProps, ref) => {
    return (
      <FluentList ref={ref} className={className} style={style}>
        {children}
      </FluentList>
    );
  }
);
List.displayName = "List";

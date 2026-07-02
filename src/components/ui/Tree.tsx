/**
 * Tree — Hierarchical tree view for nested data.
 *
 * Wraps Fluent UI v9 `FlatTree` + `FlatTreeItem` for virtualization-friendly
 * rendering. Supports expand/collapse, single/multi-select, icons, and
 * custom item rendering.
 *
 * Usage:
 *   import { Tree } from "../components/ui";
 *   <Tree
 *     aria-label="File tree"
 *     items={[
 *       {
 *         id: "src", label: "src", icon: <Folder20Regular />,
 *         children: [
 *           { id: "app", label: "App.tsx", icon: <Document20Regular /> },
 *           { id: "index", label: "index.tsx", icon: <Document20Regular /> },
 *         ],
 *       },
 *       { id: "package", label: "package.json", icon: <Document20Regular /> },
 *     ]}
 *   />
 *
 * Dependencies: @fluentui/react-components
 */
import React, { useCallback, useMemo, useState } from "react";
import {
  FlatTree,
  FlatTreeItem,
  TreeItemLayout,
  TreeItemPersonaLayout,
  TreeProvider as FluentTreeProvider,
  TreeRootReset as FluentTreeRootReset,
  makeStyles,
  tokens,
  useHeadlessFlatTree_unstable,
} from "@fluentui/react-components";
import type {
  FlatTreeItemProps,
  HeadlessFlatTreeItemProps,
  TreeOpenChangeEvent,
  TreeOpenChangeData,
  TreeSelectionValue,
} from "@fluentui/react-components";

// ── Primitive re-exports for advanced composition ─────────────────────────────
export {
  FluentTreeProvider  as TreeProvider,
  FluentTreeRootReset as TreeRootReset,
};

const useStyles = makeStyles({
  root: { userSelect: "none" },
  item: {
    borderRadius: tokens.borderRadiusMedium,
  },
});

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TreeItemDef {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactElement;
  /** Trailing action slot */
  actions?: React.ReactNode;
  children?: TreeItemDef[];
  disabled?: boolean;
  /** Custom persona layout (avatar + secondary text) */
  persona?: { name: string; secondaryText?: string; avatar?: string };
}

export type TreeSelectionMode = "none" | "single" | "multiselect";

export interface TreeProps {
  items: TreeItemDef[];
  /** Accessible label for the tree region */
  "aria-label": string;
  selectionMode?: TreeSelectionMode;
  /** Controlled expanded item ids */
  openItems?: Iterable<string>;
  onOpenChange?: (event: TreeOpenChangeEvent, data: TreeOpenChangeData) => void;
  /** Controlled selected ids */
  selectedItems?: Iterable<TreeSelectionValue>;
  onSelectionChange?: (selected: string[]) => void;
  /** Expand all items initially (uncontrolled) */
  defaultOpenAll?: boolean;
  size?: "small" | "medium" | "large";
  appearance?: "subtle" | "transparent";
  className?: string;
  style?: React.CSSProperties;
}

// ── Flatten helper ────────────────────────────────────────────────────────────

function flattenItems(
  items: TreeItemDef[],
  parentId?: string
): (HeadlessFlatTreeItemProps & { _def: TreeItemDef })[] {
  const result: (HeadlessFlatTreeItemProps & { _def: TreeItemDef })[] = [];
  for (const item of items) {
    result.push({
      value: item.id,
      parentValue: parentId,
      _def: item,
    } as HeadlessFlatTreeItemProps & { _def: TreeItemDef });
    if (item.children?.length) {
      result.push(...flattenItems(item.children, item.id));
    }
  }
  return result;
}

// ── Tree component ────────────────────────────────────────────────────────────

/**
 * Tree displays hierarchical data in a collapsible and expandable structure, rendering parent-child relationships with indentation and expand/collapse controls. Use FlatTree for externally managed data.
 *
 * **When to use:** Presenting nested content — file system navigation, organizational charts, category hierarchies, nested settings. When the parent-child relationship is the primary mental model.
 * **When NOT to use:** Non-hierarchical content (use List or Table). Only one level deep (use a plain List). Primary navigation (use NavDrawer). Nesting beyond 5 levels.
 */
export const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  ({
    items,
    "aria-label": ariaLabel,
    selectionMode = "none",
    openItems,
    onOpenChange,
    selectedItems,
    onSelectionChange,
    size = "medium",
    appearance = "subtle",
    className,
    style,
  }: TreeProps, ref) => {
    const styles = useStyles();
    const flatItems = useMemo(() => flattenItems(items), [items]);

    const [internalOpen, setInternalOpen] = useState<Set<string>>(new Set());
    const controlledOpen = openItems != null ? new Set(openItems) : undefined;
    const openSet = controlledOpen ?? internalOpen;

    const handleOpenChange = useCallback(
      (e: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
        if (!controlledOpen) {
          setInternalOpen(data.openItems as Set<string>);
        }
        onOpenChange?.(e, data);
      },
      [controlledOpen, onOpenChange]
    );

    const flatTree = useHeadlessFlatTree_unstable(
      flatItems as HeadlessFlatTreeItemProps[],
      {
        selectionMode: selectionMode !== "none"
          ? selectionMode as "single" | "multiselect"
          : undefined,
        openItems: openSet,
        onOpenChange: handleOpenChange,
        onCheckedChange: (_e, data) => {
          onSelectionChange?.(Array.from(data.checkedItems as unknown as Set<string>));
        },
      }
    );

    return (
      <FlatTree
        {...flatTree.getTreeProps()}
        ref={ref}
        aria-label={ariaLabel}
        size={size as "small" | "medium"}
        appearance={appearance}
        className={`${styles.root} ${className ?? ""}`}
        style={style}
      >
        {Array.from(flatTree.items(), (treeItem) => {
          const flatItemProps = treeItem.getTreeItemProps() as FlatTreeItemProps;
          const def = (flatItems.find((f) => f.value === treeItem.value)?._def) as TreeItemDef;
          if (!def) return null;

          const hasChildren = Boolean(def.children?.length);
          const layoutContent = def.persona ? (
            <TreeItemPersonaLayout
              description={def.persona.secondaryText}
              media={
                def.persona.avatar
                  ? <img src={def.persona.avatar} alt={def.persona.name} style={{ width: 24, height: 24, borderRadius: "50%" }} />
                  : undefined
              }
            >
              {def.persona.name}
            </TreeItemPersonaLayout>
          ) : (
            <TreeItemLayout
              iconBefore={def.icon}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              actions={def.actions as any}
            >
              {def.label}
            </TreeItemLayout>
          );

          return (
            <FlatTreeItem
              key={treeItem.value}
              {...flatItemProps}
              aria-disabled={def.disabled || undefined}
              className={styles.item}
            >
              {layoutContent}
            </FlatTreeItem>
          );
        })}
      </FlatTree>
    );
  }
);
Tree.displayName = "Tree";

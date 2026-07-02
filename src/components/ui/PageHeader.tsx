/**
 * PageHeader — Copy-paste ready page/section header with breadcrumb + actions
 *
 * Usage:
 *   import { PageHeader } from "./components/ui/PageHeader";
 *   <PageHeader
 *     title="Projects"
 *     breadcrumbs={["Home", "Work", "Projects"]}
 *     actions={<Button appearance="primary" icon={<Add20Regular />}>New Project</Button>}
 *   />
 *
 * Dependencies: @fluentui/react-components, @fluentui/react-icons
 */

import React from "react";
import {
  makeStyles, tokens,
  Breadcrumb, BreadcrumbItem, BreadcrumbDivider, BreadcrumbButton,
} from "@fluentui/react-components";
import { Heading, Caption } from "./Typography";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalL,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    marginBottom: tokens.spacingVerticalXL,
  },
  topRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
  },
  titleRow: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexShrink: 0,
  },
  description: {
    color: tokens.colorNeutralForeground3,
  },
});

export interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: string[];
  actions?: React.ReactNode;
}

/**
 * PageHeader displays the top section of a page with a title, optional subtitle, breadcrumb navigation, and action buttons aligned to the header bar — establishing page identity and primary actions.
 *
 * **When to use:** Every full-page view in the application that requires a consistent title, navigation context, and primary page-level actions (e.g., 'New', 'Export', 'Settings').
 * **When NOT to use:** Modal dialogs or drawers (use Dialog/Drawer header slots). Embedded panels within a page. When the page has no primary identity or top-level actions.
 */
export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, description, breadcrumbs, actions }: PageHeaderProps, ref) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb size="small">
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={crumb}>
              <BreadcrumbItem>
                <BreadcrumbButton current={i === breadcrumbs.length - 1}>
                  {crumb}
                </BreadcrumbButton>
              </BreadcrumbItem>
              {i < breadcrumbs.length - 1 && <BreadcrumbDivider />}
            </React.Fragment>
          ))}
        </Breadcrumb>
      )}
      <div className={styles.topRow}>
        <div className={styles.titleRow}>
          <Heading level={1}>{title}</Heading>
          {description && <Caption color="subtle" className={styles.description}>{description}</Caption>}
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </div>
  );
}
);
PageHeader.displayName = "PageHeader";

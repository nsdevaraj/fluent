/**
 * Accordion — Expandable/collapsible panel group
 *
 * Usage:
 *   import { Accordion } from "../components/ui";
 *   <Accordion items={[
 *     { value: "a", header: "Panel A", content: <p>Content A</p> },
 *     { value: "b", header: "Panel B", content: <p>Content B</p>, disabled: true },
 *   ]} />
 *
 * Dependencies: @fluentui/react-components
 */

import React from "react";
import {
  Accordion as FluentAccordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
} from "@fluentui/react-components";

export interface AccordionItemDef {
  value: string;
  header: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactElement;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItemDef[];
  /**
   * Allow multiple panels open simultaneously.
   * Default false (single open).
   */
  multiple?: boolean;
  /**
   * Allow closing all panels (the open panel can be toggled closed).
   * Default true.
   */
  collapsible?: boolean;
  /** Controlled open items (array of values) */
  openItems?: string[];
  onToggle?: (value: string, open: boolean) => void;
  size?: "small" | "medium";
  /**
   * @deprecated AccordionHeader in Fluent v9.74 does not expose an appearance prop.
   * This field is accepted but has no visual effect. Will be re-evaluated in Phase 4
   * when the Fluent version is upgraded.
   */
  appearance?: "filled-darker" | "filled-alternative" | "subtle" | "transparent";
  /** Additional CSS class name(s) to apply to the root element */
  className?: string;
}

/**
 * Accordion allows users to toggle the display of content by expanding or collapsing sections. It conserves vertical space by hiding content until the user actively needs it — ideal for FAQs, settings panels, and grouped form sections.
 *
 * **When to use:** Multiple sections of content that users may not all need at once, and conserving vertical space is important — FAQs, settings panels, grouped form sections.
 * **When NOT to use:** All content is equally important and should be visible simultaneously. Navigation (use Tabs or NavMenu). Only one section — a simple expand/collapse is sufficient.
 */
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({
  items,
  multiple = false,
  collapsible = true,
  openItems,
  onToggle,
  size = "medium",
  appearance = "transparent",
}: AccordionProps, ref) => {
  const handleToggle = (
    _: React.SyntheticEvent,
    data: { openItems: string[] }
  ) => {
    if (onToggle && openItems !== undefined) {
      // Determine which item was toggled
      const prev = new Set(openItems);
      const next = new Set(data.openItems);
      const nextArr = Array.from(next);
      const prevArr = Array.from(prev);
      for (const v of nextArr) {
        if (!prev.has(v)) { onToggle(v, true); return; }
      }
      for (const v of prevArr) {
        if (!next.has(v)) { onToggle(v, false); return; }
      }
    }
  };

  const accordionProps = openItems !== undefined
    ? { openItems, onToggle: handleToggle }
    : {};

  return (
    <FluentAccordion
      multiple={multiple}
      collapsible={collapsible}
      {...accordionProps}
    >
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value} disabled={item.disabled}>
          <AccordionHeader
            size={size}
            icon={item.icon}
          >
            {item.header}
          </AccordionHeader>
          <AccordionPanel>{item.content}</AccordionPanel>
        </AccordionItem>
      ))}
    </FluentAccordion>
  );
}
);
Accordion.displayName = "Accordion";

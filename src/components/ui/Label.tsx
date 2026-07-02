/**
 * Label — Accessible standalone label element.
 *
 * Wraps Fluent UI v9 `Label`. Provides an accessible `<label>` element
 * with support for required asterisk, disabled state, and size variants.
 *
 * Use this for standalone labels that are associated with custom form
 * controls via `htmlFor`. Use `Field` when you need the full
 * label + validation + hint stack around an input.
 *
 * Usage:
 *   import { Label } from "../components/ui";
 *
 *   <Label htmlFor="my-input" required>Display name</Label>
 *   <input id="my-input" type="text" />
 *
 *   <Label size="small" disabled>Archived field</Label>
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import { Label as FluentLabel } from "@fluentui/react-components";

export type LabelSize = "small" | "medium" | "large";
export type LabelWeight = "regular" | "semibold";

export interface LabelProps {
  children: React.ReactNode;
  /** Associates label with a form control */
  htmlFor?: string;
  /** Shows a required asterisk */
  required?: boolean | string;
  /** Grays out the label */
  disabled?: boolean;
  size?: LabelSize;
  weight?: LabelWeight;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({
    children,
    htmlFor,
    required,
    disabled,
    size = "medium",
    weight,
    className,
    style,
    id,
  }: LabelProps, ref) => {
    return (
      <FluentLabel
        ref={ref}
        htmlFor={htmlFor}
        required={required}
        disabled={disabled}
        size={size}
        weight={weight}
        className={className}
        style={style}
        id={id}
      >
        {children}
      </FluentLabel>
    );
  }
);
Label.displayName = "Label";

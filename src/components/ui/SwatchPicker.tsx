/**
 * SwatchPicker — Color and image swatch selection components.
 *
 * Wraps Fluent UI v9 SwatchPicker family. Re-exports all sub-components and
 * provides a composite DSSwatchPicker that renders a flat list or grid of
 * color or image swatches from a data array.
 *
 * Composable usage:
 *   import { SwatchPicker, SwatchPickerRow, ColorSwatch,
 *            ImageSwatch, EmptySwatch } from "../components/ui";
 *
 *   <SwatchPicker selectedValue={selected} onSelectionChange={(_, d) => setSelected(d.selectedValue)}>
 *     <SwatchPickerRow>
 *       <ColorSwatch value="red"   color="#f00" aria-label="Red" />
 *       <ColorSwatch value="green" color="#0f0" aria-label="Green" />
 *       <ImageSwatch value="img1"  src="/swatch1.png" aria-label="Texture 1" />
 *       <EmptySwatch value="none" aria-label="No color" />
 *     </SwatchPickerRow>
 *   </SwatchPicker>
 *
 * Composite usage:
 *   <DSSwatchPicker
 *     swatches={[
 *       { value: "red",   color: "#f00",        label: "Red"  },
 *       { value: "img1",  imageUrl: "/t1.png",  label: "Texture 1" },
 *       { value: "empty", label: "None" },
 *     ]}
 *     selectedValue={selected}
 *     onValueChange={setSelected}
 *     size="medium"
 *     shape="rounded"
 *   />
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import {
  SwatchPicker as FluentSwatchPicker,
  SwatchPickerRow as FluentSwatchPickerRow,
  SwatchPickerProvider as FluentSwatchPickerProvider,
  ColorSwatch as FluentColorSwatch,
  ImageSwatch as FluentImageSwatch,
  EmptySwatch as FluentEmptySwatch,
} from "@fluentui/react-components";

// ── Re-exports for composable usage ──────────────────────────────────────────
// Note: ColorSwatch is the same Fluent component re-exported from ColorPicker.tsx.
// We do NOT re-export it here to avoid the duplicate naming issue.
// Consumers can import ColorSwatch from "../components/ui" (it comes from ColorPicker.tsx).
export {
  FluentSwatchPicker         as SwatchPicker,
  FluentSwatchPickerRow      as SwatchPickerRow,
  FluentSwatchPickerProvider as SwatchPickerProvider,
  FluentImageSwatch          as ImageSwatch,
  FluentEmptySwatch          as EmptySwatch,
};

// ── DSSwatchPicker composite ──────────────────────────────────────────────────

/** Describes a single swatch entry. */
export interface SwatchOption {
  /** Unique identifier for the swatch. */
  value: string;
  /** Hex color string — renders as a ColorSwatch when present. */
  color?: string;
  /** Absolute or relative URL — renders as an ImageSwatch when present (takes priority over color). */
  imageUrl?: string;
  /** Accessible label for the swatch. */
  label?: string;
  /** Whether the swatch is disabled. */
  disabled?: boolean;
}

export interface DSSwatchPickerProps {
  /** Array of swatch definitions. */
  swatches: SwatchOption[];
  /** Currently selected swatch value. */
  selectedValue?: string;
  /** Callback when the user selects a swatch. */
  onValueChange?: (value: string) => void;
  /** Size of each swatch tile. */
  size?: "small" | "medium" | "large" | "extra-small";
  /** Shape of each swatch tile. */
  shape?: "circular" | "rounded" | "square";
  /**
   * Layout mode.
   * - "row": all swatches in a single FluentSwatchPickerRow
   * - "grid": uses SwatchPicker's built-in grid layout (default)
   */
  layout?: "grid" | "row";
  className?: string;
  style?: React.CSSProperties;
}

/**
 * DSSwatchPicker — Data-driven swatch picker that renders ColorSwatch,
 * ImageSwatch, or EmptySwatch items based on each SwatchOption's fields.
 *
 * - If `imageUrl` is set → ImageSwatch
 * - Else if `color` is set → ColorSwatch
 * - Otherwise → EmptySwatch (useful for a "none / clear" option)
 */
export const DSSwatchPicker: React.FC<DSSwatchPickerProps> = ({
  swatches,
  selectedValue,
  onValueChange,
  size = "medium",
  shape = "rounded",
  layout = "grid",
  className,
  style,
}) => {
  const handleSelectionChange = (
    _: unknown,
    data: { selectedValue: string }
  ) => {
    onValueChange?.(data.selectedValue);
  };

  const renderSwatch = (swatch: SwatchOption) => {
    if (swatch.imageUrl) {
      return (
        <FluentImageSwatch
          key={swatch.value}
          value={swatch.value}
          src={swatch.imageUrl}
          aria-label={swatch.label ?? swatch.value}
          disabled={swatch.disabled}
          style={{ width: swatchSizePx(size), height: swatchSizePx(size) }}
        />
      );
    }
    if (swatch.color) {
      return (
        <FluentColorSwatch
          key={swatch.value}
          value={swatch.value}
          color={swatch.color}
          aria-label={swatch.label ?? swatch.value}
          disabled={swatch.disabled}
        />
      );
    }
    return (
      <FluentEmptySwatch
        key={swatch.value}
        value={swatch.value}
        aria-label={swatch.label ?? "Empty"}
        disabled={swatch.disabled}
      />
    );
  };

  const swatchNodes = swatches.map(renderSwatch);

  return (
    <FluentSwatchPicker
      selectedValue={selectedValue}
      onSelectionChange={handleSelectionChange as Parameters<typeof FluentSwatchPicker>[0]["onSelectionChange"]}
      size={size}
      shape={shape}
      layout={layout}
      className={className}
      style={style}
    >
      {layout === "row" ? (
        <FluentSwatchPickerRow>{swatchNodes}</FluentSwatchPickerRow>
      ) : (
        swatchNodes
      )}
    </FluentSwatchPicker>
  );
};

DSSwatchPicker.displayName = "DSSwatchPicker";

// ── Helpers ───────────────────────────────────────────────────────────────────

function swatchSizePx(size: DSSwatchPickerProps["size"]): number {
  switch (size) {
    case "extra-small": return 16;
    case "small":       return 20;
    case "large":       return 36;
    case "medium":
    default:            return 28;
  }
}

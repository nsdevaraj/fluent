/**
 * ColorPicker — Full-featured color selection components.
 *
 * Wraps Fluent UI v9 ColorPicker family. Re-exports all sub-components and
 * provides a composite DSColorPicker that combines ColorArea + ColorSlider
 * with an optional AlphaSlider into a single controlled component.
 *
 * Composable usage:
 *   import { ColorPicker, ColorArea, ColorSlider, AlphaSlider,
 *            ColorSwatch } from "../components/ui";
 *
 *   <ColorPicker>
 *     <ColorArea />
 *     <ColorSlider />
 *     <AlphaSlider />
 *   </ColorPicker>
 *
 * Composite usage:
 *   <DSColorPicker
 *     color="#ff5500"
 *     onChange={(hex) => console.log(hex)}
 *     showAlpha
 *   />
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import {
  ColorPicker as FluentColorPicker,
  ColorArea as FluentColorArea,
  ColorSlider as FluentColorSlider,
  AlphaSlider as FluentAlphaSlider,
  ColorSwatch as FluentColorSwatch,
} from "@fluentui/react-components";

// ── Re-exports for composable usage ──────────────────────────────────────────
export {
  FluentColorPicker  as ColorPicker,
  FluentColorArea    as ColorArea,
  FluentColorSlider  as ColorSlider,
  FluentAlphaSlider  as AlphaSlider,
  FluentColorSwatch  as ColorSwatch,
};

// ── DSColorPicker composite ───────────────────────────────────────────────────

export interface DSColorPickerProps {
  /** Current color as a hex string, e.g. "#ff5500". */
  color?: string;
  /** Called with the updated hex string whenever the user picks a color. */
  onChange?: (color: string) => void;
  /** When true, an AlphaSlider is rendered below the hue slider. */
  showAlpha?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Converts an HSV tuple + alpha to a CSS hex string.
 * h ∈ [0,360], s ∈ [0,1], v ∈ [0,1], a ∈ [0,1]
 */
function hsvToHex(h: number, s: number, v: number, a: number): string {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    const value = v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
    return Math.round(value * 255);
  };
  const r = f(5);
  const g = f(3);
  const b = f(1);
  const toHex = (x: number) => x.toString(16).padStart(2, "0");
  const alpha = Math.round(a * 255);
  return a < 1
    ? `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alpha)}`
    : `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Parses a hex color string to HSV + alpha.
 * Returns default values if parsing fails.
 */
function hexToHsv(hex: string): { h: number; s: number; v: number; a: number } {
  const clean = hex.replace("#", "");
  let r = 0, g = 0, b = 0, a = 1;

  if (clean.length === 3 || clean.length === 4) {
    r = parseInt(clean[0] + clean[0], 16);
    g = parseInt(clean[1] + clean[1], 16);
    b = parseInt(clean[2] + clean[2], 16);
    if (clean.length === 4) a = parseInt(clean[3] + clean[3], 16) / 255;
  } else if (clean.length >= 6) {
    r = parseInt(clean.slice(0, 2), 16);
    g = parseInt(clean.slice(2, 4), 16);
    b = parseInt(clean.slice(4, 6), 16);
    if (clean.length === 8) a = parseInt(clean.slice(6, 8), 16) / 255;
  }

  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const d = max - min;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  let h = 0;
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }
  return { h, s, v, a };
}

/**
 * DSColorPicker — Controlled color picker composed from Fluent's ColorPicker,
 * ColorArea, ColorSlider, and (optionally) AlphaSlider.
 *
 * Pass `color` (hex string) and `onChange` for controlled usage.
 * If used uncontrolled, the default color is #ff0000.
 */
export const DSColorPicker: React.FC<DSColorPickerProps> = ({
  color = "#ff0000",
  onChange,
  showAlpha = false,
  className,
  style,
}) => {
  const { h, s, v, a } = hexToHsv(color);

  // Internal state for hue, saturation/value, and alpha
  const [hue, setHue] = React.useState(h);
  const [sat, setSat] = React.useState(s);
  const [val, setVal] = React.useState(v);
  const [alpha, setAlpha] = React.useState(a);

  // Sync internal state when the controlled `color` prop changes
  React.useEffect(() => {
    const parsed = hexToHsv(color);
    setHue(parsed.h);
    setSat(parsed.s);
    setVal(parsed.v);
    setAlpha(parsed.a);
  }, [color]);

  const emit = (nh: number, ns: number, nv: number, na: number) => {
    onChange?.(hsvToHex(nh, ns, nv, na));
  };

  // Fluent ColorArea data: { color: { h, s, v } }
  const handleAreaChange = (_: unknown, data: { color: { h: number; s: number; v: number } }) => {
    const nh = data.color.h ?? hue;
    const ns = data.color.s ?? sat;
    const nv = data.color.v ?? val;
    setHue(nh);
    setSat(ns);
    setVal(nv);
    emit(nh, ns, nv, alpha);
  };

  // Fluent ColorSlider data: { color: { h } }
  const handleSliderChange = (_: unknown, data: { color: { h: number } }) => {
    const nh = data.color.h ?? hue;
    setHue(nh);
    emit(nh, sat, val, alpha);
  };

  // Fluent AlphaSlider data: { color: { a } }
  const handleAlphaChange = (_: unknown, data: { color: { a: number } }) => {
    const na = data.color.a ?? alpha;
    setAlpha(na);
    emit(hue, sat, val, na);
  };

  return (
    <FluentColorPicker
      color={{ h: hue, s: sat, v: val, a: alpha }}
      className={className}
      style={style}
    >
      <FluentColorArea
        color={{ h: hue, s: sat, v: val, a: alpha }}
        onChange={handleAreaChange as Parameters<typeof FluentColorArea>[0]["onChange"]}
      />
      <FluentColorSlider
        color={{ h: hue, s: sat, v: val, a: alpha }}
        onChange={handleSliderChange as Parameters<typeof FluentColorSlider>[0]["onChange"]}
      />
      {showAlpha && (
        <FluentAlphaSlider
          color={{ h: hue, s: sat, v: val, a: alpha }}
          onChange={handleAlphaChange as Parameters<typeof FluentAlphaSlider>[0]["onChange"]}
        />
      )}
    </FluentColorPicker>
  );
};

DSColorPicker.displayName = "DSColorPicker";

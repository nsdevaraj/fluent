import { BrandVariants } from "@fluentui/react-components";

/**
 * Custom brand color palette — 10-shade ramp (shade10 → shade160).
 * Used by createLightTheme() and createDarkTheme() to generate
 * all colorBrand* tokens automatically.
 *
 * To change your brand: swap the hex values below.
 * Tool to generate shades: https://react.fluentui.dev/?path=/docs/theme-designer--docs
 */
export const brandColors: BrandVariants = {
  10:  "#001919",
  20:  "#012826",
  30:  "#01322E",
  40:  "#033F38",
  50:  "#054D43",
  60:  "#0A5C50",
  70:  "#0C695A",
  80:  "#117865",  // Primary
  90:  "#1F937E",
  100: "#2AAC94",  // Dark Primary
  110: "#3ABB9F",
  120: "#52C7AA",
  130: "#78D3B9",
  140: "#9EE0CB",
  150: "#C0ECDD",
  160: "#E3F7EF",
};

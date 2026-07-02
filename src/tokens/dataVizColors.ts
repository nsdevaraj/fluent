/**
 * Data visualization color tokens.
 * Custom tokens — not part of Fluent's built-in palette.
 *
 * Three palette types:
 *   • Data Slots      — 40 categorical colors for chart series
 *   • Sequential      — Sequence1 (Teal) and Sequence2 (Lilac) ramps
 *   • Diverging       — Diverging1 (Teal↔Gold) and Diverging2 (Teal↔Pumpkin)
 *   • Alert           — 7 alert/status colors for data viz context
 *   • Transparency    — 10 semi-transparent fills matching data slots
 *
 * Light/dark values wired into lightTheme.ts / darkTheme.ts via
 * dataVizColorsLight / dataVizColorsDark exports.
 *
 * Usage in makeStyles():
 *   backgroundColor: dataVizTokens.colorDataSlot1,
 *
 * Import: import { dataVizTokens } from "../tokens";
 */

// ── CSS variable references (use in makeStyles) ────────────────────────────

export const dataVizTokens = {
  // Data Slots — qualitative palette for chart series
  colorDataSlot1:  "var(--colorDataSlot1)",
  colorDataSlot2:  "var(--colorDataSlot2)",
  colorDataSlot3:  "var(--colorDataSlot3)",
  colorDataSlot4:  "var(--colorDataSlot4)",
  colorDataSlot5:  "var(--colorDataSlot5)",
  colorDataSlot6:  "var(--colorDataSlot6)",
  colorDataSlot7:  "var(--colorDataSlot7)",
  colorDataSlot8:  "var(--colorDataSlot8)",
  colorDataSlot9:  "var(--colorDataSlot9)",
  colorDataSlot10: "var(--colorDataSlot10)",
  colorDataSlot11: "var(--colorDataSlot11)",
  colorDataSlot12: "var(--colorDataSlot12)",
  colorDataSlot13: "var(--colorDataSlot13)",
  colorDataSlot14: "var(--colorDataSlot14)",
  colorDataSlot15: "var(--colorDataSlot15)",
  colorDataSlot16: "var(--colorDataSlot16)",
  colorDataSlot17: "var(--colorDataSlot17)",
  colorDataSlot18: "var(--colorDataSlot18)",
  colorDataSlot19: "var(--colorDataSlot19)",
  colorDataSlot20: "var(--colorDataSlot20)",
  colorDataSlot21: "var(--colorDataSlot21)",
  colorDataSlot22: "var(--colorDataSlot22)",
  colorDataSlot23: "var(--colorDataSlot23)",
  colorDataSlot24: "var(--colorDataSlot24)",
  colorDataSlot25: "var(--colorDataSlot25)",
  colorDataSlot26: "var(--colorDataSlot26)",
  colorDataSlot27: "var(--colorDataSlot27)",
  colorDataSlot28: "var(--colorDataSlot28)",
  colorDataSlot29: "var(--colorDataSlot29)",
  colorDataSlot30: "var(--colorDataSlot30)",
  colorDataSlot31: "var(--colorDataSlot31)",
  colorDataSlot32: "var(--colorDataSlot32)",
  colorDataSlot33: "var(--colorDataSlot33)",
  colorDataSlot34: "var(--colorDataSlot34)",
  colorDataSlot35: "var(--colorDataSlot35)",
  colorDataSlot36: "var(--colorDataSlot36)",
  colorDataSlot37: "var(--colorDataSlot37)",
  colorDataSlot38: "var(--colorDataSlot38)",
  colorDataSlot39: "var(--colorDataSlot39)",
  colorDataSlot40: "var(--colorDataSlot40)",

  // Sequential 1 — Teal ramp (dark → light)
  colorSequence1color1:  "var(--colorSequence1color1)",
  colorSequence1color2:  "var(--colorSequence1color2)",
  colorSequence1color3:  "var(--colorSequence1color3)",
  colorSequence1color4:  "var(--colorSequence1color4)",
  colorSequence1color5:  "var(--colorSequence1color5)",
  colorSequence1color6:  "var(--colorSequence1color6)",
  colorSequence1color7:  "var(--colorSequence1color7)",
  colorSequence1color8:  "var(--colorSequence1color8)",
  colorSequence1color9:  "var(--colorSequence1color9)",
  colorSequence1color10: "var(--colorSequence1color10)",

  // Sequential 2 — Lilac ramp (dark → light)
  colorSequence2color1:  "var(--colorSequence2color1)",
  colorSequence2color2:  "var(--colorSequence2color2)",
  colorSequence2color3:  "var(--colorSequence2color3)",
  colorSequence2color4:  "var(--colorSequence2color4)",
  colorSequence2color5:  "var(--colorSequence2color5)",
  colorSequence2color6:  "var(--colorSequence2color6)",
  colorSequence2color7:  "var(--colorSequence2color7)",
  colorSequence2color8:  "var(--colorSequence2color8)",
  colorSequence2color9:  "var(--colorSequence2color9)",
  colorSequence2color10: "var(--colorSequence2color10)",

  // Diverging 1 — Teal ↔ Gold (9 steps)
  colorDiverging1color1: "var(--colorDiverging1color1)",
  colorDiverging1color2: "var(--colorDiverging1color2)",
  colorDiverging1color3: "var(--colorDiverging1color3)",
  colorDiverging1color4: "var(--colorDiverging1color4)",
  colorDiverging1color5: "var(--colorDiverging1color5)",
  colorDiverging1color6: "var(--colorDiverging1color6)",
  colorDiverging1color7: "var(--colorDiverging1color7)",
  colorDiverging1color8: "var(--colorDiverging1color8)",
  colorDiverging1color9: "var(--colorDiverging1color9)",

  // Diverging 2 — Teal ↔ Pumpkin (8 steps)
  colorDiverging2color1: "var(--colorDiverging2color1)",
  colorDiverging2color2: "var(--colorDiverging2color2)",
  colorDiverging2color3: "var(--colorDiverging2color3)",
  colorDiverging2color4: "var(--colorDiverging2color4)",
  colorDiverging2color5: "var(--colorDiverging2color5)",
  colorDiverging2color6: "var(--colorDiverging2color6)",
  colorDiverging2color7: "var(--colorDiverging2color7)",
  colorDiverging2color8: "var(--colorDiverging2color8)",

  // Alert colors — for data viz status indicators
  colorAlert1: "var(--colorAlert1)",
  colorAlert2: "var(--colorAlert2)",
  colorAlert3: "var(--colorAlert3)",
  colorAlert4: "var(--colorAlert4)",
  colorAlert5: "var(--colorAlert5)",
  colorAlert6: "var(--colorAlert6)",
  colorAlert7: "var(--colorAlert7)",

  // Transparency data slots — 50% opacity fills for chart areas
  colorTransparencyDataSlot1:  "var(--colorTransparencyDataSlot1)",
  colorTransparencyDataSlot2:  "var(--colorTransparencyDataSlot2)",
  colorTransparencyDataSlot3:  "var(--colorTransparencyDataSlot3)",
  colorTransparencyDataSlot4:  "var(--colorTransparencyDataSlot4)",
  colorTransparencyDataSlot5:  "var(--colorTransparencyDataSlot5)",
  colorTransparencyDataSlot6:  "var(--colorTransparencyDataSlot6)",
  colorTransparencyDataSlot7:  "var(--colorTransparencyDataSlot7)",
  colorTransparencyDataSlot8:  "var(--colorTransparencyDataSlot8)",
  colorTransparencyDataSlot9:  "var(--colorTransparencyDataSlot9)",
  colorTransparencyDataSlot10: "var(--colorTransparencyDataSlot10)",
} as const;

// ── Light theme values ─────────────────────────────────────────────────────

export const dataVizColorsLight = {
  // Slots 1-10: same in light and dark
  colorDataSlot1:  "#2AA0A4",
  colorDataSlot2:  "#B146C2",
  colorDataSlot3:  "#637CEF",
  colorDataSlot4:  "#9373C0",
  colorDataSlot5:  "#3A96DD",
  colorDataSlot6:  "#13A10E",
  colorDataSlot7:  "#CA5010",
  colorDataSlot8:  "#E3008C",
  colorDataSlot9:  "#57811B",
  colorDataSlot10: "#AE8C00",
  // Slots 11-40: light-specific
  colorDataSlot11: "#026467",
  colorDataSlot12: "#863593",
  colorDataSlot13: "#3C51B4",
  colorDataSlot14: "#674C8C",
  colorDataSlot15: "#2C72A8",
  colorDataSlot16: "#0E7A0B",
  colorDataSlot17: "#9A3D0C",
  colorDataSlot18: "#AD006A",
  colorDataSlot19: "#405F14",
  colorDataSlot20: "#6D5700",
  colorDataSlot21: "#038387",
  colorDataSlot22: "#BA58C9",
  colorDataSlot23: "#4F6BED",
  colorDataSlot24: "#8764B8",
  colorDataSlot25: "#3487C7",
  colorDataSlot26: "#11910D",
  colorDataSlot27: "#D06228",
  colorDataSlot28: "#EA38A6",
  colorDataSlot29: "#689920",
  colorDataSlot30: "#937700",
  colorDataSlot31: "#02494C",
  colorDataSlot32: "#63276D",
  colorDataSlot33: "#2C3C85",
  colorDataSlot34: "#4C3867",
  colorDataSlot35: "#20547C",
  colorDataSlot36: "#0B5A08",
  colorDataSlot37: "#712D09",
  colorDataSlot38: "#7F004E",
  colorDataSlot39: "#23330B",
  colorDataSlot40: "#3A2F00",

  // Sequential 1 — Teal (same light/dark)
  colorSequence1color1:  "#012728",
  colorSequence1color2:  "#02494C",
  colorSequence1color3:  "#026467",
  colorSequence1color4:  "#037679",
  colorSequence1color5:  "#038387",
  colorSequence1color6:  "#159195",
  colorSequence1color7:  "#2AA0A4",
  colorSequence1color8:  "#41A3A3",
  colorSequence1color9:  "#9BD9DB",
  colorSequence1color10: "#CEF3F5",

  // Sequential 2 — Lilac (same light/dark)
  colorSequence2color1:  "#35153A",
  colorSequence2color2:  "#63276D",
  colorSequence2color3:  "#863593",
  colorSequence2color4:  "#9F3FAF",
  colorSequence2color5:  "#B146C2",
  colorSequence2color6:  "#BA58C9",
  colorSequence2color7:  "#C36BD1",
  colorSequence2color8:  "#CF87DA",
  colorSequence2color9:  "#E6BFED",
  colorSequence2color10: "#F2DCF5",

  // Diverging 1 — Teal ↔ Gold (same light/dark)
  colorDiverging1color1: "#02494C",
  colorDiverging1color2: "#026467",
  colorDiverging1color3: "#159195",
  colorDiverging1color4: "#4CB4B7",
  colorDiverging1color5: "#D2D0CE",
  colorDiverging1color6: "#DAC157",
  colorDiverging1color7: "#C19C00",
  colorDiverging1color8: "#937700",
  colorDiverging1color9: "#6C5700",

  // Diverging 2 — Teal ↔ Pumpkin (same light/dark)
  colorDiverging2color1: "#037679",
  colorDiverging2color2: "#159195",
  colorDiverging2color3: "#4CB4B7",
  colorDiverging2color4: "#DAC157",
  colorDiverging2color5: "#C19C00",
  colorDiverging2color6: "#D77440",
  colorDiverging2color7: "#CA5010",
  colorDiverging2color8: "#9A3D0C",

  // Alert — light values
  colorAlert1: "#6E0811",
  colorAlert2: "#C50F1F",
  colorAlert3: "#F7630C",
  colorAlert4: "#107C10",
  colorAlert5: "#094509",
  colorAlert6: "#DBDBDB",
  colorAlert7: "#E6E6E6",

  // Transparency slots (same light/dark — pre-mixed at 50% opacity over white)
  colorTransparencyDataSlot1:  "#41A3A3",
  colorTransparencyDataSlot2:  "#CF87DA",
  colorTransparencyDataSlot3:  "#93A4F4",
  colorTransparencyDataSlot4:  "#B29AD4",
  colorTransparencyDataSlot5:  "#83BDEB",
  colorTransparencyDataSlot6:  "#5EC75A",
  colorTransparencyDataSlot7:  "#DF8E64",
  colorTransparencyDataSlot8:  "#EE5FB7",
  colorTransparencyDataSlot9:  "#A4CC6C",
  colorTransparencyDataSlot10: "#DAC157",
} as const;

// ── Dark theme values ──────────────────────────────────────────────────────

export const dataVizColorsDark = {
  // Slots 1-10: same in light and dark
  colorDataSlot1:  "#2AA0A4",
  colorDataSlot2:  "#B146C2",
  colorDataSlot3:  "#637CEF",
  colorDataSlot4:  "#9373C0",
  colorDataSlot5:  "#3A96DD",
  colorDataSlot6:  "#13A10E",
  colorDataSlot7:  "#CA5010",
  colorDataSlot8:  "#E3008C",
  colorDataSlot9:  "#57811B",
  colorDataSlot10: "#AE8C00",
  // Slots 11-40: dark-specific
  colorDataSlot11: "#4CB4B7",
  colorDataSlot12: "#C36BD1",
  colorDataSlot13: "#93A4F4",
  colorDataSlot14: "#A083C9",
  colorDataSlot15: "#4FA1E1",
  colorDataSlot16: "#27AC22",
  colorDataSlot17: "#D77440",
  colorDataSlot18: "#EE5FB7",
  colorDataSlot19: "#73AA24",
  colorDataSlot20: "#D0B232",
  colorDataSlot21: "#038387",
  colorDataSlot22: "#BA58C9",
  colorDataSlot23: "#4F6BED",
  colorDataSlot24: "#8764B8",
  colorDataSlot25: "#3487C7",
  colorDataSlot26: "#11910D",
  colorDataSlot27: "#D06228",
  colorDataSlot28: "#EA38A6",
  colorDataSlot29: "#689920",
  colorDataSlot30: "#C19C00",
  colorDataSlot31: "#9BD9DB",
  colorDataSlot32: "#CF87DA",
  colorDataSlot33: "#C8D1FA",
  colorDataSlot34: "#B29AD4",
  colorDataSlot35: "#83BDEB",
  colorDataSlot36: "#A7E3A5",
  colorDataSlot37: "#DF8E64",
  colorDataSlot38: "#F7ADDA",
  colorDataSlot39: "#A4CC6C",
  colorDataSlot40: "#DAC157",

  // Sequential 1 — same as light
  colorSequence1color1:  "#012728",
  colorSequence1color2:  "#02494C",
  colorSequence1color3:  "#026467",
  colorSequence1color4:  "#037679",
  colorSequence1color5:  "#038387",
  colorSequence1color6:  "#159195",
  colorSequence1color7:  "#2AA0A4",
  colorSequence1color8:  "#41A3A3",
  colorSequence1color9:  "#9BD9DB",
  colorSequence1color10: "#CEF3F5",

  // Sequential 2 — same as light
  colorSequence2color1:  "#35153A",
  colorSequence2color2:  "#63276D",
  colorSequence2color3:  "#863593",
  colorSequence2color4:  "#9F3FAF",
  colorSequence2color5:  "#B146C2",
  colorSequence2color6:  "#BA58C9",
  colorSequence2color7:  "#C36BD1",
  colorSequence2color8:  "#CF87DA",
  colorSequence2color9:  "#E6BFED",
  colorSequence2color10: "#F2DCF5",

  // Diverging 1 — same as light
  colorDiverging1color1: "#02494C",
  colorDiverging1color2: "#026467",
  colorDiverging1color3: "#159195",
  colorDiverging1color4: "#4CB4B7",
  colorDiverging1color5: "#D2D0CE",
  colorDiverging1color6: "#DAC157",
  colorDiverging1color7: "#C19C00",
  colorDiverging1color8: "#937700",
  colorDiverging1color9: "#6C5700",

  // Diverging 2 — same as light
  colorDiverging2color1: "#037679",
  colorDiverging2color2: "#159195",
  colorDiverging2color3: "#4CB4B7",
  colorDiverging2color4: "#DAC157",
  colorDiverging2color5: "#C19C00",
  colorDiverging2color6: "#D77440",
  colorDiverging2color7: "#CA5010",
  colorDiverging2color8: "#9A3D0C",

  // Alert — dark values
  colorAlert1: "#CC2635",
  colorAlert2: "#DC626D",
  colorAlert3: "#F87528",
  colorAlert4: "#54B054",
  colorAlert5: "#218C21",
  colorAlert6: "#4D4D4D",
  colorAlert7: "#333333",

  // Transparency slots — same as light
  colorTransparencyDataSlot1:  "#41A3A3",
  colorTransparencyDataSlot2:  "#CF87DA",
  colorTransparencyDataSlot3:  "#93A4F4",
  colorTransparencyDataSlot4:  "#B29AD4",
  colorTransparencyDataSlot5:  "#83BDEB",
  colorTransparencyDataSlot6:  "#5EC75A",
  colorTransparencyDataSlot7:  "#DF8E64",
  colorTransparencyDataSlot8:  "#EE5FB7",
  colorTransparencyDataSlot9:  "#A4CC6C",
  colorTransparencyDataSlot10: "#DAC157",
} as const;

export type DataVizTokens = typeof dataVizTokens;

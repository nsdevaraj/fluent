#!/usr/bin/env node
/**
 * audit-rtl.js — flags physical CSS properties that break RTL layouts.
 *
 * Components must use CSS logical properties (marginInlineStart, insetInlineEnd,
 * paddingInlineEnd, …) so that layouts mirror correctly under `dir="rtl"`.
 * This audit reports physical, direction-specific properties and suggests the
 * logical replacement.
 *
 * Usage:
 *   node scripts/audit-rtl.js               # scans src/components/ui
 *   node scripts/audit-rtl.js src/foo       # scans a custom directory
 *
 * Exit code: 0 when clean, 1 when violations are found (CI-friendly).
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const targetArg = process.argv[2] || "src/components/ui";
const TARGET = path.resolve(ROOT, targetArg);

// Physical property (regex) -> logical replacement suggestion.
const PROP = [
  [/\bmarginLeft\b/, "marginInlineStart"],
  [/\bmarginRight\b/, "marginInlineEnd"],
  [/\bpaddingLeft\b/, "paddingInlineStart"],
  [/\bpaddingRight\b/, "paddingInlineEnd"],
  [/\bborderLeftColor\b/, "borderInlineStartColor"],
  [/\bborderRightColor\b/, "borderInlineEndColor"],
  [/\bborderLeftWidth\b/, "borderInlineStartWidth"],
  [/\bborderRightWidth\b/, "borderInlineEndWidth"],
  [/\bborderLeftStyle\b/, "borderInlineStartStyle"],
  [/\bborderRightStyle\b/, "borderInlineEndStyle"],
  [/\btextAlign:\s*["'](left|right)["']/, 'textAlign: "start" | "end"'],
];

function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function scanFile(file) {
  const rel = path.relative(ROOT, file);
  const violations = [];
  const cleaned = stripComments(fs.readFileSync(file, "utf8"));
  cleaned.split("\n").forEach((line, i) => {
    for (const [re, fix] of PROP) {
      if (re.test(line)) {
        violations.push({ rel, line: i + 1, fix, text: line.trim() });
      }
    }
  });
  return violations;
}

function main() {
  if (!fs.existsSync(TARGET)) {
    console.error(`✖ audit-rtl: path not found — ${targetArg}`);
    process.exit(1);
  }

  const files = fs.statSync(TARGET).isDirectory() ? walk(TARGET) : [TARGET];
  const all = files.flatMap(scanFile);

  console.log(`\n↔️  RTL audit — scanned ${files.length} files in ${targetArg}\n`);

  if (all.length === 0) {
    console.log("✔ No physical direction properties found. Layout is RTL-safe.\n");
    process.exit(0);
  }

  const byFile = all.reduce((acc, v) => {
    (acc[v.rel] = acc[v.rel] || []).push(v);
    return acc;
  }, {});

  for (const [rel, list] of Object.entries(byFile)) {
    console.log(`  ${rel}`);
    for (const v of list) {
      console.log(`    L${v.line}  → ${v.fix}`);
      console.log(`         ${v.text.slice(0, 80)}`);
    }
    console.log("");
  }

  console.log(
    `✖ ${all.length} physical property use(s) in ${Object.keys(byFile).length} file(s).`
  );
  console.log("  Replace with CSS logical properties for correct RTL mirroring.\n");
  process.exit(1);
}

main();

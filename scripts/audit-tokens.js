#!/usr/bin/env node
/**
 * audit-tokens.js — flags hardcoded colors in component source.
 *
 * Design-system components must consume color through Fluent tokens or the
 * `semanticColors` aliases (see src/tokens), never as raw hex / rgb / hsl
 * literals. This audit scans component files and reports any raw color values
 * so they can be replaced with tokens.
 *
 * Usage:
 *   node scripts/audit-tokens.js            # scans src/components/ui
 *   node scripts/audit-tokens.js src/foo    # scans a custom directory
 *
 * Exit code: 0 when clean, 1 when violations are found (CI-friendly).
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const targetArg = process.argv[2] || "src/components/ui";
const TARGET = path.resolve(ROOT, targetArg);

// Files that are allowed to contain raw color values (token/palette sources).
const ALLOWLIST = new Set(["CONSTANTS.ts"]);

// Raw color literals: #rgb, #rrggbb, #rrggbbaa, rgb()/rgba()/hsl()/hsla().
const HEX = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
const FUNC = /\b(?:rgb|rgba|hsl|hsla)\s*\(/g;

/** Remove line and block comments so commented-out hex values aren't flagged. */
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
  if (ALLOWLIST.has(path.basename(file))) return [];

  const violations = [];
  const cleaned = stripComments(fs.readFileSync(file, "utf8"));
  cleaned.split("\n").forEach((line, i) => {
    for (const re of [HEX, FUNC]) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(line)) !== null) {
        violations.push({ rel, line: i + 1, value: m[0], text: line.trim() });
      }
    }
  });
  return violations;
}

function main() {
  if (!fs.existsSync(TARGET)) {
    console.error(`✖ audit-tokens: path not found — ${targetArg}`);
    process.exit(1);
  }

  const files = fs.statSync(TARGET).isDirectory() ? walk(TARGET) : [TARGET];
  const all = files.flatMap(scanFile);

  console.log(`\n🎨  Token audit — scanned ${files.length} files in ${targetArg}\n`);

  if (all.length === 0) {
    console.log("✔ No hardcoded color literals found. All colors use tokens.\n");
    process.exit(0);
  }

  const byFile = all.reduce((acc, v) => {
    (acc[v.rel] = acc[v.rel] || []).push(v);
    return acc;
  }, {});

  for (const [rel, list] of Object.entries(byFile)) {
    console.log(`  ${rel}`);
    for (const v of list) {
      console.log(`    L${v.line}  ${v.value}   ${v.text.slice(0, 80)}`);
    }
    console.log("");
  }

  console.log(
    `✖ ${all.length} hardcoded color literal(s) in ${Object.keys(byFile).length} file(s).`
  );
  console.log("  Replace with tokens from '@fluentui/react-components' or src/tokens.\n");
  process.exit(1);
}

main();

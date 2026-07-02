#!/usr/bin/env node
/**
 * bundle-size.js — reports raw and gzipped size of the built library.
 *
 * Run after `npm run build:lib` (which emits to dist/). The script walks the
 * dist output, prints per-bundle raw + gzip sizes, a total, and optionally
 * enforces a budget via the BUNDLE_BUDGET_KB env var.
 *
 * Usage:
 *   npm run build:lib && node scripts/bundle-size.js
 *   BUNDLE_BUDGET_KB=250 node scripts/bundle-size.js   # fail if gzip total exceeds
 *
 * Exit code: 0 when within budget (or no budget set), 1 when over budget.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const ROOT = process.cwd();
const DIST = path.resolve(ROOT, "dist");
const BUDGET_KB = process.env.BUNDLE_BUDGET_KB
  ? Number(process.env.BUNDLE_BUDGET_KB)
  : null;

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(js|cjs|mjs)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function kb(bytes) {
  return (bytes / 1024).toFixed(2) + " KB";
}

function main() {
  if (!fs.existsSync(DIST)) {
    console.log("\n📦  bundle-size: no dist/ directory found.");
    console.log("    Build the library first:  npm run build:lib\n");
    process.exit(0);
  }

  const files = walk(DIST);
  if (files.length === 0) {
    console.log("\n📦  bundle-size: dist/ contains no JS bundles.\n");
    process.exit(0);
  }

  let rawTotal = 0;
  let gzipTotal = 0;
  const rows = files.map((file) => {
    const buf = fs.readFileSync(file);
    const gz = zlib.gzipSync(buf, { level: 9 }).length;
    rawTotal += buf.length;
    gzipTotal += gz;
    return { rel: path.relative(DIST, file), raw: buf.length, gz };
  });

  rows.sort((a, b) => b.gz - a.gz);

  const nameW = Math.max(...rows.map((r) => r.rel.length), 12);
  console.log("\n📦  Library bundle size (dist/)\n");
  console.log(
    "  " + "file".padEnd(nameW) + "   " + "raw".padStart(10) + "   " + "gzip".padStart(10)
  );
  console.log("  " + "-".repeat(nameW + 28));
  for (const r of rows) {
    console.log(
      "  " + r.rel.padEnd(nameW) + "   " + kb(r.raw).padStart(10) + "   " + kb(r.gz).padStart(10)
    );
  }
  console.log("  " + "-".repeat(nameW + 28));
  console.log(
    "  " + "TOTAL".padEnd(nameW) + "   " + kb(rawTotal).padStart(10) + "   " + kb(gzipTotal).padStart(10)
  );

  if (BUDGET_KB != null) {
    const gzipKb = gzipTotal / 1024;
    if (gzipKb > BUDGET_KB) {
      console.log(
        `\n✖ Over budget: gzip total ${gzipKb.toFixed(2)} KB exceeds ${BUDGET_KB} KB.\n`
      );
      process.exit(1);
    }
    console.log(`\n✔ Within budget: ${gzipKb.toFixed(2)} KB ≤ ${BUDGET_KB} KB.\n`);
  } else {
    console.log("");
  }
  process.exit(0);
}

main();

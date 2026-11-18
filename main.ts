// Entry program for news-image-20261117 (v2).
//
// What ships in this repository is a finished infographic, entry.png,
// drawn as an HTML/SVG page (index.html) and rendered once to PNG.
// The competition harness runs this program in a sandbox with no
// network and expects the picture at a fixed output path, so the
// program's whole job is to place a copy of the bundled PNG there:
//
//   destination = $MAKEFUN_OUTPUT_DIR/entry.png   when the variable
//                                                  is set (local runs)
//               = /output/entry.png                otherwise (grader)
//
// Only Node 22's standard library is used. To try it locally:
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Anchor every path to this file's own folder. Resolving against the
// caller's working directory would break whenever the harness invokes
// the program from somewhere else.
const folder = dirname(fileURLToPath(import.meta.url));
const bundled = join(folder, "entry.png");

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = join(outDir, "entry.png");

// A fresh sandbox may not have the output folder yet, so create it
// (recursively, and without complaining if it already exists).
mkdirSync(outDir, { recursive: true });
copyFileSync(bundled, outFile);

console.log("wrote " + outFile + " (" + statSync(outFile).size + " bytes)");

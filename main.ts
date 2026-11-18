// news-in-one-image-20261117 — entry program.
//
// The entry itself is the infographic in entry.png, which sits next to
// this file. The harness expects the image at a well-known output
// location, so this program simply delivers the bundled PNG there:
//
//   - if MAKEFUN_OUTPUT_DIR is set, the image goes to
//     $MAKEFUN_OUTPUT_DIR/entry.png (used for local test runs)
//   - otherwise it goes to /output/entry.png (the grader's container)
//
// Node 22 standard library only; no network access, no dependencies.
// Run it with:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolve the folder this file lives in, so the PNG is found relative
// to main.ts rather than relative to the caller's working directory.
const here = dirname(fileURLToPath(import.meta.url));
const sourcePng = join(here, 'entry.png');

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const targetPng = join(outputDir, 'entry.png');

// The output folder may not exist yet on a fresh run.
mkdirSync(outputDir, { recursive: true });
copyFileSync(sourcePng, targetPng);

const { size } = statSync(targetPng);
console.log(`entry.png delivered: ${targetPng} (${size} bytes)`);

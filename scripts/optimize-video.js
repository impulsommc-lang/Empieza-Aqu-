/**
 * Optimize hero video for fast web playback using ffmpeg-static.
 * - Strips audio (background video needs none)
 * - H.264 CRF 26 — great quality at ~60% smaller file size
 * - Scale to max 1280px wide, preserve aspect ratio
 * - movflags +faststart: moov atom moved to front so browsers play before full download
 * - yuv420p: required for Safari / iOS compatibility
 *
 * Run: node scripts/optimize-video.js
 */

import { execFileSync } from 'child_process';
import { createRequire } from 'module';
import { existsSync, statSync, renameSync, copyFileSync } from 'fs';
import { resolve } from 'path';

const require = createRequire(import.meta.url);

// ffmpeg-static provides the path to a bundled static ffmpeg binary
let ffmpegPath;
try {
  ffmpegPath = require('ffmpeg-static');
} catch {
  console.error('ffmpeg-static not found. Run: npm install --save-dev ffmpeg-static');
  process.exit(1);
}

const PUBLIC_DIR = resolve('/vercel/share/v0-project/public');
const INPUT      = resolve(PUBLIC_DIR, 'bubcle.mp4');
const BACKUP     = resolve(PUBLIC_DIR, 'bubcle.original.mp4');
const OUTPUT     = resolve(PUBLIC_DIR, 'bubcle.optimized.mp4');

if (!existsSync(INPUT)) {
  console.error(`Source video not found at ${INPUT}`);
  process.exit(1);
}

const originalSize = statSync(INPUT).size;
console.log(`Original video : ${INPUT}`);
console.log(`Original size  : ${(originalSize / 1024 / 1024).toFixed(2)} MB`);

// Back up original once
if (!existsSync(BACKUP)) {
  copyFileSync(INPUT, BACKUP);
  console.log(`Backup saved to: ${BACKUP}`);
}

const args = [
  '-y',
  '-i', INPUT,
  '-an',                       // strip audio
  '-vf', 'scale=1280:-2',     // max 1280px wide, keep aspect ratio
  '-c:v', 'libx264',
  '-crf', '26',
  '-preset', 'slow',           // better compression (runs once)
  '-profile:v', 'main',        // broad device compatibility
  '-level', '4.0',
  '-pix_fmt', 'yuv420p',       // Safari / iOS required
  '-movflags', '+faststart',   // moov atom at front = instant play
  OUTPUT,
];

console.log(`\nRunning: ${ffmpegPath} ${args.join(' ')}\n`);

try {
  execFileSync(ffmpegPath, args, { stdio: 'inherit' });
} catch (err) {
  console.error('ffmpeg failed:', err.message);
  process.exit(1);
}

const optimizedSize = statSync(OUTPUT).size;
const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

console.log(`\nOptimized size : ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`Savings        : ${savings}%`);

// Replace original with optimized version
renameSync(OUTPUT, INPUT);
console.log(`\nReplaced ${INPUT} with optimized version.`);
console.log('Done! Hero video is web-optimized for instant playback.');

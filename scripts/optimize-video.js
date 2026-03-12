/**
 * Optimize hero video for fast web playback using ffmpeg-static.
 * - Strips audio
 * - H.264 CRF 26 — great quality at ~60% smaller file size
 * - Scale to max 1280px wide, preserve aspect ratio
 * - movflags +faststart: moov atom at front so browsers play before full download
 * - yuv420p: required for Safari / iOS compatibility
 *
 * Run: node scripts/optimize-video.js
 */

const { execFileSync } = require('child_process');
const { existsSync, statSync, renameSync, copyFileSync } = require('fs');
const path = require('path');

let ffmpegPath;
try {
  ffmpegPath = require('ffmpeg-static');
} catch {
  console.error('ffmpeg-static not found. Run: npm install --save-dev ffmpeg-static');
  process.exit(1);
}

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const INPUT  = path.join(PUBLIC_DIR, 'bubcle.mp4');
const BACKUP = path.join(PUBLIC_DIR, 'bubcle.original.mp4');
const OUTPUT = path.join(PUBLIC_DIR, 'bubcle.optimized.mp4');

console.log('Working dir: ' + process.cwd());
console.log('Looking for: ' + INPUT);

if (!existsSync(INPUT)) {
  console.error('Source video not found at ' + INPUT);
  process.exit(1);
}

const originalSize = statSync(INPUT).size;
console.log('Original video : ' + INPUT);
console.log('Original size  : ' + (originalSize / 1024 / 1024).toFixed(2) + ' MB');

// Back up original once
if (!existsSync(BACKUP)) {
  copyFileSync(INPUT, BACKUP);
  console.log('Backup saved to: ' + BACKUP);
}

const args = [
  '-y',
  '-i', INPUT,
  '-an',
  '-vf', 'scale=1280:-2',
  '-c:v', 'libx264',
  '-crf', '26',
  '-preset', 'slow',
  '-profile:v', 'main',
  '-level', '4.0',
  '-pix_fmt', 'yuv420p',
  '-movflags', '+faststart',
  OUTPUT,
];

console.log('\nRunning ffmpeg...\n');

try {
  execFileSync(ffmpegPath, args, { stdio: 'inherit' });
} catch (err) {
  console.error('ffmpeg failed:', err.message);
  process.exit(1);
}

const optimizedSize = statSync(OUTPUT).size;
const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

console.log('\nOptimized size : ' + (optimizedSize / 1024 / 1024).toFixed(2) + ' MB');
console.log('Savings        : ' + savings + '%');

// Replace original with optimized version
renameSync(OUTPUT, INPUT);
console.log('\nReplaced ' + INPUT + ' with optimized version.');
console.log('Done! Hero video is web-optimized for instant playback.');

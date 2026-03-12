/**
 * Optimizes bubcle.mp4 for the web:
 *  - Re-encodes with H.264 CRF 28 (good quality, smaller file)
 *  - Moves the moov atom to the front (faststart) for instant playback
 *  - Strips audio (muted video, no need for audio track)
 *  - Scales to max 1280px wide (preserves aspect ratio)
 */

import { execSync } from 'child_process';
import { existsSync, renameSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
const input = path.join(publicDir, 'bubcle.mp4');
const output = path.join(publicDir, 'bubcle.optimized.mp4');
const backup = path.join(publicDir, 'bubcle.original.mp4');

if (!existsSync(input)) {
  console.error('Input file not found:', input);
  process.exit(1);
}

// Check ffmpeg is available
try {
  execSync('ffmpeg -version', { stdio: 'ignore' });
} catch {
  console.error('ffmpeg not found. Please install ffmpeg to run this script.');
  process.exit(1);
}

console.log('Optimizing video...');
console.log('Input:', input);

const cmd = [
  'ffmpeg -y',
  `-i "${input}"`,
  '-c:v libx264',
  '-crf 28',
  '-preset veryslow',       // better compression
  '-vf "scale=\'min(1280,iw)\':-2"', // max 1280px wide, keep aspect ratio
  '-an',                    // strip audio (hero video is muted)
  '-movflags +faststart',   // moov atom at front = instant play
  '-pix_fmt yuv420p',       // max browser compatibility
  `"${output}"`
].join(' ');

try {
  execSync(cmd, { stdio: 'inherit' });
  // Backup original, replace with optimized
  renameSync(input, backup);
  renameSync(output, input);
  console.log('\nDone! Optimized video saved to:', input);
  console.log('Original backed up to:', backup);
} catch (err) {
  console.error('ffmpeg failed:', err.message);
  process.exit(1);
}

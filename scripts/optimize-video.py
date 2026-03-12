#!/usr/bin/env python3
"""
Optimize the hero video for fast web playback.
- Strips audio (not needed for hero background)
- Re-encodes H.264 at CRF 26 (good quality, smaller file)
- Scales to max 1280px wide (enough for hero backgrounds)
- Moves moov atom to front (faststart) so browsers can play before full download
- Outputs to the same public/ folder as bubcle.mp4
"""

import subprocess
import shutil
import os
import sys

PUBLIC_DIR = '/vercel/share/v0-project/public'
INPUT  = os.path.join(PUBLIC_DIR, 'bubcle.mp4')
BACKUP = os.path.join(PUBLIC_DIR, 'bubcle.original.mp4')
OUTPUT = os.path.join(PUBLIC_DIR, 'bubcle.optimized.mp4')

# Check ffmpeg is available
if not shutil.which('ffmpeg'):
    print("ERROR: ffmpeg not found in PATH. Cannot optimize video.", file=sys.stderr)
    sys.exit(1)

if not os.path.exists(INPUT):
    print(f"ERROR: Source video not found at {INPUT}", file=sys.stderr)
    sys.exit(1)

original_size = os.path.getsize(INPUT)
print(f"Original video: {INPUT}")
print(f"Original size:  {original_size / 1024 / 1024:.2f} MB")

# Back up original
if not os.path.exists(BACKUP):
    shutil.copy2(INPUT, BACKUP)
    print(f"Backup saved to: {BACKUP}")

# ffmpeg command:
#  -an             : strip audio
#  -vf scale       : limit width to 1280, keep aspect ratio
#  -c:v libx264    : H.264 codec
#  -crf 26         : quality (18=lossless, 28=good, 51=worst)
#  -preset slow    : better compression (more CPU but runs once)
#  -profile:v main : broad browser compatibility
#  -level 4.0      : compatible with all devices
#  -pix_fmt yuv420p: required for Safari/iOS
#  -movflags +faststart : move moov atom to front for instant streaming
cmd = [
    'ffmpeg', '-y',
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
    OUTPUT
]

print("\nRunning ffmpeg...")
print(' '.join(cmd))
result = subprocess.run(cmd, capture_output=True, text=True)

if result.returncode != 0:
    print("ERROR: ffmpeg failed:", file=sys.stderr)
    print(result.stderr, file=sys.stderr)
    sys.exit(1)

optimized_size = os.path.getsize(OUTPUT)
savings = (1 - optimized_size / original_size) * 100

print(f"\nOptimized size: {optimized_size / 1024 / 1024:.2f} MB")
print(f"Savings:        {savings:.1f}%")

# Replace original with optimized
shutil.move(OUTPUT, INPUT)
print(f"\nReplaced {INPUT} with optimized version.")
print("Done! The hero video is now web-optimized for instant playback.")

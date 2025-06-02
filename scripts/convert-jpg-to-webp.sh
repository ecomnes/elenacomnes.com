#!/usr/bin/env bash
set -euo pipefail

mkdir -p img/thumbs

for img in look*.jpeg; do
  base=$(basename "$img" .jpeg)

  # Convert full-size .webp
  cwebp -q 85 "$img" -o "img/${base}.webp"

  # Create 1x thumbnail (480px wide, height auto)
  convert "$img" -resize 480x -quality 85 "img/thumbs/${base}@1x.webp"

  # Create 2x thumbnail (960px wide, height auto)
  convert "$img" -resize 960x -quality 85 "img/thumbs/${base}@2x.webp"
done

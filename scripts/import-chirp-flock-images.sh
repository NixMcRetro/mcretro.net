#!/usr/bin/env bash
# Rebuild the four original Channel Chirp profile images as JPEG XL only.
# Sources are pinned to the historical ChannelChirp/website Git commit.
set -euo pipefail

source_commit='4bb407a15f29cb75000d4ef636d441af009b2a48'
target='assets/images/2018/01/chirp-flock'
tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT

if ! command -v cjxl >/dev/null 2>&1 || ! command -v djxl >/dev/null 2>&1; then
  echo 'Please install libjxl-tools (cjxl and djxl).' >&2
  exit 1
fi

mkdir -p "$target"
sources=(
  'pudge.jpg ee3349f905277897a900cb5b16c08ae456f1e94b pudge'
  'tillie.jpg f44f4767996a3fde79c569da71a47c5e0f0d17ff tillie'
  'chip.jpg 8ab7c2db18168b4cfa5ed083922056c075dfa563 chip'
  'bird-food.png 841be33e5d4893982b838c7dc757ed50b7c71070 diet'
)

for entry in "${sources[@]}"; do
  read -r source expected name <<< "$entry"
  input="$tmpdir/$source"
  output="$target/$name.jxl"
  url="https://raw.githubusercontent.com/ChannelChirp/website/$source_commit/images/$source"

  echo "Retrieving original Channel Chirp image: $source"
  curl --fail --location --silent --show-error --retry 3 "$url" --output "$input"
  actual="$(git hash-object "$input")"
  if [[ "$actual" != "$expected" ]]; then
    echo "Source integrity check failed for $source" >&2
    exit 1
  fi

  if [[ "$source" == *.jpg ]]; then
    # JPEG XL reconstructs the original JPEG losslessly, without another
    # generation of JPEG degradation. No fallback JPEG is published.
    cjxl "$input" "$output" -e 9
  else
    # Keep the original PNG pixel data lossless in JXL.
    cjxl "$input" "$output" -d 0 -e 9
  fi

  test -s "$output"
  djxl "$output" "$tmpdir/$name-verified.png" >/dev/null
  echo "Verified JPEG XL: $output ($(wc -c < "$output") bytes)"
done

python3 - <<'PY'
from pathlib import Path
base = Path("assets/images/2018/01/chirp-flock")
for name in ("pudge", "tillie", "chip", "diet"):
    image = (base / f"{name}.jxl").read_bytes()
    assert image[:12] == bytes.fromhex("0000000c4a584c200d0a870a") or image[:2] == bytes.fromhex("ff0a"), name
assert set(p.name for p in base.iterdir()) == {"pudge.jxl", "tillie.jxl", "chip.jxl", "diet.jxl"}
print("All four JPEG XL originals verified; no fallback formats.")
PY

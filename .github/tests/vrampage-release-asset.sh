#!/usr/bin/env bash
# Pull-request verification of the immutable source-inclusive release ZIP.
set -euo pipefail
version="$(python3 -c 'import json; print(json.load(open("homepages/vrampage-md/build-info.json"))["application_version"])')"
if [[ "$version" == 0.5.1 ]]; then
  # The exact source ZIP now accompanies the runtime on the same origin.
  python3 .github/tests/vrampage-package.py homepages/vrampage-md
  # Publication precedes website integration: verify the mirror is already
  # available and byte-identical, rather than shipping a future/404 source link.
  expected_source_sha="$(python3 -c 'import json; print(json.load(open(".github/vrampage-release.json"))["source_archive_sha256"])')"
  source_url="https://github.com/NixMcRetro/VRAMpage-MD/releases/download/v0.5.1/VRAMpage-MD-v0.5.1-corresponding-source.zip"
  source_temp="$(mktemp -d)"
  trap 'rm -rf "$source_temp"' EXIT
  curl --fail --location --retry 3 --retry-delay 2 --connect-timeout 20 --max-time 120 \
    --output "$source_temp/source.zip" "$source_url"
  printf '%s  %s\n' "$expected_source_sha" "$source_temp/source.zip" | sha256sum --check
  cmp "$source_temp/source.zip" homepages/vrampage-md/source/VRAMpage-MD-v0.5.1-corresponding-source.zip
  unzip -tq "$source_temp/source.zip" >/dev/null
  echo 'Verified public GitHub source mirror equals the complete same-origin source ZIP.'
  exit 0
fi
# Retain the original v0.5.0 release-asset checks without changing its assets.
release_url="https://github.com/NixMcRetro/VRAMpage-MD/releases/download/v0.5.0/VRAMpage-MD-v0.5.0-browser.zip"
release_sha256="6024ad1701d1cb58dc5da16ce4ae51db4fd03de7e9e1a6e26b3e6aff27ef0aad"
tempdir="$(mktemp -d)"
trap 'rm -rf "$tempdir"' EXIT
curl --fail --location --retry 3 --retry-delay 2 --connect-timeout 20 --max-time 120 \
  --output "$tempdir/release.zip" "$release_url"
printf '%s  %s\n' "$release_sha256" "$tempdir/release.zip" | sha256sum --check
unzip -tq "$tempdir/release.zip" >/dev/null

filelist="$(unzip -Z -1 "$tempdir/release.zip")"
for required in \
  "VRAMpage-MD/site/source/README.txt" \
  "VRAMpage-MD/site/source/patch_core.py" \
  "VRAMpage-MD/site/source/src/main/c/core/genesis.c" \
  "VRAMpage-MD/site/source/src/main/c/core/vdp_render.h" \
  "VRAMpage-MD/site/source/runtime-profile/source/wasm-genplus/package-lock.json" \
  "VRAMpage-MD/site/source/src/main/c/core/ntsc/license.txt" \
  "VRAMpage-MD/THIRD-PARTY-NOTICES.md" \
  "VRAMpage-MD/site/build-info.json"; do
  grep -Fxq "$required" <<< "$filelist" ||
    { echo "::error::Missing corresponding-source file: $required"; exit 1; }
done

for file in app.js style.css circuit-config.js framebuffer.js experiment-comparison.js \
  core/genplus.js core/genplus.wasm build-info.json; do
  unzip -p "$tempdir/release.zip" "VRAMpage-MD/site/$file" |
    cmp - "homepages/vrampage-md/$file" ||
    { echo "::error::Runtime differs from immutable release: $file"; exit 1; }
done
unzip -p "$tempdir/release.zip" "VRAMpage-MD/THIRD-PARTY-NOTICES.md" |
  cmp - "homepages/vrampage-md/THIRD-PARTY-NOTICES.md" ||
  { echo "::error::Licence notices differ from release"; exit 1; }
echo 'Verified release checksum, corresponding source, and hosted runtime.'

# GOATPAD 1337 - historical restoration and Opus optimisation

Historical source: the owner's July 2024 GOATPAD 1337 archive, including an eight-by-eight soundboard and sequencer, all 64 original Ogg Vorbis samples, the HTML/CSS/artwork, sound categories, and the MIT licence.

## Published soundboard

- **Opus only:** browsers request .opus files. There is deliberately no MP3, Vorbis or other audio fallback.
- **24 kbps VBR** is the selected Opus bitrate, approved by the owner after listening to the original, 24 kbps and 32 kbps versions. The player uses this single format with no audio fallback.
- **56 unique recordings for 64 pads:** eight pairs are proven identical by SHA-256 at build time. The soundboard maps duplicate pads to the same fetched and decoded recording, preserving every original pad's sound.
- **Progressive loading:** the first eight sounds load when the visitor clicks Start GOATPAD 1337, allowing the board to open sooner. Other sounds fetch and decode only when selected. A failed load can be retried by clicking its pad again.
- **Idle efficiency:** the original 860 ms eight-step metronome/sequence cadence runs only while there is an active pad, keeping idle CPU use low.
- **Small favicon:** the existing original PNG icon is served instead of the oversized .ico file.

## Build and archival preservation

The 64 original Vorbis files stay unchanged under homepages/goatpad/audio/ in GitHub source. After Jekyll generates _site, the prepare-goatpad-opus.py build step uses FFmpeg to encode the 56 unique recordings into the deployed audio directory, then deletes every published .ogg file and the obsolete .ico. This is a deploy-time asset build: original recordings are preserved in Git, but no alternate audio format is published. The script validates exact file counts, Opus headers, hashed duplicate pairs and absence of non-Opus files.

To reproduce the production build locally:

    bundle exec jekyll build --destination _site
    python3 .github/tests/prepare-goatpad-opus.py --site _site --bitrate 24
    python3 .github/tests/prepare-goatpad-opus.py --site _site --verify
    node --test .github/tests/goatpad-audio.test.mjs

Older browsers without Ogg Opus decoding are intentionally unsupported, per the owner's explicit no-fallback instruction. Test in an actual browser before releasing.

# Self-hosted site fonts

This directory keeps the McRetro.net web fonts available on our own domain.
The original Korataki files are untouched.

- **Merriweather:** Google Fonts revision v33, via Fontsource `fontsource/font-files` (`fonts/google/merriweather/files/`). Styles: normal 400, normal 700, italic 400.
- **Montserrat:** Google Fonts revision v31, via Fontsource `fontsource/font-files` (`fonts/google/montserrat/files/`). Styles: normal 400, normal 700.
- **Format:** WOFF2 only. Subsets: Cyrillic Extended, Cyrillic, Vietnamese, Latin Extended and Latin, with the exact Fontsource CSS unicode ranges.
- **Licensing:** both families under SIL Open Font License 1.1, notices retained as `merriweather/OFL.txt` and `montserrat/OFL.txt`.
- **Implementation:** @font-face declarations in `assets/css/style.css`, with `font-display: swap`. No new external font service requests.

Version labels v33/v31 refer to the Google Fonts asset revisions, not necessarily the font designer's numbering. These are redistribution copies of the unmodified Fontsource WOFF2 files.

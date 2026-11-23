# McRetro automated test policy

Tests are here to prevent broken pages and lost material, not to forbid a redesign.

## Required checks (block deployment)

- Jekyll builds, the published site meets its CSP requirements, and Pagefind completes.
- Restored photographs, historical pages, original audio files, and the approved VRAMpage release survive publication.
- Links in Goodies actually point to generated pages, the existing project and restored-homepage destinations remain reachable, and the original floppy GIF is included.
- Interactive audio, dial-up, calendar navigation, colour-theme switching, and accordion click/scroll behaviour work.
- Captions, archive article counts, navigation destinations, and accessible control names remain correct.

## Workflow ownership

- `.github/workflows/jekyll.yml` owns the published Jekyll/Pagefind build and the CSP, footer, navigation, script-tag and random-post regressions. The old standalone CSP Preparation workflow has been consolidated here to avoid duplicate runs.
- `.github/workflows/op1-browser-tests.yml` runs BleepGarden browser regressions for relevant source and test changes on `main` and pull requests. Historical development branch triggers have been retired.
- `.github/workflows/preserve-blog-media.yml` guards article media removals in pull requests. It does not protect direct pushes to `main`; major media edits should therefore be made through a PR.
- `.github/workflows/link-audit.yml` remains an on-demand, report-only link checker.

## Advisory checks (do not block deployment)

- Exact colours, dimensions, spacing, decorative GIFs, visual alignment, and other stylistic choices.
- GOATPAD decorative framing and precise HUD layout.
- The theme test suite's many CSS selector and literal pixel-value assertions.

Advisory steps are labelled **non-blocking** in the Jekyll workflow. Their failures still appear in the Actions log and should be reviewed, but they must not make an otherwise sound site impossible to publish.

## Rules when writing or changing tests

1. Test the **published result** and the user's task, not Markdown versus HTML or a particular CSS class.
2. A card replacing an accordion, or one CSS colour replacing another, must not break a required test by itself.
3. When a feature depends on a particular attribute, such as a keyboard-accessible `<summary>` or `aria-label`, that attribute is a legitimate functional contract.
4. For restored historical material, preserving original files, links, media, and content is important. Historical authenticity may justify stronger checks than modern page styling.
5. New projects may be added without changing an arbitrary expected card count. If an established Goodies project is deliberately retired, update its preservation list in `.github/tests/goodies-directory-built.mjs` as a conscious editorial decision.
6. Every structural redesign should review tests mentioning the changed page before merging. Don't fix CI failures one by one after publishing.
7. Never turn off a real broken-link, missing-media, release-integrity, accessibility, or functional failure just to get a green build.

To run the required Goodies check after a local Jekyll build:

```bash
node .github/tests/goodies-directory-built.mjs _site
```

To run the standalone interaction tests:

```bash
node --test .github/tests/modem-destinations.mjs .github/tests/archive-calendar.mjs
```

The Jekyll workflow documents which theme and GOATPAD checks are required versus advisory.

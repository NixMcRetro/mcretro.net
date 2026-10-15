# BleepGarden Music Maker 2000: v2.8 name and attribution

Date: 16 October 2026
Repository: NixMcRetro/mcretro.net
Feature branch: op1-v2.8-bleepgarden-branding
Starting published main commit: 132e8db03c8cbcd6f190ee57963904aae8ca23db

## Approved name

**BleepGarden Music Maker 2000**

Exact requested credit: **Created for SuperNick (Nick)**. This identifies the intended recipient, not the creator. Do not describe SuperNick as the developer, and do not treat SuperNick as the name of the program.

## Branding changes

- Visible header, browser title, HTML metadata, Apple home-screen title, PWA manifest name/short name/description, help-guide heading, and Classic Studio hardware badge are renamed. Display the exact “Created for SuperNick (Nick)” credit in the header, with consistent recipient wording in metadata and the guide.
- Minimal typographic identity: `bg.` wordmark and garden-inspired sage/green accents. The underlying two-tab Make Music / Play Keyboard UX, existing saved dark-mode preference and instrument controls stay intact.
- The user-facing finished-song WAV download becomes `bleepgarden-music-maker-2000-song.wav`.
- Tests verify the new branding and preserved functionality in Chromium, Firefox and WebKit.
- GitHub regression workflow and source-artifact label now reflect the new program name.

## Essential backward compatibility

- Keep the existing live URL: `https://mcretro.net/homepages/op-1/`. No page relocation or Jekyll aliases are required.
- Keep PWA manifest `id: "./"`, `start_url: "./"`, and `scope: "./"` to avoid changing the installed application's identity.
- Keep legacy storage keys, portable `op1-browser-lab-v05` project format, tracker and tape data, workspaces, MIDI formats, all samples and completed audio untouched.
- Change only the service-worker cache version; retain the `op1-browser-lab-shell-` prefix so the update can remove previous static caches without touching user recordings.
- Internal file names and historical projects may still use OP-1 identifiers. This is deliberate: only the public-facing branding changes.
- The old OP-1 inspiration and unofficial firmware disclaimer remain truthful in help text. The app must not imply affiliation with Teenage Engineering or Casio.
- Existing icons remain unchanged for this text-first rebrand. New original illustrations/icons can be a later, separately approved cosmetic task.

## Verification and publication

- Run `.github/tests/op1-bleepgarden-branding.mjs`, full OP-1/BleepGarden regression and Chromium offline/PWA tests at the exact final release commit.
- Keep all unrelated blog files, photographs, Jekyll site workflows and GitHub Pages output unchanged.
- This branch is a prepared candidate, not a published release. No fast-forward to main without separate explicit approval. Never force-push.

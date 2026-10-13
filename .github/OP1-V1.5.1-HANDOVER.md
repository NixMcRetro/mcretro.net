# SuperNick’s OP-1 Browser Lab v1.5.1 handover

Date: 14 October 2026

## Scope

Maintenance release addressing the visible website version and beginner-friendly note names. The large instrument keys and smaller mobile touch keys display the actual named pitch (C3 through B4 at OCT 0, including sharps) and retain computer-key shortcuts. Labels, tooltips and accessibility names follow OCT changes. The website heading, browser title, Performance Studio and Offline & Install panels all identify v1.5.1. Service-worker shell cache moves to v1.5.1 for safe update of installed/offline copies.

## Compatibility

Existing project JSON schema remains `op1-browser-lab-v05`, numeric version 5. The existing localStorage key, IndexedDB database version, synthesis/note frequency mapping, transport, recording, pattern chaining and other instruments remain unchanged. No project data is stored by the service worker. The pitch octave is intentionally labelled according to the existing `noteName` mapping: C3 for MIDI note 48 at octave offset zero, with C4 as the next octave.

## Regression expectations

Run Playwright Chromium/Firefox/WebKit browser smoke, Tape Studio, Performance Studio and Chromium offline/PWA tests. Smoke verifies 24 visible pitch names on each on-screen keyboard, keyboard shortcuts, accessibility labels and dynamic octave changes. Offline test verifies new v1.5.1 cache and persisted project state.

## Physical-device checks still recommended

Check actual iPhone Safari PWA update from v1.5, legibility in portrait and landscape, Safari VoiceOver announcement, taps while sliding between keys, and real speaker/microphone capture.

## Production

Repository `NixMcRetro/mcretro.net`; target `https://mcretro.net/homepages/op-1/`. Development branch `op1-v1.5.1-key-labels`. Avoid unrelated website/blog changes. Publish via a verified fast-forward only after tests pass.

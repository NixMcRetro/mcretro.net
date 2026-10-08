---
title: "Take Back the Darknet (Part 13)"
author: "Nix McRetro"
date: 2016-01-04T23:40:59.000+11:00
last_modified_at: 2026-10-08
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-08
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [guides, raspberry-pi]
---

**Part 13 - Generating a Vanity Onion Address**

**Archive note:** This page documents the January 2016 Tor v2 onion-service setup. Read the compatibility and security warning in [Part 1](/take-back-the-darknet-part-1/) before using any of this series as current guidance.

Back in 2016 I used [**Shallot**](https://web.archive.org/web/20150916172316/https://github.com/katmagic/Shallot) to generate a vanity onion address and its corresponding private key.

Shallot belongs to the old v2 onion-service era: its addresses had 16 characters before .onion, and Tor retired v2 services in 2021. Modern v3 addresses have 56 characters before .onion and require different tooling, so a Shallot-generated v2 key cannot be used for a current onion service.

### Sources

- [Tor Project - Onion Service version 2 deprecation timeline](https://blog.torproject.org/v2-deprecation-timeline/)
- [Tor Project - Vanity Addresses](https://community.torproject.org/onion-services/advanced/vanity-addresses/)

### Related posts

- [Generating Vanity Onion Addresses with Shallot](/generating-vanity-onion-addresses-with-shallot/)

Advance onward to [Part 14](/take-back-the-darknet-part-14/) or head back to the table of contents on [Part 1](/take-back-the-darknet-part-1/).

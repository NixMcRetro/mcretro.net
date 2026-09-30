---
title: "Take Back the Darknet (Part 13)"
author: "Nix McRetro"
date: 2016-01-04T23:40:59.000+11:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [guides, raspberry-pi]
---

**Part 13 - Generating a Vanity Onion Address**

**Archive note:** This page documents the January 2016 Tor v2 onion-service setup. Read the compatibility and security warning in [Part 1](/take-back-the-darknet-part-1/) before using any of this series as current guidance.

Back in 2016 I used **Shallot** to generate a vanity onion address and its corresponding private key.

Shallot belongs to the old version 2 onion-service era. Those addresses were only 16 characters long, and Tor retired them in 2021.

Modern version 3 onion addresses are 56 characters long and require different tooling. Do not use a Shallot-generated v2 private key for a current onion service.

The old [Shallot](https://web.archive.org/web/20230331011246/https://github.com/katmagic/Shallot) link is preserved here because this is what I actually used at the time.

### Related posts

- [Generating Vanity Onion Addresses with Shallot](/generating-vanity-onion-addresses-with-shallot/)

Advance onward to [Part 14](/take-back-the-darknet-part-14/) or head back to the table of contents on [Part 1](/take-back-the-darknet-part-1/).

### Sources

- [Tor Project - V2 Onion Services Deprecation](https://support.torproject.org/onionservices/v2-deprecation/)
- [Tor Project - Vanity Addresses](https://community.torproject.org/onion-services/advanced/vanity-addresses/)

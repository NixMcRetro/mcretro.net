---
title: "Generating Vanity Onion Addresses with Shallot"
author: "Nix McRetro"
date: 2016-05-14T23:25:26.000+10:00
last_modified_at: 2026-10-08
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-08
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [guides, hacks, raspberry-pi]
---

![Shallot](/assets/images/2016/img_0472.jpg)

Back in 2016 I used **Shallot 0.0.3-alpha** to generate a vanity version 2 onion address for McRetro. My old address was mcretro35qepy5cy.onion. This is now historical documentation: Shallot generates the old 16-character **v2 onion addresses**, and Tor removed support for those services in 2021. Modern version 3 onion addresses are 56 characters long and require modern v3-compatible vanity tools.

For the old Ubuntu 16.04 (64-bit) setup I was using, Shallot needed the OpenSSL development headers. Without them I hit **"fatal error: openssl/bn.h: No such file or directory"** when trying to build it. My commands were:

`sudo apt-get update`

`sudo apt-get install libssl-dev`

Then:

`./configure && make`

Running `./shallot cat` searched for a v2 address containing `cat`. Running `./shallot ^cat` searched for one beginning with `cat`, thanks to our good friend the caret. Again, those examples only apply to the obsolete v2 address format.

The generated private key was the identity of the onion service, so losing control of that key meant losing control of that address. The screenshot includes a private key generated for an example v2 address. Since it was published here, it must not be reused as a service key. Keep the private key of any real onion service private.

For a modern onion service, use current Tor v3 documentation and tooling instead.

### Sources

- [Tor Project - Onion Service version 2 deprecation timeline](https://blog.torproject.org/v2-deprecation-timeline/)
- [Tor Project - Vanity Addresses](https://community.torproject.org/onion-services/advanced/vanity-addresses/)
- [Shallot developer README (archived GitHub repository)](https://web.archive.org/web/20230331011246/https://github.com/katmagic/Shallot)

### Related posts

- [Take Back the Darknet (Part 13)](/take-back-the-darknet-part-13/)
- [The Darknet (Day 36)](/the-darknet-day-36/)
- [ZeroNet, BitTorrent and Another Darknet](/zeronet-bittorrent-and-another-darknet/)

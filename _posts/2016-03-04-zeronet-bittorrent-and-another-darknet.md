---
title: "ZeroNet, BitTorrent and Another Darknet"
author: "Nix McRetro"
date: 2016-03-04T13:05:33.000+11:00
last_modified_at: 2026-10-08
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-08
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [news, raspberry-pi]
---

![Namecoin Logo](/assets/images/2016/img_0460.jpg)

Just a few days ago I managed to get WordPress playing nicely with the Tor onion mirror of this website, then hosted at **mcretro35qepy5cy.onion**. Magnificent! That got me wondering what other decentralised networks I could experiment with. First up: **Namecoin** and `.bit` names.

I had been downloading the Namecoin blockchain and converted several thousand Dogecoins into Namecoin so I could experiment with registering a `.bit` name. Genius!

Then I stumbled onto **ZeroNet**, which describes itself as decentralised websites using Bitcoin-style cryptography and the BitTorrent network. It can also resolve Namecoin `.bit` addresses and use Tor for peer connections.

Tor can help hide the network address used for ZeroNet traffic, but that does not automatically make every action or identity anonymous.

Of course I still had to work out how to slap all of this onto a Raspberry Pi 2 alongside everything else already running there. At any rate it was certainly a challenge, and I looked forward to winning the prize.

### Sources

- [ZeroNet](https://github.com/HelloZeroNet/ZeroNet)
- [ZeroNet - Frequently Asked Questions](https://github.com/HelloZeroNet/Documentation/blob/master/docs/en/faq.md)
- [Namecoin](https://www.namecoin.org/)

### Related posts

- [The Darknet (Day 36)](/the-darknet-day-36/)
- [Take Back the Darknet (Part 1)](/take-back-the-darknet-part-1/)
- [Generating Vanity Onion Addresses with Shallot](/generating-vanity-onion-addresses-with-shallot/)

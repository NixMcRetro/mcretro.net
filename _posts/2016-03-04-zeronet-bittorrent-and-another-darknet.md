---
title: "ZeroNet, BitTorrent and Another Darknet"
author: "Nix McRetro"
date: 2016-03-04T13:05:33.000+11:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [news, raspberry-pi]
---

![Namecoin Logo](/assets/images/2016/img_0460.jpg)

Just a few days ago I managed to get WordPress playing nicely with the Tor onion mirror of this website.

That got me wondering what other decentralised networks I could experiment with.

First up: **Namecoin** and `.bit` names.

I had been downloading the Namecoin blockchain and converted some Dogecoin into Namecoin so I could experiment with registering a `.bit` name.

Then I stumbled onto **ZeroNet**.

ZeroNet describes itself as decentralised websites using Bitcoin-style cryptography and the BitTorrent network. It can also resolve Namecoin `.bit` addresses and use Tor for peer connections.

In the original post I called that "more anonymous or pseudoanonymous". Better wording is that Tor can help hide the network address used for ZeroNet traffic, but that does not automatically make every action or identity anonymous.

Naturally, the next challenge was trying to cram all of this onto a Raspberry Pi 2 alongside everything else already running there.

Apparently one obscure web stack was not enough.

### Related posts

- [The Darknet (Day 36)](/the-darknet-day-36/)
- [Take Back the Darknet (Part 1)](/take-back-the-darknet-part-1/)
- [Generating Vanity Onion Addresses with Shallot](/generating-vanity-onion-addresses-with-shallot/)

### Sources

- [ZeroNet](https://zeronet.io/)
- [Namecoin](https://www.namecoin.org/)

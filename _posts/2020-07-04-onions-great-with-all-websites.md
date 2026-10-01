---
title: "Onions, Great with All Websites!"
author: "Nix McRetro"
date: 2020-07-04T22:47:09.000+10:00
categories: [guides, linux, programming]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

![](/assets/images/2020/img_0679.jpg)

See that little purple ".onion available" note? Thanks to the Tor Project's Onion-Location feature, an HTTPS clearnet site can advertise its `.onion` counterpart to Tor Browser. Tor Browser is already routing the ordinary site through Tor; clicking the purple pill reloads the page at the advertised onion service instead of somehow turning the clearnet site itself into an onion site.

![](/assets/images/2020/img_0680.jpg)

And... onion activated! One click, or the appropriate preference, and Tor Browser can move you onto the onion counterpart instead. Pretty neat. No more remembering chirpys54-soda-something as the address.

I should also move the remaining sites from v2 onions to v3 at this stage. The Onion-Location header itself advertises one onion URL per response, so multiple onion destinations would need to be handled through the server configuration rather than stuffing several addresses into one header. v3 onions have plenty of advantages of their own too.

This continues the onion work from [The Darknet Revisited](/the-darknet-revisited/).

### Sources

- [Tor Project - Onion-Location](https://community.torproject.org/onion-services/advanced/onion-location/)

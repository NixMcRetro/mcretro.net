---
title: "Avtek MegaPlus V.32bis - Failed Negotiation"
author: "Nix McRetro"
date: 2022-04-24T21:52:01.000+10:00
categories: [ibm-pc, youtube]
---

{% include youtube.html id="F9RxemKcOMI" %}

Here's an attempt at dialling out with the Avtek MegaPlus V.32bis Modem (Model CD950). We're getting closer to dialling properly. In this we are going through the Linksys PAP2T, the first two LEDs indicate line one and two and will blink while engaged.

Unfortunately these attempts to dial resulted in a failed negotiation with the line dropping before the modem could finish the handshake. I'm not sure what caused it but I noticed the handshake seems a lot slower than I would expect for a V.32bis modem, aka 14.4kbps.

Next up we'll try to get the modem to dial and maintain a connection. Right now we are not even seeing carrier detect (CD) come up. We're getting closer! :)

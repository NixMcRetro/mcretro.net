---
title: "Avtek MegaPlus V.32bis - Failed Negotiation"
author: "Nix McRetro"
date: 2022-04-24T21:52:01.000+10:00
categories: [ibm-pc, youtube]
last_modified_at: 2026-10-11
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-11
  purpose: "fact-checking, sourcing, and editorial quality"
---

{% include youtube.html id="F9RxemKcOMI" %}

Here's an attempt at dialling out with the Avtek MegaPlus V.32bis Modem (Model CD950). We're getting closer to dialling properly. In this one we're going through the Linksys PAP2T. Its PHONE 1 and PHONE 2 LEDs correspond to the two phone ports and blink when they're in use.

Unfortunately these attempts to dial resulted in a failed negotiation, with the line dropping before the modem could finish the handshake. I'm not sure what caused it, but the handshake seemed a lot slower than I would expect. V.32bis supports up to 14.4 kbit/s; we weren't getting a connection at all here.

Next up we'll try to get the modem to dial and maintain a connection. Right now we are not even seeing carrier detect (CD) come up. We're getting closer! :)

### Sources

- [Linksys/Cisco - PAP2T Internet Phone Adapter User Guide, front-panel phone LEDs](https://www.cisco.com/c/dam/en/us/td/docs/voice_ip_comm/csbpvga/pap2t/administration/guide/pap2t_user.pdf)
- [ITU-T - Recommendation V.32bis (February 1991), modem signalling rates up to 14,400 bit/s](https://www.itu.int/rec/T-REC-V.32bis-199102-I/en)

### Related posts

- [2022: Year of the Dial-up Modem](/2022-year-of-the-dial-up-modem/)
- [Avtek MegaPlus V.32bis - First Connection Attempt](/avtek-megaplus-v-32bis-first-connection-attempt/)
- Earlier: [Avtek MegaPlus V.32bis - Resetting the Linksys PAP2T](/avtek-megaplus-v-32bis-resetting-the-linksys-pap2t/)
- Next: [Avtek MegaPlus V.32bis - Carrier Detect](/avtek-megaplus-v-32bis-carrier-detect/)

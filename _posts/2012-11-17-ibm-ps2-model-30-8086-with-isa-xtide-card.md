---
title: "IBM PS/2 Model 30 8086 with ISA XTIDE Card"
author: "Nix McRetro"
date: 2012-11-17T01:16:29.000+11:00
last_modified_at: 2026-09-28
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-28
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, repairs, sega]
---

{% include youtube.html id="h6eXHUqOZZ0" %}

This was a simple demo to make sure the XTIDE card works as I was having trouble with the Sega TeraDrive side getting it to recognise at all. The good news is that the card seems to work and I can access the 4GB Disk On Module (DOM) through the command prompt. The important part for an 8086 machine like this is using an XT-compatible XTIDE Universal BIOS build. The BIOS can handle modern large drives, although DOS filesystem and partition limits still determine how much of a 4GB DOM can be used in any one volume. Now to make it bootable and install it into the TeraDrive... progress!

The IBM PS/2 is destined for an original hard drive if it turned up in the next month. The seller was a bit dodgy and I think they forgot to charge me shipping, so who knows what will happen. Ordered two drives and a 5.25" floppy drive while I was at it.

**Edit:** The seller never shipped me anything and by the time PayPal got involved it was too late. Scammers... dammit!


### Sources

- [XTIDE Universal BIOS Manual](https://www.xtideuniversalbios.org/browser/xtideuniversalbios/wiki/Manual_v2_0_0.wiki?rev=329) - documents the XT build for 8086 and 8088 systems and large-drive support.

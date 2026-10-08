---
title: "Take Back the Darknet (Part 1)"
author: "Nix McRetro"
date: 2016-01-04T20:53:39.000+11:00
last_modified_at: 2026-10-08
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-08
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [guides, raspberry-pi]
---

**Historical guide:** This 14-part series documents the Raspberry Pi, Raspbian Jessie and Tor setup I used in January 2016. The original preamble was marked as an incomplete draft.

Debian 8 Jessie is obsolete, Tor retired the v2 onion-service system used here in 2021, and Raspberry Pi OS, Apache, Samba, SSH and Tor defaults have moved on. Treat this as an archive of what I built, not as current deployment or security guidance. If you're doing this today, use a supported operating system and the current Tor documentation.

**Objective: Host a darknet website on a Raspberry Pi.**

### Kickass Darknet Web Server TOC

- [Part 1 - Preamble and Requirements](/take-back-the-darknet-part-1/)
- [Part 2 - Image Raspbian, Basic Settings and Updates](/take-back-the-darknet-part-2/)
- [Part 3 - Setting a Static IP Address](/take-back-the-darknet-part-3/)
- [Part 4 - Hardening Your Pi](/take-back-the-darknet-part-4/)
- [Part 5 - Installing Apache 2.4 HTTP Server](/take-back-the-darknet-part-5/)
- [Part 6 - Installing Samba Server](/take-back-the-darknet-part-6/)
- [Part 7 - Hardening Apache and Secure Shell](/take-back-the-darknet-part-7/)
- [Part 8 - Installing Tor](/take-back-the-darknet-part-8/)
- [Part 9 - Configuring Apache](/take-back-the-darknet-part-9/)
- [Part 10 - Configuring Tor](/take-back-the-darknet-part-10/)
- [Part 11 - Configuring HTTPS (SSL)](/take-back-the-darknet-part-11/)
- [Part 12 - Preparing Website Directories](/take-back-the-darknet-part-12/)
- [Part 13 - Generating a Vanity Onion Address](/take-back-the-darknet-part-13/)
- [Part 14 - Testing the Waters](/take-back-the-darknet-part-14/)

**Why host an onion service?**

It's as cheap as free is why! An onion address isn't a normal DNS domain, but it lets me reach my self-hosted site through Tor without renting another conventional domain name from a registrar. Rent money is dead money!

**Isn't the darknet only for [insert strange and/or illegal things]?**

That's what tends to make headlines. Onion services can host ordinary lawful content too. Take this website for example: would mainstream media ever have you fear the darknet by talking about this website? It's very unlikely. The sensationalist media is just that, sensationalist!

**Take back the darknet!**

The practical goal is simple: learn how Tor onion services work by self-hosting ordinary content on a Raspberry Pi. Join us!

**Requirements:**

- 1x Raspberry Pi with an ethernet port
- 1x 4GB or larger MicroSD card, any class/speed
- Ethernet (Wi-Fi is not covered in this guide)
- [Raspbian Jessie Lite (Nov 2015)](https://web.archive.org/web/20151127024357/https://www.raspberrypi.org/downloads/raspbian/), the historical image used for this project
- Private key for a vanity darknet address (optional)

### Sources

- [Debian Project - Debian Jessie Release Information](https://www.debian.org/releases/jessie/)
- [Debian Project - Debian 8 Long Term Support reaching end-of-life](https://chronicles.debian.org/www/News/2020/20200709)
- [Tor Project - Onion Service version 2 deprecation timeline](https://blog.torproject.org/v2-deprecation-timeline/)
- [Tor Project - Set up Your Onion Service](https://community.torproject.org/onion-services/setup/)
- [Raspberry Pi - An update to Raspberry Pi OS Bullseye](https://www.raspberrypi.com/news/raspberry-pi-bullseye-update-april-2022/)

Advance onward to [part 2](/take-back-the-darknet-part-2/) or use the table of contents above to navigate.

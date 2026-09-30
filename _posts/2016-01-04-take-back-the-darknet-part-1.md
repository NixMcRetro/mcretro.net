---
title: "Take Back the Darknet (Part 1)"
author: "Nix McRetro"
date: 2016-01-04T20:53:39.000+11:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [guides, raspberry-pi]
---

**Historical draft:** This series was originally published as an incomplete working guide.

**Archive status:** This guide is preserved as a record of the Raspberry Pi, Raspbian Jessie and Tor setup I used in January 2016. It is not current deployment or security guidance.

Debian 8 Jessie is now obsolete, Tor retired the version 2 onion-service system used by this series in 2021, and several Raspberry Pi OS, Apache, Samba, SSH and Tor defaults have changed since these posts were written.

Several package names, account assumptions and security practices below are consequently obsolete.

If you are building an onion service now, use a currently supported operating system and the current Tor Project documentation rather than copying this guide verbatim.

**Objective: Host a darknet website on a Raspberry Pi.**

Kickass Darknet Web Server TOC:[Part 1 - Preamble and Requirements](/take-back-the-darknet-part-1/)[Part 2 - Image Raspbian, Basic Settings and Updates](/take-back-the-darknet-part-2/)[Part 3 - Setting a Static IP Address](/take-back-the-darknet-part-3/)[Part 4 - Hardening Your Pi](/take-back-the-darknet-part-4/)[Part 5 - Installing Apache 2.4 HTTP Server](/take-back-the-darknet-part-5/)[Part 6 - Installing Samba Server](/take-back-the-darknet-part-6/)[Part 7 - Hardening Apache and Secure Shell](/take-back-the-darknet-part-7/)[Part 8 - Installing Tor](/take-back-the-darknet-part-8/)[Part 9 - Configuring Apache](/take-back-the-darknet-part-9/)[Part 10 - Configuring Tor](/take-back-the-darknet-part-10/)[Part 11 - Configuring HTTPS (SSL)](/take-back-the-darknet-part-11/)[Part 12 - Hardening Tor](/take-back-the-darknet-part-12/)[Part 13 - Generating a Vanity Onion Address](/take-back-the-darknet-part-13/)[Part 14 - Testing the Waters](/take-back-the-darknet-part-14/)

**Why host an onion service?**

It's as cheap as free is why!

One of the things that appealed to me in 2016 was that an onion address did not require renting a conventional DNS domain from a registrar.

Calling that a "free domain name" was not quite technically correct. An onion address is its own Tor service address rather than a normal DNS domain, but the attraction was the same: I could self-host the site and reach it through Tor without renting another conventional domain name.

**Isn't the darknet only for [insert strange and/or illegal things]?**

No.

Onion services can host ordinary lawful content too, and this website was my experiment in learning how the technology worked.

Illegal uses tend to attract headlines, but they are not the only reason onion services exist.

**Take back the darknet!**

That was the slogan I used for this project.

The practical goal was simple: learn how Tor onion services worked by self-hosting ordinary content on a Raspberry Pi.

**Requirements:**

- 1x Raspberry Pi with an ethernet port
- 1x 4GB or larger MicroSD card, any class/speed
- Ethernet (Wi-Fi is not covered in this guide)
- [Raspbian Jessie Lite (Nov 2015)](https://web.archive.org/web/20151127024357/https://www.raspberrypi.org/downloads/raspbian/), the historical image used for this project
- Private key for a vanity darknet address (optional)

Advance onward to [part 2](/take-back-the-darknet-part-2/) or use the table of contents above to navigate.

### Sources

- [Debian Project - Debian Jessie Release Information](https://www.debian.org/releases/jessie/)
- [Debian Project - Debian 8 Long Term Support Reaches End of Life](https://www.debian.org/News/2020/20200709)
- [Tor Project - V2 Onion Services Deprecation](https://support.torproject.org/onionservices/v2-deprecation/)
- [Tor Project - Set up Your Onion Service](https://community.torproject.org/onion-services/setup/)
- [Raspberry Pi - Bullseye Update, April 2022](https://www.raspberrypi.com/news/raspberry-pi-bullseye-update-april-2022/)

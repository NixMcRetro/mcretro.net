---
title: "XTIDE Settings for the Sega TeraDrive"
author: "Nix McRetro"
date: 2012-11-18T01:38:18.000+11:00
last_modified_at: 2026-10-18
categories: [ibm-pc, repairs, sega]
---


{% include youtube.html id="6UJEjvZq9a0" %}

Here are the XTIDE BIOS settings I've been using with the Sega TeraDrive. I thought I'd record a quick video going through the configuration, partly to help anyone else attempting the same thing and partly because I should probably make a record of it myself. Knowing my luck, I'll eventually break the setup and wonder what all the settings used to be!

I'm loading the configuration from the EEPROM and going through the primary IDE controller settings first. The device type is set for XTIDE, with the other controller options configured as shown on screen. I've left block mode and the internal write cache disabled in this setup, and the slave-device options are also disabled. Not a particularly exciting-looking configuration page, but it gets the job done.

The boot settings are rather more interesting. I've enabled the boot menu and configured the hard disk boot selection so I can choose between the TeraDrive's original floppy drives and the Disk on Module. This makes experimenting with different storage arrangements considerably easier than opening up the machine and changing connections every time.

I'm using XTIDE Universal BIOS version 2.0.0 Beta 1 rather than Beta 2. As long as everything keeps working, I don't feel a tremendous urge to upgrade just yet. Perhaps once it isn't a beta I'll think about it! The TeraDrive EEPROM BIOS dump is available on the [File Server](/goodies/).

One terminology trap worth clearing up is that the modern XTIDE project isn't the same thing as the historical XTA, or XT Attachment, disk interface. XTIDE provides an 8-bit ISA route to ATA storage, while XTA was an older, incompatible arrangement that sometimes acquired the nickname "XT-IDE" in historical documentation.

**Update:** Later project documentation warns that XTIDE Universal BIOS 2.0.0 Beta 1 can present different logical CHS parameters from Beta 2 and subsequent releases. Upgrading an existing installation can risk data corruption, so the documentation calls for recreating and formatting the affected partitions after upgrading. Something worth remembering before fiddling with a perfectly good boot disk.

Anyway, those are the settings that worked for me. Now perhaps I can go back to playing Paku Paku rather than spending all evening in a BIOS configuration utility!

### Sources

- [XTIDE Universal BIOS: Configuration (2.0.0 Beta 1/Beta 2 CHS Warning)](https://www.xtideuniversalbios.org/)
- [Nerdly Pleasures: Original 8-bit IDE Interface (XTA vs XTIDE)](https://nerdlypleasures.blogspot.com/2014/04/the-original-8-bit-ide-interface.html)

### Related Posts

- [Recovering from an Incorrect XTIDE EEPROM Flash](/recovering-from-an-incorrect-xtide-eeprom-flash/)
- [Sega TeraDrive Model 2 XTIDE Boot Success](/sega-teradrive-model-2-xtide-boot-success/)

---
title: "Sega Dreamcast BIOS Dumping Guide"
author: "Nix McRetro"
date: 2012-11-03T13:58:05.000+11:00
last_modified_at: 2026-10-18
categories: [hacks, sega, youtube]
---


{% include youtube.html id="DVowfmrifN8" %}

Above is the Dreamcast I dumped the BIOS from, along with the BIOS hardware involved. I wanted to retrieve the BIOS from my own console, and it turns out the process is quite straightforward once you've got the network connection configured. Getting to that point takes a little more fiddling.

For this experiment I used a Dreamcast Broadband Adapter (BBA), a controller, the usual power and video cables, and a network cable connected to my router. The Broadband Adapter replaces the modem module at the back of the console. I also needed the XDP browser software and the `httpd-ack-20080711.zip` tools.

The first step was booting XDP and configuring the network. I set a manual IP address for the Broadband Adapter, along with the necessary subnet and gateway information. Doing all this with a controller instead of a keyboard takes a fair while, particularly when you're trying to enter an address one character at a time.

One thing I discovered the hard way was that the XDP setup assistant needs to be completed properly before the settings are saved. If you exit too early, you get to enter everything again. Once the static network configuration was stored, though, the rest of the process became considerably easier.

I tried using the browser to test the network connection, which turned into an entertaining struggle with the on-screen keyboard before the browser eventually stopped responding. Never mind, the important part was getting the Dreamcast ready to communicate over the local network.

After booting the `httpd-ack` disc, the Dreamcast displayed an address that I could enter into a web browser on my computer. The software served a page containing information from the console, along with files available for download. Among those were the Dreamcast BIOS and flash contents.

I used `httpd-ack-20080711.zip` together with `XDP.rar` to retrieve my own BIOS image. The resulting archive was `MPR-21871.zip`, containing the PAL BIOS image from the console.

The result was:

```text
BIOS:    MPR-21871
Region:  PAL
Version: 1.01c
CRC32:   2f551bc5
```

That CRC32 matches the known value for the PAL MPR-21871 v1.01c BIOS, which is a useful check that the dump matches the expected revision. It also contains the well-known spelling oddity in the Dreamcast menu text.

I also tried the same network interface with a copy of Jet Set Radio. After swapping discs and refreshing the page, the browser showed details about the game, including its European region and the available disc data. I started experimenting with downloading one of the larger tracks, although I didn't complete a full game dump in this demonstration.

The last time I attempted anything like this would have been about a decade earlier. Glad to see it went considerably more smoothly this time.

#### Checking the Dump

I also discovered that a `crc32` utility was available in my Mac OS X terminal environment. Running `crc32` followed by a file path produces the CRC-32 checksum for that file. The utility I was using comes from the Perl Archive::Zip package, so it shouldn't be assumed that every Mac installation includes it.

CRC32 is handy for recognising known ROM images and spotting accidental changes, although it isn't a cryptographic integrity check. For my Dreamcast BIOS, it gave me another way to compare the result against a known revision. Just like that, checksum generated. Free of charge! :)

**Related Posts**

- [Sega Dreamcast BIOS and GD-ROM Dumping](/sega-dreamcast-bios-and-gd-rom-dumping/)

**Sources**

- [Dreamcast Wiki - BIOS](https://dreamcast.wiki/BIOS) - lists MPR-21871 as PAL BIOS v1.01c with CRC32 2f551bc5.
- [crc32(1) - Compute CRC-32 Checksums for the Given Files](https://manpages.debian.org/testing/libarchive-zip-perl/crc32.1.en.html) - documents the crc32 utility supplied with Perl Archive::Zip.

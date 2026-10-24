---
title: "RetroChallenge 2022/10 - GeoCities Rebuild on Dial-up at 14.4k"
author: "Nix McRetro"
date: 2022-10-31T16:47:12.000+11:00
categories: [raspberry-pi, youtube]
last_modified_at: 2026-10-18
---

{% include youtube.html id="nhbe7veKQ78" %}

Now this is an interesting one. I entered [RetroChallenge 2022/10](https://www.retrochallenge.org) to see if I could bring the GeoCities archive back to life again using the scripts built by [despens](https://github.com/despens/Geocities) in 2012/2013. The goal was to use hardware from that era running Ubuntu 12.04, the OS those scripts were originally written for.

![](/assets/images/2022/img_0980.jpg)

And what can I say? If I'd been better at installing dependencies, it probably would have happened sooner. Regardless, it worked! Now that I've seen all of the scripts in action, I'm going to try running them on a modern OS, Ubuntu 22.04. I'll track it all in [my GeoCities GitHub repository](https://github.com/NixMcRetro/GeoCities). I've even downloaded GitHub Desktop to try using GitHub properly... that's a first.

For the final demonstration I wanted to combine some of my favourite things: old computers, dial-up modems, Raspberry Pis and forgotten websites from the 1990s. Rather than simply opening the archive in a modern browser, I thought it would be much more interesting to see what it felt like crawling through GeoCities at an extremely leisurely 14.4 kbps.

My setup uses a MiSTer running a 486-class PC core with Windows 98, connected to an Avtek Mega Plus V.32 modem. On the server side I've got another modem, a VoIP gateway and a collection of Raspberry Pis providing the telephone and network connections. There's a bit of modern networking hidden behind the scenes, but the actual modem connection is doing a wonderful job of making everything slow.

One Raspberry Pi hosts the restored GeoCities material, while another handles parts of the proxy and network arrangement. The dial-up connection ultimately reaches that system through the VoIP gateway. It's a rather elaborate way to browse a few old web pages, but that's precisely why I wanted to do it.

Getting Windows 98 and the MiSTer behaving also took some fiddling. The serial-port settings needed adjusting for the older modem, and I managed to get distracted investigating why MIDI playback wasn't working properly. That's the trouble with having so many interesting pieces of hardware on the bench. There's always another problem to chase!

Eventually the modem connected and I was browsing the archive using Internet Explorer. At 14.4 kbps, even a collection of small thumbnails can take a surprisingly long time to arrive. Watching the page slowly assemble itself is rather nostalgic, although I must admit it's nice having a faster connection for everyday use.

The archive includes neighbourhoods such as Area 51, Tokyo and other familiar GeoCities destinations. I added jump scripts to help explore the preserved directories, although it's worth remembering that not every original file or image survived the closure of GeoCities. Some pages are wonderful little time capsules, while others are only fragments of what once existed.

{% include youtube.html id="Ea-7tOt0tys" %}

What was most interesting about this project is that it combined a few labours of love. Modems, the MiSTer (DE10-Nano), Raspberry Pis, websites from the internet of old, and probably most importantly a little more knowledge on how things work. The best part was tying it all together.

You can track my RetroChallenge 2022/10 progress in [Portable All-in-One GeoCities Web Server](https://forum.acms.org.au/t/portable-all-in-one-geocities-web-server/255) and look at last year's effort in [GeoCities Rebuild for Older Browsers](https://forum.acms.org.au/t/geocities-rebuild-for-older-browsers/83/). I wonder what I'll do for the next RetroChallenge? Time will tell. Sooner or later... time will tell... 🙃

**Sources**

- [despens - GeoCities rebuild repository and README](https://github.com/despens/Geocities)

**Related Posts**

- [The GeoCities Rebuild Worklog](/the-geocities-rebuild-worklog/)
- [Rebuilding GeoCities on macOS 12](/rebuilding-geocities-on-macos-12/)
- [RetroChallenge 2022/10 - GeoCities Rebuild on Dial-up at 28.8k](/retrochallenge-2022-10-geocities-rebuild-on-dial-up-at-28-8k/)

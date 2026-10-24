---
title: "Sega Dreamcast BIOS and GD-ROM Dumping"
author: "Nix McRetro"
date: 2019-12-09T12:04:15.000+11:00
categories: [guides, sega, youtube]
last_modified_at: 2026-10-18
---

{% include youtube.html id="LAPMhDfUF6c" %}

Creating backups of your Dreamcast BIOS and GD-ROMs has never been so easy, provided you have a Broadband Adapter and `httpd-ack`. Well, that's the theory. As you can see in the first video, getting everything configured can involve a considerable amount of wandering around Japanese menus.

I've got an ordinary Dreamcast fitted with the Broadband Adapter, and I wanted to dump a few discs to compare their contents with the final retail releases. These are some of the so-called silver discs, which should contain code very close to what was eventually sold. The sensible thing was to back them up and compare the data rather than simply assume they were different.

The first problem was getting the Dreamcast's network settings configured. The Broadband Adapter doesn't necessarily arrive with everything already set up for your network, so I needed to use a browser disc to enter the appropriate values. I'd prepared Dream Passport 3, but naturally most of its interface was in Japanese.

I spent rather more time than I'd like to admit pressing buttons and wondering what each menu was trying to tell me. Eventually I decided that consulting a guide would probably be a better approach than continuing to guess. Sometimes the most difficult part of a technical project is admitting that you should have read the instructions!

{% include youtube.html id="Hgy1C-p6Jnk" %}

For the second attempt I switched over to XDP Browser v7. That was considerably more manageable, particularly because I could actually understand the menus. I configured the network connection using a manual IP address, then moved on to booting `httpd-ack`.

Once the software was running, I could use a web browser on another computer to connect to the Dreamcast's IP address. I'm using a Windows XP machine for the demonstration, although the important part is that both systems can communicate over the network.

The interface exposes information about the inserted GD-ROM, including its tracks and other identifying details. You can download individual tracks to the computer, which can then be used to construct a GDI image for preservation or supported emulator use. There's also an option to dump the Dreamcast's BIOS.

For this test I had a Crazy Taxi disc available. The Dreamcast read it and the web interface reported the disc contents, so I could begin transferring the tracks over ethernet. A full disc backup takes a little while, even with the Broadband Adapter, but at least it doesn't require a rather unusual custom optical drive attached to the PC.

I also took the opportunity to inspect the silver discs I'd mentioned earlier. After comparing their data with existing dumps, they appeared to be the final retail releases rather than previously unknown development versions. That's a slightly disappointing result for anyone hoping to discover something unusual, but it's still useful to establish what the discs actually contain.

GD-ROMs can have different track arrangements, so you need to capture the appropriate tracks for the individual disc rather than assume every game uses exactly the same layout. The resulting GDI files are also different from an ordinary CD image, which is one reason you can't simply copy the files to a standard CD-R and expect the original Dreamcast to read it as a GD-ROM.

Once I'd worked through the confusing setup, the process was reasonably straightforward. The major requirements were a compatible Dreamcast, a Broadband Adapter, correctly configured network settings and the appropriate homebrew software.

{% include youtube.html id="c5fEa9QybPA" %}

The final video is a shorter summary for anyone who doesn't want to watch the entire adventure. Configure a manual IP address with something like XDP, boot `httpd-ack`, insert the disc and connect to the Dreamcast from your computer's web browser.

From there you can download the BIOS and the individual GD-ROM tracks, then use the resulting data with appropriate preservation and emulator tools. One of my disc transfers took around twenty minutes, which isn't too bad considering what we're asking this old console to do.

So there you go! It took a little more effort than expected, but we've got a working method for creating backups from original Dreamcast hardware. Now I just need to find some discs that contain something more interesting than the final retail game!

**Sources**

- [httpd-ack - README and source code](https://github.com/sega-dreamcast/httpd-ack)
- [dreamcast.wiki - httpd-ack](https://dreamcast.wiki/Httpd-ack)
- [dreamcast.wiki - Dumping GD-ROMs](https://dreamcast.wiki/Dumping_GD-ROMs)

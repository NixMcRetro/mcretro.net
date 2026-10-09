---
title: "The Good Old Switcheroo"
author: "Nix McRetro"
date: 2016-10-21T22:48:09.000+11:00
last_modified_at: 2026-10-10
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-10
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [linux, microsoft]
---

![hp-stream-11](/assets/images/2016/img_0576.jpg)

What's this we have here? The HP Stream 11 - an ultra portable laptop with a decent keyboard for AU$215. That's US$164 at the time of writing. It was outdated and ultimately not really suitable for everything I do day-to-day, but I was very curious about whether I could migrate easily from my Mac to a Linux-based machine. Turns out I couldn't, but now I can.

My main requirements for a computer are:

- A decent-sized keyboard with properly sized keys and no quirky key configurations.
- A 13" or 14" screen with a resolution that doesn't cause "flyscreening".
- Lightweight, at around 1.5kg.
- No CD drive.
- A 2.5" hard drive.

{% include youtube.html id="_wO8toxinoc" %}

Well it's just like Meat Loaf always said, 3 out of 5 ain't bad!

I compromised on the 13"/14" screen size with 11" and swapped the requirement for a 2.5" hard drive for 32GB of eMMC storage. In all honesty though, these requirements would be for replacing my MacBook Air with a full blown PC.

The HP Stream excels in having a great keyboard (compared to some of the other offerings on the market) and a trackpad that is not too bad once you realise you don't have to rest your thumb on the trackpad (thanks Apple for teaching me to do that with your oversized trackpad!)

The 11" screen doesn't have any flyscreening owing to the resolution not being stretched out to 14" like it was on some of the other models on display, but Windows 10? Well that had to go in the bin, or rather onto a recovery drive in case I ever decide to part with this laptop. Calling that "WIMBoot" was misleading: WIMBoot is a Windows 8.1 deployment feature, not just another name for a recovery image.

Windows 10 on a cold boot was using half of the 2GB of RAM. 2GB. So tiny! I tried Lubuntu, Xubuntu, Ubuntu (full blown!), Debian and even Arch. The Ubuntu variants are Debian-based; Arch is a separate distribution. The best one so far with a good compromise on RAM usage versus usability is Xubuntu. Lubuntu feels a little too dumbed down with the whole LXDE thing going on, while Xubuntu (using Xfce) feels quite homey.

In my rough cold-boot checks, Xubuntu used something like 270MB of RAM, Ubuntu used around 1GB with Unity in full swing, and Debian with GNOME 3 came in around 500MB. I noted Lubuntu as "pretty similar", without recording a clear comparison. These were observations of my installations, not a controlled benchmark. Arch was just too much hassle to set up for me. I must admit though I can see the attraction to it. If I had more time I would certainly reinstall the OS a few dozen times to get the hang of it.

But Xubuntu had my attention with everything working out of the box. Next I had to go on the search for equivalent programs to what I use on the Mac side of things. Most important is probably the web browser. Hmmm... there's no Safari available for Linux so all my iCloud bookmarks didn't sync... in the bin with Safari! Moved over to Firefox with Firefox Sync. Slapped Classic Theme Restorer in and suddenly it doesn't look so bad (why use all those curved tabs taking up most of my screen?).

One great advantage to switching to Firefox is having the extensions I wanted: Disconnect, HTTPS Everywhere and uBlock Origin. Finally! So that's the browser side of things handled.

I tend to like using a dedicated email client, so I've gone with Mozilla Thunderbird, which also has a calendar. The Evolution email-loss story was only a rumour, but I was not taking that risk.

Coming from OS X (Yes I am still on 10.11) I needed to make things a little bit prettier. Enter Numix. Numix solved that very well. Thank you Numix!

Contact syncing was fairly straight forward to move from iCloud to Google, same for calendars as well. Reminders I am still working on, although this is probably an opportunity to switch over to Notes on the Mac and merge my long term to do list into Notes. Notes does sync with Google, but I am not sure where they are syncing to... I need to look into that further.

Rhythmbox looks promising as a music player. AirPlay works via a recompiled PulseAudio with RAOP2 (pulseaudio-raop2) compiled in, the original raop version does not work for me at all, or rather it jitters along with a smidgen of the song every few seconds.

Encrypted folders are something I've started looking into with Cryptkeeper, a GUI for EncFS. It is not the same thing as opening macOS encrypted sparsebundles, but it gives me a similar encrypted-folder workflow. Whole-disk encryption is just as easy as on a Mac though, which is fantastic. The prompt to decrypt isn't even ugly like Debian or Arch... :)

For backing up my data (all 32GB of it), I could probably get away with rsync or grsync onto an encrypted microSD card. Yes, I do still like a GUI! If I ever moved to a machine with a 2.5" drive, I'd be sure to grab an SSD and have a better backup plan than an unreliable SD card.

Taking all of the above into account, I'm now more ready than ever to switch to Linux when the time comes (i.e. my Mac dies). It's nearly three years old now but still seems to be going strong. I'll probably end up replacing my phone before I replace my laptop.

On that note I am also currently testing whether Android can accept my current setup. For the most part it can, Gmail, contacts, calendars and Firefox bookmarks all sync well. I believe I could survive with a hardy 3.5" or 4" phone. It's incredible that 4.5-5" is now considered "small". Where did we go wrong?

With all that said, here's hoping I don't have to actually switch computers or phones for a while yet but when I do, I'll be ready to make the move! ;)

### Sources

- [Microsoft - DISM Image Management Command-Line Options](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/dism-image-management-command-line-options-s14)
- [Arch Linux - About](https://archlinux.org/about/)

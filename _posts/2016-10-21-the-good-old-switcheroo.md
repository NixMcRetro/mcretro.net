---
title: "The Good Old Switcheroo"
author: "Nix McRetro"
date: 2016-10-21T22:48:09.000+11:00
categories: [linux, microsoft]
---

![hp-stream-11](/assets/images/2016/img_0576.jpg)

What's this we have here? The HP Stream 11 - an ultra portable laptop with a decent keyboard for AU$215. That's US$164 at the time of writing. With that said, it is outdated and ultimately not really suitable for everything I do day-to-day but I was very curious on whether I could migrate to a Linux-based machine from my Mac easily. Turns out I couldn't, but now I can.

My main requirements for a computer are: - Decent sized keyboard with proper sized keys and no key quirky configurations. - 13" or 14" screen with a resolution that doesn't cause "flyscreening". - Lightweight at around 1.5kg. - No CD drive. - 2.5" hard drive.

{% include youtube.html id="_wO8toxinoc" %}

Well it's just like Meat Loaf always said, 3 out of 5 ain't bad!

I compromised on the 13"/14" screen size with 11" and the 2.5" hard drive for a 32GB eMMC hard drive. In all honesty though these requirements would be if replacing my MacBook Air with a full blown PC.

The HP Stream excels in having a great keyboard (compared to some of the other offerings on the market) and a trackpad that is not too bad once you realise you don't have to rest your thumb on the trackpad (thanks Apple for teaching me to do that with your oversized trackpad!)

The 11" screen doesn"t have any flyscreening owing to the resolution not being stretched out to 14" like it was on some of the other models on display, but Windows 10? Well that had to go in the bin or rather onto a recovery drive as a WIMBoot image in case I ever decide to part with this laptop.

Windows 10 on a cold boot was using half of the 2GB of RAM. 2GB. So tiny! I tried a few Debian-based distros, Lubuntu, Xubuntu, Ubuntu (full blown!), Debian and even Arch. The best one so far with a good compromise on RAM usage vs usability is Xubuntu. Lubuntu feels a little too dumbed down with the whole LXDE thing going on, while Xubuntu (using Xfce) feels quite homey.

Plus it uses something like 270MB of RAM on a cold boot, Ubuntu uses around 1GB with Unity in full swing, Lubuntu was pretty similar while Debian with Gnome 3 came in around 500MB. Arch was just too much hassle to setup for me. I must admit though I can see the attraction to it, if I had more time I would certainly reinstall the OS a few dozen times to get the hang of it.

But Xubuntu had my attention with everything working out of the box. Next I had to go on the search for equivalent programs to what I use on the Mac side of things. Most important is probably the web browser. Hmmm... there's no Safari available for Linux so all my iCloud bookmarks didn't sync... in the bin with Safari! Moved over to Firefox with Firefox Sync. Slapped Classic Theme Restorer in and suddenly it doesn't look so bad (why use all those curved tabs taking up most of my screen?).

One great advantage to switching to Firefox is the ability to use proper plugins (unlike in Safari) where I can load up Disconnect, HTTPS Everywhere and uBlock Origin. Finally! So that's the browser side of things handled. I tend to like using a dedicated email client so I've gone with Mozilla Thunderbird as it also has a calendar, and while not supported as much as it used to be it doesn't delete emails like... ummm... oh! Evolution does! Or at least is rumoured to. I am not taking that risk.

Coming from OS X (Yes I am still on 10.11) I needed to make things a little bit prettier. Enter Numix. Numix solved that very well. Thank you Numix!

Contact syncing was fairly straight forward to move from iCloud to Google, same for calendars as well. Reminders I am still working on, although this is probably an opportunity to switch over to Notes on the Mac and merge my long term to do list into Notes. Notes does sync with Google, but I am not sure where they are syncing toâ€¦ I need to look into that further.

Rhythmbox looks promising as a music player. AirPlay works via a recompiled PulseAudio with RAOP2 (pulseaudio-raop2) compiled in, the original raop version does not work for me at all, or rather it jitters along with a smidgen of the song every few seconds.

Encrypted sparsebundles are something I've started looking into via cryptkeeper, whole disk encryption is just as easy as on a Mac though which is fantastic. The prompt to decrypt isn't even ugly like Debian or Arch... :)

For backing up my data (all 32GB of it), I could probably get away with rsync / grsync - yes I do still like a GUI onto an encrypted microSD card - of course if I were to ever upgrade to a 2.5" hard drive I'd be sure to grab an SSD and have a better backup plan than to an unreliable SD card.

Taking all of the above into account, I'm now more ready than ever to switch to Linux when the time comes (i.e. my Mac dies). It's nearly three years old now but still seems to be going strong. I'll probably end up replacing my phone before I replace my laptop.

On that note I am also currently testing whether Android can accept my current setup. For the most part it can, Gmail, contacts, calendars and Firefox bookmarks all sync well. I believe I could survive with a hardy 3.5" or 4" phone. It's incredible that 4.5-5" is now considered "small". Where did we go wrong?

With all that said, here's hoping I don't have to actually switch computers or phones for a while yet but when I do, I'll be ready to make the move! ;)

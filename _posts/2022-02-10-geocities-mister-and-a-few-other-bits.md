---
title: "GeoCities, MiSTer and a Few Other Bits"
author: "Nix McRetro"
date: 2022-02-10T12:00:00.000+11:00
categories: [guides, linux, programming]
ai_assistance:
  model: "GPT-6"
  date: 2026-10-15
  purpose: "drafting from the author's October 2021 ACMS forum posts"
---

Last October I was working on my [GeoCities Rebuild](https://mcretro.net/the-geocities-rebuild-worklog/) as part of RetroChallenge 2021/10. Most of the technical details made it into the worklog, but I was also posting updates over on the Australian Computer Museum Society forum. There were a few replies and slightly off-topic conversations that I never got around to including.

Rather than making an already rather long worklog even longer, here's a collection of those bits and pieces. Less about shifting enormous numbers of files around and more about why I'm going to all this trouble in the first place.

**All the bleeps and bloops**

The response to the project was rather encouraging. One of the first replies called it a trip down memory lane, which is exactly what I was hoping for. I don't just want to put a pile of old HTML files online and call it a day. The idea is to get them working in the browsers and on the machines people would have used at the time.

Then I mentioned the modems. Two Banksia Wave SP56s, a Cisco SPA112 that I won in a raffle and an Asterisk server on a Raspberry Pi. The two modems dial each other locally, so there's no need to make an outside call. All the bleeps and bloops without the phone bill! I had been tinkering with getting the modems talking to the MiSTer since April 2021.

That got a suitably surprised response on the forum. Apparently bringing back the websites wasn't quite enough for me, I had to bring back the dial-up experience as well. There are certainly easier ways to load a web page, but where's the fun in that? The actual modem setup is already covered in the main worklog.

**Why the MiSTer FPGA?**

The cost of a MiSTer FPGA came up during the discussion. Fair point, it isn't exactly the cheapest thing around. Space has always been a premium for me unfortunately, so having a MiSTer instead of a bunch of consoles makes sense. That's before getting into what it can do beyond the consoles.

One thing that really impressed me was the SNES core. I was playing Earth Defense Force, a side-scrolling shoot 'em up, and noticed what happened when there were too many sprites (bullets) on the screen. The original SNES has its limitations and, wonderfully, the MiSTer replicated them. It's not every day that a bit of hardware struggling to keep up is something to get excited about!

The accuracy and space saving made the MiSTer a no-brainer for me. Your mileage may vary of course! For the GeoCities project I'm using the ao486 core running Windows 95/98 to test older browsers. That's a rather different use from playing SNES games, but it's nice having it all in the one little box.

**Netscape, Internet Explorer and MARQUEE**

Another forum member wondered how many of the archived GeoCities pages would contain HTML marquees, especially compared with modern websites. You remember them, the scrolling text that seemed to be everywhere for a while. They'd certainly fit right in with the animated GIFs, construction signs and guestbooks.

I suggested it probably depended on whether the page was optimised for Netscape or Internet Explorer. A slightly cheeky answer, but browser compatibility was rather a big part of making websites back then. There's a good reason so many pages told visitors which browser to use!

Testing has been interesting. Netscape 4 has felt clunkier and slower than Internet Explorer 5 on my setup. Maybe I backed the wrong horse on this one. Getting the pages to load is one thing; getting them to look and behave anything like they did in the late 1990s is another.

**A bit of company along the way**

There was even an invitation to WOzFest, including the possibility of joining through Google Meet. Not directly related to GeoCities, but it's nice to have other people interested in this sort of thing. I spend quite enough time staring at file permissions and directory names!

The forum discussion is still there if you want to see how things progressed throughout October. The technical material is in the [GeoCities Rebuild Worklog](https://mcretro.net/the-geocities-rebuild-worklog/), while the [ACMS thread](https://forum.acms.org.au/t/geocities-rebuild-for-older-browsers/83) has the conversations that went along with it.

Now, back to making 1990s websites behave themselves. If only Yahoo! had left those neighbourhoods alone!

**Sources**

- [ACMS: GeoCities Rebuild for Older Browsers](https://forum.acms.org.au/t/geocities-rebuild-for-older-browsers/83)
- [ACMS: Reactions to the modems and MiSTer](https://forum.acms.org.au/t/geocities-rebuild-for-older-browsers/83/4)
- [ACMS: WOzFest invitation](https://forum.acms.org.au/t/geocities-rebuild-for-older-browsers/83/5)
- [ACMS: MiSTer and Earth Defense Force discussion](https://forum.acms.org.au/t/geocities-rebuild-for-older-browsers/83/6)
- [ACMS: The marquee question](https://forum.acms.org.au/t/geocities-rebuild-for-older-browsers/83/8)
- [ACMS: My browser compatibility reply](https://forum.acms.org.au/t/geocities-rebuild-for-older-browsers/83/9)

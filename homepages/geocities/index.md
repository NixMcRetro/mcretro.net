---
layout: default
title: GeoCities Rebuild
---

<link rel="stylesheet" href="/homepages/geocities/geocities.css">
{% include geocities-navigation.html %}
<figure class="center">
  <img src="/homepages/geocities/images/main/mai_mast.gif" alt="Original GeoCities masthead, with a city skyline and the words Welcome to Our Community." width="420" height="60" loading="eager">
</figure>

# The GeoCities Rebuild

GeoCities was an enormous collection of personal homepages, organised into neighbourhoods such as Area51, Athens, Hollywood, Tokyo, and Yosemite. People built their own corners of the web with backgrounds, GIFs, guestbooks, and whatever else would fit. Yahoo! acquired GeoCities in 1999 and closed the service in 2009, but [Archive Team](https://wiki.archiveteam.org/index.php/GeoCities_Project) managed to preserve a substantial, incomplete collection of those old pages.

In 2021, I started rebuilding part of that lost world for older computers and browsers. I wanted something I could actually dial into from a MiSTer running Windows 98, using real modems, Internet Explorer 5, and Netscape 4. A normal modern web page wasn't much use at 14.4 kbit/s. But a long-forgotten GeoCities homepage? Perfect! 🌐

The project eventually ran on a Raspberry Pi 3, survived several increasingly ambitious rebuilds, and even picked up the [RetroChallenge 2022/10 Grand Prize](/docker-geocities-search-and-retrochallenge-2022-10-results/). It also taught me quite a lot about case-sensitive filesystems, archive integrity, and how many tiny files can fit into a truly ridiculous amount of storage.

## Explore the Restored Frontend

The original neighbourhood directory, rebuild news, and Cool Pages list are now restored as public McRetro pages, complete with artwork from the old site. No 1 TB archive is required to browse them.

<nav class="gc-home-nav" aria-label="Explore the GeoCities restoration">
  <a class="gc-home-card" href="/homepages/geocities/neighborhoods/">
    <span class="gc-home-card-art"><img src="/homepages/geocities/images/neighborhoods/neighborhoods.gif" width="430" height="60" alt="" loading="lazy"></span>
    <strong>Browse the Neighbourhoods</strong>
    <small>41 neighbourhoods, original GIF buttons, and 714 suburb names</small>
  </a>
  <a class="gc-home-card" href="/homepages/geocities/news/">
    <span class="gc-home-card-art"><img src="/homepages/geocities/images/main/info/areaid_news.gif" width="430" height="60" alt="" loading="lazy"></span>
    <strong>Project News</strong>
    <small>Original 2021-2022 updates and historic headlines</small>
  </a>
  <a class="gc-home-card" href="/homepages/geocities/cool/">
    <span class="gc-home-card-art"><img src="/homepages/geocities/pictures/geocool.gif" width="193" height="106" alt="" loading="lazy"></span>
    <strong>Cool Pages</strong>
    <small>11 interesting websites I picked from the original archive</small>
  </a>
  <a class="gc-home-card" href="/homepages/geocities/artwork/">
    <span class="gc-home-card-art gc-home-card-badges"><img src="/homepages/geocities/images/icons/area51.gif" width="88" height="31" alt="" loading="lazy"><img src="/homepages/geocities/images/icons/tokyo88.gif" width="88" height="31" alt="" loading="lazy"><img src="/homepages/geocities/images/icons/ybutton.gif" width="88" height="31" alt="" loading="lazy"></span>
    <strong>Original Artwork Gallery</strong>
    <small>Preserved GeoCities GIF buttons, banners, and graphics</small>
  </a>
</nav>

## Enter My GeoCities Archive

**<a class="gc-private-gateway" href="http://geocities.mcretro.net/" target="_blank" rel="noopener noreferrer nofollow">Enter GeoCities</a>** is a shortcut to my own copy of the archive. It only works on my local network when the server is running. The Neighbourhoods directory, Cool Pages list, and original artwork are all publicly browsable here on McRetro.net.

## A Short History of the Rebuild

**2021: Getting the old web online.** I began with the Archive Team material and a collection of reconstruction scripts, concentrating on the old neighbourhood addresses and compatibility with vintage browsers. On 1st November 2021, [the first public rebuild went live](/the-geocities-archive-rebuild-goes-live/) on a Raspberry Pi 3.

**2022: Dial-up, as nature intended.** The rebuild became a RetroChallenge experiment involving period-appropriate software, a MiSTer, Windows 98, and real modems. I tested browsing GeoCities at [14.4 kbit/s](/retrochallenge-2022-10-geocities-rebuild-on-dial-up-at-14-4k/) and [28.8 kbit/s](/retrochallenge-2022-10-geocities-rebuild-on-dial-up-at-28-8k/). The pages loaded slowly, which was rather the point.

**2023: A very large reality check.** I worked on [verifying and extracting a rebuild archive](/integrity-and-extracting-the-geocities-archive-rebuild-v5/) and experimented with Docker and full-text search. In October, I [retired the public archive](/geocities-archive-retired-dockerisation-abandoned/): the volume of unreviewed material, including content that needed moderation, made unrestricted public hosting impractical.

**Now: Keeping the story alive.** This public page preserves the history, links, and some original GeoCities artwork. The actual archive stays offline or private. I can still explore it locally without making a terabyte of other people's old websites publicly available.

## Read the Rebuild Story

These are my articles, worklogs, demonstrations, and occasional lessons in how not to move millions of files around.

- [The GeoCities Archive Rebuild Blog (2021)](/the-geocities-archive-rebuild-blog/)
- [The GeoCities Archive Rebuild Goes Live (2021)](/the-geocities-archive-rebuild-goes-live/)
- [The GeoCities Rebuild Worklog (2021-2022)](/the-geocities-rebuild-worklog/)
- [Rebuilding GeoCities on macOS 12 (2022)](/rebuilding-geocities-on-macos-12/)
- [RetroChallenge 2022/10 - GeoCities at 14.4k](/retrochallenge-2022-10-geocities-rebuild-on-dial-up-at-14-4k/)
- [RetroChallenge 2022/10 - GeoCities at 28.8k](/retrochallenge-2022-10-geocities-rebuild-on-dial-up-at-28-8k/)
- [Integrity and Extracting the GeoCities Archive - Rebuild V5 (2023)](/integrity-and-extracting-the-geocities-archive-rebuild-v5/)
- [Docker, GeoCities Search, and RetroChallenge Results (2023)](/docker-geocities-search-and-retrochallenge-2022-10-results/)
- [GeoCities Archive Retired, Dockerisation Abandoned (2023)](/geocities-archive-retired-dockerisation-abandoned/)

## A Little Piece of the Original Site

The masthead, welcome graphic, and badge on this page come from my old GeoCities rebuild frontend. They are presented as their original GIF files, including the animated badge, rather than being recreated or replaced with modern artwork.

<figure class="center">
  <img src="/homepages/geocities/images/main/welcome.gif" alt="Original Welcome to GeoCities graphic." width="173" height="40" loading="lazy">
</figure>

<p class="center">
  <a href="http://geocities.mcretro.net/" target="_blank" rel="noopener noreferrer nofollow"><img src="/homepages/geocities/pictures/gc_icon.gif" alt="Animated GeoCities 88 by 31 pixel badge; links to the private archive gateway." width="88" height="31" loading="lazy"></a>
</p>

If you're here for the original internet experience, the [GeoCities Archive Rebuild worklog](/the-geocities-rebuild-worklog/) is a good place to start. Bring a modem. Or at least some patience. :)

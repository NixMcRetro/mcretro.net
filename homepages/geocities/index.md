---
layout: default
title: GeoCities Rebuild
---

<figure class="aligncenter">
  <img src="/homepages/geocities/images/main/mai_mast.gif" alt="Original GeoCities masthead, with a city skyline and the words Welcome to Our Community." width="420" height="60" loading="eager">
</figure>

# The GeoCities Rebuild

GeoCities was an enormous collection of personal homepages, organised into neighbourhoods such as Area51, Athens, Hollywood, Tokyo, and Yosemite. People built their own corners of the web with backgrounds, GIFs, guestbooks, and whatever else would fit. Yahoo! acquired GeoCities in 1999 and closed the service in 2009, but [Archive Team](https://wiki.archiveteam.org/index.php/GeoCities_Project) managed to preserve a substantial, incomplete collection of those old pages.

In 2021, I started rebuilding part of that lost world for older computers and browsers. I wanted something I could actually dial into from a MiSTer running Windows 98, using real modems, Internet Explorer 5, and Netscape 4. A normal modern web page wasn't much use at 14.4 kbit/s. But a long-forgotten GeoCities homepage? Perfect! 🌐

The project eventually ran on a Raspberry Pi 3, survived several increasingly ambitious rebuilds, and even picked up the [RetroChallenge 2022/10 Grand Prize](/docker-geocities-search-and-retrochallenge-2022-10-results/). It also taught me quite a lot about case-sensitive filesystems, archive integrity, and how many tiny files can fit into a truly ridiculous amount of storage.

## Explore the Restored Frontend

The original neighbourhood directory, rebuild news, and Cool Pages list are now restored as public McRetro pages, complete with artwork from the old site. No 1 TB archive is required to browse them.

- **[Browse the neighbourhoods](/homepages/geocities/neighborhoods/)** - 41 neighbourhoods, historic descriptions and population counts, the old GIF buttons, and their suburbs.
- **[Project News](/homepages/geocities/news/)** - updates from 2021 and 2022, plus a small collection of historical headlines.
- **[Cool Pages](/homepages/geocities/cool/)** - the original recommendations from my old GeoCities rebuild.

## Enter My Private GeoCities Archive

**<a href="http://geocities.mcretro.net/" target="_blank" rel="noopener noreferrer nofollow">Enter GeoCities</a>** - my personal gateway to the full historical archive. The archived sites themselves are not hosted publicly. This link only works on a computer configured to resolve the hostname to my private intranet server, and only when that server is running.

The public directory and Cool Pages list also contain links to specific private-archive paths for my own use. Other visitors can browse those lists and their original artwork, but those private destinations are not public services.

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

<figure class="aligncenter">
  <img src="/homepages/geocities/images/main/welcome.gif" alt="Original Welcome to GeoCities graphic." width="173" height="40" loading="lazy">
</figure>

<p class="center">
  <a href="http://geocities.mcretro.net/" target="_blank" rel="noopener noreferrer nofollow"><img src="/homepages/geocities/pictures/gc_icon.gif" alt="Animated GeoCities 88 by 31 pixel badge; links to the private archive gateway." width="88" height="31" loading="lazy"></a>
</p>

If you're here for the original internet experience, the [GeoCities Archive Rebuild worklog](/the-geocities-rebuild-worklog/) is a good place to start. Bring a modem. Or at least some patience. :)

---
title: "Apple Macintosh LC 475: Revenge of the Microdrives"
author: "Nix McRetro"
date: 2013-01-18T10:51:27.000+11:00
last_modified_at: 2026-11-02
categories: [apple, hacks, youtube]
---

{% include youtube.html id="GyWr8_HJZGc" %}

The Microdrives are back! Just when I thought I'd had enough of trying to make these things work, here I am with three Hitachi Microdrives, a CompactFlash card and the PCD-60B in the Apple Macintosh LC 475.

In the previous attempt I discovered that the particular 4 GB drives I'd borrowed contained existing partitions, including a small one of roughly 30 to 40 MB on one drive. That gave me another possibility to investigate before declaring the whole arrangement hopeless.

I've dragged out my Hackintosh running Mac OS X 10.4 because it can still read and write Mac OS Standard volumes. I was rather unimpressed that later versions of OS X had lost the write support I wanted, although I wasn't certain exactly which version had dropped it.

The idea was to prepare the Microdrives externally, rather than relying on the LC 475 and its disk-formatting utilities to initialise them. If I could get a suitable volume or disk image onto one of these drives, perhaps the PCD-60B would finally have something it could use. Of course, if the real problem was at the hardware level, all this formatting would achieve absolutely nothing.

Two of the drives had already had their existing partitions removed. The third still needed attention, and I was considering using Windows to get rid of that stubborn little partition. Meanwhile, I was imaging a CompactFlash card and preparing for yet another round of tests.

Unfortunately, the Mac wouldn't format the drive as Mac OS Standard in this attempt. I tried Mac OS Extended without journalling instead, but that didn't get me the result I wanted either.

It didn't work. Nothing ever works. I give up! Well, until the next experiment, obviously. I've already wasted far too much time on these Microdrives to let them win now.

The previous video also suffered from some dreadful blockiness after YouTube finished processing it, so hopefully this upload comes out looking a little better. The drives might not be cooperating, but there's no reason the video has to join them.

### Related Posts

- [Apple Macintosh LC 475: 4 GB Hitachi Microdrive Testing](/apple-macintosh-lc-475-4-gb-hitachi-microdrive-testing/)

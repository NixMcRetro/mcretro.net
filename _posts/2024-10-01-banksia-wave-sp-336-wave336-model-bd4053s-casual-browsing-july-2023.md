---
title: "Banksia Wave SP 336 Wave336 Model BD4053S - Casual Browsing (July 2023)"
author: "Nix McRetro"
date: 2024-10-01T20:02:55.000+10:00
categories: [modems, youtube]
last_modified_at: 2026-10-18
---

{% include youtube.html id="rInuSikkXms" %}

A trip down memory lane back to July 2023 where I look into the Banksia Wave SP 336. I ramble and ramble on about whatever was on my mind back on that sunny day. There's a surprising amount of actual modem testing in there too, assuming you can find it amongst everything else!

I've got two modems connected through a VoIP arrangement, with a Cisco/Linksys SPA112 providing the analogue telephone connections. The other end goes through Asterisk running on a Raspberry Pi, where there's another modem waiting to answer the call. It isn't quite the same as a real telephone exchange, but it's an entertaining way to get old dial-up hardware talking again.

For the first part of the test I'm using Ubuntu Jammy Jellyfish and Minicom. Minicom lets me send commands directly to the serial modem, so it's useful for checking whether things respond before involving any of the more complicated networking software. Once the modem is answering commands, I can move on to making an actual data connection.

Then we get into WvDial, PPP configuration and all the fun things that go along with trying to convince modern Linux to use a dial-up modem. I borrowed some settings from the NetComm AM5690 configuration, although the Banksia needed its own adjustments. The initial attempts weren't especially cooperative, which is fairly normal for one of my modem videos.

Eventually I had a connection at 28.8 kbps. Excellent! Unfortunately, getting connected and having a perfectly stable connection are two different things, and I soon noticed packet errors. When you're transferring data that slowly, every wasted packet feels a little more personal than it would on a modern broadband connection.

I had a poke around some old websites to see what would load. There were a few interesting pages, although a modern operating system doing things in the background doesn't make the experience especially authentic. For that, I thought I'd move the modem into a Windows 98 SE virtual machine and let an old browser have a proper attempt.

Windows even managed to complain about wanting Banksia drivers, which was wonderfully nostalgic. With the serial connection passed through to the virtual machine, I could continue experimenting with more period-appropriate software. It's amazing how much time can disappear simply trying to get the right modem configuration working.

Naturally, I ended up visiting some of my older web pages through the Internet Archive. There was a space-themed site from my school days, along with pages about Frank the snake. Quite a lot of the original material has survived online, even if waiting for the pictures to appear at dial-up speeds requires a certain amount of patience.

One of Frank's pages was particularly determined not to finish loading. The counters kept climbing, the modem lights would occasionally go quiet and the estimated transfer time became increasingly ridiculous. I tried reconnecting and even ended up with a slower connection at one point. That's the authentic dial-up experience, isn't it?

Despite the interruptions, we managed to view a fair bit of old web history and prove that the Banksia could establish a data connection. The browsing wasn't particularly reliable, so I wouldn't declare the entire setup flawless. But it certainly made for an amusing afternoon, and it was lovely hearing those old handshake noises again.

Only watch if you want to listen to me rambling. More videos coming up and we'll do a deep dive into this modem and get the drivers on the server. I think I actually ripped the CD and photocopied the box artwork for this too! Stay tuned! 😄

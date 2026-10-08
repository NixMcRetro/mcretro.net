---
title: "Debian, Uptime and Darknets"
author: "Nix McRetro"
date: 2016-01-07T11:37:19.000+11:00
last_modified_at: 2026-10-08
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-08
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [raspberry-pi]
---

This one has always been tricky for me, remembering which Raspberry Pi was running which version of Raspbian / Debian.

Two handy commands from this period were:

`lsb_release -da`

![Screen Shot 2016-01-07 at 10.38.56 PM](/assets/images/2016/img_0448.jpg)

and:

`hostnamectl`

![Screen Shot 2016-01-07 at 10.38.58 PM](/assets/images/2016/img_0449.jpg)

They overlap a little, but they are not exactly the same thing. `lsb_release` focuses on Linux distribution information, while `hostnamectl` also reports hostname and operating-system details on systems using systemd. The captures show different releases: Debian GNU/Linux 7.8 (Wheezy) above the Raspbian GNU/Linux 8 (Jessie) capture.

![Screen Shot 2016-01-04 at 2.01.25 PM](/assets/images/2016/img_0447.jpg)

In other news, we hit **41 days uptime** before I decided to rebuild the server using Raspbian Jessie Lite. The smaller Lite image suited this little Raspberry Pi web-server setup much better than the larger desktop image I had been using.

Every day is a good day to rebuild!

Most of the Take Back the Darknet guide was online by then too, although it still needed plenty of refining.

### Sources

- [Debian Jessie - lsb_release(1)](https://manpages.debian.org/jessie/lsb-release/lsb_release.1.en.html)
- [Debian Jessie - hostnamectl(1)](https://manpages.debian.org/jessie/systemd/hostnamectl.1.en.html)

### Related posts

- [Take Back the Darknet (Part 1)](/take-back-the-darknet-part-1/)

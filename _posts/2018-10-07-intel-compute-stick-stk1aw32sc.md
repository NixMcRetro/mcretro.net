---
title: "Intel Compute Stick STK1AW32SC"
author: "Nix McRetro"
date: 2018-10-07T13:10:52.000+11:00
categories: [guides, raspberry-pi, study]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

![](/assets/images/2018/img_0626.jpg)

When I revise for university exams I seem to be in a habit of falling asleep rewatching lecture recordings. Heck, I nearly fall asleep during lectures I attend. I've found the only way to stay engaged with the material is to speed the lectures up somewhere between 1.2x and 1.5x. Kodi on Raspberry Pi has some support for this but tends to forget that it is being sped up if you pause. Pausing is something I do frequently to make sure the knowledge soaks in.

![](/assets/images/2018/img_0625.jpg)

Enter the Intel Compute Stick STK1AW32SC. It runs Linux thanks _(many, many thanks)_ to [this fellow](https://linuxiumcomau.blogspot.com/) and his [great work](/assets/uploads/isorespin.zip) on making Ubuntu (and various flavours) available for [Cherry Trail-based](https://www.intel.com/content/www/us/en/ark/products/codename/46629/products-formerly-cherry-trail.html) hardware. I use this as my daily driver for watching lecture recordings and it has been fantastic.

To fix the lack of audio on this particular install I edited `/etc/pulse/default.pa` and added `load-module module-alsa-sink device=hw:0,2`. The `hw:0,2` value is an ALSA device identifier for this machine, not a general "hardware address" that should be copied to another setup. My old notes also mention commenting out the following block, but they do not preserve enough detail for me to reconstruct that safely, so this should be treated as a historical workaround rather than a paste-ready current guide. After a reboot, though, this STK1AW32SC had working audio and I was away and racing. High-speed lecturers incoming!

For what it's worth, this was Xubuntu 18.04. Full-blown Ubuntu just seemed a bit too hungry on the RAM side of things. We were only working with 2GB after all! :)

**References:**
- [Source 1](https://web.archive.org/web/20240514232843/https://linuxiumcomau.blogspot.com/2017/10/fixing-broken-hdmi-audio.html)
- [Source 2](https://web.archive.org/web/20240415040159/https://linuxiumcomau.blogspot.com/2018/03/fixing-broken-hdmi-audio-again.html)
- [Documentation](https://web.archive.org/web/20180224141307/http://linuxiumcomau.blogspot.com/2017/06/customizing-ubuntu-isos-documentation.html)

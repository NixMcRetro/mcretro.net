---
title: "Intel Compute Stick STK1AW32SC"
author: "Nix McRetro"
date: 2018-10-07T13:10:52.000+11:00
categories: [guides, raspberry-pi, study]
last_modified_at: 2026-10-10
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-10
  purpose: "fact-checking, sourcing, and editorial quality"
---

![](/assets/images/2018/img_0626.jpg)

When I revise for university exams I seem to be in a habit of falling asleep rewatching lecture recordings. Heck, I nearly fall asleep during lectures I attend. I've found the only way to stay engaged with the material is to speed the lectures up somewhere between 1.2x and 1.5x. Kodi on Raspberry Pi has some support for this but tends to forget that it is being sped up if you pause. Pausing is something I do frequently to make sure the knowledge soaks in.

![](/assets/images/2018/img_0625.jpg)

Enter the Intel Compute Stick STK1AW32SC. It runs Linux thanks _(many, many thanks)_ to [Linuxium](https://linuxiumcomau.blogspot.com/) and his [great work](/assets/uploads/isorespin.zip) on making Ubuntu (and various flavours) available for [Cherry Trail-based](https://www.intel.com/content/www/us/en/ark/products/codename/46629/products-formerly-cherry-trail.html) hardware. I use this as my daily driver for watching lecture recordings and it has been fantastic.

To fix the lack of audio on this particular install I edited `/etc/pulse/default.pa` and added `load-module module-alsa-sink device=hw:0,2`. Here `hw:0,2` selects ALSA card 0, device 2; the correct value depends on the machine. Linuxium's 2017 guide also comments out PulseAudio's automatic driver-loading block, but my notes don't preserve exactly which lines I changed. This is a historical workaround rather than a paste-ready current guide. After a reboot, though, this STK1AW32SC had working audio and I was away and racing. High-speed lecturers incoming!

For what it's worth, this was Xubuntu 18.04. Full-blown Ubuntu just seemed a bit too hungry on the RAM side of things. We were only working with 2GB after all! :)

### Sources

- [Linuxium - Fixing broken HDMI audio](https://web.archive.org/web/20181007015658/http://linuxiumcomau.blogspot.com/2017/10/fixing-broken-hdmi-audio.html)
- [Linuxium - Fixing broken HDMI audio (again)](https://web.archive.org/web/20181005090820/http://linuxiumcomau.blogspot.com:80/2018/03/fixing-broken-hdmi-audio-again.html)
- [Linuxium - Customizing Ubuntu ISOs: Documentation](https://web.archive.org/web/20180224141307/http://linuxiumcomau.blogspot.com/2017/06/customizing-ubuntu-isos-documentation.html)

---
title: "NUC8i7BEH Hackintosh Catalina Overview"
author: "Nix McRetro"
date: 2020-05-10T18:32:43.000+10:00
categories: [apple, ibm-pc, youtube]
---

{% include youtube.html id="oE0TKa81qf0" %}

A bit of fiddling and we finally get bluetooth working on the NUC8i7BEH which is running the latest and greatest from Apple at the time of this post which is Mac OS Catalina 10.15.4. Most other things work well at this stage, I haven't had any issues with stability.

Originally I started off with Windows 10, but found it a bit flakey for what I needed it to do - stream video to McRetro Gaming. Turns out, there are UVC (USB Video Class) capture card and USB devices that allow programs like OBS to be platform agnostic. I had been using a StarTech capture device, but alas, it was tied into Windows with drivers. I've since moved on and am currently using an Inogeni capture device with HDMI loop - it is amazing!

There'll be more on the Inogeni later as I am very impressed by how well it works - just check out the McRetro Gaming live streams and you'll probably have to agree with me!

**Sources:** [sarkrui @ Github](https://github.com/sarkrui/NUC8i7BEH-Hackintosh-Build/blob/master/README.md) [Intel NUC8i7BEH Tech Specs](https://www.intel.com/content/dam/support/us/en/documents/mini-pcs/nuc-kits/NUC8i3BE_NUC8i5BE_NUC8i7BE_TechProdSpec.pdf)

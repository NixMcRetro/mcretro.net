---
title: "NUC8i7BEH Hackintosh Catalina Overview"
author: "Nix McRetro"
date: 2020-05-10T18:32:43.000+10:00
categories: [apple, ibm-pc, youtube]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

{% include youtube.html id="oE0TKa81qf0" %}

A bit of fiddling and we finally get Bluetooth working on the NUC8i7BEH, which was running Apple's latest release at the time: macOS Catalina 10.15.4. Most other things were working well at this stage and I hadn't run into any stability problems.

Originally I started off with Windows 10, but found it a bit flaky for what I needed this machine to do: stream video to McRetro Gaming. I wanted capture hardware using USB Video Class rather than something dependent on a vendor-specific Windows driver, so I could move the setup between operating systems more easily. My old StarTech capture device depended on its Windows driver. I've since moved on to an Inogeni HDMI capture device with loop-through and it has been amazing!

There'll be more on the Inogeni later as I am very impressed by how well it works - just check out the McRetro Gaming live streams and you'll probably have to agree with me!

### Sources

- [sarkrui - NUC8i7BEH Hackintosh Build](https://github.com/sarkrui/NUC8i7BEH-Hackintosh-Build/blob/master/README.md)
- [Intel - NUC8i7BEH Technical Product Specification](https://www.intel.com/content/dam/support/us/en/documents/mini-pcs/nuc-kits/NUC8i3BE_NUC8i5BE_NUC8i7BE_TechProdSpec.pdf)

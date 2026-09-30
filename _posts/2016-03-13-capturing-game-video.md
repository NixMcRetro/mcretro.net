---
title: "Capturing Game Video"
author: "Nix McRetro"
date: 2016-03-13T11:45:06.000+11:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [guides, youtube]
---

![Video capture experiment](/assets/images/2016/img_0466.jpg)

I tend to upload all my videos at 1080p these days.

I used to be a 720p person, but 4K was starting to appear everywhere and apparently resolution inflation is unavoidable.

My internet connection is bad enough that uploading 4K regularly would be an exercise in suffering, so 1080p it is.

YouTube's upload recommendations are useful here. For standard frame rates they recommend roughly 8 Mbps for 1080p, 16 Mbps for 1440p and 35 to 45 Mbps for 4K.

For capture and editing I had been experimenting with [ScreenFlow](https://www.telestream.net/screenflow/), [OBS](https://obsproject.com/) and Final Cut Pro X.

One 2560 x 1440 ScreenFlow recording produced around 17 GB of source material.

Exporting a roughly 30-minute 1080p version gave me:

- ProRes 4444: roughly 115 GB and around twice real-time to encode
- ProRes 422 HQ: roughly 50 GB and just under real-time to encode
- H.264: slow enough on this machine that I eventually cancelled it

My original conclusion was that the much larger ProRes file meant I was not sacrificing the original source.

File size alone does not establish that.

ProRes 422 HQ is still a compressed codec, but Apple designed it for very high visual fidelity and multigeneration editing. ProRes 4444 can preserve 4:4:4 colour and alpha-channel information, which is useful for compositing but unnecessary for plenty of ordinary video workflows.

For this particular screen-capture workflow, 422 HQ was already enormous.

ProRes 4444 was super-incredible-overkill-2000.

My little dual-core i7 was doing its best.

### Sources

- [YouTube - Recommended Upload Encoding Settings](https://support.google.com/youtube/answer/1722171?hl=en)
- [Apple - ProRes White Paper](https://www.apple.com/support/assets/docs/products/finalcutpro/Apple_ProRes_June_2014.pdf)

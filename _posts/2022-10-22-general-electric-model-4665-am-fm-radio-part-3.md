---
title: "General Electric Model 4665 AM/FM Radio - Part 3: Transmitter"
author: "Nix McRetro"
date: 2022-10-22T08:47:58.000+11:00
categories: [hacks, raspberry-pi, repairs]
last_modified_at: 2026-10-18
---

{% include youtube.html id="VnlHDE-nyTU" %}

In this video we've taken a first-generation Raspberry Pi and used it as a radio transmitter. I grabbed [Bit Shift by Kevin MacLeod](https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1600045&Search=Search) and popped it onto the SD card after following [Make:'s Raspberry Pirate Radio guide](https://makezine.com/projects/raspberry-pirate-radio/). The article is a little dated, but that's exactly how old this Raspberry Pi is!

One important caveat for anyone reading this as more than a 2022 experiment: a bare Raspberry Pi GPIO is not automatically a compliant little broadcast transmitter. Australian low-power radio use is covered by the LIPD class-licence rules, with limits on frequency, power and equipment. I was using this for very short-range bench testing, not starting Radio McRetro across Sydney.

![](/assets/images/2022/img_0979.jpg)

The old capacitors that were replaced are on top of the radio in this image and the transmitter antenna is the blue wire.

The surviving command below was mangled during an old site conversion and is not paste-ready. I'm leaving it as part of the historical notes rather than guessing at the exact command I originally ran.

```
youtube-dl -x --audio-format mp3 "{% include youtube.html id="tbkOZTSvrHs" %}"
```

And no, I'm not saying I might have run the above command to enjoy unlimited John Farnham on loop forever, but you might choose to live your life that way - and that's OK!

I was surprised at how good Bit Shift sounds on a 42-year-old piece of hardware. The John Farnham didn't sound as good, but that might have been the fact that it was John Farnham. Given that it is a mere clock radio rather than a boom box, it gets my tick of approval! :)

### Sources

- [ACMA - Low Interference Potential Devices (LIPD) class licence](https://www.acma.gov.au/licences/low-interference-potential-devices-lipd-class-licence)

### Related posts

- [General Electric Model 4665 AM/FM Radio - Part 1: Overview](/general-electric-model-4665-am-fm-radio-part-1/)
- [General Electric Model 4665 AM/FM Radio - Part 2: Tuning](/general-electric-model-4665-am-fm-radio-part-2/)
- [General Electric Model 4665 AM/FM Radio - Part 4: AM/FM Switch](/general-electric-model-4665-am-fm-radio-part-4-am-fm-switch/)
- [General Electric Model 4665 AM/FM Radio - Part 5: Photo Slideshow](/general-electric-model-4665-am-fm-radio-part-5/)

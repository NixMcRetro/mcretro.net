---
title: "General Electric Model 4665 AM/FM Radio - Part 3: Transmitter"
author: "Nix McRetro"
date: 2022-10-22T08:47:58.000+11:00
categories: [hacks, raspberry-pi, repairs]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

{% include youtube.html id="VnlHDE-nyTU" %}

In this video we've taken a first-gen model Raspberry Pi and used it as a radio transmitter. I grabbed [Bit Shift by Kevin MacLeod of incompetech.com](https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1600045&Search=Search) and popped it onto the SD card after following the steps on [makezine.com](https://makezine.com/projects/raspberry-pirate-radio/). The article is a little dated but that's exactly how old this Raspberry Pi is!

One important caveat for anyone reading this as more than a 2022 experiment: a bare Raspberry Pi GPIO is not automatically a compliant little broadcast transmitter. Australian low-power radio use is covered by the LIPD class-licence rules, with limits on frequency, power and equipment. I was using this for very short-range bench testing, not starting Radio McRetro across Sydney.

![](/assets/images/2022/img_0979.jpg)

The old capacitors that were replaced are on top of the radio in this image and the transmitter antenna is the blue wire.

The surviving command below was mangled during an old site conversion and is not paste-ready. I'm leaving it as part of the historical notes rather than guessing at the exact command I originally ran.

```
youtube-dl -x --audio-format mp3 "{% include youtube.html id="tbkOZTSvrHs" %}"
```

And no, I'm not saying I might have ran the above command to enjoy unlimited John Farnham on loop forever, but you might choose to live your life that way - and that's OK!

I was surprised at how good it sounds for a 42 year old piece of hardware playing Bit Shift. The John Farnham didn't sound as good, but that might have been the fact that it was John Farnham. Given it is a mere clock radio not a boom box, it gets my tick of approval! :)

### Sources

- [ACMA - Low Interference Potential Devices class licence](https://www.acma.gov.au/licences/low-interference-potential-devices-lipd-class-licence)

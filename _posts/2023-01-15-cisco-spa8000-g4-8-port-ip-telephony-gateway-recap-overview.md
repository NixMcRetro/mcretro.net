---
title: "Cisco SPA8000-G4 8-Port IP Telephony Gateway - Recap Overview"
author: "Nix McRetro"
date: 2023-01-15T19:11:57.000+11:00
categories: [repairs]
last_modified_at: 2026-10-18
---

{% include youtube.html id="BRzDQn9LpF0" %}

Good old Su'scon capacitors. Where do they sit? Tier 4, the lowest of the tiers. If [Tom's Hardware capacitor manufacturer tier list](https://www.tomshardware.com/reviews/power-supplies-101,4193-5.html) is anything to go off then they are trash. They placed my favourites at the top (Panasonic and Rubycon) so I'm inclined to agree with them.

This particular machine is a Cisco SPA8000-G4, an eight-port IP telephony gateway. Depending on how far back you go through the product family, you'll see Sipura, Linksys, and Cisco names appearing. I've used some of the smaller adapters before, but this one gives me rather more telephone ports to play with.

The unit was manufactured around 2017 according to the information I had. It had originally arrived with a firmware-related boot problem, but I'd already managed to get it past that stage before recording this recap overview.

![](/assets/images/2023/img_0991.jpg)

And there's nothing more sus than a capacitor that is half the size of the other brand. What are they leaving out to make it so small? Makes you wonder. Different capacitor series can use different case sizes for the same nominal ratings, though, so size alone doesn't tell me what's inside or how long it will last. This particular unit is an SPA8000-G4 with the serial CFH01T701904.

Some of the original capacitors along the front were 470 uF parts with a 10 V rating. The replacements I fitted were physically larger Panasonic capacitors, with 16 V ratings for that group. I checked that they would fit with the case assembled, although they certainly looked rather more substantial than the original parts.

![](/assets/images/2023/img_0992.jpg)

Replaced all the electrolytic capacitors with Panasonic FR and FS series. This chip shortage is still dragging on. I think I've got some Rubycon capacitors for my Spirit Viper modem that I'm still waiting on from July... Yikes! 😅

The desoldering itself was a bit of a nuisance. Newer lead-free solder can be surprisingly stubborn compared with the old stuff, and my desoldering gun wasn't having the best day. I got there eventually.

One of the reasons I wanted this gateway was to build a larger dial-up setup. It has eight FXS telephone ports, which should give me enough connections for four modems on the answering side and another four on the computers dialling in.

The plan was to use a Raspberry Pi running Asterisk, with modems connected through USB serial adapters, and then bridge those connections back to the regular network. That would let me experiment with multiple old computers and multiple dial-up sessions without requiring eight actual telephone lines.

Of course, that also means I need eight modems, several computers, and a frankly ridiculous amount of telephone cable. I'm sure there's some around here somewhere.

The SPA8000 also has a little cooling fan. Unfortunately, the original fan and its grille made a truly obnoxious amount of noise. I had a quieter 12 V replacement to try, rated at 0.043 A, and the difference was immediately noticeable.

The gateway powered up and stayed running during this brief test. I hadn't configured the full eight-port dial-up arrangement yet, so this was mainly about getting the hardware into a state where I could start experimenting with it.

![](/assets/images/2023/img_0993.jpg)

In other news, I've been uploading pretty consistently to the [Super Nature World YouTube Channel](https://www.youtube.com/@SuperNatureWorld). It's mostly lizards and bugs with a sprinkling of birds. I don't have much in store for the [Nix McRetro YouTube channel](https://www.youtube.com/@NixMcRetro) as I have been running low on disposable income for a while now. While the [Super Nature World homepage](/homepages/nature) may look a little dead now, wait until you see what I have in store for it! Stay tuned I guess! 😀

### Sources

- [Tom's Hardware - Capacitors Manufacturer Tier List](https://www.tomshardware.com/reviews/power-supplies-101,4193-5.html)
- [Panasonic - EEU-FS Series](https://na.industrial.panasonic.com/products/capacitors/aluminum-electrolytic-capacitors/lineup/aluminum-electrolytic-capacitors-radial-lead-type/series/83320)

### Related Posts

- [Cisco SPA8000-G4 VoIP Fan Quietener Mod](/cisco-spa8000-g4-voip-fan-quietener-mod/)

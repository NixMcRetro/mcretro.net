---
title: "Sony PlayStation Modchip Installation Guides"
author: "Nix McRetro"
date: 2018-02-28T21:16:31.000+11:00
last_modified_at: 2026-10-22
categories: [guides, sony]
---

![](/assets/images/2018/img_0622.gif)

Here's a little collection of Sony PlayStation modchip installation guides. I've experimented with a few different PIC microcontrollers and Mayumi 4 configurations over the years, so it's probably about time I put the useful information together in one place!

The PIC12C508, PIC12C508A, PIC12C509, PIC12C509A, PIC12F508 and PIC12F629 are all little 8-pin devices. They might look rather similar, but that doesn't mean you can throw any old HEX file at them and expect everything to work. Different PIC families have different programming requirements and oscillator arrangements.

The PlayStation motherboard revision is just as important. An SCPH-7502 with a PU-22 motherboard isn't the same as an SCPH-5502 with a PU-18 board, so make sure you've identified the actual motherboard before reaching for the soldering iron.

### Mayumi 4

These are the installations I've documented so far:

- [PIC12F629, SCPH-7502 (PU-22)](/mayumi-4-pic12f629-scph-7502-pu-22/)
- [PIC12C508A, SCPH-7502 (PU-22)](/mayumi-4-pic12c508a-scph-7502-pu-22/)
- [PIC12C508A, SCPH-5502 (PU-18)](/mayumi-4-pic12c508a-scph-5502-pu-18/)

Each article includes the corresponding installation points and the information recorded for that particular build. Some versions of Mayumi 4 also have different operating modes selected by holding the reset button. Quite a lot of functionality for such a tiny little chip!

### MultiMode3 (MM3)

I've also experimented with MultiMode3 code, including PIC12C508-series devices. One of the interesting differences is that MM3 uses the PIC's internal oscillator, whereas Mayumi 4 can use a clock supplied by the PlayStation.

There's a little more about the programming side in [Creating a Sony PlayStation Modchip](/creating-a-sony-playstation-modchip/). I haven't included a separate MM3 installation diagram here yet, so don't use one of the Mayumi diagrams and assume the connections are interchangeable.

Be sure to check the motherboard revision, PIC model and exact firmware before programming anything. There's nothing quite like soldering eight tiny connections only to discover you've chosen the wrong configuration!

**Sources**

- [Microchip - PIC12F508](https://www.microchip.com/en-us/product/PIC12F508)
- [Microchip - PIC12F629](https://www.microchip.com/en-us/product/PIC12F629)
- [Mord.Fustang on ASSEMbler Games - Tutorial: Making Your Own PS1 Modchips](https://web.archive.org/web/20170810225955/https://www.assemblergames.com/threads/tutorial-making-your-own-ps1-modchips.55904/)

**Related Posts**

- [Sony PlayStation Modchip Overview](/sony-playstation-modchip-overview/)
- [Creating a Sony PlayStation Modchip](/creating-a-sony-playstation-modchip/)

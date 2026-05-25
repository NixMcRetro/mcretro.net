---
title: "Cisco SPA112 V05 Capacitor Replacement List"
author: "Nix McRetro"
date: 2021-08-10T21:51:46.000+10:00
categories: [repairs]
---

![](/assets/images/2021/img_0741.jpg)

I did replace the capacitors in this one as they were... sus...pect (see photo below). And while there aren't many photos, the ones I do have are now in the [photo gallery](/photos) in case they are of use to anyone. The serial number on this SPA112 is YM191HWJI129A.

![](/assets/images/2021/img_0740.jpg)

Capacitor replacement was quite straight forward. Whether they are the best capacitors for the job, I couldn't tell you. But honestly, anything is better than a low tier capacitor to save on cost. Right, Cisco?

```
2x 100uF @ 25V - Rubycon YXF Series - 25YXF100MEFC6.3X11
1x 330uF @ 10V - Rubycon ZLH Series - 10ZLH330MEFC6.3X11
1x 220uF @ 25V - Rubycon YXG Series - 25YXG220MEFC8X11.5

```

Resetting the VoIP should only require this if dialling in from a modem. If I remember right, the SPA112 is just a less fancy version of the SPA2100. Run one command after the other. Commas represent pauses so the device can have time to go through the menus. Some modems can use less commas, adjust until it works for you.

```
User Reset
ATDT****,,,,,,,,,,877778#,,,,1#

Factory reset
ATDT****,,,,,,,,,,73738#,,,,1#

```

**Update 2023**
This Cisco SPA112 was donated to Jon in 2023 after I finished up dealing with dial-up modems. Jon helped me, well did all the work, when it came to desoldering PLCC32s and resoldering them back on before the modems were donated to the [ACMS](https://forum.acms.org.au/).

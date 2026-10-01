---
title: "Cisco SPA112 V05 Capacitor Replacement List"
author: "Nix McRetro"
date: 2021-08-10T21:51:46.000+10:00
categories: [modems, repairs]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

![](/assets/images/2021/img_0741.jpg)

I did replace the capacitors in this one as they were... sus...pect (see photo below). And while there aren't many photos, the ones I do have are now in the [photo gallery](/photos) in case they are of use to anyone. The serial number on this SPA112 is YM191HWJI129A.

![](/assets/images/2021/img_0740.jpg)

Capacitor replacement was quite straightforward. Whether they are the best capacitors for the job, I couldn't tell you. These are the capacitors I fitted to SPA112 serial YM191HWJI129A. They worked in this unit, but this is not a universal SPA112 bill of materials: verify the actual board revision, capacitance, voltage, polarity, ESR, ripple-current requirements and physical size before copying the list. Right, Cisco?

```
2x 100uF @ 25V - Rubycon YXF Series - 25YXF100MEFC6.3X11
1x 330uF @ 10V - Rubycon ZLH Series - 10ZLH330MEFC6.3X11
1x 220uF @ 25V - Rubycon YXG Series - 25YXG220MEFC8X11.5

```

For dial-up testing I also drove the SPA112 IVR from a modem. Cisco documents 877778 as the user factory reset and 73738 as the full factory reset, with 1 used to confirm. The commas below are just modem pause characters that happened to give the SPA112 enough time to speak and move through the IVR in my setup. Some modems can use fewer commas; adjust until it works for you.

```
User Reset
ATDT****,,,,,,,,,,877778#,,,,1#

Factory reset
ATDT****,,,,,,,,,,73738#,,,,1#

```

In 2023 I donated this SPA112 to Jon after I finished with the dial-up modem project. Jon had also done the PLCC32 desoldering and resoldering work before the modems went to the [ACMS](https://forum.acms.org.au/).

### Sources

- [Cisco - SPA100 Series IVR Administration Guide](https://www.cisco.com/c/en/us/td/docs/voice_ip_comm/csbpvga/spa100-200/admin_guide_SPA100/spa100_ag/Appendix_IVR.html)

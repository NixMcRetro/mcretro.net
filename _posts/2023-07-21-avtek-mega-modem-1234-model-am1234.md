---
title: "Avtek Mega Modem 1234 - Model AM1234"
author: "Nix McRetro"
date: 2023-07-21T13:42:40.000+10:00
categories: [linux, modems, repairs]
---

{% include youtube.html id="a2gDiMr5X8k" %}

Back in May 2022 I picked up this modem, an Avtek Mega Modem 1234 (Serial 801452). It has a maximum speed of 2400 bps. I figured I would replace the capacitors and make sure it is A-OK. Nothing like looking inside and seeing bulging caps to reaffirm that preventative maintenance is important.

![](/assets/images/2023/img_1039.jpg)

Elgen and Daewoo branded capacitors, brands before my time. All I know about Daewoo is that their cars used to be sold here in Australia for a period.

![](/assets/images/2023/img_1038.jpg)

Geez, that Daewoo one doesn't look too good. Haven't seen a Daewoo car in years either, maybe they used the same capacitors in their cars. Lasting only a mere \*does math\* 1992 -> 2022 - that's thirty years and they didn't leak at least. Not a bad run I guess!

![](/assets/images/2013/img_0409.jpg)

I didn't keep very good notes on this one regarding capacitors. But you can always find more in the [photo gallery](https://photos.mcretro.net/) if you need it. It looks like we just replaced the failing caps with ones we had on hand in May 2022 - FM and FR series Panasonics.

![](/assets/images/2023/img_1034.jpg)

Then in July 2022 we went and replaced the FR series 1000uF with something a little more traditional (i.e. Axial). One big old MultiComp Pro MCAX25V108M13X22.

![](/assets/images/2023/img_1036.jpg)

During testing the initialisation string used was AT&FS0=0V1X3. ATI9 identified the modem as AutoModem 1234PCi Vers 500m (C) NetComm 1991. This matches what the handwritten BIOS/firmware label said before it fell off... forever.

![](/assets/images/2023/img_1032.jpg)

Interestingly the only model number externally is what is on the front of the modem. But knowing what I know now about AutoModems, it was likely an early model from so perhaps before Netcomm Australia, the parent company, started to standardise their model numbering.

![](/assets/images/2023/img_1033.jpg)

For the sake of this post, I'm going to call it an AM1234 because it fits well. AM being AutoModem shortened and 1234 plucked straight from the front of the modem and from the ATI9 string.

 

{% include youtube.html id="cqpAJREkahY" %}

Here's an slightly older video showing the modem performing a blind dial and then a stable connection once the VoIP was configured... correctly, better, less worse. 😅 Slow and steady.

![](/assets/images/2023/img_1035.jpg)

But geez, with a bit of patience you can easily get six megabytes down and six megabytes up, no small feat but accomplished only though pings.

One important lesson this modem taught me was that the circuits on modems that require an **AC** power adapter need **AC**. While they will accept DC from either centre positive or centre negative - they will not dial. This indicates that some of the circuit is activated but we're missing a rail required for dialing out. This modem required a 9V AC adapter with a barrel type plug.

![](/assets/images/2023/img_1037.jpg)

Up last we have the logs from querying the modem.

 

```
---------- 2022-06-11 18:02:54 +1000: Logging Started ----------

ATZ
OK

AT&FS0=0V1X3
OK

ATI0
243
OK

ATI1
243
OK

ATI2
OK
OK

ATI3
243
OK

ATI4
243
OK

ATI5
243
OK

ATI6
243
OK

ATI7
243
OK

ATI8
243
OK

ATI9
AutoModem 1234PCi Vers 500m (C) NetComm 1991
OK

ATI10
243
OK

ATI11
243
OK

ATI12
243
OK

ATDT1234567890
CONNECT 2400

```

This modem has been donated to the [Australian Computer Museum Society (ACMS)](https://forum.acms.org.au). Hopefully it isn't pilfered, left in a field or waterlogged... time will tell.

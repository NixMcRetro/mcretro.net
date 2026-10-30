---
title: "Nixie Clock 3.6V NiCad Battery Replacement NiMH Upgrade"
author: "Nix McRetro"
date: 2013-04-23T03:54:14.000+10:00
categories: [guides, repairs, youtube]
last_modified_at: 2026-10-18
---


{% include youtube.html id="-hjcjKJRs9o" %}

A quick and easy repair to my Nixie clock. I hate NiCad batteries with a passion, so today I'm replacing the original 3.6 V battery with a nice peaceful NiMH replacement from element14. Enjoy the back of my hand for half the video while I block what I'm doing due to bad camera positioning! ;)

This particular clock was made by Chronix in Poland, and it's quite a nice-looking little machine. To get inside I removed four long screws from the base and carefully separated the Perspex housing. I was working on top of a TeraDrive at the time, which probably wasn't the most stable repair bench I've ever used.

Once the case was apart, I could see the original three-pin rechargeable battery. The new Varta NiMH battery had a similar mounting arrangement and the same nominal voltage, so the next job was removing the old one without damaging the board. I had a desoldering gun and some braid available, although I ended up using the braid for much of the work.

Naturally, I managed to get the braid rather hotter than expected and burnt my finger. I also noticed a little spark while working around the battery connections, which wasn't particularly encouraging. There's still energy stored in a battery even when the clock is unplugged, so avoiding shorts is just as important as being careful with the soldering iron.

After clearing the three solder connections, I could straighten the battery pins and remove the original pack. I fitted the replacement into the same position and soldered it in place. The joints were a little more blobby than I'd have liked, but the battery was secure and ready for testing.

I put the clock back together and powered it on. The display came to life, including its rather entertaining anti-poisoning routine that cycles through the digits. It certainly looked happy with the new battery installed.

Then it occurred to me that I probably should have tested whether the battery would actually retain the time before declaring victory. I disconnected the power and tried again, and thankfully the clock remembered its settings. Good result!

Now you might say, a NiMH battery isn't automatically a drop-in replacement for NiCad in equipment that charges the battery internally. You'd be right. The charging current and charging method still need to suit the new cells, since the two chemistries have different requirements. This particular replacement worked in my clock, but voltage alone isn't enough to establish compatibility for another design.

![](/assets/images/2013/img_0389.jpg)

**Update 17th April 2022:** The battery was replaced again in late 2021. A couple of other details are worth keeping here for future reference. The IN-12B tube has a dot, while the IN-12A does not.

The power supply details I recorded were:

- ID: 2.5 mm
- OD: 5.5 mm
- Length: 9.5 to 11 mm
- Clock input: 7.5 to 9 V DC
- Supply current rating: 300 mA or greater
- Polarity: centre positive

I'd ordered an [XP Power ACM12US09](https://www.xppower.com/portals/0/pdfs/SF_ACM12.pdf), which I hoped would do the trick nicely. At the time, I hadn't found a Mean Well AC-to-DC power adaptor with a 2.5 mm plug, only 2.1 mm. They offered an adaptor, but then I'd need to remember what the adaptor... adaptor is for.

**Sources**

- [Energizer - Rechargeable Battery and Charger FAQ](https://data.energizer.com/pdfs/rechargeable_faq.pdf)
- [Swiss Nixie - IN-12B](https://www.swissnixie.com/tubes/IN12B/)
- [XP Power - ACM12 Series](https://www.xppower.com/product/ACM12-Series)

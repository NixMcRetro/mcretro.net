---
title: "The Wyse 2112-40 286 Revival Project"
author: "Nix McRetro"
date: 2012-11-21T21:43:56.000+11:00
categories: [hacks, ibm-pc, repairs]
---

{% include youtube.html id="pNFAPLzcT74" %}

This machine was originally earmarked to be stripped down and used for parts. Instead, curiosity got the better of me and I ended up repairing it so it was in a workable condition. Powered by a 40MB hard drive and a 3.5" 720KB floppy drive it was a challenge that was finally won in the last two days.

{% include youtube.html id="-2QCB8n6xn8" %}

The machine is 12.5MHz and a close relative of the Amdek 286. They seem to share the same case and internal component layout. To access the BIOS either GSETUP or this [setup](https://forum.vcfed.org/index.php?threads/how-to-get-into-bios-tulip-dc-286.25006/) file could be used. Of course, you'll need to have a working floppy drive and I was able to hook up a 1.44MB floppy drive from another PC, so the floppy drive detection is flexible at least.

The hard drive proved to be a bit problematic to get up and running as the 40MB size (820 cylinders, 17 sectors, 5 heads) was not in the hard drive table, nor was there a user-configurable option that actually worked. So using the information on [this thread](https://forum.vcfed.org/index.php?threads/seagate-st-251-mlc1-on-ibm-xt-286.18735/) I used a slightly smaller cylinder with the same sectors and heads. Type 8 seemed to be the best match.

Most of my issues were caused by the VGA video card having a floppy drive / hard drive controller on it. If I had just used my Trident 9000 card it would have been up and running much sooner. I blindly disabled the onboard controller by setting the jumpers in the mid-section of the card to 2-3 from 1-2 to disable. While I couldn't find any specs on this card, I did find the VGA only version and 2-3 tended to be disable and 1-2 was enable - trial and error and it worked! Actually it was a [Pine Technologies PT-604](https://web.archive.org/web/20010412185405/http://www.riceball.com/computertips/pt604.html) card.

[Here is the thread](https://forum.vcfed.org/index.php?threads/wyse-technology-286-model-2112-40.34628/) I created on the Vintage Computer Forums dedicated to this powerhouse of a machine. Also [here is a website](https://www.minuszerodegrees.net/5170/setup/5170_gsetup_720.htm) with a suitable setup disk for the BIOS that is also bootable so you can jump right into the settings.

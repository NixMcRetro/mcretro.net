---
title: "Victor V-Saturn Region Mod Removal"
author: "Nix McRetro"
date: 2019-12-21T08:24:41.000+11:00
last_modified_at: 2026-10-22
categories: [repairs, sega, youtube]
---

{% include youtube.html id="QG5TlmiN_qY" %}

The locally added switchless region mod was gone, but this Victor V-Saturn wasn't exactly back to normal. It's a weird thing to do, removing a modification and returning a console to its factory configuration, but sometimes it just has to be done!

Unfortunately, the console had been left in a rather confused state. It wasn't recognising the Action Replay or GameShark cartridges properly, the disc-region settings were wrong, and the language wasn't behaving as a Japanese Saturn should. That meant another trip inside the machine to investigate the VA9 motherboard. Naturally, the jumpers I needed were on the underside, which meant pulling the whole thing apart yet again. Wonderful!

The VA9 board in this machine is a 171-7291C. There are a few variations of these boards around, and I was interested to see exactly how Victor had configured this one. I'd already removed the wiring associated with the previous modification, so the job was to restore the original Japanese region settings.

With help from information on ASSEMbler Games, I restored the Japanese region configuration by bridging JP6 and JP11. I also checked continuity around the reset-switch area, where one of the modification wires had previously been attached. Thankfully, that part still appeared to be connected properly.

One of the nice things about these VA9 boards is how small some of the components are compared with earlier Saturn revisions. Those SH-2 processors really are tiny! Not that this made accessing the underside of the board any more enjoyable.

With the jumpers restored, I put together a minimal test setup. The console finally returned to Japanese menus, which was exactly what I wanted to see. Even better, the Action Replay and GameShark cartridges were recognised again rather than producing the earlier incompatibility message.

I reassembled the machine and continued testing the following day. A Japanese retail Saturn disc booted successfully, and the GameShark was still behaving. Much better! The console finally appeared to know what country it belonged to.

The plan was to give it some further testing before putting it up for sale. I'm quite happy with the result, even if removing somebody else's region modification wasn't the most exciting project I've ever undertaken.

**Related Posts**

- [Sega Saturn Victor RG-JX2(Y) VA9 Region Issues](/sega-saturn-victor-rg-jx2y-va9-region-issues/)

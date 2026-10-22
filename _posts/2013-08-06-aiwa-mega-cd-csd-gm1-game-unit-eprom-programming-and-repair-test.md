---
title: "Aiwa Mega-CD CSD-GM1 Game Unit EPROM Programming and Repair Test"
author: "Nix McRetro"
date: 2013-08-06T19:34:57.000+10:00
last_modified_at: 2026-10-22
categories: [programming, repairs, sega]
---

{% include youtube.html id="aCXFbQXa6tI" %}

Back to the Aiwa Mega-CD CSD-GM1, and this time I've got an EPROM to erase, program and test. I've also got a Game Unit with some previous trace repairs that I'm rather keen to try out. Will it work? There's only one way to find out!

I'd been checking the Mega Drive side of things, but it occurred to me that I hadn't really tested the Mega-CD BIOS properly. One Game Unit was still a useful reference, while the other had already been through quite a bit of repair work. On closer inspection, the BIOS chip in the troublesome unit wasn't sitting particularly well, and one of its legs was bent. Oh dear.

Rather than continue fiddling with that chip, I decided to program another one using the \`MPR-15768-T\` BIOS dump I'd taken earlier. Out came the ultraviolet EPROM eraser and the trusty GQ-4X programmer, along with a \`27C1024\` EPROM.

After erasing the chip, I checked that it was blank, loaded the BIOS image and byte-swapped the data for programming. The GQ-4X completed the write, and a readback looked good too. So far, so good!

Next came the interesting part. I fitted the newly programmed EPROM into the Game Unit I'd repaired and connected everything up for a test. Fingers crossed!

And there it was, the Mega-CD BIOS screen appeared. Beautiful! After all those damaged traces and previous repairs, it was rather satisfying to see the board responding with the replacement BIOS installed.

That gives me some good news about the trace repairs and the programmed chip. There's still more work to do on these Aiwa units, but at least this particular experiment went in the right direction.

### Related posts

- [Aiwa Mega-CD CSD-GM1 BIOS Dump: MPR-15768-T](/aiwa-mega-cd-csd-gm1-bios-dump-mpr-15768-t/)
- [Aiwa Mega-CD Game Unit BIOS Socket Installation and Trace Repair](/aiwa-mega-cd-game-unit-bios-socket-installation-and-trace-repair/)

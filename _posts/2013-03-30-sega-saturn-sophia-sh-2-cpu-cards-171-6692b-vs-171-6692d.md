---
title: "Sega Saturn Sophia SH-2 CPU Cards: 171-6692B vs 171-6692D"
author: "Nix McRetro"
date: 2013-03-30T00:57:06.000+11:00
last_modified_at: 2026-10-18
categories: [hacks, repairs, sega]
---

{% include youtube.html id="JZEb9LceRBs" %}

You heard correctly. These are **171-6692B** SH-2 CPU boards, not the better-documented **171-6692D** boards. Thanks to the generosity of an unnamed member from the forums, I've now got two of these lovely little boards to experiment with. Fingers crossed they might help get my Sega Saturn Sophia Programming Box up and running again!

![](/assets/images/2013/img_0382.jpg)

Both boards arrived safely and appear to be identical. They've got the SH7095 SH-2 processors I was looking for, although the part number isn't quite the one I expected. I needed the 171-6692D version, but what I've received is the 171-6692B. B for Bob, not D for Dob! Close enough to be interesting, at least.

There are some obvious physical differences between the two revisions. Most noticeably, the 171-6692B boards lack the second power header and the two jumper blocks normally visible beside the processors on the 171-6692D. There's also some different numbering and component layout, although the boards look very similar overall.

I've been spending a fair amount of time reading through the Sophia programming-box documentation, which is becoming something of a hobby in itself. The manuals describe the jumper arrangements on the better-documented CPU boards, but they don't tell me everything I need to know about these B revisions. I'm hoping the missing jumpers won't be a major problem, although that remains to be seen.

The missing power connector is a more interesting complication. There are connections on the board that appear to lead to the same general area, and I may be able to make an adapter once I've checked how they're wired. I certainly don't want to assume the pins carry the same voltages and start connecting things at random. Sophia has already given me enough trouble!

There are other possible problems in the programming box too, including the mainboard and A-Bus hardware. Even if these SH-2 boards are perfectly functional, I could still have a fault elsewhere preventing the system from starting. That makes it rather difficult to declare the CPU cards faulty just because the machine won't boot.

I also noticed some interesting SH-2 board variations while looking at other Saturn development hardware on the internet and around ASSEMbler Games. Some boards appeared to have sections of the PCB cut down, and the identifying stickers weren't always the same colour. Quite what all these differences mean is another mystery, but it's fascinating seeing how many variations of this equipment were made.

Initial testing with these boards wasn't particularly successful, although there were still unresolved faults elsewhere in my Sophia at the time. Sega's surviving Saturn development documentation specifically identifies the 171-6692D as an SH-2 CPU board for the Programming Target Box, but doesn't explain the precise relationship between the B and D revisions. I wouldn't call them electrically interchangeable just yet.

Still, these are beautiful little boards and I'm very grateful to the person who sent them over. Two more SH-2 CPU cards means two more opportunities to discover what Sophia is complaining about. With any luck we'll finally get this enormous collection of circuit boards doing something useful again!

**Related Posts**

- [Sega Saturn Sophia Programming Box Mainboard Repairs](/sega-saturn-sophia-programming-box-mainboard-repairs/)
- [Sophia Systems Sega Saturn Programming Box: Capacitor Restoration Complete](/sophia-systems-sega-saturn-programming-box-capacitor-restoration-complete/)
- [Sega Sophia Target Box PAL Switch Settings and Hardware Notes](/sega-sophia-target-box-pal-switch-settings-and-hardware-notes/)

**Sources**

- [Sega DTS Archive - ST-4001 Saturn Programming Target Box](http://docs.exodusemulator.com/Archives/SegaDTSMirror/hardware/core/PBOX.HTM) - surviving Sega development documentation identifying the 171-6692D SH-2 CPU board and target-box processor configuration.

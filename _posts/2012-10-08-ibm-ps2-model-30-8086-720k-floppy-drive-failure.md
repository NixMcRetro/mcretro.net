---
title: "IBM PS/2 Model 30 8086 720K Floppy Drive Failure"
author: "Nix McRetro"
date: 2012-10-08T21:56:17.000+11:00
last_modified_at: 2026-10-22
categories: [ibm-pc, repairs, youtube]
---

{% include youtube.html id="NH10FOOgm1k" %}

Time to replace the floppy drive in my IBM PS/2 Model 30 8086. The original 720K drive hadn't been behaving particularly well, so I'd ordered what looked like a suitable replacement from eBay. The drive itself was only around $14, but the shipping came to about $50. Ouch! Still, the package arrived rather quickly from the United States, so that was something.

The original drive was an ALPS \`DFL-413C04A\`, while the replacement was a \`DFL-413C02B\`. Both had the same style of edge connector, and at first glance they looked quite similar. Turn them over, though, and there were some noticeable differences in the components and layout underneath. That's always reassuring when you're dealing with an IBM PS/2, isn't it?

The Model 30 can be a bit particular about its floppy drives, but the easiest way to find out whether this one would work was to install it and give it a try. Out came a collection of floppy disks, including one I was fairly certain contained a bootable system. Fairly certain being the important part.

Unfortunately, the IBM wasn't terribly interested in booting. It attempted to access the drive, but instead of getting DOS I found myself dumped into BASIC. Tried another disk. Back to BASIC again. Wonderful!

I then compared the replacement with a working floppy drive. Both attempted to seek, but the replacement wasn't managing to read the disk properly. It was enough to show that the IBM was at least attempting to communicate with the drive, although I couldn't establish whether the remaining problem was the replacement mechanism itself or a compatibility issue.

So that's a $14 floppy drive with roughly $50 worth of shipping, and I'm still without a working replacement. Not that surprising given the age of this hardware, I suppose.

Hit and a miss. Maybe next time I'll have more luck! :)

### Sources

- [IBM Files - PS/2 Model 25 and Model 30 storage notes](https://www.ibmfiles.com/pages/ps2model25.htm) - documents the proprietary storage hardware used across early PS/2 systems, including 720KB floppy configurations.

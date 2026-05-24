---
title: "Sega TeraDrive Power Supply Problems"
author: "Nix McRetro"
date: 2016-08-08T19:07:41.000+10:00
categories: [ibm-pc, repairs, sega]
---

![IMG\_0645](/assets/images/2016/img_0516.jpg)

One of the reasons I have two of everything was originally for solving this exact type of problem, unfortunately it only helps to a module level, not component. So I have two Sega TeraDrives, one a model 2 with dual floppy drives and a model 3 with a 30MB WDL-330P hard drive with its hilarious edge connector and one floppy drive. They also have XTIDE cards in them with at least 2GB of storage.

![IMG\_0648](/assets/images/2016/img_0518.jpg)

Now here's the problem, one produces a buzzing, clicking hum like noise through the internal speaker when powered on and does not complete POST at all. After putting it into a minimal configuration with no change, I started swapping core parts - starting with the PSU. Sure enough, it roared back to life.

![IMG\_0649](/assets/images/2016/img_0519.jpg)

What that means is that I've got a non-functional power supply with a serial ending in 0629 and a reference power supply with a serial ending in 1135. There's no physical anomalies (blown caps) that I can see with the naked eye but have a look at the photos down below to see if you can spot anything peculiar

**1135 - Working** 12V rail (yellow cable) - no load 11.46V 5V rail (red cables) - no load 5.00V 12V rail (yellow cable) - powered on 12.16V 5V rail (red cables) - no load 5.17V

**0629 - Non-functional** 12V rail (yellow cable) - no load 11.14V 5V rail (red cables) - no load 4.93V 12V rail (yellow cable) - powered on 10.73V 5V rail (red cables) - no load 3.10V

The 5V and 12V rail are dipping way too much when under load. Bad capacitor? Transformer? Transistor? Search me! I've called on the folk at Assembler Games to try to help out. Fingers crossed someone will be able to help me. Although "Plan B" as they call it in the movies is already in action - paying for someone to repair the power supply. Less desirable but the same end result. I'm not terribly fond of working on mains power devices.

![IMG\_0646](/assets/images/2016/img_0517.jpg)

Actually there's a "Plan C" as well involving a PicoPSU - somehow. ATX vs AT design PSUs could be a problem with -12V and -5V rails not existing on ATX PSUs like the PicoPSU. At least I've raised my hand for help. Hopefully my knight in shining armor will answer the call.

![IMG\_0650](/assets/images/2016/img_0520.jpg)

![IMG\_0651](/assets/images/2016/img_0521.jpg)

![IMG\_0652](/assets/images/2016/img_0522.jpg)

If you want to follow along, subscribe to the blog or follow [this thread](https://web.archive.org/web/20191113051221/https://assemblergames.com/threads/sega-teradrive-psu-repair-trinity-help.62709/) at Assembler Games.

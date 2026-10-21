---
title: "Xbox DVT4 SSD Upgrade with Cable Routing"
author: "Nix McRetro"
date: 2019-11-24T13:28:52.000+11:00
last_modified_at: 2026-10-22
categories: [devkit, microsoft, youtube]
---

{% include youtube.html id="IEBjUIhHr6s" %}

For the 120GB Western Digital SSD upgrade, I moved to an 80-conductor, 40-pin ATA cable to reduce the likelihood of transfer errors. I opted for a 24" version because I wasn't sure whether there'd be any difference in the innards between the DVT4 and my Kasumi Blue retail Xbox.

Turns out the cable routing is a little wonky. The DVT4 has a different arrangement around the optical drive and its connecting board, so naturally I spent a considerable amount of time trying to work out which way the cable should fold. Quite an entertaining little puzzle!

After looping the cable around and folding some of the excess back on itself, I started thinking an 18" cable might have been sufficient after all. The 24" version also exceeds the usual 18" PATA cable length recommendation, but it's what I had available for this experiment.

Eventually everything was tucked away and the machine was ready for testing. I connected it to the television, switched it on and was greeted by the development dashboard. Excellent! The SSD appeared to be working, so at least all that folding and rearranging hadn't been for nothing.

There's still plenty to do with the development software and getting some games onto the machine, but the storage upgrade has passed its first test. Onwards to the next instalment!

### Related posts

- [Inside the Xbox DVT4 Development Kit](/inside-the-xbox-dvt4-development-kit/)
- [Xbox DVT4 Factory Restore (XDK Recovery 5849)](/xbox-dvt4-factory-restore-recovery-5849/)

### Sources

- [ConsoleMods Wiki - Upgrading your Hard Drive](https://consolemods.org/wiki/Upgrading_your_Hard_Drive)
- [Seagate - Serial ATA Unleashes the Power of ATA (April 2003)](https://download.microsoft.com/download/5/b/5/5b5bec17-ea71-4653-9539-204a672f11cf/Seagate_sata.pdf)

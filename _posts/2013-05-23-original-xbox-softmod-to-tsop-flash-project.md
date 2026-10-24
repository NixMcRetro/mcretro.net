---
title: "Original Xbox Softmod to TSOP Flash Project"
author: "Nix McRetro"
date: 2013-05-23T04:08:23.000+10:00
last_modified_at: 2026-10-18
categories: [hacks, microsoft, youtube]
---

{% include youtube.html id="IOt3T3uMl78" %}

The Xbox project continues...

The goal is straightforward: get the existing softmod behaving, TSOP-flash the console, fit the 160 GB hard drive and finally play Burnout.

Well, things hadn't gone quite according to plan. I'd attempted to flash the Xbox's onboard Winbond chip with an Xecuter2 BIOS, but the attempt had failed. My soldering might have been responsible, and there was a possibility I'd lifted a pad along the way. Unfortunately, I didn't have a multimeter handy to check the connections properly.

After that came the HeXEn disc. I thought I was making progress until an attempt to clear things up and restore the machine's normal settings left me with a damaged or missing dashboard. Wonderful. The Xbox was now showing Error 21 instead of doing anything particularly useful.

The terminology is worth keeping straight here. A **softmod** changes what the Xbox can boot without replacing or rewriting its onboard firmware. A **TSOP flash** is the later step where compatible original Xbox revisions have their onboard flash ROM made writable and reprogrammed with replacement firmware. The machine I am working on is from the flashable pre-1.6 hardware family.

Fortunately, I'd made backups of the original hard drive's contents and locking information before I started playing around with everything. I had a feeling this project might end in tears, and for once my pessimism had been rather useful.

The next challenge was actually getting access to the Xbox hard drive. I'd spent the better part of a day and a half experimenting with Linux tools and bootable USB drives without much success. At one point I even managed to change the hard drive's locking password, leaving the console unable to unlock it.

Thankfully, I'd kept a record of the password I'd used during that experiment, as well as the original drive-locking information. Without those backups, this could have become a considerably less entertaining weekend.

I know I'm a little anti-Linux in this video. Sorry, Linux. I don't hate you. I just hate when you become involved in something I had already decided should be simple. :)

What eventually got me somewhere was a hard-drive hot swap. Once the Xbox had unlocked its drive during startup, I disconnected its IDE cable and attached the drive to a PC.

Of course, I needed a PC with a suitable IDE connection. Conveniently, there was one belonging to someone else in the house. He was asleep at the time, but I managed to borrow the computer without waking him. That's a useful skill to have, although perhaps not one I should advertise.

With Windows detecting the Xbox hard drive, I used Xplorer360 to access its contents and restore a backup of the dashboard. Xplorer360 wasn't particularly cooperative, but it did the job. And there it was. The Xbox dashboard was working again!

That was quite a relief after the succession of errors I'd encountered. Error 21 had been the main annoyance, but I'd also managed to meet Errors 5, 6, 9 and 12 during this little adventure. Apparently I was collecting Xbox error codes now.

The machine wasn't finished, though. I'd recovered a working dashboard, but the TSOP flash still hadn't succeeded, the larger 160 GB hard drive wasn't installed, and I still needed to sort out the softmod and FTP access.

At least it all comes good at the end, right? I'd never give up on the original objective. TSOP flash and 160 GB hard drive or bust!

There's also the small matter of finally playing *Burnout 3: Takedown*. I'd been told it was better than *Burnout Revenge*, although I suppose I should actually play it before deciding. First I've got to get this Xbox behaving itself, particularly since it isn't even mine!

Since playing with the Raspberry Pi, I have also become considerably less hostile towards Linux. I'll need to find another operating system to be bitter about. Windows 8, perhaps?

**Related Posts**

- [XBOX (Original) Softmod Recovery](/xbox-original-softmod-recovery/)
- [Original Xbox TSOP Flash Overview](/xbox-original-tsop-flash-overview/)

**Sources**

- [ConsoleMods Wiki - Xbox FAQ](https://consolemods.org/wiki/Xbox:Frequently_Asked_Questions_(FAQ)/en) - distinguishes softmods from firmware modification and documents flashable original Xbox revisions.

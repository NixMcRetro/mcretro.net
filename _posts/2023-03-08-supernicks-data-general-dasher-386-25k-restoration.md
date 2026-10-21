---
title: "SuperNick's Data General Dasher 386-25K Restoration"
author: "Nix McRetro"
date: 2023-03-08
last_modified_at: 2026-10-22
categories: [ibm-pc, repairs, youtube]
---

{% include youtube.html id="HhseM_QsTrs" %}

Now this is an interesting one! Back in October 2022 I helped SuperNick (Nick) with his entry for the Australian Computer Museum Society (ACMS) RetroChallenge. The plan was to bring a rather neglected Data General Dasher 386-25K back to life. How difficult could it be? Well, between my lack of knowledge and Nick's lack of knowledge, we managed to achieve roughly twice the lack of knowledge we were expecting!

The machine itself is enormous. Inside we've got an Intel 386 running at 25 MHz, ISA expansion slots, onboard video, some rather interesting chipset hardware and a power supply that looks as though it's had a very hard life. There's also a proprietary expansion slot that looks suspiciously like someone installed an ISA connector backwards. Very nice!

Unfortunately, corrosion was absolutely everywhere. The motherboard, expansion cards, power supply and even some of the connectors had been affected. We suspected the machine might have spent some time somewhere near the sea, although we never managed to establish exactly what had happened to it.

The RAM sockets were in pretty poor condition too, with brittle plastic and broken retaining clips. The motherboard itself was rather lovely, though. It reminded me a little of the Sega Saturn Sophia development hardware, with its large circuit board, socketed chips and traces running absolutely everywhere.

Before getting too carried away with repairs, we made an effort to preserve what we could. Three of the four socketed chips were successfully dumped, including BIOS-related ROMs, while the remaining chip proved rather more troublesome. At least some of the original firmware survived our adventures!

Next came the cleaning and capacitor replacements. We worked through a considerable number of electrolytics on the motherboard and power supply, while also trying to deal with the corrosion. Some of those capacitors were particularly stubborn to remove. Naturally, working on an enormous multilayer circuit board with damaged solder joints made everything even more enjoyable.

Initially, the computer wouldn't complete POST. We investigated the power supply and found that the 5 V rail was only delivering around 4.4 V, which wasn't particularly encouraging. The 12 V rail looked more promising, so we concentrated on repairing the power supply.

After replacing a collection of capacitors and putting everything back together, we had another go. Progress! Well, sort of. The 5 V rail was looking much better, but now the 12 V output was behaving terribly. The power supply appeared to be repeatedly entering protection, with the fan making a rather unhappy clicking noise.

How do you go from having a faulty 5 V rail to having a faulty 12 V rail? Apparently, you repair it badly enough that you've broken something else. Excellent!

Eventually we tried a known-working ATX power supply using an adapted connector, without sacrificing the original Data General wiring. That gave us a much healthier supply of power. Unfortunately, the computer still refused to produce video, whether we used the onboard VGA or an ISA video card.

So, no triumphant boot screen for the Dasher. There were still plenty of possible causes, including the damaged RAM sockets, motherboard corrosion, DIP switch settings and possibly even problems with the original firmware. Without more information, we weren't going to solve everything during the challenge.

The good news is that Nick won the ACMS RetroChallenge prize anyway! A microscope, no less. Slightly unfortunate timing, considering how useful that microscope would have been when we were trying to inspect all those corroded traces.

And that brings us to this enormous video. It's mostly a photographic record of our efforts, with my commentary added afterwards. There's about an hour and three quarters of it, so congratulations to anyone who manages to watch the entire thing!

The Dasher might not be working, but at least we've documented a considerable amount of its hardware, preserved some firmware and established what still needs attention. That's not a bad outcome for a machine that looked as though it had been dragged through the ocean.

Now, Nick. About that microscope...

**Related Posts**

- [RetroChallenge 2022/10 - GeoCities Rebuild on Dial-up at 14.4k](/retrochallenge-2022-10-geocities-rebuild-on-dial-up-at-14-4k/)
- [RetroChallenge 2022/10 - GeoCities Rebuild on Dial-up at 28.8k](/retrochallenge-2022-10-geocities-rebuild-on-dial-up-at-28-8k/)

---
title: "Aiwa Mega-CD CSD-GM1 Unit-02 Volume Board Diagnosis"
author: "Nix McRetro"
date: 2013-08-07T00:38:10.000+10:00
last_modified_at: 2026-10-22
categories: [repairs, sega, youtube]
---

{% include youtube.html id="U2P3Orbi2_I" %}

Just when you get one thing working, you discover a secondary fault on another board. Here we have a look at why audio is leaking through the left channel and why we are not able to adjust the volume on that same channel.

Now that both microphone amplifier boards are working, it's time to investigate the Unit-02 volume board. With the volume turned right down, the right channel goes silent as expected. Unfortunately, the left channel keeps playing, and turning the volume up doesn't seem to amplify it properly either.

I've been using the headphone connection for these tests because it's considerably easier than having the speakers getting in the way. At least there's sound coming through that connection, which is something I hadn't previously checked properly. One more thing we know works!

I also swapped between the two microphone amplifier boards to make sure the fault wasn't following one of those. Thankfully, both were behaving themselves now, so that was one less thing to worry about. Looks like the problem really is somewhere on this volume board.

I've got the working revision 1 board here for comparison, so out comes the multimeter. After checking some transistor voltages and tracing the audio connections, I started comparing the resistance readings from the volume controls with the knobs turned fully up and down.

Pins 4 and 7 were giving some rather suspicious results on the faulty board. One reading was jumping around all over the place, while another stayed at zero when it really shouldn't have. That certainly wasn't happening on the working board!

The volume control itself was also rather noisy when touched, which didn't exactly inspire confidence. It looks as though the B50K control may be responsible, although finding a suitable seven-pin replacement could be interesting. More investigating required!

I took a closer look at the component and discovered six pins along one side, with a seventh connection tucked away separately. The resistance readings from the working board were fairly consistent, but on the faulty board pin 4 wandered all over the place. Pin 7 was particularly unhelpful, sitting at zero even with the volume turned up.

Tracing those connections around the board led me to the nearby 1 uF capacitors and the wiring going back to the mainboard and microphone amplifier. The markings for the audio connections were useful too, particularly the left and right input and output connections. It's beginning to look as though the problem lies inside the actual volume control.

Unfortunately, seven-pin controls aren't quite as easy to find as the usual six-pin dual-gang variety. I'm going to have to do a bit more hunting before I can replace it with something suitable. I suppose there's always another board somewhere waiting to donate its components!

**Related Posts**

- [Aiwa Mega-CD CSD-GM1 Unit-02 Mic Amp Board Repairs](/aiwa-mega-cd-csd-gm1-unit-02-mic-amp-board-repairs/)
- [Aiwa Mega-CD CSD-GM1 Volume Board Repair Attempt](/aiwa-mega-cd-csd-gm1-volume-board-repair-attempt/)

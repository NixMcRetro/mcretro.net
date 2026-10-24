---
title: "Lunchbeat / PICkit 2 - Programming 102 (Part 6)"
author: "Nix McRetro"
date: 2015-10-09T22:18:17.000+11:00
last_modified_at: 2026-10-18
categories: [programming, youtube]
---

{% include youtube.html id="VW1VT0bMG_c" %}

Even more programming, under OS X nonetheless! This time I've actually managed to get somewhere with the Lunchbeat and PICkit 2 arrangement, rather than spending the entire afternoon wondering why one little microcontroller won't cooperate.

I'd been trying to use the PICkit 2 programmer with the ATmega328P in the Lunchbeat, but the Windows-side software hadn't been giving me especially reliable results. Eventually I decided to return to Mac OS X and see whether I could make the whole arrangement work there instead.

The first part of the job was compiling a version of the PICkit 2 command-line software. I used Homebrew to get the dependencies sorted out, then worked through the build process. After a few attempts, I finally had the Mac communicating with the programmer and could control its LEDs from the command line. That's something!

The more exciting part was getting AVRDUDE to recognise the Atmel chip properly. Initially it still wasn't cooperating, even though the PICkit appeared to be responding. Then I noticed that I was using the wrong programmer setting. I'd been telling the software it was dealing with an AVR ISP device rather than a PICkit 2.

Changing that setting and holding the programmer button while making the connection finally produced the correct device signature. Better still, it did it repeatedly. I tried three times and got the same result every time, which was rather more reassuring than the earlier attempts.

With communication working, I loaded the appropriate HEX file and attempted to program the Lunchbeat. The software reported that the flash had been written and verified. Then I started pressing buttons on the board, and the LEDs actually responded as expected. It worked!

I was so close to giving up on this project that I could barely believe it. All those evenings of trying different software, reading tutorials and fiddling with cables had finally produced something useful. I don't have any formal electronics training, so most of this is a matter of teaching myself and seeing what happens.

The important thing is that I now have a working programming arrangement under Mac OS X, without having to keep returning to a Windows virtual machine. There's still plenty to learn about the Lunchbeat itself, including how the various playback and editing controls work.

I also gave the instrument a quick test with the correct firmware. The buttons were finally doing the right things, and I could experiment with the tempo and different sounds. Quite a change from the earlier stage where it was basically an expensive collection of flashing LEDs!

A small victory, but a very satisfying one. Now that the PICkit 2 and Lunchbeat can actually communicate, I can finally get on with the interesting part of making some music.

### Lunchbeat / PICkit 2 series

- [Lunchbeat / PICkit 2 - PCB Arrival (Part 1)](/lunchbeat-pickit-2-pcb-arrival-part-1/)
- [Lunchbeat / PICkit 2 - Programming the PIC18F2550 (Part 2)](/lunchbeat-pickit-2-programming-the-pic18f2550-part-2/)
- [Lunchbeat / PICkit 2 - Update (Part 3)](/lunchbeat-pickit-2-update-part-3/)
- [Lunchbeat / PICkit 2 - LEDs (Part 4)](/lunchbeat-pickit-2-leds-part-4/)
- [Lunchbeat / PICkit 2 - Programming 101 (Part 5)](/lunchbeat-pickit-2-programming-101-part-5/)
- [Lunchbeat / PICkit 2 - Sound Demo Int. Clock (Part 7)](/lunchbeat-pickit-2-sound-demo-int-clock-part-7/)
- [Lunchbeat / PICkit 2 - Sound Demo Ext. Clock (Part 8)](/lunchbeat-pickit-2-sound-demo-ext-clock-part-8/)
- [Lunchbeat / PICkit 2 - Resistor Upgrade (Part 9)](/lunchbeat-pickit-2-resistor-upgrade-part-9/)

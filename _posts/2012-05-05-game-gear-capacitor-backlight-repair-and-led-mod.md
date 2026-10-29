---
title: "Game Gear Capacitor, Backlight Repair and LED Mod"
author: "Nix McRetro"
date: 2012-05-05T23:54:39.000+10:00
last_modified_at: 2026-10-18
categories: [repairs, sega, youtube]
---

{% include youtube.html id="6R1JY72DdTk" %}

Above is me replacing the capacitors in my European-market Game Gear. This follows on from the earlier unit with very quiet audio and no usable video.

The picture was there, but it was incredibly faint, and the sound wasn't much better. Classic Game Gear capacitor problems! I figured replacing the electrolytics would be a good place to start. The capacitor guide I used at the time was hosted by [Otaku's Store](https://otakus-store.net/en/). That original guide no longer appears to be available there, so I've added a current Game Gear capacitor reference below.

I'd bought a capacitor kit rather than sourcing everything separately. Sometimes laziness wins, especially when someone else has already worked out which components you need.

Getting the Game Gear open requires removing the case screws, including the security screw near the cartridge slot. Then there are several cables connecting the two halves, so it's not quite a case of pulling everything apart and hoping for the best.

I started with the sound board, which has five electrolytic capacitors on this revision. The original components were small surface-mount types, and I replaced them with radial electrolytics. They're easier to work with, but finding room for them inside the case can be an adventure.

I'd already learnt that lesson the hard way on my first Game Gear. The capacitors need to be positioned so they don't collide with the case standoffs when everything goes back together.

With the sound board finished, I moved onto the mainboard and replaced the remaining capacitors. Plenty of polarity checks, a little creative component positioning, and a fair bit of fiddling later, it was finally time to put the thing back together.

I hadn't powered it up since doing the repair, so the first test was a genuine surprise. On came the screen, and it was looking considerably healthier than before!

Repair success!

{% include youtube.html id="H8mDDoSboJU" %}

The second video is another attempt to rescue the first Game Gear, the one I may have mangled slightly while trying to repair it. Slow and steady wins the race.

This was my Japanese unit, the one that had started the whole Game Gear adventure. By this point it had a damaged battery cover, missing battery contacts, a dodgy DC power jack, and an LED backlight modification that was only partially working.

Some of my earlier capacitor replacements were also positioned badly. The polarity was correct, but several capacitors were sitting right where the rear case needed to go. I hadn't noticed the clearance markings and standoffs on the board when I first worked on it.

This time I went back through the sound board and redid the capacitor installation. One of the capacitor positions had damaged pads, so I traced the connections back along the circuit board and used short wires to connect the replacement.

That involved finding a suitable point for the negative connection near C8, then exposing a little copper on the other side of the board for the positive connection. Not particularly pretty, but it let me recover the damaged connection. With the sound board temporarily connected, the audio started working again. Excellent!

The LED backlight was also producing light, although it had two rather obvious bright spots towards the sides of the screen. It looked best in complete darkness, which is perhaps not the most practical selling point for a handheld console.

I've fixed it up darned well considering the number of problems it had, although there is still work to do. The battery bay is missing terminals and the DC power connection is bad. Maybe I'll hard-wire it into a power adapter? Seems a waste of an LED mod though.

### Related Posts

- [Sega Game Gear Before Repair: No Video, Quiet Audio](/sega-game-gear-before-repair-no-video-quiet-audio/)
- [Sega Game Gear LED Backlight Mod](/sega-game-gear-led-backlight-mod/)

### Sources

- [iFixit - Sega Game Gear Capacitor Replacement](https://www.ifixit.com/Guide/Sega+Game+Gear+Capacitor+Replacement/113655) - documents capacitor replacement across Game Gear board revisions, including capacitor locations and polarity.

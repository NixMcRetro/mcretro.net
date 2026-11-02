---
title: "Blown Capacitors in a NetComm NP285 Turbo HomePlug"
author: "Nix McRetro"
date: 2013-09-12T18:01:07.000+10:00
last_modified_at: 2026-10-18
categories: [repairs, youtube]
---

{% include youtube.html id="5GsIWy-iJy4" %}

Where there are low-quality capacitors, or poor circuit design, there's always trouble. Today we've got a couple of NetComm NP285 Turbo HomePlug adapters, which let you run ethernet over your household electrical wiring. Handy little things, assuming they actually work!

I've got two examples here, and the first one looks rather nice inside. It has Rubycon capacitors with those familiar K-shaped vents on top, and nothing particularly alarming jumps out at me. The second unit, however, is a different story.

Have a look at those capacitors! They're marked SamXon, and at least one is bulging rather dramatically. Another looks swollen at both ends, which certainly isn't what I'd like to see in a powerline network adapter. I haven't used this particular unit yet, and looking at the inside gives me a fairly good reason not to rush into it.

What's interesting is that the two units appear to be from different production periods. One of the chips in the damaged unit has a date code suggesting week 22 of 2006, while the other unit has components marked around weeks 18 and 19 of 2009. I'd initially been treating them as though they were identical, but clearly there are some differences worth noting.

Did NetComm change the capacitor selection between revisions? It certainly looks possible, although I haven't established exactly what happened. Either way, the condition of these components doesn't inspire much confidence. I'll look at replacing them and hopefully get the adapter working with my WD TV in the bedroom.

There's more to capacitor reliability than the name printed on the sleeve, of course. Heat, ripple current, voltage rating and the particular capacitor series all matter. I can't establish the precise cause of this failure from a quick look inside, but those swollen capacitors are enough to put them on the repair list. Retro ethernet is cool, even when the hardware needs some encouragement! :)

### Sources

- [Nippon Chemi-Con - Lifetime of Aluminum Electrolytic Capacitors](https://www.chemi-con.co.jp/en/faq/detail.php?id=alLifetime)

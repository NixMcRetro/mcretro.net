---
title: "Sega Saturn BA6798S Motor Driver Replacement"
author: "Nix McRetro"
date: 2012-09-16
last_modified_at: 2026-10-20
categories: [repairs, sega, youtube]
---

{% include youtube.html id="mfV-A0R-ctA" %}

Remember that Japanese Sega Saturn with the completely berserk CD mechanism? Well, it's still completely berserk. The disc motor and laser assembly are doing all sorts of strange things, although I've confirmed that the fault follows the CD deck when swapped into another Saturn. At least that narrows things down.

After a bit of research, I settled on the BA6798S motor-driver chip as a possible culprit. It controls motors and actuators in the CD mechanism, which seemed like a reasonable place to look. A replacement cost me about US$5, so I figured it was worth attempting a repair rather than sacrificing another spare CD deck.

First came the unpleasant job of removing the original chip. There were an awful lot of pins, and I decided to tackle them with desoldering braid. Unfortunately, I'd forgotten just how quickly that stuff gets hot. A few burned fingers, some nail clippers standing in for scissors and a rather enthusiastic session with the hot-air gun later, the chip finally came free.

Then I realised I hadn't paid enough attention to which way around it went. Brilliant. Thankfully, I'd taken photographs and could work out the correct orientation before installing the replacement.

Soldering the new chip into place was another adventure. My first attempts produced some unwanted solder bridges, so out came the flux pen. What a difference that made! With the new chip soldered in, I inspected the joints and started checking for unwanted connections using the multimeter.

Finally, the moment of truth. I powered everything on, and nothing caught fire. That's encouraging, although the CD mechanism was still making exactly the same dreadful noises. The replacement chip hadn't fixed anything.

So that's one possible culprit investigated and another unsuccessful Saturn repair for the collection. Clearly there's something else wrong with this deck, and I don't particularly fancy spending more money chasing it around.

I suppose that's canned tuna for dinner instead of pizza.

### Related posts

- [Sega Saturn CD Deck Diagnosis: BA6798S Suspect](/sega-saturn-cd-deck-diagnosis-ba6798s-suspect/)
- [Faulty Japanese Sega Saturn: CD Drive Problems](/faulty-japanese-sega-saturn-cd-drive-problems/)

### Sources

- [ROHM BA6798S datasheet](https://www.alldatasheet.com/datasheet-pdf/pdf/36119/ROHM/BA6798S.html) - identifies the device as a four-channel BTL motor and actuator driver.

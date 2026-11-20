---
layout: post
title: "KODI (Until When?)"
author: "Nix McRetro"
date: 2026-11-20
categories: [ai-assisted, music]
share_description: >-
  An offhand KODI comment became a 29-second jazz song with a trumpet, synthetic vocals, and a typo that made it all the way into the recording. 🎺
---

![KODI (Until When?) album artwork for The Limited Selection, showing a vintage jazz club scene with a trumpet player, singer, and the band's name.](/assets/images/2026/11/kodi-until-when/kodi-until-when-album-cover.jxl)

<audio controls preload="metadata" src="/assets/uploads/2026/11/kodi-until-when.mp3" style="display: block; width: 100%;" aria-label="Listen to KODI (Until When?) by The Limited Selection"></audio>

*The finished 29-second jazz recording by The Limited Selection.*
{: .media-caption }

Sometimes a ridiculous sentence deserves its own song. In this case, I was describing the rather limited selection of television shows and films available through KODI when I wrote:

> Also the KODI has a highly reduced selection temporally (until when, I'm not sure)

I thought it would sound good as a jazz number. So I asked OpenAI ChatGPT to turn it into musical notation, initially for trumpet or flugelhorn, and like usual things got a little out of hand. The result is [KODI (Until When?)](https://soundcloud.com/nixmcretro/vintage-jazz-cover-kodi-until), a 29-second jazz song by my entirely fictional band, The Limited Selection. Quite an appropriate name, really!

## Making Some Music

The arrangement started with a brass melody before expanding into a small jazz band with piano, walking double bass, guitar, and drums. ChatGPT helped generate Python scripts using [pretty_midi](https://github.com/craffel/pretty-midi) and [FluidSynth](https://www.fluidsynth.org/), with the TimGM6mb SoundFont providing the instruments.

I then decided it needed vocals. The first attempts sounded like a computer having a difficult afternoon, so I switched to [OpenUtau](https://openutau.com/) and the free [Nishiren Gard DiffSinger v2.1](https://github.com/Gardanana/Nishiren-AI-Diffsinger) voicebank.

The first OpenUtau project crashed with a System.NullReferenceException. After fixing the missing pitch and vibrato data, I finally had something resembling a singer!

Somewhere along the way, the trumpet also disappeared from the arrangement. I had to bring it back because I wanted the brass and vocals performing together, rather than taking turns.

## Getting the Notes Right

I also showed some of the early sheet music to someone who actually has skill and can play brass like the trumpet and flugelhorn. Their assessment of the opening two bars was:

> those first 2 bars are noted so badly it hurts, i'm sorry

![Original KODI (Until When?) sheet music for B♭ trumpet or flugelhorn, showing the treble-clef melody and its two-sharp key signature before revision.](/assets/images/2026/11/kodi-until-when/kodi-brass-solo-og.jxl)

*The original trumpet/flugelhorn score, including the opening bars that earned that feedback.*
{: .media-caption }

Well deserved because there was so much more to do. The notation was corrected, rhythmic groupings revamped, and a quick tidy up the spacing around the key signature. The finished sheet music includes a separate B♭ trumpet or flugelhorn part, written in D major.

![Page 1 of the KODI (Until When?) jazz duet score, showing musical staves for voice and B♭ trumpet, with notes, lyrics, and jazz chord symbols.](/assets/images/2026/11/kodi-until-when/kodi-jazz-duet-page1.jxl)

*Page 1 of 2: The opening and first vocal passage, with the singer and trumpet together.*
{: .media-caption }

![Page 2 of the KODI (Until When?) jazz duet score, continuing the voice and B♭ trumpet notation through the repeated lyrics and closing bars.](/assets/images/2026/11/kodi-until-when/kodi-jazz-duet-page2.jxl)

*Page 2 of 2: The rest of the duet, including the ending.*
{: .media-caption }


## One Small Problem

After all that work, I noticed I'd made a mistake in the original sentence. I'd written **"temporally"** when I actually meant **"temporarily"**.

So I'd managed to compose a jazz number, arrange a backing band, synthesise a singer, before realising I'd got the lyrics wrong thanks to a typo on Discord. Correcting it would mean adjusting the vocal timing and musical notation, then exporting everything again. For now, the recording still proudly sings the original typo, twice.

At least the trumpet doesn't need to know how to spell. :)

## Tools and Resources

The project was created with OpenAI ChatGPT (GPT-6), Python, [pretty_midi](https://github.com/craffel/pretty-midi), [FluidSynth](https://www.fluidsynth.org/), TimGM6mb, [OpenUtau](https://openutau.com/), and [Nishiren Gard DiffSinger v2.1](https://github.com/Gardanana/Nishiren-AI-Diffsinger). [FFmpeg](https://ffmpeg.org/) was used for MP3 encoding, while MusicXML was used to prepare the printable sheet music.

The Nishiren singing voicebank was created by Gardanana and is credited in accordance with its [terms of service](https://github.com/Gardanana/Nishiren-AI-Diffsinger/blob/main/terms-of-service.md).
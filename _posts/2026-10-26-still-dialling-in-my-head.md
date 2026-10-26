---
layout: post
title: "Still Dialling in My Head"
author: "Nix McRetro"
date: 2026-10-26T16:54:00.000+11:00
categories:
  - modems
  - ibm-pc
---

![Actual Avtek modem dialling spectrogram showing eight dual-tone pulses](/assets/images/2026/10/still-dialling-in-my-head/01_actual_avtek_dtmf_spectrogram.jxl)

*The real Avtek MegaPlus V.32bis CD950 dialling 8218 3400. Eight digits, two frequencies for each one.*

There’s a particular sound from the dial-up internet days that’s been stuck in my head for more than twenty-five years. Not the modem handshake itself, although I remember that well enough to know it wasn't V.92. It’s the telephone number being dialled before the connection even gets started.

I can still sing it. Well, I can sing what I *think* it sounded like, which is an entirely different problem. Rather than leave it alone, I decided to see whether the melody might tell me which Sydney dial-up number I was hearing back in the late 1990s and early 2000s. This became quite the rabbit hole.

## Two Numbers, One ISP

I remember using TIG/IHUG in Sydney, and having two numbers to try when the lines were busy. Windows Dial-Up Networking handled the dialling, but if a connection failed we’d have to start it again. I can still remember doing that far too often.

After a trawl through the Wayback Machine, the two Sydney numbers turned up on the archived IHUG access list from March 2000: **02 9373 5100** and **02 8218 3400**. They belonged to the same ISP. By April 2002, the archived list showed only 02 8218 3400 for Sydney, although that doesn’t tell us exactly when the other number stopped working.

![Two reconstructed TIG iHug Sydney telephone numbers compared as DTMF spectrograms](/assets/images/2026/10/still-dialling-in-my-head/02_both_ihug_numbers_spectrograms.jxl)

*Both TIG/IHUG numbers reconstructed using the same settings measured from my later Avtek recording. These are synthetic tones, not two historical recordings.*

There’s also the question of whether Windows actually dialled the `02`. With the local calling rules configured for Sydney, it could dial just the eight-digit number. That gives us two possible starting points before we’ve even looked at the music. Lovely!

## Sing It Back

I made six recordings of my best attempts at remembering the dialling sounds. Recordings #1 through #4 and #6 came out as individual little notes. Recording #5 was more of a continuous tune. Apparently my brain has spent two decades working on its own arrangement.

![Six original voice recordings displayed as a grid of spectrograms](/assets/images/2026/10/still-dialling-in-my-head/03_six_voice_spectrogram_grid.jxl)

*Recording #1 through Recording #6, in order. The bright horizontal stripes are voice harmonics. Nothing has been pitch shifted or time stretched.*

Even with the variations, the shape of the melody kept coming back. A little drop around the third sound, a higher group in the middle, then another drop towards the end. Recordings #1, #2 and #3 are especially consistent, despite my singing pitch wandering around a bit.

![Six voice performances compared using relative pitch contour line graphs](/assets/images/2026/10/still-dialling-in-my-head/06_six_voice_pitch_contours.jxl)

*The same melodies viewed as relative pitch rather than coloured frequency bands. Recording #5 is shown separately because it was sung as a continuous phrase.*

We measured the time between the shorter sung notes as well. Across Recordings #1, #2, #3, #4 and #6, which have identifiable note bursts, the median was about **0.225 seconds**. My real Avtek modem dialled at about **0.200 seconds** between tones. That’s not too bad for something I last regularly heard more than twenty years ago.

![Measured cadence of five vocal recordings compared with Avtek DTMF dialling](/assets/images/2026/10/still-dialling-in-my-head/07_pulse_timing_across_recordings.jxl)

*The five recordings with distinct notes have a similar cadence to the Avtek dialling. Recording #5 was a continuous melody, so it is not included in this comparison.*

## The Real Avtek Modem - Well a Real V.32bis Edition

Here’s where the old hardware helped. I had a video of my Avtek MegaPlus V.32bis CD950 attempting a connection, published in 2022. I had manually entered **8218 3400** after finding the number on the Wayback Machine, so it wasn’t a number I’d recovered independently from memory. But it did give us a genuine modem recording to examine.

The eight dialling tones decoded perfectly as **8218 3400**. Each digit produces two frequencies at the same time, which makes the spectrogram look like a tidy little ladder. The two eights match one another, and the final two zeroes are identical too.

![Actual Avtek modem measured low and high DTMF carriers for eight digits](/assets/images/2026/10/still-dialling-in-my-head/09_actual_avtek_dual_tone_carriers.jxl)

*Measurements taken from the real recording. Every digit contains a lower and an upper DTMF frequency.*

After the digits, the recording continues with a series of repeated calling tones at about **1,300 Hz**. Those begin around **2.3 seconds** apart, rather than every 0.2 seconds. It turns out that the quick notes in my memory have a lot more in common with the dialling part than the waiting part.

![Full spectrogram of actual Avtek DTMF dialling changing to repeated modem calling tones](/assets/images/2026/10/still-dialling-in-my-head/04_real_dtmf_to_modem_calling_tones.jxl)

*One genuine recording, two very different sounds. The eight dialled digits are on the left, followed by the longer calling tones.*

## Two Frequencies Vs. One Amazing Voice

The catch is that a telephone keypad doesn’t play a conventional single musical note for each digit. DTMF combines two frequencies. When I sing the melody back, I’m producing a vocal fundamental with harmonics above it, which isn’t the same thing at all.

![Original sung vocal harmonics compared with genuine Avtek DTMF in matching spectrogram axes](/assets/images/2026/10/still-dialling-in-my-head/05_voice_vs_real_dtmf_spectrogram.jxl)

*My voice on one side, the real Avtek DTMF on the other. It’s easy to see why a remembered melody doesn’t decode neatly into telephone digits.*

We tried comparing the relative rises and dips, differences between DTMF frequencies, and spots where the same digit should make the same sound twice. Some results looked rather good for **9373 5100**. Others favoured **8218 3400**. The awkward part was that moving the eight-note window by just one or two positions could change the winner.

![Fixed method sensitivity comparisons showing both TIG iHug numbers under three note alignments](/assets/images/2026/10/still-dialling-in-my-head/08_fixed_method_alignment_sensitivity.jxl)

*The earlier comparisons, all shown together. A different starting note can change which number looks best, so I’m not going to pretend we’ve decoded it.*

## Still Stuck in My Head

So, which one was it? I still don’t know for certain. Both numbers are genuine TIG/IHUG Sydney access numbers, and I do remember switching between them. The rhythm of my recordings is surprisingly close to actual dialling, while the general melodic shape has survived better than I would have expected.

What started with me humming an old dial-up number has turned into a collection of archived ISP pages, six rather questionable singing performances, a real modem recording and some cool-looking graphs.

At least I know it most likely a TIG/IHUG number stuck in my head. Maybe slightly off key. And I can’t tell you exactly which number it was, it was just one of the two. Then again, maybe both. Or maybe... their 0198 number. Hmm... :)

**Sources**

- [TIG access numbers, 29 January 1999](https://web.archive.org/web/19990129013017/http://tig.com.au/support/access/numbers.html)
- [IHUG access numbers, 6 March 2000](https://web.archive.org/web/20000306070257/http://www.ihug.com.au/support/access/numbers.html)
- [TIG access numbers, 15 April 2002](https://web.archive.org/web/20020415042743/http://tig.com.au/support/access/numbers.html)
- [TIG access numbers, July 2003](https://web.archive.org/web/20030724215905/http://www.tig.com.au/support/access/numbers.html)
- [TIG access numbers, January 2004](https://web.archive.org/web/20040114174603/http://www.tig.com.au/support/access/numbers.html)
- [TIG access numbers, August 2004](https://web.archive.org/web/20040829205051/http://www.tig.com.au/support/access/numbers.html)

**Related Posts**

- [2022: Year of the Dial-up Modem](https://mcretro.net/2022-year-of-the-dial-up-modem/)
- [Avtek MegaPlus V.32bis - First Connection Attempt](https://mcretro.net/avtek-megaplus-v-32bis-first-connection-attempt/)

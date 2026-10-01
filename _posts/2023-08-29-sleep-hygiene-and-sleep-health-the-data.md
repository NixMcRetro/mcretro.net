---
title: "Sleep Hygiene and Sleep Health - The Data"
author: "Nix McRetro"
date: 2023-08-29T10:19:43.000+10:00
categories: [news]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

![](/assets/images/2023/img_1093.jpg)

My ResMed AirSense 10 AutoSet trial arrived a couple of weeks ago. After setting it up and picking some starting options the data flowed for roughly two weeks. Nasal pillows are not suitable for me. They cause my mouth to open, creating the strangest air pressure sensations. My notes call the ResMed N20 a full-face mask, but the AirFit N20 is actually a nasal mask. I either wrote the mask type or the model down wrong, so I'm not going to invent the answer now. 😷

![](/assets/images/2023/img_1145.jpg)

Using [the Open Source CPAP Analysis Reporter](https://www.sleepfiles.com/OSCAR/) (OSCAR v1.4.0), we can delve a into the data. Any days missing data are due to insomnia keeping me awake all night. I've put the data into a zip file [here](/assets/uploads/OSCAR.zip) too. Not fun. Anyway, let's look at some of the days in more detail and the different event types.

![](/assets/images/2023/img_1134.jpg)

We'll start off with longer periods of recorded data. Above is the 17th August. Many nights were only a few hours of data because the mask itself would cause me to wake up. The machine flagged a lot of clear-airway events. I was calling these central apnoeas, but a PAP device flag is not the same thing as a sleep-study diagnosis. If we disregard the earlier data in the night while I was still trying to get to sleep, we can see some of those flags.

![](/assets/images/2023/img_1133.jpg)

The machine flagged about 21 seconds without detected airflow. Interesting. The duration alone does not tell me what caused it, and I cannot tell from this screenshot whether I was actually asleep for the whole event.

![](/assets/images/2023/img_1136.jpg)

Here's the 18th August, and we have recorded some obstructive apneas (OAs).

![](/assets/images/2023/img_1135.jpg)

How does the machine distinguish between clear-airway and obstructive events though? The AirSense 10 uses small pressure oscillations during an apnoea to estimate whether the airway is open or closed. That is useful machine data, but it still is not the same thing as polysomnography. What's also interesting is that central events can appear after treatment of obstructive sleep apnoea begins, known as treatment-emergent central sleep apnoea.

![](/assets/images/2023/img_1138.jpg)

Here's some data from the 19th August. The machine-reported AHI was below five on most days and never exceeded eight. I was treating that as reassuring, but the AirSense number is therapy data, not a diagnosis by itself.

![](/assets/images/2023/img_1137.jpg)

A few more clear-airway flags. I originally assumed the 20+ second ones were automatically more concerning than the 10-second ones, but event duration alone is not enough for me to make that judgement from CPAP data.

![](/assets/images/2023/img_1140.jpg)

Jumping forward a week to the 26th August we have more data. This one has it all! Large leaks (LL), clear-airway flags (CA), obstructive apnoea flags (OA), and hypopnoeas (H). In my recordings, many of the large leaks appeared while I was readjusting the mask.

![](/assets/images/2023/img_1139.jpg)

There's a hypopnoea. In plain English, that is a partial reduction in breathing rather than a complete apnoea. The machine is inferring these events from its flow and pressure data.

![](/assets/images/2023/img_1141.jpg)

And the last day of recorded data where the pressure ramped up to 11 and I threw the mask off after a few hours.

What have I learnt from this? While my snoring might be an issue to any roommates, I still did not know whether it was clinically important. I varied the settings on the machine night to night, but found that EPR, which reduces pressure during exhalation, made it much easier to sleep.

![](/assets/images/2023/img_1142.jpg)

However, I did not feel more rested. What's worse is there were at least three days where I woke up sweat drenched. This was one of the things I was trying to solve: night sweats. The CPAP trial did not make them disappear, but that does not tell me what was causing them.

![](/assets/images/2023/img_1144.gif)

Did APAP or CPAP solve the night sweats during this trial? For me, no. That was the practical question I wanted answered. I still had a proper sleep study in the future, which mattered because this trial could not diagnose or rule out sleep apnoea. With the sweats showing up on only about 3 of 14 nights, I was also worried a single night might not capture that symptom. That does not mean a sleep study could not still find sleep-disordered breathing.

![](/assets/images/2023/img_1143.gif)

I guess all I can do is continue investigating why I have issues getting to sleep and staying asleep. I've tried eliminating caffeine, reducing room temperature and changing sleeping positions, and nothing seems to work. Coupled with phantom itches as I'm trying to sleep, it certainly doesn't help either.

I was starting to wonder whether stress and anxiety were part of the picture, but I did not have an answer yet. 😮‍💨

Previous: [Sleep Hygiene and Sleep Health](/sleep-hygiene-and-sleep-health/)

### Sources

- [ResMed - AirFit N20 nasal mask](https://www.resmed.com/en-us/products/cpap/masks/airfit-n20/)
- [ResMed - AirSense 10 innovation and technology](https://www.resmed.com.au/healthcare-professionals/airsolutions/innovation-and-technology)
- [Healthdirect Australia - Obstructive sleep apnoea](https://www.healthdirect.gov.au/obstructive-sleep-apnoea)
- [Treatment-emergent central sleep apnea: a unique sleep-disordered breathing](https://pmc.ncbi.nlm.nih.gov/articles/PMC7725531/)

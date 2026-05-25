---
title: "Dial-up Modem Handshake Spectrogram at 31,200bps"
author: "Nix McRetro"
date: 2023-08-07T21:33:42.000+10:00
categories: [modems, news, youtube]
---

{% include youtube.html id="_5ZUPU5NHyM" %}

I saw this awesome dial-up modem spectrogram from ten years ago while hunting something or other modem related on archive.org. I was curious if I could replicate it. I don't have any clean sounds - only audio that is recorded with an iPhone.

{% include youtube.html id="vvr9AMWEU-c" %}

Reading through the comments on the above video disappointed me that the software used wasn't mentioned. So I started digging around and [came across this](https://spectrogram.sciencemusic.org) which pretty cool. Drop an audiophile in there and you're good to go. Wait, no not that sort of audio file.

![](/assets/images/2023/img_1075.jpg)

Initially I opted for some clean audio from [Gough's modem sounds archive](https://goughlui.com/2016/05/03/project-the-definitive-collection-of-v-90v-92-modem-sounds/). They are \*very\* clean. Almost too clean, I couldn't handle it. I want my modems like I want my garden soil - dirty and containing shards of glass. Wait, is that normal? Nope... Ha ha! 😎

![](/assets/images/2023/img_1071.jpg)

So I went back and clipped some audio from a modem dial test back in 2021 - for which the video is still pending processing. Seems to be a habit of mine. Build up a mass of video then release it several years later. Good thing modems are timeless! Well, kind of? 🙃

But what software to use? I went back to the initial YouTube channel and... I read the description. Read it with me.

![](/assets/images/2023/img_1072.jpg)

Mother cluckers !!!🐓!!! Sometimes it pays to read the blooping manual. You'd think I'd learn, but no. It's also mentioned about 50 times in the comments.

> **"izotope ozone 5 - 8192 FFT size, 93.75% overlap."**

Well, I know what iZotope 5 is. It's 5 versions older than [iZotope 10](https://www.izotope.com/products/ozone-advanced) - which is current at the time of writing. So how did they get the cool spectrogram to happen? As far as I can tell there was a thing called "Meter Bridge" in iZotope Ozone 5, which might have been the answer. In iZotope Ozone 10... we have "[Insight 2](https://www.izotope.com/products/insight)", which is installed like a plugin on a plugin.

![](/assets/images/2023/img_1073.jpg)

While I used Final Cut Pro X, it turns out you can use iZotop Ozone with Logic Pro X and other apps which is pretty neat. And that's it. Screen capture the video, sync it to the source, encode again... [add some more JPEG](https://web.archive.org/web/20130516130936/http://needsmorejpeg.com/) to your HEVC video and it's ready to be processed for an eighth time by YouTube.

![](/assets/images/2023/img_1074.jpg)

Here's what is happening in the handshake as documented by [Oona Räisänen](https://www.windytan.com/2012/11/the-sound-of-dialup-pictured.html). However, as [Gough Lui points out](https://goughlui.com/2016/05/03/project-the-definitive-collection-of-v-90v-92-modem-sounds/),

> **"This image, however, depicts a V.34-type connection, as it has no high speed sound."**

Which is great, that's what this one is too. V.34 is by far my favourite internet dialling sequence. Don't give me any of that V.32bis trash, I want sweet, sweet V.34 or maybe V.FC for some chaos. If you're connecting at 56k, that's too much man. Overall though, it was interesting to replicate the spectrogram ten years on with one of my own little sound snippets.

![](/assets/images/2023/img_1070.jpg)

In other news, I've setup and configured [BlueSky](https://bsky.app/). So I've gone from having one Twitter to neglect to having two Twitter replacements, [Mastodon](https://mastodon.social/@NixMcRetro) and [BlueSky](https://bsky.app/profile/nixmcretro.bsky.social), to neglect. The responsibilities are stacking up, fast! 😅

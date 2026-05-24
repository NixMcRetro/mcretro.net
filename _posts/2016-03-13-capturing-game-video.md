---
title: "Capturing Game Video"
author: "Nix McRetro"
date: 2016-03-13T11:45:06.000+11:00
categories: [guides, youtube]
---

![doomed](/assets/images/2016/img_0466.jpg)

I tend to upload all my videos at 1080p these days. I used to be a 720p man, but now I've stepped up with 4K starting to appear. My internet connection is so bad I wouldn't dream of uploading 4K video though. So I'll hide in the background with my 1080p videos.

YouTube has a [great resource](https://support.google.com/youtube/answer/1722171?hl=en) when it comes to working out what bitrate you need. For 1080p they recommend around 8 Mbps and with 2K, double that and 4K goes way up to 35-45Mbps. That's a lot of bits! Final Cut Pro X typically takes care of all that though when I am doing the final encode.

For video captures themselves, either [ScreenFlow](https://www.telestream.net/screenflow/) or the open source alternative [OBS - Open Broadcaster Software](https://obsproject.com). OBS does a sensible job of everything and it's free! However recently I've been giving ScreenFlow a go and it's quite powerful.

For example I recorded some video at 2560 x 1440 which gave a 17GB source file inside Screenflow. Pretty hefty, but it never hurts to have large initial video - remember that Final Cut Pro X will squash it down considerably. Now there's no save in native format for ScreenFlow, presumably because it is proprietary software so you have to export your video to another format. So far I've tried H.264, ProRes 4444 and ProRes 422 (HQ).

I was exporting a 30 minute video at 1080p (scaled 75% from 2K) and here are the results: - ProRes 4444: 115GB file, double real time to encode. - ProRes 422 (HQ): 50GB file, just short of real time to encode. - H.264: Had to cancel this... it was taking years!

So what does this mean? Well with ProRes 422, you're not sacrificing the original source by tripling the size of the exported file. That's good, I wish that ProRes was a little more customisable in ScreenFlow though. If ProRes 422 is overkill then ProRes 4444 is super-incredible-overkill-2000. Now my little CPU is only a dual core i7, fourth gen I believe, so it's probably not as fast as it could be - but it's all I have. So there you have it!

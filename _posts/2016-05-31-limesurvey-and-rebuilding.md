---
title: "LimeSurvey and Rebuilding"
author: "Nix McRetro"
date: 2016-05-31T21:52:24.000+10:00
last_modified_at: 2026-10-08
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-08
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [news]
---

![](/assets/images/2016/img_0474.jpg)

Where on earth have I been? It's like I fell down the rabbit hole with [Alice](https://en.wikipedia.org/wiki/Alice_in_Wonderland_(1976_film)). Wait, not that Alice. Do not click that link.

Anyway, I've been working on getting back into shape for winter. After all, that's when I leave the house the most. Otherwise the sun cooks away my skin and the scorpions, spiders and snakes all attack. Thankfully in winter they're all in hibernation. Probably making more mini-nopes.

I've also been helping a friend with their PhD, which stands for Doctor of Philosophy, from the Latin *philosophiae doctor*. At least doctor is the same in Latin as it is in modern-day English. Most of that has involved [LimeSurvey](https://web.archive.org/web/20160415170019/https://www.limesurvey.org/), whose admin interface is shown above.

After playing around with the 2.06+ and 2.50+ branches, I can safely say that **for the survey project I was working on, 2.50+ was terrible**. There. I said it. I rolled back to 2.06+, although the survey database couldn't simply come backwards with me. Much more pleasant. Buyer beware! Oh wait, it's open-source free software! :)

I also liked the [Tools for Research](https://www.toolsforresearch.com/limesurvey-responsive-template) responsive template with the older branch. At the time I had been holding out for their 2.50+ template, but it didn't seem to be progressing very quickly. The old 2.06 template is no longer available from that page.

All my console and repair projects were effectively on hold while I dealt with the survey project. Next up: learn some SPSS data analysis-a-nating. How hard could that be? Right?

**RIGHT?** ;)

Meanwhile I had rebuilt the website again, without breaking too many things. Actually, I fixed some things! The contact form worked again, again, the header text was no longer cropped, and I had finally worked out how to make Apache 2.4 serve multiple websites and subdomains from the Raspberry Pi. Check out the [placeholder](/) for the shop. It's magical!

Oh... and I broke the darknet side of things again. WordPress 4.5.3 seemed to have broken my make-all-links-relative-not-bloody-absolute plugin. That could be a problem...

**Review note (8 October 2026):** The surviving text names WordPress 4.5.3, released in June 2016, after this post's May publication date. It is unclear whether this was a later edit or a mistaken version number.

Stay retro, readers!

### Sources

- [WordPress - 4.5.2 Security Release](https://wordpress.org/news/2016/05/wordpress-4-5-2/)
- [WordPress - 4.5.3 Maintenance and Security Release](https://wordpress.org/news/2016/06/wordpress-4-5-3/)

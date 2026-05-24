---
title: "Jekyll WordPress Import from XML - Deleting the Unwanted"
author: "Nix McRetro"
date: 2016-09-19T21:05:35.000+10:00
categories: [programming]
---

![hackers1](/assets/images/2016/img_0562.jpg)

This worked for me under OS X 10.11.6 via Terminal to remove my publicize settings. Your milage may vary of course, sed does some things differently on the Mac than on Linux based machines. And never do anything like this on a set of master files... always use a backup or at least have one!

`find . -type f -print0 | xargs -0 sed -i '' /" _publicize_twitter_user: '@ShaneMcRetro'"/d`

The text being removed was " \_publicize\_twitter\_user: ‘@ShaneMcRetro’” from some 500-odd posts. Very convenient!

The below worked well for removing paragraph tags, because let's be honest, they are a HTML thing.

**start chant** markdown, markdown, markdown **/end chant**

`find . -type f -print0 | xargs -0 sed -i '' 's///g'`

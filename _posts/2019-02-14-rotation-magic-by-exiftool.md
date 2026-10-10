---
title: "Rotation Magic by ExifTool"
author: "Nix McRetro"
date: 2019-02-14T09:34:48.000+11:00
categories: [youtube]
last_modified_at: 2026-10-10
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-10
  purpose: "fact-checking, sourcing, and editorial quality"
---

![](/assets/images/2019/img_0630.jpg)

Recently my iPhone has been doing that thing where it doesn't realise it is actually in landscape mode and captures my 4K video in portrait mode so everything is sideways. How fun! Thankfully Phil Harvey has created [ExifTool](https://exiftool.org/) that lets me change the display rotation metadata in MP4/MOV videos without re-encoding them or losing video quality. Playback software still needs to honour that metadata. I just wanted QuickTime to make this easy... Apple?

The following reports the current rotation metadata, in degrees:

```sh
exiftool -rotation FileName.mp4
```

Resetting it to 0 worked for my files; that angle is not a universal fix for every sideways video:

```sh
exiftool -rotation=0 FileName.mp4
```

Works a charm, if you find it useful [throw the man some cash!](https://exiftool.org/#donate)

### Sources

- [Phil Harvey - ExifTool Composite Tags: Rotation](https://exiftool.org/TagNames/Composite.html)

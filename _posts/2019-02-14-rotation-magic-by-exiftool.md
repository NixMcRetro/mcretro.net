---
title: "Rotation Magic by ExifTool"
author: "Nix McRetro"
date: 2019-02-14T09:34:48.000+11:00
categories: [youtube]
---

![](/assets/images/2019/img_0630.jpg)

Recently my iPhone has been doing that thing where it doesn't realise it is actually in landscape mode and captures my 4K video in portrait mode so everything is sideways. How fun! Thankfully Phil Harvey has created [ExifTool](https://exiftool.org/) that allows editing of the metadata to rotate a video with no loss of video quality since it doesn't need to be re-encoded. I don't know why Quicktime can't do that... Apple?

The following will report what the current rotation is set at in degrees: `exiftool -rotation FileName.mp4`

Which you can then alter by running: `exiftool -rotation=0 FileName.mp4`

Works a charm, if you find it useful [throw the man some cash!](https://exiftool.org/#donate)

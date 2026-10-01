---
title: "Jekyll WordPress Import from XML - Deleting the Unwanted"
author: "Nix McRetro"
date: 2016-09-19T21:05:35.000+10:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [programming]
---

![hackers1](/assets/images/2016/img_0562.jpg)

This worked for me under OS X 10.11.6 while cleaning up a bulk WordPress-to-Jekyll import.

Important archival warning:

**the imported copy of this post damaged the original `sed` examples.**

One command has suspicious / incomplete quoting, and the paragraph-removal command has lost its search and replacement text entirely.

I no longer have enough evidence in this post to reconstruct every missing character confidently.

So the snippets below are being preserved as damaged historical examples rather than paste-ready shell commands.

The first command was intended to bulk-remove `_publicize_twitter_user` metadata from roughly 500 posts.

**Damaged imported command, do not paste blindly**

`find . -type f -print0 | xargs -0 sed -i '' /" _publicize_twitter_user: '@ShaneMcRetro'"/d`

The second command was intended to remove imported HTML paragraph tags.

**Incomplete imported command: the original search / replacement expression has been lost.**

`find . -type f -print0 | xargs -0 sed -i '' 's///g'`

The important lesson survives even if the exact command does not:

test bulk text transformations on copies or version-controlled files before pointing them at hundreds of posts.

**start chant**

markdown, markdown, markdown

**/end chant**

### Related posts

- [McRetro.net Rebooted](/mcretro-net-rebooted/)
- [Markdown and Apache](/markdown-and-apache/)

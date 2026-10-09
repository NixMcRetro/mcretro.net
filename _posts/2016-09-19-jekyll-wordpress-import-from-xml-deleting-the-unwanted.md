---
title: "Jekyll WordPress Import from XML - Deleting the Unwanted"
author: "Nix McRetro"
date: 2016-09-19T21:05:35.000+10:00
last_modified_at: 2026-10-09
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-09
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [programming]
---

![hackers1](/assets/images/2016/img_0562.jpg)

This worked for me under OS X 10.11.6 while cleaning up a bulk WordPress-to-Jekyll import. The first command removed `_publicize_twitter_user` metadata from roughly 500 posts; the original account handle is replaced with `@HISTORICAL_HANDLE` below.

**Historical OS X command, account placeholder**

`find . -type f -print0 | xargs -0 sed -i '' /" _publicize_twitter_user: '@HISTORICAL_HANDLE'"/d`

The quoting is valid: the shell passes one `/.../d` expression to `sed`. The `-i ''` form is the OS X / BSD syntax used here, not a portable GNU `sed` command.

The second command was intended to remove imported HTML paragraph tags, but the saved copy has lost its search and replacement text. I no longer have enough evidence in this post to reconstruct that expression confidently, so it remains an incomplete historical example rather than a paste-ready command.

**Incomplete imported command: the original search / replacement expression has been lost.**

`find . -type f -print0 | xargs -0 sed -i '' 's///g'`

The important lesson survives even if the second command does not: test bulk text transformations on copies or version-controlled files before pointing them at hundreds of posts.

**start chant**

markdown, markdown, markdown

**/end chant**

### Sources

- [Apple Open Source - sed manual](https://raw.githubusercontent.com/apple-oss-distributions/text_cmds/main/sed/sed.1)

### Related posts

- [McRetro.net Rebooted](/mcretro-net-rebooted/)
- [Markdown and Apache](/markdown-and-apache/)

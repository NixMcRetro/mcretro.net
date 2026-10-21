---
title: "Jekyll WordPress Import from XML - Deleting the Unwanted"
author: "Nix McRetro"
date: 2016-09-19T21:05:35.000+10:00
last_modified_at: 2026-10-22
categories: [programming]
---

![hackers1](/assets/images/2016/img_0562.jpg)

Well, I've managed to get hundreds of posts imported from WordPress into Jekyll. All 566 of them, apparently! Unfortunately, WordPress has left quite a bit of unnecessary rubbish behind in the Markdown files. Lovely.

Rather than go through everything manually, I've been experimenting with `find`, `xargs` and `sed` under OS X 10.11.6. Nothing like pointing a command at hundreds of files and hoping you haven't made a terrible mistake!

The first job was removing the `_publicize_twitter_user` metadata from roughly 500 imported posts. Here's the command I used, with the original account name replaced by a placeholder:

`find . -type f -print0 | xargs -0 sed -i '' /" _publicize_twitter_user: '@HISTORICAL_HANDLE'"/d`

The `find` command locates the files, while `xargs` passes them along to `sed`. Using `-print0` and `-0` means filenames containing spaces won't cause quite so much trouble. Finally, `sed` removes lines matching the unwanted metadata.

The `-i ''` part is important on OS X because it tells the BSD version of `sed` to edit files in place without keeping backup copies. Very convenient, provided you've already made a backup!

### Removing HTML paragraph tags

Another nuisance from the WordPress import is all those HTML paragraph tags. Markdown doesn't generally need `<p>` and `</p>` wrapped around every little paragraph, so getting rid of the unnecessary ones would make everything a bit easier to edit.

The exact search-and-replace expression from my original notes has been lost, but here's a replacement example for removing plain opening and closing paragraph tags from Markdown files inside `_posts`:

`find _posts -type f -name '*.md' -print0 | xargs -0 sed -i '' -e 's#<p>##g' -e 's#</p>##g'`

This removes literal `<p>` and `</p>` tags, but it won't handle every possible HTML variation. It also doesn't magically add paragraph breaks where they should be, so check the results before declaring victory.

I'd strongly recommend trying this on a copy of the imported posts first. Accidentally making a mess of one file is annoying. Accidentally making a mess of 566 files? That's a rather different achievement!

At least Markdown is quite pleasant to work with once all the junk is gone. Now to see how long Jekyll lasts before I find something else to break.

**start chant** markdown, markdown, markdown **/end chant**

**Sources**

- [Apple Open Source - sed manual](https://raw.githubusercontent.com/apple-oss-distributions/text_cmds/main/sed/sed.1)

**Related Posts**

- [McRetro.net Rebooted](/mcretro-net-rebooted/)
- [Markdown and Apache](/markdown-and-apache/)

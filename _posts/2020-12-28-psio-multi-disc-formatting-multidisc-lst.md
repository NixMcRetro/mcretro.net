---
title: "PSIO Multi-Disc Formatting (MULTIDISC.LST)"
author: "Nix McRetro"
date: 2020-12-28T07:44:17.000+11:00
categories: [guides, sony]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

![](/assets/images/2020/img_0685.jpg)

`MULTIDISC.LST` needed CR+LF line endings in the PSIO setup I was using. My Mac-created file had ended up with the wrong line endings, so PSIO treated the disc entries incorrectly. Windows was not magic here; it simply gave me an easy way to create the plain-text format PSIO expected.

I tried using BBEdit to make it zap into the correct format like Notepad++ with no success. The path of least resistance? Using virtualisation on my shiny new M1 Mac with an Arm-based Windows 10 in a Technology Preview of Parallels 16. Windows 10 on Arm had x86 emulation available, and somehow it all came together and worked properly. Just make sure you end up with the CR+LF plain-text layout pictured above when creating discs and you'll be ready to game on!

### Sources

- [Cybdyn Systems forum - MULTIDISC.LST](https://www.cybdyn-systems.com.au/forum/viewtopic.php?t=998)
- [Changing end-of-line characters (archived)](https://web.archive.org/web/20221130144657/http://sql313.com/index.php/43-main-blogs/maincat-dba/62-using-notepad-to-change-end-of-line-characters)
- [Redump2PSIO (archived)](https://web.archive.org/web/20210420050749/http://thejbnet.com/blog/2016/05/16/redump2psio/)

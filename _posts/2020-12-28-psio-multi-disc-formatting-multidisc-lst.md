---
title: "PSIO Multi-Disc Formatting (MULTIDISC.LST)"
author: "Nix McRetro"
date: 2020-12-28T07:44:17.000+11:00
categories: [guides, sony]
last_modified_at: 2026-10-10
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-10
  purpose: "fact-checking, sourcing, and editorial quality"
---

![](/assets/images/2020/img_0685.jpg)

Carriage returns (CR) and line feeds (LF). CRLF! Get those line endings wrong and PSIO will get angry at you by reading all the discs as one line - a recipe for disaster on my Mac. `MULTIDISC.LST` needed plain text with CRLF between disc entries in the setup I was using; Windows just gave me an easy way to save it that way. One catch with the screenshot above: the first line ends in CRLF, but the second shows only CR. Use CRLF between entries rather than copying that mismatch!

I tried using BBEdit to make it zap into the correct format like Notepad++, with no success. The path of least resistance? Using virtualisation on my shiny new M1 Mac with Windows 10 on Arm in the Technical Preview of Parallels 16. Windows 10 on Arm had x86 emulation available, and somehow it all came together and worked properly - very unexpected! Get that plain-text disc list right and you'll be ready to game on!

### Sources

- [Cybdyn Systems - PSIO Systems Manual R30, Multi-Disc section, pages 29 to 30 (Stone Age Gamer-hosted copy)](https://stoneagegamer.com/content/flash/psio/PSIO%20Systems%20Manual%20%28R30%29.pdf)
- [Parallels - Parallels Desktop for Mac with Apple M1 chip](https://www.parallels.com/blogs/parallels-desktop-apple-silicon-mac/)
- [Cybdyn Systems forum - MULTIDISC.LST](https://www.cybdyn-systems.com.au/forum/viewtopic.php?t=998)
- [Using Notepad++ to change end of line characters (CRLF to LF) (archived)](https://web.archive.org/web/20221130144657/http://sql313.com/index.php/43-main-blogs/maincat-dba/62-using-notepad-to-change-end-of-line-characters)
- [Redump2PSIO (archived)](https://web.archive.org/web/20210420050749/http://thejbnet.com/blog/2016/05/16/redump2psio/)

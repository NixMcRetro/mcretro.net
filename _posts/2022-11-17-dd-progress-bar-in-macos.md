---
title: "dd Progress Bar in macOS"
author: "Nix McRetro"
date: 2022-11-17T03:21:54.000+11:00
categories: [apple, guides]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

![](/assets/images/2022/img_0989.jpg)

I've been using `dd` to clone some disks recently, usually when they use filesystems macOS does not handle natively. macOS is a UNIX operating system; Linux is Unix-like, and their command-line tools are similar without being identical. Homebrew fills in plenty of the gaps. Thanks to [davejansen.com](https://davejansen.com/dd-with-progress-indication-on-macos/), I also found a way to give these disk-level clones a proper progress display.

The power of [Pipe Viewer (pv)](https://formulae.brew.sh/formula/pv).

```
brew install pv
```

```
sudo dd if=/dev/rdiskX bs=1m | pv -s 2000G | sudo dd of=/dev/rdiskY bs=1m
```

The `-s 2000G` value is only there so `pv` knows the expected amount of data and can calculate progress. It needs to match the size of the source you are actually cloning. And because this is `dd`: double-check which device is the input and which is the output before pressing Return. The output device will be overwritten.

macOS's BSD tools also support the traditional SIGINFO status request, which is why Control-T can be useful with long-running terminal commands. I still like `pv` here because it gives me a continuous progress display.

And now I have some idea of where my clones are up to. Consider it noted down for future reference! 🙂

### Sources

- [Apple - SIGINFO documentation](https://developer.apple.com/library/archive/documentation/System/Conceptual/ManPages_iPhoneOS/man2/sigvec.2.html)

---
title: "dd Progress Bar in macOS"
author: "Nix McRetro"
date: 2022-11-17T03:21:54.000+11:00
categories: [apple, guides]
last_modified_at: 2026-10-18
---

![](/assets/images/2022/img_0989.jpg)

I've been using `dd` to clone some disks recently, usually when they use filesystems macOS does not handle natively. macOS is a UNIX operating system; Linux is Unix-like, and their command-line tools are similar without being identical. Homebrew fills in plenty of the gaps. Thanks to [Dave Jansen's dd with progress indication on macOS](https://davejansen.com/dd-with-progress-indication-on-macos/), I also found a way to give these disk-level clones a proper progress display using [Pipe Viewer (pv)](https://formulae.brew.sh/formula/pv).

```
brew install pv
```

```
sudo dd if=/dev/rdiskX bs=1m | pv -s 2000G | sudo dd of=/dev/rdiskY bs=1m
```

The `-s 2000G` value tells `pv` the expected amount of data so it can calculate progress; it doesn't limit how much gets copied. Treat it as a placeholder and match it to the actual size of your source. By default, `G` means gibibytes, so `2000G` is not exactly the same as a drive advertised as 2 TB. And because this is `dd`: double-check which device is the input and which is the output before pressing Return. The output device will be overwritten.

On macOS, `dd` also prints its current input and output block counts when it receives SIGINFO, which you can normally request with Control-T in the terminal. I still like `pv` here because it gives me a continuous progress display.

And now I have some idea of where my clones are up to. Consider it noted down for future reference! 🙂

### Sources

- [Dave Jansen - Quick: dd with progress indication on macOS](https://davejansen.com/dd-with-progress-indication-on-macos/)
- [Pipe Viewer - Online Manual](https://www.ivarch.com/programs/quickref/pv.shtml)
- [Apple Open Source - dd(1) manual](https://github.com/apple-oss-distributions/file_cmds/blob/main/dd/dd.1)
- [Apple - sigvec(2): SIGINFO and Control-T](https://developer.apple.com/library/archive/documentation/System/Conceptual/ManPages_iPhoneOS/man2/sigvec.2.html)

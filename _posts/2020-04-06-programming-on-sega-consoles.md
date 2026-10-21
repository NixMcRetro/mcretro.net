---
title: "Programming on Sega Consoles"
author: "Nix McRetro"
date: 2020-04-06T10:52:23.000+10:00
last_modified_at: 2026-10-22
categories: [devkit, sega]
---

![](/assets/images/2020/img_0666.jpg)

I've been looking at a few different ways to get software running on Sega consoles. There's quite a bit of development software floating around out there, so I thought I'd collect some of the more interesting projects in one place.

First up we have [SGDK](https://github.com/Stephane-D/SGDK), the Sega Genesis Development Kit. It's a free development kit for writing Mega Drive / Genesis software in C, without having to do absolutely everything in Motorola 68000 assembly. Lovely! It also comes with example projects and tools for getting graphics and sound into a game.

I actually left myself a little reminder about [setting up the SGDK environment variables](/setting-up-sgdk-environment-variables/) back in February 2016. Apparently four years wasn't long enough to forget about it!

For anyone running Linux, there's also [GENDEV](https://github.com/kubilus1/gendev/). This provides a development environment and toolchain for the Mega Drive, including support for SGDK. So rather than being a completely different development kit, it's another way of getting the tools running outside Windows.

And then there's the [Sega Saturn SDK](https://saturnsdk.github.io/), with tools for Linux and Windows. The Saturn is a rather different beast, with its dual Hitachi SH-2 processors and considerably more complicated graphics hardware. I suspect getting a few sprites on the screen is only the beginning of the fun there!

Of course, collecting development hardware and software is one thing. Actually knowing what to do with all of it is another. At least there are plenty of examples to poke around in. Maybe one day I'll have something more exciting than a test program to show for it!

**Sources**

- [GENDEV - Genesis Development Environment](https://github.com/kubilus1/gendev/)
- [SGDK - Sega Genesis Development Kit](https://github.com/Stephane-D/SGDK)
- [Sega Saturn SDK](https://saturnsdk.github.io/)

**Related Posts**

- [Setting Up SGDK Environment Variables](/setting-up-sgdk-environment-variables/)
- [Accolade Code Monkeys Dev Cart for the Sega Mega Drive / Genesis](/accolade-code-monkeys-dev-cart-for-the-sega-mega-drive-genesis/)

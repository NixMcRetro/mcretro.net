---
title: "Take Back the Darknet (Part 2)"
author: "Nix McRetro"
date: 2016-01-04T22:18:34.000+11:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [guides, raspberry-pi]
---

**Part 2 - Image Raspbian, Basic Settings and Updates**

**Archive note:** This page documents the January 2016 Raspbian Jessie setup. Read the compatibility and security warning in [Part 1](/take-back-the-darknet-part-1/) before using any of these commands on a current system.

The Jessie image used here had the old default `pi` account. Current Raspberry Pi OS no longer creates that account automatically, so the login steps below belong specifically to this historical image.

First off we need to get an operating system onto the MicroSD card. We will be using the official image from [raspberrypi.org](https://www.raspberrypi.com/software/operating-systems/). At the time of writing the most recent version was Raspbian Jessie Lite (November 2015).

To restore this onto a 4GB or larger MicroSD card, we used one of the following depending on the computer running the guide:

- [Win32 Disk Imager](https://sourceforge.net/projects/win32diskimager/) for Windows
- [ApplePi Baker 1.81](https://www.tweaking4all.com/hardware/raspberry-pi/macosx-apple-pi-baker/) for OS X
- `dd` for Linux

Once imaging has completed, insert the MicroSD card into the powered-off Raspberry Pi, then connect it to power and ethernet.

I recommend using at least a 10 watt (5 volt, 2 amp) power adapter. Using a USB port on your computer probably won't have enough juice. USB 2.0 commonly provides 2.5 watts (5 volt, 0.5 amp) and a standard USB 3.0 port provides 4.5 watts (5 volt, 0.9 amp). It might cut it, but a dedicated power supply is the better move, with plenty of amperage left over.

Use something like [Angry IP Scanner](https://angryip.org/download/#mac) to help locate the Raspberry Pi on your local network if it is headless. Otherwise, check the output on an attached HDMI screen.

We are looking for the IP address. Note it down because we'll need it to connect remotely over SSH.

No, not that type of [xXx](https://en.wikipedia.org/wiki/XXX_(film_series))!

Pick up an SSH client. OS X and Linux already have one built in:

- [PuTTY](https://www.putty.org/) for Windows
- [Terminal](https://web.archive.org/web/20201025142105/https://www.macworld.co.uk/how-to/how-use-terminal-on-mac-3608274/) on OS X
- [Terminal](https://www.howtogeek.com/140679/beginner-geek-how-to-start-using-the-linux-terminal/) on Linux

Log in to the Raspberry Pi remotely with the IP address you noted earlier:

`ssh pi@xxx.xxx.xxx.xxx`

You are now logged in to the Raspberry Pi remotely. Congratulations!

Next up we need to run the basic setup options:

`sudo raspi-config`

For this Jessie-era setup, I used:

- Expand Filesystem, to fill the MicroSD card
- Overclock, set to None because there was no need for it here
- Advanced, Hostname, changed to WebServer
- Advanced, Memory Split, set to 16 MB

After completing these it will ask to reboot. Once it has rebooted, log back in over SSH:

`ssh pi@xxx.xxx.xxx.xxx`

The update command used throughout this Jessie-era setup was:

`sudo apt-get update && sudo apt-get upgrade`

Once the updates have installed, reboot for good measure:

`sudo reboot`

Advance onward to [part 3](/take-back-the-darknet-part-3/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

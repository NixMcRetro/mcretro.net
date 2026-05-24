---
title: "Take Back the Darknet (Part 2)"
author: "Nix McRetro"
date: 2016-01-04T22:18:34.000+11:00
categories: [guides, raspberry-pi]
---

**Part 2 - Image Raspbian, Basic Settings and Updates**

First off we need to get an operating system onto the MicroSD card. We will be using the official image from [raspberrypi.org](https://www.raspberrypi.org/software/operating-systems/). At the time of writing the most recent version was Raspbian Jessie Lite (November 2015). To restore this onto a 4GB (or larger) MicroSD we will need one of the following depending on your computer that has this guide open: - [Win32 Disk Imager](https://sourceforge.net/projects/win32diskimager/) for Windows - [ApplePi Baker 1.81](https://www.tweaking4all.com/hardware/raspberry-pi/macosx-apple-pi-baker/) for OS X - dd for Linux Once imaging has completed, insert the MicroSD card into the powered off Raspberry Pi then connect it to power and ethernet.

I recommend using at least a 10 watt (5 volt, 2 amp) power adapter. Using a USB port on your computer probably won't have enough juice. USB2 comes in a 2.5 watt (5 volt, 0.5 amp) and USB3 hovers around 4.5 watts (5 volt, 0.9 amp). Might cut it, but a dedicated power supply is always going to be a better move, with plenty of amperage left over.

Use something like [Angry IP Scanner](http://angryip.org/download/) to help you locate your Raspberry Pi on your local network if it's headless, otherwise check the output via the HDMI attached screen. We are looking for the IP address. Note it down, we'll need it to SSH/remotely connect in. Your IP address should be in the format xxx.xxx.xxx.xxx or with either 1, 2 or 3 digits per set of xxx. No, not that type of [xXx](https://en.wikipedia.org/wiki/XXX_(film_series))!

Pickup an SSH client (OS X and Linux already have this built-in): - [PuTTY](https://www.putty.org/) for Windows - [Terminal](https://www.macworld.co.uk/how-to/how-use-terminal-on-mac-3608274/) which is built-in to OS X - [Terminal](https://www.howtogeek.com/140679/beginner-geek-how-to-start-using-the-linux-terminal/) which is also built-in to Linux

Login to the Raspberry Pi remotely with the IP address (xxx.xxx.xxx.xxx) you noted down earlier. `ssh pi@xxx.xxx.xxx.xxx` You are now logged in to your Raspberry Pi remotely - congratulations!

Next up we need to run basic setup options so at the command line type `sudo raspi-config`

From this menu, we want to do the following. - Expand Filesystem - This will fill the MicroSD card. - Overclock - Set to None - No need for this. - Advanced, Hostname - Change to WebServer - So we know what it is. - Advanced, Memory Split - Set to 16MB (lowest), 0 doesn't work. After completing these it will ask to reboot, reboot and you will be logged out of your terminal / PuTTY session.

Once rebooted (~30 seconds), Log back in with SSH to your server. `ssh pi@xxx.xxx.xxx.xxx`

This is an important command to remember for software updates. If you know nothing else, remember this line. `sudo apt-get update && sudo apt-get upgrade`

Once all updates have installed, reboot for good measure. `sudo reboot`

Advance onward to [part 3](/take-back-the-darknet-part-3/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

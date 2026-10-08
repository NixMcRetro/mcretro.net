---
title: "Take Back the Darknet (Part 3)"
author: "Nix McRetro"
date: 2016-01-04T22:22:11.000+11:00
last_modified_at: 2026-10-08
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-08
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [guides, raspberry-pi]
---

**Part 3 - Setting a Static IP Address**

**Archive note:** This page documents the January 2016 Raspbian Jessie setup. Read the compatibility and security warning in [Part 1](/take-back-the-darknet-part-1/) before using any of these commands on a current system.

As we are using this Raspbian Jessie image, both sudo and Nano are installed by default. Nano is a simple text editor, think Notepad for the command line. Easier to navigate than Vim. Sudo lets an authorised user run commands with elevated privileges, usually as root in this setup. Very handy to have!

In the Raspbian Jessie image I was using, static network configuration went in `/etc/dhcpcd.conf`; that was specific to this setup rather than a rule for every Debian Jessie installation.

Let's get editing:

`sudo nano /etc/dhcpcd.conf`

Add the configuration below to the end, adjusting it for your own network. I originally suggested a memorable address ending in `.200` or `.250`, but it must be valid for your subnet, unused by another device and kept clear of addresses your router may hand out through DHCP. My "keep the first three numbers the same" shortcut assumed a typical `/24` home network; it was not a universal networking rule.

We'll also need the actual router or default-gateway address. Not sure what it is? [This guide](https://www.computerworld.com/article/1496151/network-security-find-the-ip-address-of-your-home-router.html) explains how to find it. It might be something like `192.168.0.1`, but check the real gateway on your network rather than guessing it from the static address you picked.

```text
# Static IP configuration
interface eth0
static ip_address=xxx.xxx.xxx.200/24
static routers=xxx.xxx.xxx.yyy
static domain_name_servers=8.8.8.8 8.8.4.4
```

Save and exit, Ctrl-O (Writeout / Save) and Ctrl-X (Exit) and reboot. `sudo reboot`

You'll be logged out of your terminal / PuTTY session and ready for the next step.

### Sources

- [Debian Jessie - dhcpcd.conf(5)](https://manpages.debian.org/jessie/dhcpcd5/dhcpcd.conf.5.en.html)
- [Debian Jessie - sudoers(5)](https://manpages.debian.org/jessie/sudo/sudoers.5.en.html)

Advance onward to [part 4](/take-back-the-darknet-part-4/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

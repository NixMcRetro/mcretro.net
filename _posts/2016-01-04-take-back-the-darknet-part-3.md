---
title: "Take Back the Darknet (Part 3)"
author: "Nix McRetro"
date: 2016-01-04T22:22:11.000+11:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [guides, raspberry-pi]
---

**Part 3 - Setting a Static IP Address**

**Archive note:** This page documents the January 2016 Raspbian Jessie setup. Read the compatibility and security warning in [Part 1](/take-back-the-darknet-part-1/) before using any of these commands on a current system.

As we are using Raspbian Jessie, both sudo and Nano are installed by default. Nano is a simple text editor, think Notepad for the command line. Easier to navigate than Vim. Sudo allows us to be the superuser which pretty much lets us do whatever we want. Very handy to have!

Under the Raspbian Jessie image I was using, static network configuration had moved into `/etc/dhcpcd.conf`.

That's a statement about this Raspbian setup, not a universal rule for every Debian Jessie installation.

Let's get editing:

`sudo nano /etc/dhcpcd.conf`

Add the configuration below to the end, adjusting it for your own network.

In the original guide I suggested simply choosing something memorable such as `.200` or `.250`.

That shortcut is only safe if the address is valid for your subnet, is not already being used by another device, and does not conflict with addresses your router may hand out through DHCP.

My "keep the first three numbers the same" advice also assumed a typical `/24` home network. That is common, but it is not a universal networking rule.

In addition to the static address, we'll also need the actual router or default-gateway address.

Not sure what it is? [This guide](https://www.computerworld.com/article/1496151/network-security-find-the-ip-address-of-your-home-router.html) explains how to find it.

On a typical home network it might be something like `192.168.0.1`, but don't guess it from the static address you picked. Check the real gateway on your network and use that.

```text
# Static IP configuration
interface eth0
static ip_address=xxx.xxx.xxx.200/24
static routers=xxx.xxx.xxx.yyy
static domain_name_servers=8.8.8.8 8.8.4.4
```

Save and exit, Ctrl-O (Writeout / Save) and Ctrl-X (Exit) and reboot. `sudo reboot`

You'll be logged out of your terminal / PuTTY session and ready for the next step.

Advance onward to [part 4](/take-back-the-darknet-part-4/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

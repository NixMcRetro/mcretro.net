---
title: "Take Back the Darknet (Part 3)"
author: "Nix McRetro"
date: 2016-01-04T22:22:11.000+11:00
categories: [guides, raspberry-pi]
---

**Part 3 - Setting a Static IP Address**

As we are using Raspbian Jessie, both sudo and Nano are installed by default. Nano is a simple text editor, think Notepad for the command line. Easier to navigate than Vim. Sudo allows us to be the superuser which pretty much lets us do whatever we want. Very handy to have!

Under Raspbian Jessie (and therefore Debian as well) setting a static IP has been moved from /etc/network/interfaces to /etc/dhcpcd.conf. Let's get editing. `sudo nano /etc/dhcpcd.conf`

Add the below code to the end, adjusting it to suit your preferred network address. I recommend a static IP address that is easy to remember, this will be the new address you log in to SSH with in the future. Take your existing IP address, xxx.xxx.xxx.xxx and change the last three digits to either .200 or .250 to keep it simple. You will probably end up with something like 192.168.0.200 or 10.0.0.200. As long as the first three numbers (**xxx.xxx.xxx**.xxx) are the same you shouldn't encounter any issues.

In addition to that, we'll also need to add your router address. Not sure what your router IP address is? [This](https://www.computerworld.com/article/2474776/network-security-find-the-ip-address-of-your-home-router.html) is a solid guide for finding your router IP. If your IP address is 192.168.0.xxx then your router is likely at 192.168.0.1 or 192.168.0.100, that's why we choose a static IP address that is in the 200s.

`#Static IP configuration interface eth0 static ip_address=xxx.xxx.xxx.200/24 static routers=xxx.xxx.xxx.yyy static domain_name_servers=8.8.8.8 8.8.4.4`

Save and exit, Ctrl-O (Writeout / Save) and Ctrl-X (Exit) and reboot. `sudo reboot`

You'll be logged out of your terminal / PuTTY session and ready for the next step.

Advance onward to [part 4](/take-back-the-darknet-part-4/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

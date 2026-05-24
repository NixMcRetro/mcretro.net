---
title: "Take Back the Darknet (Part 7)"
author: "Nix McRetro"
date: 2016-01-04T23:27:13.000+11:00
categories: [guides, raspberry-pi]
---

**Part 7 - Hardening Apache and Secure Shell**

Next up we harden Apache and OpenSSH for the glass is always half empty. Start off by editing the security configuration file for Apache2. `sudo nano /etc/apache2/conf-available/security.conf`

Change `ServerTokens OS` to `ServerTokens Prod`

and change `ServerSignature On` to `ServerSignature Off` Save and exit, Ctrl-O (Writeout) and Ctrl-X (Exit)

Next, edit the main Apache configuration file. `sudo nano /etc/apache2/apache2.conf`

Add the line, you can substitute tim with something more relevant to your own website. `"ServerName tim"` Then restart Apache2 `sudo service apache2 restart` Edit the SSH daemon configuration file. `sudo nano /etc/ssh/sshd_config` Change `PermitRootLogin without-password` to `PermitRootLogin no` Change `Port 22` to `Port 38192` And restart the SSH service by doing a reboot. `sudo reboot`

Logging in with SSH (**S**ecure **SH**ell) is now slightly different as we have changed the default port from 22 to 38192 (or any other number you wanted as long as it doesn't clash with an [existing one](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers). `ssh tim@xxx.xxx.xxx.xxx -p 38192`

Advance onward to [part 8](/take-back-the-darknet-part-8/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

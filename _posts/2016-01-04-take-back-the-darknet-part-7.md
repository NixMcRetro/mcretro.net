---
title: "Take Back the Darknet (Part 7)"
author: "Nix McRetro"
date: 2016-01-04T23:27:13.000+11:00
last_modified_at: 2026-10-08
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-08
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [guides, raspberry-pi]
---

**Part 7 - Hardening Apache and Secure Shell**

**Archive note:** This page documents the January 2016 Raspbian Jessie setup. Read the compatibility and security warning in [Part 1](/take-back-the-darknet-part-1/) before using any of these commands on a current system.

Next up we harden Apache and OpenSSH for the glass is always half empty. Start off by editing the security configuration file for Apache2. `sudo nano /etc/apache2/conf-available/security.conf`

Change `ServerTokens OS` to `ServerTokens Prod` and `ServerSignature On` to `ServerSignature Off`. These reduce the details Apache advertises; they do not secure the server on their own. Save and exit, Ctrl-O (Writeout) and Ctrl-X (Exit).

Next, edit the main Apache configuration file.

`sudo nano /etc/apache2/apache2.conf`

Add the line below, substituting `tim` with something more relevant to your own website:

`ServerName tim`

Then restart Apache2:

`sudo service apache2 restart`

Now edit the SSH daemon configuration file:

`sudo nano /etc/ssh/sshd_config`

Change `PermitRootLogin without-password` to `PermitRootLogin no`.

The old OpenSSH value `without-password` shown in this Jessie-era configuration is now a deprecated alias for `prohibit-password`. `PermitRootLogin no` continues to mean that root cannot log in through SSH at all.

I also changed `Port 22` to `Port 38192`. That may reduce noise from indiscriminate scans, but it is not a substitute for strong authentication.

Then reboot:

`sudo reboot`

Logging in with SSH (**S**ecure **SH**ell) is now slightly different because we changed the port from 22 to 38192. You can choose another valid port that does not clash with an [existing service](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers). For the port used here:

`ssh tim@xxx.xxx.xxx.xxx -p 38192`

### Sources

- [Apache HTTP Server 2.4 - Core Features](https://httpd.apache.org/docs/2.4/mod/core.html)
- [OpenSSH - sshd_config](https://man.openbsd.org/sshd_config)

Advance onward to [part 8](/take-back-the-darknet-part-8/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

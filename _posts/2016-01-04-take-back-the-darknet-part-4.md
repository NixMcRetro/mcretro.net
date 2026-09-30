---
title: "Take Back the Darknet (Part 4)"
author: "Nix McRetro"
date: 2016-01-04T22:24:12.000+11:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [guides, raspberry-pi]
---

**Part 4 - Hardening Your Pi**

**Archive note:** This page documents the January 2016 Raspbian Jessie setup. Read the compatibility and security warning in [Part 1](/take-back-the-darknet-part-1/) before using any of these commands on a current system.

[Hardening](https://en.wikipedia.org/wiki/Hardening_(computing)), important for the sake of reducing attack vectors! First off we'll create a new user and then delete the "pi" user that comes preinstalled.

Log back in via SSH / Terminal / PuTTY `ssh pi@xxx.xxx.xxx.xxx`

Think of a new username. Could be your name or something a bit more fun. I'll be using "tim" as my example. `sudo adduser tim` When prompted for a password, make a very long complicated password (or even passphrase). You could also use a [password generator](https://privacycanada.net/strong-password-generator/). This will be your new username and password to login via SSH in the future. Don't forget it!

Now we have a new user, but it does not have the same permissions as the old `pi` account.

In the original guide I suggested copying every group from the default `pi` account. That is broader than necessary. A better principle is to add only the groups the account actually needs rather than copying privileges simply because the old account happened to have them.

For this historical setup I added the new user to the `sudo` and `adm` groups:

`sudo adduser tim sudo`

`sudo adduser tim adm`

You can compare group membership with:

`groups pi`

`groups tim`

I can't remember if this next step was necessary or not, but I ended up doing it anyway:

`sudo visudo`

I also enabled unrestricted passwordless sudo in the original setup:

`tim ALL=(ALL) NOPASSWD: ALL`

That was convenient, but it weakens the purpose of requiring authentication for privilege escalation. I am preserving the line because it documents what I actually configured in 2016, not because I would call it a hardening recommendation today.

Finally, close the remote connection and log out of the `pi` user by typing:

`exit`

Try logging in with your newly created user `ssh tim@xxx.xxx.xxx.xxx`

If the new account successfully logs in, verify that it has the permissions it actually needs and back up anything important from the old home directory before deleting the old account.

The commands I used in this 2016 setup were:

`sudo deluser pi`

and then:

`sudo rm -rf /home/pi`

Past cool, now we have a new user and some things are configured. We will revisit hardening later on (Metapod used Harden!) for other pieces of software yet to be installed.

Advance onward to [part 5](/take-back-the-darknet-part-5/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

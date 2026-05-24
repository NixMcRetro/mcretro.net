---
title: "Take Back the Darknet (Part 4)"
author: "Nix McRetro"
date: 2016-01-04T22:24:12.000+11:00
categories: [guides, raspberry-pi]
---

**Part 4 - Hardening Your Pi**

[Hardening](https://en.wikipedia.org/wiki/Hardening_\(computing\)), important for the sake of reducing attack vectors! First off we'll create a new user and then delete the "pi" user that comes preinstalled.

Log back in via SSH / Terminal / PuTTY `ssh pi@xxx.xxx.xxx.xxx`

Think of a new username. Could be your name or something a bit more fun. I'll be using "tim" as my example. `sudo adduser tim` When prompted for a password, make a very long complicated password (or even passphrase). You could also use a [password generator](https://privacycanada.net/strong-password-generator/). This will be your new username and password to login via SSH in the future. Don't forget it!

Now we have a new user, but it doesn't have any of the previously existing permissions that the "pi" user has. Let's have a look at what we are missing out on. `groups pi` `groups tim`

See the difference? We can see tim is only a member of the group tim. Such lonely. We can fix that by issuing the following commands.

`sudo adduser tim sudo sudo adduser tim adm`

Now tim is an admin user and can use sudo. We will be deleting the pi user, so it's probably safer to add all those other groups listed under the "groups pi" command to the tim user. Just enter them one at a time and when done type.

`groups tim` It should look the same as (with the exception of the tim/pi group)

`groups pi`

I can't remember if this next step was necessary or not but ended up doing it anyway (and so should you... probably!) `sudo visudo`

Add the following just under the pi user. `tim ALL=(ALL) NOPASSWD: ALL` Finally close the remote connection and log out of the pi user by typing `exit`

Try logging in with your newly created user `ssh tim@xxx.xxx.xxx.xxx`

If it successfully logged you in, we can delete the pi user for good using the following commands `sudo deluser pi`

and trash the home folder `sudo rm -rf /home/pi`

Past cool, now we have a new user and some things are configured. We will revisit hardening later on (Metapod used Harden!) for other pieces of software yet to be installed.

Advance onward to [part 5](/take-back-the-darknet-part-5/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

---
title: "Take Back the Darknet (Part 6)"
author: "Nix McRetro"
date: 2016-01-04T23:18:13.000+11:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [guides, raspberry-pi]
---

**Part 6 - Installing Samba Server**

**Archive note:** This page documents the January 2016 Raspbian Jessie setup. Read the compatibility and security warning in [Part 1](/take-back-the-darknet-part-1/) before using any of these commands on a current system.

We need a way to gain access to the files on the Raspberry Pi so we can update your new website. Samba allows sharing across Windows, OS X and Linux. Very useful. An alternative is FTP but isn't covered in this guide.

Install Samba by running the following. `sudo apt-get install samba -y`

We now need to stop the Samba service so we can edit the configuration file. `sudo /etc/init.d/samba stop`

Remove the existing configuration file to start from scratch. `sudo rm /etc/samba/smb.conf`

Create and edit your new configuration file. `sudo nano /etc/samba/smb.conf`

**Formatting warning:** The imported copy of this post damaged the original Samba configuration block, including the `passwd chat` line.

I do not have a trustworthy surviving copy of every character in the original 2016 configuration, so I am preserving the damaged block as historical evidence rather than silently reconstructing configuration that might be wrong.

Do not treat this block as paste-ready Samba configuration.

The surviving text said to change the "write list" and "valid users" to your current username. `[global]   server string = %h server   map to guest = Bad User   obey pam restrictions = Yes   pam password change = Yes   passwd program = /usr/bin/passwd %u   passwd chat = *Entersnews*spassword:* %nn   unix password sync = Yes   syslog = 0   log file = /var/log/samba/log.%m   max log size = 1000   dns proxy = No   usershare allow guests = Yes   panic action = /usr/share/samba/panic-action %d   idmap config * : backend = tdb      [Website]   comment = Website   path = "/var/www/"   read only = yes   write list = tim   valid users = tim   locking = no   guest ok = no   force user = www-data   force group = www-data   browseable = yes   writeable = no   only guest = no`

That big block of text was intended to allow us to log in and edit files through Windows, OS X or Linux. The original post already noted that backslashes had been lost from the `passwd chat` line during formatting.

The historical configuration also used `force user = www-data`. Samba applies file operations as the forced UNIX user after authentication when that option is enabled. That can be useful, but using `force user` incorrectly can create security problems, so preserve this as part of the old setup rather than treating it as a default modern recommendation.

Next, set a Samba password for the user named in `write list` and `valid users`.

My original guide said it could simply be the same password as the Raspberry Pi account for convenience.

That's what I wrote in 2016, but password reuse is not something I'd recommend as modern security advice.

Enter the Samba password when prompted:

`sudo smbpasswd -a tim`

Restart the Samba service to make the changes active. `sudo /etc/init.d/samba restart`

Next up we are going to lock down the website location (/var/www/) by changing ownership and groups. `sudo chown -R www-data /var/www/ sudo chgrp -R www-data /var/www/`

Which will lead us on to hardening some more things in the next step.

Advance onward to [part 7](/take-back-the-darknet-part-7/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

### Sources

- [Samba - smb.conf manual](https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html)

---
title: "Take Back the Darknet (Part 6)"
author: "Nix McRetro"
date: 2016-01-04T23:18:13.000+11:00
last_modified_at: 2026-10-08
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-08
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [guides, raspberry-pi]
---

**Part 6 - Installing Samba Server**

**Archive note:** This page documents the January 2016 Raspbian Jessie setup. Read the compatibility and security warning in [Part 1](/take-back-the-darknet-part-1/) before using any of these commands on a current system.

We need a way to gain access to the files on the Raspberry Pi so we can update your new website. Samba allows sharing across Windows, OS X and Linux. Very useful. An alternative is FTP but isn't covered in this guide.

Install Samba by running the following. `sudo apt-get install samba -y`

We now need to stop the Samba service so we can edit the configuration file. `sudo /etc/init.d/samba stop`

Remove the existing configuration file to start from scratch. `sudo rm /etc/samba/smb.conf`

Create and edit your new configuration file. `sudo nano /etc/samba/smb.conf`

**Formatting warning:** The block's line layout has been restored from a 15 July 2019 capture of this post. That capture already has the damaged `passwd chat` text, so it does not establish the missing backslashes. The block remains incomplete historical evidence and is not paste-ready Samba configuration.

The surviving text said to change the "write list" and "valid users" to your current username.

~~~ini
[global]
        server string = %h server
        map to guest = Bad User
        obey pam restrictions = Yes
        pam password change = Yes
        passwd program = /usr/bin/passwd %u
        passwd chat = *Entersnews*spassword:* %nn
        unix password sync = Yes
        syslog = 0
        log file = /var/log/samba/log.%m
        max log size = 1000
        dns proxy = No
        usershare allow guests = Yes
        panic action = /usr/share/samba/panic-action %d
        idmap config * : backend = tdb

[Website]
        comment = Website
        path = "/var/www/"
        read only = yes
        write list = tim
        valid users = tim
        locking = no
        guest ok = no
        force user = www-data
        force group = www-data
        browseable = yes
        writeable = no
        only guest = no
~~~

That big block of text was intended to allow us to log in and edit files through Windows, OS X or Linux. The original post already noted the lost backslashes in `passwd chat`; the later archive copy has the same problem.

The historical configuration also used `force user = www-data`. Samba applies file operations as the forced UNIX user after authentication when that option is enabled. That can be useful, but using `force user` incorrectly can create security problems, so preserve this as part of the old setup rather than treating it as a default modern recommendation.

Next, set a Samba password for the user named in `write list` and `valid users`, entering it when prompted. My original guide allowed reuse of the Raspberry Pi account password for convenience; that was the 2016 advice, rather than a recommendation to reuse passwords today.

`sudo smbpasswd -a tim`

Restart the Samba service to make the changes active. `sudo /etc/init.d/samba restart`

Finally, the ownership commands in this setup assigned `/var/www/` to `www-data`. Changing ownership is not, by itself, a complete security measure.

~~~sh
sudo chown -R www-data /var/www/

sudo chgrp -R www-data /var/www/
~~~

Which will lead us on to hardening some more things in the next step.

### Sources

- [McRetro - Take Back the Darknet, Part 6 (15 July 2019 capture)](https://web.archive.org/web/20190715200901/https://mcretro.net/take-back-the-darknet-part-6/)
- [Samba - smb.conf manual](https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html)

Advance onward to [part 7](/take-back-the-darknet-part-7/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

---
title: "Take Back the Darknet (Part 6)"
author: "Nix McRetro"
date: 2016-01-04T23:18:13.000+11:00
categories: [guides, raspberry-pi]
---

**Part 6 - Installing Samba Server**

We need a way to gain access to the files on the Raspberry Pi so we can update your new website. Samba allows sharing across Windows, OS X and Linux. Very useful. An alternative is FTP but isn't covered in this guide.

Install Samba by running the following. `sudo apt-get install samba -y`

We now need to stop the Samba service so we can edit the configuration file. `sudo /etc/init.d/samba stop`

Remove the existing configuration file to start from scratch. `sudo rm /etc/samba/smb.conf`

Create and edit your new configuration file. `sudo nano /etc/samba/smb.conf`

Copy and paste the following into your terminal window. Change the "write list" and "valid users" to your current username. `[global]   server string = %h server   map to guest = Bad User   obey pam restrictions = Yes   pam password change = Yes   passwd program = /usr/bin/passwd %u   passwd chat = *Entersnews*spassword:* %nn   unix password sync = Yes   syslog = 0   log file = /var/log/samba/log.%m   max log size = 1000   dns proxy = No   usershare allow guests = Yes   panic action = /usr/share/samba/panic-action %d   idmap config * : backend = tdb      [Website]   comment = Website   path = "/var/www/"   read only = yes   write list = tim   valid users = tim   locking = no   guest ok = no   force user = www-data   force group = www-data   browseable = yes   writeable = no   only guest = no`

That big block of text will allow us to log in and edit files through Windows / OS X or Linux. Replace the line about with - "passwd chat = \*Entersnews\*spassword:\* %nn" - the backslashes were lost in formatting... I'm working on it!

Next, we need to set a password for your user under Samba. It can be different to your Raspberry Pi account or the same for the sake of simplicity. Make sure it matches the "write list" and "valid user" you picked for the above. Enter a new password when prompted. `sudo smbpasswd -a tim`

Restart the Samba service to make the changes active. `sudo /etc/init.d/samba restart`

Next up we are going to lock down the website location (/var/www/) by changing ownership and groups. `sudo chown -R www-data /var/www/ sudo chgrp -R www-data /var/www/`

Which will lead us on to hardening some more things in the next step.

Advance onward to [part 7](/take-back-the-darknet-part-7/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

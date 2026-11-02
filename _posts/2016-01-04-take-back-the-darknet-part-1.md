---
title: "Take Back the Darknet: The Complete 2016 Guide"
author: "Nix McRetro"
date: 2016-01-04T20:53:39.000+11:00
last_modified_at: 2026-10-18
categories: [guides, raspberry-pi]
permalink: /take-back-the-darknet/
redirect_from: /take-back-the-darknet-part-1/
---
<figure class="darknet-hero-wrap">
  <img class="darknet-hero" src="/assets/images/2016/01/take-back-the-darknet/take-back-the-darknet.jxl" alt="Take Back the Darknet, original January 2016 guide artwork" width="1536" height="1024" fetchpriority="high" decoding="async">
</figure>

**Historical guide:** This 14-part series documents the Raspberry Pi, Raspbian Jessie and Tor setup I used in January 2016. The original preamble was marked as an incomplete draft.

Debian 8 Jessie is obsolete, Tor retired the v2 onion-service system used here in 2021, and Raspberry Pi OS, Apache, Samba, SSH and Tor defaults have moved on. Treat this as an archive of what I built, not as current deployment or security guidance. If you're doing this today, use a supported operating system and the current Tor documentation.

**Take Back the Darknet: The complete January 2016 guide.**

The original 14 chapters are now together in one place. Click any chapter below to expand it. Opening another chapter will close the previous one.

### Kickass Darknet Web Server TOC

<details id="part-1" class="about-panel panel--teal" name="mcretro-darknet" markdown="1">
<summary markdown="span"><img src="/assets/images/about/siren.gif" alt="" width="16" height="16" /> 01. Preamble and Requirements</summary>

**Objective: Host a darknet website on a Raspberry Pi.**

**Why host an onion service?**

It's as cheap as free is why! An onion address isn't a normal DNS domain, but it lets me reach my self-hosted site through Tor without renting another conventional domain name from a registrar. Rent money is dead money!

**Isn't the darknet only for [insert strange and/or illegal things]?**

That's what tends to make headlines. Onion services can host ordinary lawful content too. Take this website for example: would mainstream media ever have you fear the darknet by talking about this website? It's very unlikely. The sensationalist media is just that, sensationalist!

**Take back the darknet!**

The practical goal is simple: learn how Tor onion services work by self-hosting ordinary content on a Raspberry Pi. Join us!

**Requirements:**

- 1x Raspberry Pi with an ethernet port
- 1x 4GB or larger MicroSD card, any class/speed
- Ethernet (Wi-Fi is not covered in this guide)
- [Raspbian Jessie Lite (Nov 2015)](https://web.archive.org/web/20151127024357/https://www.raspberrypi.org/downloads/raspbian/), the historical image used for this project
- Private key for a vanity darknet address (optional)

### Sources for Part 1

- [Debian Project - Debian Jessie Release Information](https://www.debian.org/releases/jessie/)
- [Debian Project - Debian 8 Long Term Support reaching end-of-life](https://chronicles.debian.org/www/News/2020/20200709)
- [Tor Project - Onion Service version 2 deprecation timeline](https://blog.torproject.org/v2-deprecation-timeline/)
- [Tor Project - Set up Your Onion Service](https://community.torproject.org/onion-services/setup/)
- [Raspberry Pi - An update to Raspberry Pi OS Bullseye](https://www.raspberrypi.com/news/raspberry-pi-bullseye-update-april-2022/)

</details>

<details id="part-2" class="about-panel panel--teal" name="mcretro-darknet" markdown="1">
<summary markdown="span"><img src="/assets/images/about/siren.gif" alt="" width="16" height="16" /> 02. Image Raspbian, Basic Settings and Updates</summary>

**Historical detail:** The Jessie image used here had the old default `pi` account. Raspberry Pi OS stopped creating that account automatically in April 2022, so the login steps below belong specifically to this historical image.

First off we need to get an operating system onto the MicroSD card. We will be using the official image from [raspberrypi.org](https://web.archive.org/web/20151127024357/https://www.raspberrypi.org/downloads/raspbian/). At the time of writing the most recent version was Raspbian Jessie Lite (November 2015). To restore this onto a 4GB or larger MicroSD card, we used one of the following depending on the computer running the guide:

- [Win32 Disk Imager](https://sourceforge.net/projects/win32diskimager/) for Windows
- [ApplePi Baker 1.81](https://www.tweaking4all.com/hardware/raspberry-pi/macosx-apple-pi-baker/) for OS X
- `dd` for Linux

Once imaging has completed, insert the MicroSD card into the powered-off Raspberry Pi, then connect it to power and ethernet.

For this 2016 setup, I recommended at least a 10 watt (5 volt, 2 amp) power adapter. Using a USB port on your computer probably won't have enough juice. Ordinary USB 2.0 data ports offer up to 2.5 watts (5 volt, 0.5 amp), while USB 3.0 data ports offer up to 4.5 watts (5 volt, 0.9 amp). Charging ports can differ. It might cut it, but a dedicated power supply is the better move, with plenty of amperage left over.

Use something like [Angry IP Scanner](https://angryip.org/download/#mac) to help locate the Raspberry Pi on your local network if it is headless. Otherwise, check the output on an attached HDMI screen. Note down its IP address, in the dotted form xxx.xxx.xxx.xxx, because we'll need it to connect remotely over SSH. No, not that type of [xXx](https://en.wikipedia.org/wiki/XXX_(film_series))!

Pick up an SSH client. OS X and Linux already have one built in:

- [PuTTY](https://web.archive.org/web/20160104020920/http://www.putty.org:80/) for Windows
- [Terminal](https://web.archive.org/web/20201025142105/https://www.macworld.co.uk/how-to/how-use-terminal-on-mac-3608274/) on OS X
- [Terminal](https://web.archive.org/web/20151213134519/http://www.howtogeek.com:80/140679/beginner-geek-how-to-start-using-the-linux-terminal/) on Linux

Log in to the Raspberry Pi remotely with the IP address you noted earlier:

`ssh pi@xxx.xxx.xxx.xxx`

You are now logged in to the Raspberry Pi remotely. Congratulations!

Next up we need to run the basic setup options:

`sudo raspi-config`

For this Jessie-era setup, I used:

- Expand Filesystem, to fill the MicroSD card
- Overclock, set to None because there was no need for it here
- Advanced, Hostname, changed to WebServer
- Advanced, Memory Split, set to 16 MB

After completing these it will ask to reboot. Once it has rebooted, log back in over SSH:

`ssh pi@xxx.xxx.xxx.xxx`

The update command used throughout this Jessie-era setup was:

`sudo apt-get update && sudo apt-get upgrade`

Once the updates have installed, reboot for good measure:

`sudo reboot`

### Sources for Part 2

- [Raspberry Pi - An update to Raspberry Pi OS Bullseye](https://www.raspberrypi.com/news/raspberry-pi-bullseye-update-april-2022/)
- [Microchip - Universal Serial Bus (USB) Technology](https://developerhelp.microchip.com/xwiki/bin/view/applications/usb/technology/)

</details>

<details id="part-3" class="about-panel panel--teal" name="mcretro-darknet" markdown="1">
<summary markdown="span"><img src="/assets/images/about/siren.gif" alt="" width="16" height="16" /> 03. Setting a Static IP Address</summary>

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

### Sources for Part 3

- [Debian Jessie - dhcpcd.conf(5)](https://manpages.debian.org/jessie/dhcpcd5/dhcpcd.conf.5.en.html)
- [Debian Jessie - sudoers(5)](https://manpages.debian.org/jessie/sudo/sudoers.5.en.html)

</details>

<details id="part-4" class="about-panel panel--teal" name="mcretro-darknet" markdown="1">
<summary markdown="span"><img src="/assets/images/about/siren.gif" alt="" width="16" height="16" /> 04. Hardening Your Pi</summary>

[Hardening](https://en.wikipedia.org/wiki/Hardening_(computing)), important for the sake of reducing attack vectors! First off we'll create a new user and then delete the "pi" user that comes preinstalled.

Log back in via SSH / Terminal / PuTTY `ssh pi@xxx.xxx.xxx.xxx`

Think of a new username. Could be your name or something a bit more fun. I'll be using "tim" as my example: `sudo adduser tim`

When prompted for a password, make a very long, complicated password (or even a passphrase). You could also use a [password generator](https://privacycanada.net/strong-password-generator/). This will be your new username and password to log in via SSH in the future. Don't forget it!

Now we have a new user, but it does not have the same permissions as the old `pi` account. Such lonely. The two explicit group-addition commands in this guide are for `sudo` and `adm`. I also originally suggested copying every group from `pi`, which was broader than necessary: add the groups the account needs rather than copying every privilege simply because the old account had it.

`sudo adduser tim sudo`

`sudo adduser tim adm`

You can compare group membership with:

`groups pi`

`groups tim`

I can't remember if this next step was necessary or not, but I ended up doing it anyway:

`sudo visudo`

The original setup also included this line for unrestricted passwordless sudo:

`tim ALL=(ALL) NOPASSWD: ALL`

That removes the password check when this account uses sudo. Convenient, but the line stays here as a record of the 2016 setup rather than a hardening recommendation.

Finally, close the remote connection and log out of the `pi` user by typing:

`exit`

Try logging in with your newly created user `ssh tim@xxx.xxx.xxx.xxx`

Check that the new account can both log in and use sudo successfully, and back up anything important from the old home directory before deleting the old account.

The commands I used in this 2016 setup were:

`sudo deluser pi`

and then:

`sudo rm -rf /home/pi`

Pretty cool! Now we've got a new user and a few things configured. We will revisit hardening later on (Metapod used Harden!) for other pieces of software yet to be installed.

### Sources for Part 4

- [Debian Jessie - adduser(8)](https://manpages.debian.org/jessie/adduser/adduser.8.en.html)
- [Debian Jessie - sudoers(5)](https://manpages.debian.org/jessie/sudo/sudoers.5.en.html)

</details>

<details id="part-5" class="about-panel panel--teal" name="mcretro-darknet" markdown="1">
<summary markdown="span"><img src="/assets/images/about/siren.gif" alt="" width="16" height="16" /> 05. Installing Apache 2.4 HTTP Server</summary>

For a clearnet site hosted behind your home router's NAT, forward TCP port 80 for HTTP and port 443 if you are also serving HTTPS. One of the wonderful things about a Tor onion service is that it does not need inbound router port forwarding: Tor connects out to the network.

We'll use Apache 2.4 as the web server for this build. Nginx was another option, but this project used Apache, so Apache is what the rest of the series documents.

`sudo apt-get install apache2 -y`

We will also be using PHP alongside Apache's basic HTML support. The `php5` and `libapache2-mod-php5` package names below belong to the Jessie-era software stack used in 2016, so they stay as part of this historical setup.

`sudo apt-get install php5 libapache2-mod-php5 -y`

Next up we'll install Samba.

### Sources for Part 5

- [Apache HTTP Server 2.4 - Binding to Addresses and Ports](https://httpd.apache.org/docs/2.4/bind.html)
- [Tor Project - How do Onion Services work?](https://community.torproject.org/onion-services/overview/)

</details>

<details id="part-6" class="about-panel panel--teal" name="mcretro-darknet" markdown="1">
<summary markdown="span"><img src="/assets/images/about/siren.gif" alt="" width="16" height="16" /> 06. Installing Samba Server</summary>

We need a way to gain access to the files on the Raspberry Pi so we can update your new website. Samba allows sharing across Windows, OS X and Linux. Very useful. An alternative is FTP but isn't covered in this guide.

Install Samba by running the following. `sudo apt-get install samba -y`

We now need to stop the Samba service so we can edit the configuration file. `sudo /etc/init.d/samba stop`

Remove the existing configuration file to start from scratch. `sudo rm /etc/samba/smb.conf`

Create and edit your new configuration file. `sudo nano /etc/samba/smb.conf`

**Formatting warning:** The block's line layout has been restored from a 15th July 2019 capture of this post. That capture already has the damaged `passwd chat` text, so it does not establish the missing backslashes. The block remains incomplete historical evidence and is not paste-ready Samba configuration.

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

### Sources for Part 6

- [McRetro - Take Back the Darknet, Part 6 (15th July 2019 capture)](https://web.archive.org/web/20190715200901/https://mcretro.net/take-back-the-darknet-part-6/)
- [Samba - smb.conf manual](https://www.samba.org/samba/docs/current/man-html/smb.conf.5.html)

</details>

<details id="part-7" class="about-panel panel--teal" name="mcretro-darknet" markdown="1">
<summary markdown="span"><img src="/assets/images/about/siren.gif" alt="" width="16" height="16" /> 07. Hardening Apache and Secure Shell</summary>

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

### Sources for Part 7

- [Apache HTTP Server 2.4 - Core Features](https://httpd.apache.org/docs/2.4/mod/core.html)
- [OpenSSH - sshd_config](https://man.openbsd.org/sshd_config)

</details>

<details id="part-8" class="about-panel panel--teal" name="mcretro-darknet" markdown="1">
<summary markdown="span"><img src="/assets/images/about/siren.gif" alt="" width="16" height="16" /> 08. Installing Tor</summary>

To get Tor up and running we need to install it with the following. `sudo apt-get install tor -y`

And just like that, Tor is installed and establishing Tor circuits. Now let's stop the service while we sort out the configuration. `sudo service tor stop`

Let's stop Apache as well. `sudo service apache2 stop`

The Tor configuration developed in the following parts belongs to the version 2 onion-service era. Current Tor still uses the general `HiddenServiceDir` and `HiddenServicePort` concept, but it creates v3 services and uses a different key format. See Part 1 for the archive warning.

We need to tell Apache to listen for Tor traffic:

`sudo nano /etc/apache2/ports.conf`

Add the following. If you only want onion websites, comment out `Listen 80` by adding `#` at the front, or remove it. For one onion site, keep `Listen 127.0.0.1:9070` and comment out `Listen 127.0.0.1:9071`. For additional sites, add more loopback listeners and use the same port numbers in the later Tor mappings.

~~~text
# Listen for clearnet and onion websites
Listen 80
Listen 127.0.0.1:9070
Listen 127.0.0.1:9071
~~~

Save and exit, Ctrl-O (Writeout) and Ctrl-X (Exit).

### Sources for Part 8

- [Apache HTTP Server 2.4 - Binding to Addresses and Ports](https://httpd.apache.org/docs/2.4/bind.html)
- [Tor Project - Set up Your Onion Service](https://community.torproject.org/onion-services/setup/)

</details>

<details id="part-9" class="about-panel panel--teal" name="mcretro-darknet" markdown="1">
<summary markdown="span"><img src="/assets/images/about/siren.gif" alt="" width="16" height="16" /> 09. Configuring Apache</summary>

**Historical reconstruction note:** The `VirtualHost`, `Directory` and `IfModule` boundaries were recovered from a 24th August 2019 capture of this post. That copy contains damaged `Directory` paths and typographic quotation marks. I've reconstructed the three intended filesystem paths (`/var/www`, `/var/www/blog` and `/var/www/files/public`) and restored ordinary quotation marks in the examples below. These corrections reflect the apparent intent of the original configuration, not an independently verified copy of what ran in 2016. Other historical details, including the missing HTTPS certificate-issuance step in Part 11, remain unverified. Treat the examples as an archive of the setup, not as tested, paste-ready Apache or security instructions.

First up, here's a cool add-on to limit bandwidth and connections for people visiting your website. Great if you have finite bandwidth on the upstream! Installing it was optional in this setup. The settings are in the `IfModule mod_bw.c` section below: `LargeFileLimit * 1 7200` applies a 7200 bytes-per-second limit (57.6 kbit/s) to files at least 1 kilobyte in size, not 1 byte. `MaxConnection all 20` limits concurrent connections for the matching origin collectively, rather than allowing 20 per visitor. At the time I couldn't remember what `Bandwidth all` did... it sets the available bandwidth for the matching origin, in bytes per second. Install with the following command.

`sudo apt-get install libapache2-mod-bw -y`

Next we want to remove both default settings for Apache as they will just get in the way otherwise. We are removing the http and https (ssl) settings.

~~~sh
sudo rm /etc/apache2/sites-available/000-default.conf

sudo rm /etc/apache2/sites-available/default-ssl.conf
~~~

The `sites-enabled` and `sites-available` directories are tied together by symlinks, or some sort of Debian voodoo if you prefer. `a2ensite` creates the enabled links back to the available configuration files, so editing through a link reaches the same file.

We want to create a single configuration with both http and https settings to keep things tidy. I've used tim as the name, but you should use something easier to remember.

`sudo nano /etc/apache2/sites-available/tim.conf` If you have a clearnet website (http) copy the following into your configuration file. Anywhere you see "tim" change it to whatever is more appropriate for your configuration (such as the ServerAdmin setting). You'll note that http uses port 80 at the very top of the VirtualHost setting.

These configurations allow for a blog at website.net/blog, omit that part if you don't want to have a blog separate from your html files. Wordpress likes to be in the root (/var/www/) but can be placed in a subdirectory if you so please. We are directing the 404 page not found to /404/ which is where you can pop in an index.html or .index.php to customise your 404 not found page.

Additionally, we have the bandwidth limiter, if you don't want this exclude the "IfModule mod\_bw.c" section.

The `/var/www/files/public` section below is an HTTP file area, using Apache authentication and directory indexing. It is not an FTP server; that would need separate server software. Omit the corresponding directory configuration if you don't want the file area.

~~~apache
<virtualhost *:80>
ServerName http://tim.net
ServerAdmin webmaster@tim.net
DocumentRoot /var/www
ErrorDocument 404 /404/
<Directory /var/www>
Options -Indexes +FollowSymLinks
AllowOverride None
Require all granted
</Directory>
<Directory /var/www/blog>
AllowOverride All
</Directory>
<Directory /var/www/files/public>
Options +FollowSymLinks +Multiviews +Indexes
AllowOverride None
AuthType basic
AuthName "tim File Server"
AuthUserFile /etc/htpasswd/.htpasswd
Require valid-user
</Directory>
<ifmodule mod_bw.c>
BandwidthModule On
ForceBandWidthModule On
Bandwidth all "52428800"
MaxConnection all "20"
LargeFileLimit * 1 7200
BandWidthError 510
</ifmodule>
</virtualhost>
~~~

If you have a clearnet website that uses ssl (https) copy the following into your configuration file. You can have multiple "VirtualHost" entries in your configuration file which makes Apache so great! Note the locations /etc/ssl/certs/ and /etc/ssl/private/ we'll deal with these later on and for now, will prevent Apache from starting correctly. Also, note that ssl (https) uses port 443.

~~~apache
<virtualhost *:443>
ServerName https://tim.net
ServerAdmin webmaster@tim.net
DocumentRoot /var/www
ErrorDocument 404 /404/
SSLEngine on
SSLCertificateFile /etc/ssl/certs/tim.crt
SSLCertificateKeyFile /etc/ssl/private/tim.key
<Directory /var/www>
Options -Indexes +FollowSymLinks
AllowOverride None
Require all granted
</Directory>
<Directory /var/www/blog>
AllowOverride All
</Directory>
<Directory /var/www/files/public>
Options +FollowSymLinks +Multiviews +Indexes
AllowOverride None
AuthType basic
AuthName "tim File Server"
AuthUserFile /etc/htpasswd/.htpasswd
Require valid-user
</Directory>
<ifmodule mod_bw.c>
BandwidthModule On
ForceBandWidthModule On
Bandwidth all "52428800"
MaxConnection all "20"
LargeFileLimit * 1 7200
BandWidthError 510
</ifmodule>
</virtualhost>
~~~

Now here comes the darknet side of things. The virtual host uses `127.0.0.1:9070`, paired with the loopback-only `Listen` setting in Part 8; the `VirtualHost` entry alone does not control which addresses Apache listens on. Tor forwards the onion request to Apache locally, so Apache sees that local connection rather than the visitor's IP address. Cool right?

If setting up multiple darknet sites from the one server, just add the below multiple times, changing the "VirtualHost" port to 9071, 9072, etc. You'll need to change the "ServerName" below also, and if you are merely mirroring your darknet site to multiple darknet addresses, leave the "DocumentRoot" the same. However if you want different content on each darknet website, change it to something you can remember like "DocumentRoot /var/www/site1", "DocumentRoot /var/www/site2". This will point Apache to these locations that we will soon be able to access via Samba.

~~~apache
<virtualhost 127.0.0.1:9070>
ServerName http://tim35qepy5cy.onion/
ServerAdmin webmaster@tim.net
DocumentRoot /var/www
ErrorDocument 404 /404/
<Directory /var/www>
Options -Indexes +FollowSymLinks
AllowOverride None
Require all granted
</Directory>
<Directory /var/www/blog>
AllowOverride All
</Directory>
<Directory /var/www/files/public>
Options +FollowSymLinks +Multiviews +Indexes
AllowOverride None
AuthType basic
AuthName "tim File Server"
AuthUserFile /etc/htpasswd/.htpasswd
Require valid-user
</Directory>
<ifmodule mod_bw.c>
BandwidthModule On
ForceBandWidthModule On
Bandwidth all "52428800"
MaxConnection all "20"
LargeFileLimit * 1 7200
BandWidthError 510
</ifmodule>
</virtualhost>
~~~

When done, save and exit, Ctrl-O (Writeout) and Ctrl-X (Exit)

Now we need to tell Apache what we have done.

Change your directory `cd /etc/apache2/sites-available/` a2ensite = Apache2 Enable Site. We want our new configuration enabled. `sudo a2ensite tim.conf`

a2dissite = Apache2 Disable Site. Disabling the already deleted configurations.

~~~sh
sudo a2dissite 000-default.conf

sudo a2dissite default-ssl.conf
~~~

a2enmod = Apache2 Enable Mod. We want to enable ssl (if using https). If not you could leave this disabled. `sudo a2enmod ssl`

And we want to enable rewrite which allows pretty permalinks on blogging software (like WordPress and FlatPress, probably others too).

`sudo a2enmod rewrite`

Finally, let's give Apache2 a little restart to acknowledge our changes. It should definitely fail if you enabled SSL as we haven't configured those certificate locations mentioned at the start of this section. `sudo service apache2 restart`

If you are wanting a password protected file server and have entered the settings into the Apache2 configuration as above. Let's make a new directory. `sudo mkdir /etc/htpasswd`

And inside that we will create a password file. Change "USERNAME" to the username you want; creating the file under `/etc/htpasswd/` also requires permission to write there. The command recorded in the guide was:

`htpasswd -c /etc/htpasswd/.htpasswd USERNAME`

It will then prompt you for a password. I originally suggested `guest`/`guest`, which is an example login rather than protection for private files. HTTP Basic authentication also needs TLS to protect the credentials on a clearnet connection.

I also experimented with changing PHP's default character set from UTF-8 to ISO-8859-1 because I was deliberately targeting ancient browsers such as Netscape 3. That was a backwards-compatibility experiment; UTF-8 remains the general choice for modern content unless there is a specific legacy reason to use something else.

Historical command:

`sudo nano /etc/php5/apache2/php.ini`

Change:

`default_charset = "UTF-8"`

to:

`default_charset = "ISO-8859-1"`

Once that is done we are onto the next part.

### Sources for Part 9

- [McRetro - Take Back the Darknet, Part 9 (24th August 2019 capture)](https://web.archive.org/web/20190824000515/https://mcretro.net/take-back-the-darknet-part-9/)
- [Debian Jessie - mod_bw 0.92-11 documentation](https://sources.debian.org/src/libapache2-mod-bw/0.92-11/mod_bw.txt/)
- [Apache HTTP Server 2.4 - Core Features](https://httpd.apache.org/docs/2.4/mod/core.html)
- [Apache HTTP Server 2.4 - Binding to Addresses and Ports](https://httpd.apache.org/docs/2.4/bind.html)
- [Apache HTTP Server 2.4 - Authentication and Authorization](https://httpd.apache.org/docs/2.4/howto/auth.html)
- [Debian Jessie - a2ensite(8)](https://manpages.debian.org/jessie/apache2/a2ensite.8.en.html)
- [W3C - Choosing and applying a character encoding](https://www.w3.org/International/questions/qa-choosing-encodings)

</details>

<details id="part-10" class="about-panel panel--teal" name="mcretro-darknet" markdown="1">
<summary markdown="span"><img src="/assets/images/about/siren.gif" alt="" width="16" height="16" /> 10. Configuring Tor</summary>

Stop the Tor service from running while we tinker. `sudo service tor stop`

Remove the default configuration file. `sudo rm /etc/tor/torrc`

Fire up Nano and make a new configuration file. `sudo nano /etc/tor/torrc`

Enter the following. If only using one website, don't enter the second "HiddenServiceDir" or "HiddenServicePort". The "/var/lib/tor/" is where your hidden key goes. This is NOT readable by the general internet. It is also not where your website goes. Remember we configured /var/www/ for that. More on that later.

~~~text
SocksPort 0

SocksListenAddress 127.0.0.1

RunAsDaemon 1

DataDirectory /var/lib/tor

HiddenServiceDir /var/lib/tor/website1/

HiddenServicePort 80 127.0.0.1:9070

HiddenServiceDir /var/lib/tor/website2/

HiddenServicePort 80 127.0.0.1:9071
~~~

When done, save and exit, Ctrl-O (Writeout) and Ctrl-X (Exit), then start Tor. I allowed two or three minutes in this setup; startup time can vary. No progress bar here, use a stopwatch? Maybe!

`sudo service tor start`

Once two or three minutes have passed, reboot! `sudo reboot`

**Historical compatibility note:** The `private_key` replacement steps below belong to v2 onion services, which Tor retired in 2021. Modern v3 services use different key files, so these commands do not apply to them. Keep service keys secret: someone who obtains them can impersonate the service.

Tor generates the normal service keys when it first starts with the service configuration. The replacement commands below were for a generated vanity key, which we haven't covered yet; that experiment comes in Part 13.

~~~sh
sudo service tor stop

sudo rm /var/lib/tor/website1/private_key

sudo nano /var/lib/tor/website1/private_key

sudo chown -R debian-tor:debian-tor /var/lib/tor/website1/

sudo chmod -R 700 /var/lib/tor/website1/
~~~

~~~sh
sudo rm /var/lib/tor/website2/private_key

sudo nano /var/lib/tor/website2/private_key

sudo chown -R debian-tor:debian-tor /var/lib/tor/website2/

sudo chmod -R 700 /var/lib/tor/website2/
~~~

Now to deal with SSL keys (if you are going down the HTTPS / SSL path).

### Sources for Part 10

- [McRetro - Take Back the Darknet, Part 10 (24th August 2019 capture)](https://web.archive.org/web/20190824013219/https://mcretro.net/take-back-the-darknet-part-10/)
- [Debian Jessie - tor(1)](https://manpages.debian.org/jessie/tor/tor.1.en.html)
- [Tor Project - Onion Service version 2 deprecation timeline](https://blog.torproject.org/v2-deprecation-timeline/)
- [Tor Project - Set up Your Onion Service](https://community.torproject.org/onion-services/setup/)

</details>

<details id="part-11" class="about-panel panel--teal" name="mcretro-darknet" markdown="1">
<summary markdown="span"><img src="/assets/images/about/siren.gif" alt="" width="16" height="16" /> 11. Configuring HTTPS (SSL)</summary>

This was the HTTPS route I was experimenting with in January 2016: OpenSSL created a private key and certificate-signing request, with CAcert intended as the certificate authority. The walkthrough I was following is preserved [here](https://samhobbs.co.uk/2014/04/ssl-certificate-signing-cacert-raspberry-pi-ubuntu-debian).

The surviving instructions create `tim.key` and `tim.csr`, but omit the step that produces the `tim.crt` used later. CAcert's root was also not automatically trusted by mainstream browsers; clients needed to trust it separately. Let's Encrypt had entered public beta on 3rd December 2015, just before this article, offering another historical route to publicly trusted certificates.

The command line breaks below have been restored from a 24th August 2019 capture, but that copy has the same certificate-issuance gap. This remains an incomplete record of the experiment, rather than current HTTPS deployment instructions.

You'll need three things in the intended workflow: a `.csr` certificate signing request, a `.crt` signed certificate file and a `.key` private key file.

~~~sh
cd ~

openssl genrsa -out tim.key 4096

openssl req -new -key tim.key -out tim.csr
~~~

The signing-request command asks for these details:

~~~text
Country Name (Two letter code e.g. AU)

State or Province Name (e.g. NSW)

Locality Name (e.g. Sydney)

Organisational Name (e.g. Tim's Website)

Organisational Unit Name (e.g. Website)

Common Name (Domain name *.tim.net or tim.net)

Email Address (e.g. webmaster@tim.net)
~~~

~~~sh
cd ~

wget http://www.cacert.org/certs/root.txt

sudo cp root.txt /etc/ssl/certs/cacert-root.crt
~~~

~~~sh
sudo mv tim.key /etc/ssl/private/tim.key

sudo mv tim.crt /etc/ssl/certs/tim.crt
~~~

~~~sh
sudo chown root:root /etc/ssl/private/tim.key

sudo chmod 600 /etc/ssl/private/tim.key
~~~

~~~sh
sudo chown root:root /etc/ssl/certs/tim.crt

sudo chmod 644 /etc/ssl/certs/tim.crt
~~~

### Sources for Part 11

- [McRetro - Take Back the Darknet, Part 11 (24th August 2019 capture)](https://web.archive.org/web/20190824013202/https://mcretro.net/take-back-the-darknet-part-11/)
- [Sam Hobbs - SSL certificate signing with CAcert](https://samhobbs.co.uk/2014/04/ssl-certificate-signing-cacert-raspberry-pi-ubuntu-debian)
- [CAcert - Browser Client / Root Certificate Trust Information](https://web.archive.org/web/20151230164623/http://wiki.cacert.org/FAQ/BrowserClients)
- [Let's Encrypt - Entering Public Beta, 3rd December 2015](https://letsencrypt.org/2015/12/03/entering-public-beta)

</details>

<details id="part-12" class="about-panel panel--teal" name="mcretro-darknet" markdown="1">
<summary markdown="span"><img src="/assets/images/about/siren.gif" alt="" width="16" height="16" /> 12. Preparing Website Directories</summary>

For multiple onion services in this historical setup, this is where I prepared separate web-root directories. If you are only using `/var/www/`, adjust the paths accordingly.

~~~sh
cd /var/www/

sudo mkdir website1

sudo chown -R www-data /var/www/website1/

sudo chgrp -R www-data /var/www/website1/
~~~

~~~sh
cd /var/www/

sudo mkdir website2

sudo chown -R www-data /var/www/website2/

sudo chgrp -R www-data /var/www/website2/
~~~

Start Tor. I allowed two or three minutes for it in this setup; the time can vary.

`sudo service tor start`

Restart Apache and Tor to pick up the configuration changes:

`sudo service apache2 restart && sudo service tor restart`

And one big reboot of the entire system for the heck of it. `sudo reboot`

Next we get to the vanity onion-address experiment and then finally test the site.

### Sources for Part 12

- [McRetro - Take Back the Darknet, Part 12 (18th July 2019 capture)](https://web.archive.org/web/20190718115515/https://mcretro.net/take-back-the-darknet-part-12/)

</details>

<details id="part-13" class="about-panel panel--teal" name="mcretro-darknet" markdown="1">
<summary markdown="span"><img src="/assets/images/about/siren.gif" alt="" width="16" height="16" /> 13. Generating a Vanity Onion Address</summary>

Back in 2016 I used [**Shallot**](https://web.archive.org/web/20150916172316/https://github.com/katmagic/Shallot) to generate a vanity onion address and its corresponding private key.

Shallot belongs to the old v2 onion-service era: its addresses had 16 characters before .onion, and Tor retired v2 services in 2021. Modern v3 addresses have 56 characters before .onion and require different tooling, so a Shallot-generated v2 key cannot be used for a current onion service.

### Sources for Part 13

- [Tor Project - Onion Service version 2 deprecation timeline](https://blog.torproject.org/v2-deprecation-timeline/)
- [Tor Project - Vanity Addresses](https://community.torproject.org/onion-services/advanced/vanity-addresses/)

### Related Posts for Part 13

- [Generating Vanity Onion Addresses with Shallot](/generating-vanity-onion-addresses-with-shallot/)

</details>

<details id="part-14" class="about-panel panel--teal" name="mcretro-darknet" markdown="1">
<summary markdown="span"><img src="/assets/images/about/siren.gif" alt="" width="16" height="16" /> 14. Testing the Waters</summary>

Time to get some content onto the web server. In this setup I could use the Samba share configured earlier or create files directly from the terminal. Type anything you want into Notepad, TextEdit, Nano or another text editor, save it as `index.html` and place it in the website directory.

To see the onion address generated for this historical service:

`sudo cat /var/lib/tor/website1/hostname`

The next step was to open that address in Tor Browser and look for the test page. The address generated by this 2016 setup was a v2 onion address; those no longer work on the modern Tor network.

**Credits**

All this would not have been possible without the following websites:

- [Sam Hobbs](https://samhobbs.co.uk/2014/04/ssl-certificate-signing-cacert-raspberry-pi-ubuntu-debian)
- [Shallot](https://web.archive.org/web/20150916172316/https://github.com/katmagic/Shallot)

### Sources for Part 14

- [Tor Project - Onion Services](https://community.torproject.org/onion-services/)
- [Tor Project - Onion Service version 2 deprecation timeline](https://blog.torproject.org/v2-deprecation-timeline/)

That's all there is! I hope this helped you out! :)

This documents the v2 onion-service setup I used in 2016. The address format and several parts of the software stack are obsolete now.

</details>

<script src="/assets/js/darknet-accordion.js" defer></script>
{% include exclusive-panel-visibility.html %}

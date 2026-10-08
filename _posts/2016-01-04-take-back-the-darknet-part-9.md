---
title: "Take Back the Darknet (Part 9)"
author: "Nix McRetro"
date: 2016-01-04T23:36:15.000+11:00
last_modified_at: 2026-10-08
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-08
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [guides, raspberry-pi]
---

**Part 9 - Configuring Apache**

**Archive note:** This page documents the January 2016 Raspbian Jessie setup. Read the compatibility and security warning in [Part 1](/take-back-the-darknet-part-1/) before using any of these commands on a current system.

**Formatting warning:** The `VirtualHost`, `Directory` and `IfModule` boundaries below have been recovered from a 24 August 2019 capture of this post. That copy already has malformed `Directory` arguments and smart quotes in the HTTPS and onion configurations. Those defects remain unresolved, so these are incomplete historical fragments, not paste-ready Apache configuration.

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
<directory var www>
Options -Indexes +FollowSymLinks
AllowOverride None
Require all granted
</directory>
<directory var www blog>
AllowOverride All
</directory>
<directory var www files public>
Options +FollowSymLinks +Multiviews +Indexes
AllowOverride None
AuthType basic
AuthName "tim File Server"
AuthUserFile /etc/htpasswd/.htpasswd
Require valid-user
</directory>
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
<directory var www>
Options -Indexes +FollowSymLinks
AllowOverride None
Require all granted
</directory>
<directory var www blog>
AllowOverride All
</directory>
<directory var www files public>
Options +FollowSymLinks +Multiviews +Indexes
AllowOverride None
AuthType basic
AuthName ”tim File Server”
AuthUserFile /etc/htpasswd/.htpasswd
Require valid-user
</directory>
<ifmodule mod_bw.c>
BandwidthModule On
ForceBandWidthModule On
Bandwidth all ”52428800”
MaxConnection all ”20”
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
<directory var www>
Options -Indexes +FollowSymLinks
AllowOverride None
Require all granted
</directory>
<directory var www blog>
AllowOverride All
</directory>
<directory var www files public>
Options +FollowSymLinks +Multiviews +Indexes
AllowOverride None
AuthType basic
AuthName ”tim File Server”
AuthUserFile /etc/htpasswd/.htpasswd
Require valid-user
</directory>
<ifmodule mod_bw.c>
BandwidthModule On
ForceBandWidthModule On
Bandwidth all ”52428800”
MaxConnection all ”20”
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

### Sources

- [McRetro - Take Back the Darknet, Part 9 (24 August 2019 capture)](https://web.archive.org/web/20190824000515/https://mcretro.net/take-back-the-darknet-part-9/)
- [Debian Jessie - mod_bw 0.92-11 documentation](https://sources.debian.org/src/libapache2-mod-bw/0.92-11/mod_bw.txt/)
- [Apache HTTP Server 2.4 - Core Features](https://httpd.apache.org/docs/2.4/mod/core.html)
- [Apache HTTP Server 2.4 - Binding to Addresses and Ports](https://httpd.apache.org/docs/2.4/bind.html)
- [Apache HTTP Server 2.4 - Authentication and Authorization](https://httpd.apache.org/docs/2.4/howto/auth.html)
- [Debian Jessie - a2ensite(8)](https://manpages.debian.org/jessie/apache2/a2ensite.8.en.html)
- [W3C - Choosing and applying a character encoding](https://www.w3.org/International/questions/qa-choosing-encodings)

Advance onward to [part 10](/take-back-the-darknet-part-10/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

---
title: "Take Back the Darknet (Part 9)"
author: "Nix McRetro"
date: 2016-01-04T23:36:15.000+11:00
categories: [guides, raspberry-pi]
---

**Part 9 - Configuring Apache**

First up, here's a cool add-on to limit speed and amount of connections of the people visiting your website. Great if you have finite bandwidth on the upstream. Its specific settings can be found in the tim.conf config below under "IfModule mod\_bw.c". Installing this is optional but recommended. The settings below limit "\*" (all files) that are over "1" byte in size to "7200" (~56.6kbps) a second. You can also limit the number of inbound connections via the "MaxConnection" setting and the "Bandwidth all" setting does something... but alas I cannot remember! Install with the following command.

`sudo apt-get install libapache2-mod-bw -y`

Next we want to remove both default settings for Apache as they will just get in the way otherwise. We are removing the http and https (ssl) settings. `sudo rm /etc/apache2/sites-available/000-default.conf sudo rm /etc/apache2/sites-available/default-ssl.conf`

The sites-enabled and site-available are linked together by symlinks or some sort of voodoo so editing one results in both changing. We want to create a single configuration with both http and https settings to keep things tidy. I've used tim as the name, but you should use something easier to remember.

`sudo nano /etc/apache2/sites-available/tim.conf` If you have a clearnet website (http) copy the following into your configuration file. Anywhere you see "tim" change it to whatever is more appropriate for your configuration (such as the ServerAdmin setting). You'll note that http uses port 80 at the very top of the VirtualHost setting.

These configurations allow for a blog at website.net/blog, omit that part if you don't want to have a blog separate from your html files. Wordpress likes to be in the root (/var/www/) but can be placed in a subdirectory if you so please. We are directing the 404 page not found to /404/ which is where you can pop in an index.html or .index.php to customise your 404 not found page.

Additionally, we have the bandwidth limiter, if you don't want this exclude the "IfModule mod\_bw.c" section.

Even more additionally is the FTP server which can be setup using the "Directory /var/www/files/public" section, alternatively, you can omit this if you are just wanting a basic website.

`ServerName http://tim.net ServerAdmin webmaster@tim.net DocumentRoot /var/www ErrorDocument 404 /404/  Options -Indexes +FollowSymLinks AllowOverride None Require all granted  AllowOverride All  Options +FollowSymLinks +Multiviews +Indexes AllowOverride None AuthType basic AuthName "tim File Server" AuthUserFile /etc/htpasswd/.htpasswd Require valid-user BandwidthModule On ForceBandWidthModule On Bandwidth all "52428800" MaxConnection all "20" LargeFileLimit * 1 7200 BandWidthError 510`

If you have a clearnet website that uses ssl (https) copy the following into your configuration file. You can have multiple "VirtualHost" entries in your configuration file which makes Apache so great! Note the locations /etc/ssl/certs/ and /etc/ssl/private/ we'll deal with these later on and for now, will prevent Apache from starting correctly. Also, note that ssl (https) uses port 443.

`ServerName https://tim.net ServerAdmin webmaster@tim.net DocumentRoot /var/www ErrorDocument 404 /404/ SSLEngine on SSLCertificateFile /etc/ssl/certs/tim.crt SSLCertificateKeyFile /etc/ssl/private/tim.key Options -Indexes +FollowSymLinks AllowOverride None Require all granted AllowOverride All Options +FollowSymLinks +Multiviews +Indexes AllowOverride None AuthType basic AuthName ”tim File Server” AuthUserFile /etc/htpasswd/.htpasswd Require valid-user BandwidthModule On ForceBandWidthModule On Bandwidth all ”52428800” MaxConnection all ”20” LargeFileLimit * 1 7200 BandWidthError 510`

Now here comes the darknet side of things. You'll see that it uses localhost (127.0.0.1) as the host, meaning it will only accept connections from localhost, instead of \* as above. This means the server doesn't know the actual IP address of those connecting when accessing the darknet side. Cool right?

If setting up multiple darknet sites from the one server, just add the below multiple times, changing the "VirtualHost" port to 9071, 9072, etc. You'll need to change the "ServerName" below also, and if you are merely mirroring your darknet site to multiple darknet addresses, leave the "DocumentRoot" the same. However if you want different content on each darknet website, change it to something you can remember like "DocumentRoot /var/www/site1", "DocumentRoot /var/www/site2". This will point Apache to these locations that we will soon be able to access via Samba.

`ServerName http://tim35qepy5cy.onion/ ServerAdmin webmaster@tim.net DocumentRoot /var/www ErrorDocument 404 /404/ Options -Indexes +FollowSymLinks AllowOverride None Require all granted AllowOverride All Options +FollowSymLinks +Multiviews +Indexes AllowOverride None AuthType basic AuthName ”tim File Server” AuthUserFile /etc/htpasswd/.htpasswd Require valid-user BandwidthModule On ForceBandWidthModule On Bandwidth all ”52428800” MaxConnection all ”20” LargeFileLimit * 1 7200 BandWidthError 510`

When done, save and exit, Ctrl-O (Writeout) and Ctrl-X (Exit)

Now we need to tell Apache what we have done.

Change your directory `cd /etc/apache2/sites-available/` a2ensite = Apache2 Enable Site. We want our new configuration enabled. `sudo a2ensite tim.conf`

a2dissite = Apache2 Disable Site. Disabling the already deleted configurations. `sudo a2dissite 000-default.conf sudo a2dissite default-ssl.conf`

a2enmod = Apache2 Enable Mod. We want to enable ssl (if using https). If not you could leave this disabled. `sudo a2enmod ssl`

And we want to enable rewrite which allows pretty permalinks on blogging software (like WordPress and FlatPress, probably others too).

`sudo a2enmod rewrite`

Finally, let's give Apache2 a little restart to acknowledge our changes. It should definitely fail if you enabled SSL as we haven't configured those certificate locations mentioned at the start of this section. `sudo service apache2 restart`

If you are wanting a password protected file server and have entered the settings into the Apache2 configuration as above. Let's make a new directory. `sudo mkdir /etc/htpasswd`

And inside that we will create a password file, change "USERNAME" to what you want the username to be. It can be anything you want. `htpasswd -c /etc/htpasswd/.htpasswd USERNAME`

It will then prompt you for a password, make a password and you are away. You might just use guest, guest but it's entirely up to you. I guess I'll slap this in here as well if you are looking to create a highly backward compatible website you'll probably want to disable UTF-8 and enable ISO-8859-1 for font formatting. Extremely optional if you aren't wanting to have a good looking website on say, Netscape 3. But not so much for modern websites! Completely optional! `sudo nano /etc/php5/apache2/php.ini`

Change `default_charset = “UTF-8“` to `default_charset = "ISO-8859-1"`

Once that is done we are onto the next part.

Advance onward to [part 10](/take-back-the-darknet-part-10/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

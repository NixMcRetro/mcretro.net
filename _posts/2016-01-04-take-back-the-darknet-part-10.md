---
title: "Take Back the Darknet (Part 10)"
author: "Nix McRetro"
date: 2016-01-04T23:37:16.000+11:00
categories: [guides, raspberry-pi]
---

**Part 10 - Configuring Tor** Stop the Tor service from running while we tinker. `sudo service tor stop`

Remove the default configuration file. `sudo rm /etc/tor/torrc`

Fire up Nano and make a new configuration file. `sudo nano /etc/tor/torrc`

Enter the following. If only using one website, don't enter the second "HiddenServiceDir" or "HiddenServicePort". The "/var/lib/tor/" is where your hidden key goes. This is NOT readable by the general internet. It is also not where your website goes. Remember we configured /var/www/ for that. More on that later.

`SocksPort 0 SocksListenAddress 127.0.0.1 RunAsDaemon 1 DataDirectory /var/lib/tor HiddenServiceDir /var/lib/tor/website1/ HiddenServicePort 80 127.0.0.1:9070  HiddenServiceDir /var/lib/tor/website2/ HiddenServicePort 80 127.0.0.1:9071`

When done, save and exit, Ctrl-O (Writeout) and Ctrl-X (Exit). Start Tor up, this takes about two or three minutes and has no progress bar, use a stopwatch? Maybe! `sudo service tor start`

Once two or three minutes have passed, reboot! `sudo reboot`

Enter your generated key. We haven't done this yet, so tor will generate one for us. `sudo service tor stop sudo rm /var/lib/tor/website1/private_key sudo nano /var/lib/tor/website1/private_key sudo chown -R debian-tor:debian-tor /var/lib/tor/website1/ sudo chmod -R 700 /var/lib/tor/website1/`

`sudo rm /var/lib/tor/website2/private_key sudo nano /var/lib/tor/website2/private_key sudo chown -R debian-tor:debian-tor /var/lib/tor/website2/ sudo chmod -R 700 /var/lib/tor/website2/`

Now to deal with SSL keys (if you are going down the HTTPS / SSL path).

Advance onward to [part 11](/take-back-the-darknet-part-11/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

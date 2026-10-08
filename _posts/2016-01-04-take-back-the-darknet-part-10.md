---
title: "Take Back the Darknet (Part 10)"
author: "Nix McRetro"
date: 2016-01-04T23:37:16.000+11:00
last_modified_at: 2026-10-08
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-08
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [guides, raspberry-pi]
---

**Part 10 - Configuring Tor**

**Archive note:** This page documents the January 2016 Raspbian Jessie setup. Read the compatibility and security warning in [Part 1](/take-back-the-darknet-part-1/) before using any of these commands on a current system.

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

### Sources

- [McRetro - Take Back the Darknet, Part 10 (24 August 2019 capture)](https://web.archive.org/web/20190824013219/https://mcretro.net/take-back-the-darknet-part-10/)
- [Debian Jessie - tor(1)](https://manpages.debian.org/jessie/tor/tor.1.en.html)
- [Tor Project - Onion Service version 2 deprecation timeline](https://blog.torproject.org/v2-deprecation-timeline/)
- [Tor Project - Set up Your Onion Service](https://community.torproject.org/onion-services/setup/)

Advance onward to [part 11](/take-back-the-darknet-part-11/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

---
title: "Take Back the Darknet (Part 12)"
author: "Nix McRetro"
date: 2016-01-04T23:39:58.000+11:00
last_modified_at: 2026-10-08
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-08
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [guides, raspberry-pi]
---

**Part 12 - Preparing Website Directories**

**Archive note:** This page documents the January 2016 Raspbian Jessie setup. Read the compatibility and security warning in [Part 1](/take-back-the-darknet-part-1/) before using any of these commands on a current system.

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

### Sources

- [McRetro - Take Back the Darknet, Part 12 (18 July 2019 capture)](https://web.archive.org/web/20190718115515/https://mcretro.net/take-back-the-darknet-part-12/)

Advance onward to [Part 13](/take-back-the-darknet-part-13/) or head back to the table of contents on [Part 1](/take-back-the-darknet-part-1/).

---
title: "Take Back the Darknet (Part 12)"
author: "Nix McRetro"
date: 2016-01-04T23:39:58.000+11:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [guides, raspberry-pi]
---

**Part 12 - Preparing Website Directories**

**Archive note:** This page documents the January 2016 Raspbian Jessie setup. Read the compatibility and security warning in [Part 1](/take-back-the-darknet-part-1/) before using any of these commands on a current system.

If you are running multiple historical onion-service configurations from this setup, this is where I prepared separate web-root directories for them.

If you are only using `/var/www/`, adjust the paths accordingly.

`cd /var/www/ sudo mkdir website1 sudo chown -R www-data /var/www/website1/ sudo chgrp -R www-data /var/www/website1/`

`cd /var/www/ sudo mkdir website2 sudo chown -R www-data /var/www/website2/ sudo chgrp -R www-data /var/www/website2/`

Start Tor and let it sit for two or three minutes.

`sudo service tor start`

Give the apache and tor service a reboot and tor again to be safe. `sudo service apache2 restart && sudo service tor restart`

And one big reboot of the entire system for the heck of it. `sudo reboot`

Next we get to the vanity onion-address experiment and then finally test the site.

Advance onward to [Part 13](/take-back-the-darknet-part-13/) or head back to the table of contents on [Part 1](/take-back-the-darknet-part-1/).

---
title: "Take Back the Darknet (Part 12)"
author: "Nix McRetro"
date: 2016-01-04T23:39:58.000+11:00
categories: [guides, raspberry-pi]
---

**Part 12 - Hardening Tor** If you have multiple websites you can adjust these. If you are just using /var/www/ adjust accordingly.

`cd /var/www/ sudo mkdir website1 sudo chown -R www-data /var/www/website1/ sudo chgrp -R www-data /var/www/website1/`

`cd /var/www/ sudo mkdir website2 sudo chown -R www-data /var/www/website2/ sudo chgrp -R www-data /var/www/website2/`

Run this and let it site for two to three minutes. `sudo service tor start`

Give the apache and tor service a reboot and tor again to be safe. `sudo service apache2 restart && sudo service tor restart`

And one big reboot of the entire system for the heck of it. `sudo reboot`

Next, we get to create a domain name and then a very basic website to make sure everything is working.

Advance onward to [part 13](/take-back-the-darknet-part-13/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

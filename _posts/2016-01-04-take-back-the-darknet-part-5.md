---
title: "Take Back the Darknet (Part 5)"
author: "Nix McRetro"
date: 2016-01-04T22:31:12.000+11:00
categories: [guides, raspberry-pi]
---

**Part 5 - Installing Apache 2.4 HTTP Server** If you are hosting a clearnet website, you will want to make sure ports 80 (http) and 443 (https) are forwarded on your router. One of the wonderful things about the darknet is that it does not require any port forwarding due to the way Tor works.

We'll be using Apache 2.4 as the web server software of choice. Alternatives include Nginx (pronounced "engine x") which can be snappier at dealing with static content but is otherwise on par with Apache 2.4 for dynamic content (such as WordPress, Joomla, Drupal). `sudo apt-get install apache2 -y`

We will also be using PHP alongside the basic HTML support that Apache 2.4 has, so we'll need to run this to install those. `sudo apt-get install php5 libapache2-mod-php5 -y`

Next up we'll install Samba.

Advance onward to [part 6](/take-back-the-darknet-part-6/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

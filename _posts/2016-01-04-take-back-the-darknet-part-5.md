---
title: "Take Back the Darknet (Part 5)"
author: "Nix McRetro"
date: 2016-01-04T22:31:12.000+11:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [guides, raspberry-pi]
---

**Part 5 - Installing Apache 2.4 HTTP Server**

**Archive note:** This page documents the January 2016 Raspbian Jessie setup. Read the compatibility and security warning in [Part 1](/take-back-the-darknet-part-1/) before using any of these commands on a current system.

 If you are hosting a clearnet website, you will want to make sure ports 80 (http) and 443 (https) are forwarded on your router. One of the wonderful things about the darknet is that it does not require any port forwarding due to the way Tor works.

We'll use Apache 2.4 as the web server for this build.

Nginx was another option, but this project used Apache, so Apache is what the rest of the series documents.

`sudo apt-get install apache2 -y`

We will also be using PHP alongside Apache's basic HTML support.

The `php5` and `libapache2-mod-php5` package names below belong to the Jessie-era software stack used in 2016. They are retained here as part of that historical setup rather than as current installation instructions.

`sudo apt-get install php5 libapache2-mod-php5 -y`

Next up we'll install Samba.

Advance onward to [part 6](/take-back-the-darknet-part-6/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

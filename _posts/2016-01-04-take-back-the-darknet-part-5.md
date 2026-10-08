---
title: "Take Back the Darknet (Part 5)"
author: "Nix McRetro"
date: 2016-01-04T22:31:12.000+11:00
last_modified_at: 2026-10-08
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-08
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [guides, raspberry-pi]
---

**Part 5 - Installing Apache 2.4 HTTP Server**

**Archive note:** This page documents the January 2016 Raspbian Jessie setup. Read the compatibility and security warning in [Part 1](/take-back-the-darknet-part-1/) before using any of these commands on a current system.

For a clearnet site hosted behind your home router's NAT, forward TCP port 80 for HTTP and port 443 if you are also serving HTTPS. One of the wonderful things about a Tor onion service is that it does not need inbound router port forwarding: Tor connects out to the network.

We'll use Apache 2.4 as the web server for this build. Nginx was another option, but this project used Apache, so Apache is what the rest of the series documents.

`sudo apt-get install apache2 -y`

We will also be using PHP alongside Apache's basic HTML support. The `php5` and `libapache2-mod-php5` package names below belong to the Jessie-era software stack used in 2016, so they stay as part of this historical setup.

`sudo apt-get install php5 libapache2-mod-php5 -y`

Next up we'll install Samba.

### Sources

- [Apache HTTP Server 2.4 - Binding to Addresses and Ports](https://httpd.apache.org/docs/2.4/bind.html)
- [Tor Project - How do Onion Services work?](https://community.torproject.org/onion-services/overview/)

Advance onward to [part 6](/take-back-the-darknet-part-6/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

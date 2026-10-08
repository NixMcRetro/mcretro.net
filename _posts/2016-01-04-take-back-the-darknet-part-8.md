---
title: "Take Back the Darknet (Part 8)"
author: "Nix McRetro"
date: 2016-01-04T23:34:14.000+11:00
last_modified_at: 2026-10-08
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-08
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [guides, raspberry-pi]
---

**Part 8 - Installing Tor**

**Archive note:** This page documents the January 2016 Raspbian Jessie setup. Read the compatibility and security warning in [Part 1](/take-back-the-darknet-part-1/) before using any of these commands on a current system.

To get Tor up and running we need to install it with the following. `sudo apt-get install tor -y`

And just like that Tor is installed and establishing Tor circuits. `sudo service tor stop`

Let's stop Apache as well. `sudo service apache2 stop`

The Tor configuration developed in the following parts belongs to the version 2 onion-service era. Current Tor still uses the general `HiddenServiceDir` and `HiddenServicePort` concept, but it creates v3 services and uses a different key format. See Part 1 for the archive warning.

We need to tell Apache to listen for Tor traffic:

`sudo nano /etc/apache2/ports.conf`

Add the following. If you only want onion websites, comment out `Listen 80` by adding `#` at the front, or remove it. For one onion site, keep `Listen 127.0.0.1:9070` and comment out `Listen 127.0.0.1:9071`. For additional sites, add more loopback listeners and use the same port numbers in the later Tor mappings.

~~~text
# Listen for clearnet and onion websites
Listen 80
Listen 127.0.0.1:9070
Listen 127.0.0.1:9071
~~~

Save and exit, Ctrl-O (Writeout) and Ctrl-X (Exit).

### Sources

- [Apache HTTP Server 2.4 - Binding to Addresses and Ports](https://httpd.apache.org/docs/2.4/bind.html)
- [Tor Project - Set up Your Onion Service](https://community.torproject.org/onion-services/setup/)

Up next we configure Apache even more! Advance onward to [part 9](/take-back-the-darknet-part-9/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

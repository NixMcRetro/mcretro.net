---
title: "Take Back the Darknet (Part 8)"
author: "Nix McRetro"
date: 2016-01-04T23:34:14.000+11:00
categories: [guides, raspberry-pi]
---

**Part 8 - Installing Tor** To get Tor up and running we need to install it with the following. `sudo apt-get install tor -y`

And just like that Tor is installed and establishing Tor circuits. `sudo service tor stop`

Let's stop Apache as well. `sudo service apache stop`

We need to tell Apache to listen for Tor traffic `sudo nano /etc/apache2/ports.conf`

Add the following. If you just want darknet websites, comment out Listen 80 by adding a # (commenting out) at the front of the line (or delete it). If you are only hosting one darknet website, comment out the second line. If you are adding even more darknet sites, just keep adding "Listen 127.0.0.1:90xx" until you are satisfied you have enough.

`#Listen for clearnet and onion websites Listen 80 Listen 127.0.0.1:9070 Listen 127.0.0.1:9071`

Save and exit, Ctrl-O (Writeout) and Ctrl-X (Exit).

Up next we configure Apache even more! Advance onward to [part 9](/take-back-the-darknet-part-9/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

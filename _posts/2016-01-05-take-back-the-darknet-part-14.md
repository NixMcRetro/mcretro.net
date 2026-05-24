---
title: "Take Back The Darknet (Part 14)"
author: "Nix McRetro"
date: 2016-01-05T02:02:19.000+11:00
categories: [guides, raspberry-pi]
---

**Part 14 - Testing the Waters** Time to get some content up on your web server. You can either fire up Samba or use terminal to create a new website, etc, etc.

Use Notepad, TextEdit, Nano or some other basic text editor pad. Type anything you want into it. Save it as index.html. Drag and drop it onto your Samba share.

Get your darknet website address by running the following. `sudo cat /var/lib/tor/website1/hostname`

Try opening it in the Tor Browser and you should be greeted by your text in index.html.

**Credits** All this wouldn't have been possible without the following websites: [Sam Hobbs](https://samhobbs.co.uk/2014/04/ssl-certificate-signing-cacert-raspberry-pi-ubuntu-debian) [Shallot](https://web.archive.org/web/20230331011246/https://github.com/katmagic/Shallot)

That's all there is! I hope this helped you out! Feel free to head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

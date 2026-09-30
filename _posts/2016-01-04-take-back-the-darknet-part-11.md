---
title: "Take Back the Darknet (Part 11)"
author: "Nix McRetro"
date: 2016-01-04T23:38:16.000+11:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [guides, raspberry-pi]
---

**Part 11 - Configuring HTTPS (SSL)**

**Archive note:** This page documents the January 2016 Raspbian Jessie setup. Read the compatibility and security warning in [Part 1](/take-back-the-darknet-part-1/) before using any of these commands on a current system.

This was the HTTPS route I was experimenting with in January 2016.

The original setup used OpenSSL to create a private key and certificate-signing request, with CAcert intended as the certificate authority. The walkthrough I was following is preserved [here](https://samhobbs.co.uk/2014/04/ssl-certificate-signing-cacert-raspberry-pi-ubuntu-debian).

There are two important archival problems with this article.

First, the surviving instructions create `tim.key` and `tim.csr`, but they do not actually document the complete step that turns the signing request into the `tim.crt` file used later in the commands.

Second, CAcert's root certificate was not automatically trusted by mainstream browsers, so a CAcert-issued certificate was not equivalent to an ordinary publicly trusted browser certificate unless the client separately trusted the CAcert root.

Let's Encrypt had also entered public beta on 3 December 2015, just before this article was written, providing another historical path towards publicly trusted certificates.

The commands below are therefore preserved as an incomplete record of what I was experimenting with, not as current HTTPS deployment instructions.

You'll need three things in the intended workflow: a `.csr` certificate signing request, a `.crt` signed certificate file and a `.key` private key file.

`cd ~ openssl genrsa -out tim.key 4096 openssl req -new -key tim.key -out tim.csr`

`cd ~ wget http://www.cacert.org/certs/root.txt sudo cp root.txt /etc/ssl/certs/cacert-root.crt`

`sudo mv tim.key /etc/ssl/private/tim.key sudo mv tim.crt /etc/ssl/certs/tim.crt`

`sudo chown root:root /etc/ssl/private/tim.key sudo chmod 600 /etc/ssl/private/tim.key`

`sudo chown root:root /etc/ssl/certs/tim.crt sudo chmod 644 /etc/ssl/certs/tim.crt`

`Country Name (Two letter code e.g. AU) State or Province Name (e.g. NSW) Locality Name (e.g. Sydney) Organisational Name (e.g. Tim's Website) Organisational Unit Name (e.g. Website) Common Name (Domain name *.tim.net or tim.net) Email Address (e.g. webmaster@tim.net)`

Advance onward to [part 12](/take-back-the-darknet-part-12/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

### Sources

- [CAcert - Browser Client / Root Certificate Trust Information](https://wiki.cacert.org/FAQ/BrowserClients)
- [Let's Encrypt - Entering Public Beta, 3 December 2015](https://letsencrypt.org/2015/12/03/entering-public-beta)

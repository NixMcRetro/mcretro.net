---
title: "Take Back the Darknet (Part 11)"
author: "Nix McRetro"
date: 2016-01-04T23:38:16.000+11:00
last_modified_at: 2026-10-08
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-08
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [guides, raspberry-pi]
---

**Part 11 - Configuring HTTPS (SSL)**

**Archive note:** This page documents the January 2016 Raspbian Jessie setup. Read the compatibility and security warning in [Part 1](/take-back-the-darknet-part-1/) before using any of these commands on a current system.

This was the HTTPS route I was experimenting with in January 2016: OpenSSL created a private key and certificate-signing request, with CAcert intended as the certificate authority. The walkthrough I was following is preserved [here](https://samhobbs.co.uk/2014/04/ssl-certificate-signing-cacert-raspberry-pi-ubuntu-debian).

The surviving instructions create `tim.key` and `tim.csr`, but omit the step that produces the `tim.crt` used later. CAcert's root was also not automatically trusted by mainstream browsers; clients needed to trust it separately. Let's Encrypt had entered public beta on 3 December 2015, just before this article, offering another historical route to publicly trusted certificates.

The command line breaks below have been restored from a 24 August 2019 capture, but that copy has the same certificate-issuance gap. This remains an incomplete record of the experiment, rather than current HTTPS deployment instructions.

You'll need three things in the intended workflow: a `.csr` certificate signing request, a `.crt` signed certificate file and a `.key` private key file.

~~~sh
cd ~

openssl genrsa -out tim.key 4096

openssl req -new -key tim.key -out tim.csr
~~~

The signing-request command asks for these details:

~~~text
Country Name (Two letter code e.g. AU)

State or Province Name (e.g. NSW)

Locality Name (e.g. Sydney)

Organisational Name (e.g. Tim's Website)

Organisational Unit Name (e.g. Website)

Common Name (Domain name *.tim.net or tim.net)

Email Address (e.g. webmaster@tim.net)
~~~

~~~sh
cd ~

wget http://www.cacert.org/certs/root.txt

sudo cp root.txt /etc/ssl/certs/cacert-root.crt
~~~

~~~sh
sudo mv tim.key /etc/ssl/private/tim.key

sudo mv tim.crt /etc/ssl/certs/tim.crt
~~~

~~~sh
sudo chown root:root /etc/ssl/private/tim.key

sudo chmod 600 /etc/ssl/private/tim.key
~~~

~~~sh
sudo chown root:root /etc/ssl/certs/tim.crt

sudo chmod 644 /etc/ssl/certs/tim.crt
~~~

### Sources

- [McRetro - Take Back the Darknet, Part 11 (24 August 2019 capture)](https://web.archive.org/web/20190824013202/https://mcretro.net/take-back-the-darknet-part-11/)
- [Sam Hobbs - SSL certificate signing with CAcert](https://samhobbs.co.uk/2014/04/ssl-certificate-signing-cacert-raspberry-pi-ubuntu-debian)
- [CAcert - Browser Client / Root Certificate Trust Information](https://web.archive.org/web/20151230164623/http://wiki.cacert.org/FAQ/BrowserClients)
- [Let's Encrypt - Entering Public Beta, 3 December 2015](https://letsencrypt.org/2015/12/03/entering-public-beta)

Advance onward to [part 12](/take-back-the-darknet-part-12/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

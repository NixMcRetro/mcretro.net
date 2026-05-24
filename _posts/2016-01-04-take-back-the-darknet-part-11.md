---
title: "Take Back the Darknet (Part 11)"
author: "Nix McRetro"
date: 2016-01-04T23:38:16.000+11:00
categories: [guides, raspberry-pi]
---

**Part 11 - Configuring HTTPS (SSL)** Generate SSL keys via CAcert.org. Great website for doing this is right [here](https://samhobbs.co.uk/2014/04/ssl-certificate-signing-cacert-raspberry-pi-ubuntu-debian).

You'll need to create three things: .csr for the certificate signing request (CSR) .crt for the signed certificate file .key for the key file

`cd ~ openssl genrsa -out tim.key 4096 openssl req -new -key tim.key -out tim.csr`

`cd ~ wget http://www.cacert.org/certs/root.txt sudo cp root.txt /etc/ssl/certs/cacert-root.crt`

`sudo mv tim.key /etc/ssl/private/tim.key sudo mv tim.crt /etc/ssl/certs/tim.crt`

`sudo chown root:root /etc/ssl/private/tim.key sudo chmod 600 /etc/ssl/private/tim.key`

`sudo chown root:root /etc/ssl/certs/tim.crt sudo chmod 644 /etc/ssl/certs/tim.crt`

`Country Name (Two letter code e.g. AU) State or Province Name (e.g. NSW) Locality Name (e.g. Sydney) Organisational Name (e.g. Tim's Website) Organisational Unit Name (e.g. Website) Common Name (Domain name *.tim.net or tim.net) Email Address (e.g. webmaster@tim.net)`

Advance onward to [part 12](/take-back-the-darknet-part-12/) or head back to the table of contents on [page 1](/take-back-the-darknet-part-1/).

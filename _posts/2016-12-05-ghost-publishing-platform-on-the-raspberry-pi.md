---
title: "Ghost Publishing Platform on the Raspberry Pi"
author: "Nix McRetro"
date: 2016-12-05T17:48:59.000+11:00
categories: [guides, linux, raspberry-pi]
---

![ghost-logo-svg](/assets/images/2016/img_0594.jpg)

I decided to have a look around for an alternative to WordPress. I must admit I do have a tendency to do this from time to time. Anyway, enter [Ghost](https://ghost.org). No php, just pure js built for the new world order. Anyway, get your Raspberry Pi up and running with Raspbian Jessie and then plug in the following commands - you can check through the [here](https://nodejs.org/dist/latest-argon/) for the latest v4 (Argon) nodejs. That is currently the best supported version Ghost recommends.

```
cd ~
wget http://nodejs.org/dist/latest-argon/node-v4.6.2.tar.gz
tar -xzf node node-v4.6.2.tar.gz
cd node-v4.6.2
./configure
make
sudo make install
node -v
```

```
cd ~
curl -L https://ghost.org/zip/ghost-latest.zip -o ghost.zip
sudo unzip -uo ghost.zip -d /var/www/[your-web-site]
cd /var/www/[your-web-site]
sudo npm install --unsafe-perm --production
sudo nano config.js

Under production
        url: 'http://[your-webserver-address]',

Under server
            host: '0.0.0.0',
            port: '80'

sudo npm start --production
```

Visit http://\[your-webserver-address\]/ghost and you'll be firing on all cylinders!

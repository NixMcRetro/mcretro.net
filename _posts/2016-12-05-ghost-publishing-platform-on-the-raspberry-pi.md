---
title: "Ghost Publishing Platform on the Raspberry Pi"
author: "Nix McRetro"
date: 2016-12-05T17:48:59.000+11:00
categories: [guides, linux, raspberry-pi]
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
---

![ghost-logo-svg](/assets/images/2016/img_0594.jpg)

I decided to have a look around for an alternative to WordPress. I must admit I do have a tendency to do this from time to time. Anyway, enter [Ghost](https://ghost.org). No PHP, just JavaScript built for the new world order.

**Historical installation notes:** This is the Ghost installation process I was experimenting with in December 2016. It uses Raspbian Jessie, Node.js 4 and the pre-Ghost-CLI installation method, so it should not be treated as a current installation guide. I have left the old commands here as part of the record rather than trying to modernise them in place.

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

One command in my original notes, `tar -xzf node node-v4.6.2.tar.gz`, appears malformed. I no longer have enough evidence here to reconstruct exactly what I typed successfully in 2016, so this block should not be treated as paste-ready.

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


### Sources

- [Ghost - How to reinstall Ghost](https://ghost.org/docs/reinstall/)

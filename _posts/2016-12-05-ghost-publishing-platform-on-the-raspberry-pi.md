---
title: "Ghost Publishing Platform on the Raspberry Pi"
author: "Nix McRetro"
date: 2016-12-05T17:48:59.000+11:00
last_modified_at: 2026-10-10
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-10
  purpose: "fact-checking, sourcing, and editorial quality"
categories: [guides, linux, raspberry-pi]
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

One command in my original notes, `tar -xzf node node-v4.6.2.tar.gz`, appears malformed. I no longer have enough evidence here to reconstruct exactly what I typed successfully in 2016, so this block should not be treated as paste-ready. The later lines headed `Under production` and `Under server` describe edits inside `config.js`; they are not shell commands, and the displayed fields are only a fragment of that file. The historical download URLs and privileged npm commands remain part of these notes, not a current installation recommendation.

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

- [Ghost - Ghost 0.11.3](https://ghost.org/changelog/ghost-0-11-3/)
- [Node.js - Node.js 4.6.2 (LTS)](https://nodejs.org/en/blog/release/v4.6.2)

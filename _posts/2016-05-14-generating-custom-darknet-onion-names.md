---
title: "Generating Custom Darknet Onion Names"
author: "Nix McRetro"
date: 2016-05-14T23:25:26.000+10:00
categories: [guides, hacks, raspberry-pi]
---

![Shallot](/assets/images/2016/img_0472.jpg)

[Shallot](https://web.archive.org/web/20230331011246/https://github.com/katmagic/Shallot) is a great little program for generating your own vanity darknet onion address. I've used it for my old [http://mcretro35qepy5cy.onion/](/) address. I figured I'd share how it all works.

So I fired up the old Ubuntu 16.04 (64-bit) and it's still working well, Shallot (Version 0.0.3-alpha at the time of writing) is getting on in age but still works just as good as it used to. A few things to note though - Make sure you `sudo apt-get update` then `sudo apt-get install libssl-dev` OR `sudo apt-get install openssl-dev`

otherwise you'll end up with something along the lines of **"fatal error: openssl/bn.h: No such file or directory"** when trying to configure and make. Once all that is installed, run the following:

`$ ./configure && make` Once it has built, run Shallot as below:

`./shallot cat` The above will give you the first iteration found with the word cat \*somewhere\* in the address. Let's make it more vanity-like.

`$ ./shallot ^cat` The above code now gives the first iteration it finds with cat at the front, owing to our good friend - the caret (^).

It's all case insensitive like anything on the internet. so ./shallot HappyBirthdayMom is no different to happybirthdaymom. If you are looking for something a bit newer, probably faster too, check out [Scallion](https://github.com/lachesis/scallion) and [Eschalot](https://github.com/ReclaimYourPrivacy/eschalot).

You'll end up with a private key - never share it with anyone or they can steal your domain easily! Then you just need to get Apache or nginx running on your Raspberry Pi to dish out some great content!

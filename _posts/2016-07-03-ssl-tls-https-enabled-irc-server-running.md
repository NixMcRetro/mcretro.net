---
title: "SSL / TLS / HTTPS Enabled, IRC Server Running"
author: "Nix McRetro"
date: 2016-07-03T18:14:24.000+10:00
categories: [news, raspberry-pi]
---

![Screen Shot 2016-07-03 at 5.55.40 PM](/assets/images/2016/img_0485.jpg)

Nailed it, I knew I could work out how to get a darned IRC server up and running. So now you can spam my name into the chat and it will alert me like mad that you are trying to chat - unless I've turned off the volume or remembered to type /away. Not only does the IRC server work though, it's also completely encrypted using TLS thanks to the great people at [letsencrypt.org](https://letsencrypt.org/). Much easier to configure than [CAcert.org](http://www.cacert.org/) and just as cheap (free). But what's this?

![Screen Shot 2016-07-03 at 5.55.17 PM](/assets/images/2016/img_0484.jpg)

As a side effect of getting the IRC server all encrypted and prettied up, I ended up getting a certificate for mcretro.net as well. Just in time for the shop to open. Unfortunately, OpenCart is overcomplicated for what I need it to do (i.e. sell 2-3 products). So I've moved back to WooCommerce. One of the big problems I couldn't get over was losing the admin interface of OpenCart when TLS was enabled. Sort of a showstopper.

![](/assets/images/2016/img_0483.jpg)

But right now for the moment, the new shop is looking promising and I've even worked out that I can ship to New Zealand with relative ease and for the right price too. So update your links, the shop has moved to [/shop/](/) and will probably be live early August if all goes well. Might even have a few more items to put in there too. :)

**Sources:**
- [Dynamic DNS ddclient with Namecheap](https://web.archive.org/web/20231014224641/https://ktmresearch.com/2014/10/dynamic-dns-ddclient-with-namecheap/)
- [Namecheap - Configuring Host for DynDNS](https://www.namecheap.com/support/knowledgebase/article.aspx/43/11/how-do-i-set-up-a-host-for-dynamic-dns/)
- [Namecheap - Configuring ddclient](https://www.namecheap.com/support/knowledgebase/article.aspx/583/11/how-do-i-configure-ddclient/)

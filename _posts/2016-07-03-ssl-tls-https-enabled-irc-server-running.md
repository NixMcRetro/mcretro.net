---
title: "SSL / TLS / HTTPS Enabled, IRC Server Running"
author: "Nix McRetro"
date: 2016-07-03T18:14:24.000+10:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [news, raspberry-pi]
---

![Screen Shot 2016-07-03 at 5.55.40 PM](/assets/images/2016/img_0485.jpg)

Nailed it! I knew I could work out how to get a darned IRC server up and running.

Now you can spam my name into the chat and it will alert me like mad that you're trying to chat, unless I've turned off the volume or remembered to type `/away`.

The IRC server now supports TLS using a Let's Encrypt certificate, so IRC clients configured to use the TLS listener can encrypt their connection to the server.

That's a little more precise than my original claim that the whole IRC server was simply "completely encrypted".

![Screen Shot 2016-07-03 at 5.55.17 PM](/assets/images/2016/img_0484.jpg)

As a side effect of getting the IRC server encrypted and prettied up, I ended up getting a certificate for McRetro.net as well. Just in time for the shop to open.

Unfortunately, OpenCart is overcomplicated for what I need it to do, which is sell two or three products. So I've moved back to WooCommerce.

One of the big problems I couldn't get over was losing the admin interface of OpenCart when TLS was enabled. Sort of a showstopper.

![](/assets/images/2016/img_0483.jpg)

But right now the new shop is looking promising and I've even worked out that I can ship to New Zealand with relative ease and for the right price too.

So update your links, the shop has moved to [/shop/](/) and will probably be live early August if all goes well. Might even have a few more items to put in there too. :)

### McRetroNet IRC server

- [Initial Tests for a McRetroNet IRC Server](/initial-tests-for-a-mcretronet-irc-server/)
- [IRC RIP in Peace](/irc-rip-in-peace/)

### Sources

- [Dynamic DNS ddclient with Namecheap](https://web.archive.org/web/20231014224641/https://ktmresearch.com/2014/10/dynamic-dns-ddclient-with-namecheap/)
- [Namecheap - Configuring Host for DynDNS](https://www.namecheap.com/support/knowledgebase/article.aspx/43/11/how-do-i-set-up-a-host-for-dynamic-dns/)
- [Namecheap - Configuring ddclient](https://www.namecheap.com/support/knowledgebase/article.aspx/583/11/how-do-i-configure-ddclient/)

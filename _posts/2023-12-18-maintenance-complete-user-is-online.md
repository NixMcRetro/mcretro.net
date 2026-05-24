---
title: "Maintenance Complete - User Is Online!"
author: "Nix McRetro"
date: 2023-12-18T13:06:33.000+11:00
categories: [news]
---

![](/assets/images/2023/img_1234.jpg)

CG-NAT defeated! The Cloudflare Argo Tunnel works and has done so for about a week. However, due to the way the tech behind it all works...

![](/assets/images/2023/img_1231.jpg)

...I **_might_** have inadvertently locked myself out, with help from botnets spamming my Wordpress login page of course! No problem, it gave me a week to mull over options and find a better solution.

![](/assets/images/2023/img_1232.jpg)

After finding some time to look at the settings, I can see why I was locked out. Cloudflare's Argo Tunnel, cloudflared, hooks into my local network. So all login requests were showing the origin as an address on my local network, localhost.

![](/assets/images/2023/img_1233.jpg)

Enter Cloudflare Access (again)! Using a one-time pin through Cloudflare offers security far superior to my existing freemium Wordpress plugin. Reduced server load and less attack vectors? Yes please! This user is most definitely [back online](/uploads/uploads/user-is-online.mp3)!

![](/assets/images/2023/img_1230.jpg)

Now that this mess is sorted out I can get back to finding cool lizards **_in my backyard_**. Ahhh, it does beg the question, should I even be self-hosting on 4G home internet? No, probably not. Latency is through the roof and CG-NAT is annoying. Oh well! 💁‍♀️

Big thanks to [Tim Smith](https://tsmith.co/2023/protecting-wordpress-admin-login-with-cloudflare/) and [Jeremy](https://noted.lol/zero-trust-access-applications/) - without their guidance I'd probably still be reading the Cloudflare documentation! 😅

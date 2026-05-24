---
title: "The Assembler Games Archive - Work Notes"
author: "Nix McRetro"
date: 2022-10-09T22:15:11.000+11:00
categories: [guides, programming, youtube]
---

![](/assets/images/2022/img_0973.gif)

For anyone else who has the [Assembler Games archive](https://archive.org/details/AssemblerGames.com-Httrack-June-04th-2019-Nemesis), I thought I'd just leave up some notes on what I did and what issues I had while putting it all together.

I've since taken down my mirror as I didn't have time to go through and get it, let alone my GeoCities rebuild, to get them working as well as I would have hoped. Maybe in the future it will reappear, who knows! Thanks to the good folk at [Obscure Gamers](https://www.obscuregamers.com/threads/assemblergames-backups.23/) for tracking this as it all went down. It looks like the Archive Team has [captured the YouTube videos from Assembler Games](https://archive.org/details/assemblergames-youtube-archive) before it went down in September 2021 also - lucky!

![](/assets/images/2022/img_0965.jpg)

One of the biggest issues I had was either filenames being too long for Mac OS, 1024 character limit, or having non-printable characters.

![](/assets/images/2022/img_0966.jpg)

Another example above. Thankfully to fix this you can remove by inodes instead of filenames.

![](/assets/images/2022/img_0967.jpg)

We can identify the inode/file that needs to be removed with this command: `ls -li`

This then removes the offending inode, assuming it was 99807. `sudo find . -inum 99807 -exec rm -i {} \;`

[Source for inode deletion](https://unix.stackexchange.com/questions/463913/delete-files-with-names-that-appear-to-begin-with-in-command-line)

The next issue I came across involved links not working, possibly due to redirects that once existed.

![](/assets/images/2022/img_0970.jpg)

In the middle of the page there is a link. I can't remember what was broken and I have insufficient notes and no access to the data... so we'll ummm skip over that one for the time being.

![](/assets/images/2022/img_0968.jpg)

Looking at the above image you can see that the index.html file isn't found. The problem is that blocks the actual attachment - this causes a little bit of chaos on when browsing threads. I had this listed as "File listing not showing". An annoyance certainly but having it fixed was and will remain on my to do list indefinitely unfortunately. Here's the attachment for reference below.

![](/assets/images/2022/img_0969.jpg)

Sitemap generation was a bit of a hassle, I had been using this command in Ubuntu 20.04: `sitemap-generator 192.168.1.254:8081 -v`

I vaguely remember that you do a find and replace on the IP address to make it where it is actually hosted. So it changed from 192.168.1.254:8081 to https://assembler.mcretro.net. Find and replace was my friend. Oh and I think I kept the sitemap files to around 30,000 entries. Another thing that had to be done with to modify the Apache web configuration for assemblergames.mcretro.net to include the new port: `VirtualHost *:80 *:8081`

And then we needed to edit this file: `sudo nano /etc/apache2/ports.conf` To make the server listen on that 8081 port. `Listen 192.168.1.254:8081`

It all became a bit chaotic when I started using a proxy server and I tried to merge it into my main server with deleterious effects... 

{% include youtube.html id="sefGW__p6WE" %}

Right?

![](/assets/images/2022/img_0972.jpg)

I had been using the following to generate code but it tended to fail part way through with code error, that's why I switched over to the local IP method. `sitemap-generator https://assembler.mcretro.net --verbose --max-depth 4`

For reference here is the error I was getting:

```
/usr/local/lib/node_modules/sitemap-generator-cli/node_modules/sitemap-generator/src/index.js:88
      throw new Error(`Site "${parsedUrl.href}" could not be found.`);
      ^

Error: Site "http://assembler.mcretro.net" could not be found.
    at Crawler.SitemapGenerator.crawler.on (/usr/local/lib/node_modules/sitemap-generator-cli/node_modules/sitemap-generator/src/index.js:88:13)
    at Crawler.emit (events.js:198:13)
    at /usr/local/lib/node_modules/sitemap-generator-cli/node_modules/simplecrawler/lib/crawler.js:1264:25
    at FetchQueue.update (/usr/local/lib/node_modules/sitemap-generator-cli/node_modules/simplecrawler/lib/queue.js:229:9)
    at ClientRequest. (/usr/local/lib/node_modules/sitemap-generator-cli/node_modules/simplecrawler/lib/crawler.js:1247:27)
    at ClientRequest.emit (events.js:198:13)
    at Socket.socketErrorListener (_http_client.js:401:9)
    at Socket.emit (events.js:198:13)
    at emitErrorNT (internal/streams/destroy.js:91:8)
    at emitErrorAndCloseNT (internal/streams/destroy.js:59:3)
```

Note for future self - I really need to fix my code and pre tags to look better. Another way it would fail would as follows:

```
/usr/local/lib/node_modules/sitemap-generator-cli/node_modules/sitemap-generator/src/index.js:88
      throw new Error(`Site "${parsedUrl.href}" could not be found.`);
      ^

Error: Site "https://assembler.mcretro.net" could not be found.
    at Crawler. (/usr/local/lib/node_modules/sitemap-generator-cli/node_modules/sitemap-generator/src/index.js:88:13)
    at Crawler.emit (node:events:390:28)
    at /usr/local/lib/node_modules/sitemap-generator-cli/node_modules/simplecrawler/lib/crawler.js:1264:25
    at FetchQueue.update (/usr/local/lib/node_modules/sitemap-generator-cli/node_modules/simplecrawler/lib/queue.js:229:9)
    at ClientRequest. (/usr/local/lib/node_modules/sitemap-generator-cli/node_modules/simplecrawler/lib/crawler.js:1247:27)
    at ClientRequest.emit (node:events:390:28)
    at Socket.socketErrorListener (node:_http_client:447:9)
    at Socket.emit (node:events:390:28)
    at emitErrorNT (node:internal/streams/destroy:157:8)
    at emitErrorCloseNT (node:internal/streams/destroy:122:3)
```

Maybe it just wasn't to be. And that's alright. Onto the root directory structure, or at least as far as I could tell. There was a lot of cruft in there.

```
These are all that need to be indexed. Get directory listings from terminal on webserver and copy out the structure. All index.html files in these folders will need to be modified to remove sonicdude10 personalisation.

attachments	CONFIRMED - index.html prevents long file list load
categories	CONFIRMED
data		CONFIRMED
forums		CONFIRMED
help		CONFIRMED
js		CONFIRMED - Seems to be current / legacy javascript
members		CONFIRMED - Has member list
misc		CONFIRMED - Contains session-relative static files?
search		CONFIRMED - I added this, needs to be updated
styles		CONFIRMED - Xenforo stuff in here
tags		CONFIRMED
threads		CONFIRMED
```

As the forums were upgraded over the years we saw a shift in the way the URLs were formatted. This needs to be taken into consideration too.

**2014** http://www.assemblergames.com/forums/showthread.php?50468-saturn-Model-search-help

**2016** http://assemblergames.com/l/threads/saturn-model-search-help.50468/

**2017+** http://assemblergames.com/threads/saturn-model-search-help.50468/

![](/assets/images/2022/img_0971.jpg)

Something simple that can be done is to track down 0-byte files and delete them. I never did get around to that for some reason. The root folder is quite chaotic owing to all the other sites that were ripped along with Assembler Games. This can be good in some ways as images of hardware in threads was captured. I'm not sure how well implemented this was though.

Another curiosity I never worked out was this one. On the following link: **https://assembler.mcretro.net/members/sonicdude10.65150/index.html** you were able to see a link that references either the /l/threads or /threads.

Links \*might\* be rewritten from https://assemblergames.com/l/threads/ to Links \*might\* be rewritten from https://assemblergames.com/threads/

```
This could be fixed with some sort of redirect plugin, i.e.
try / 		THEN try 		/l/ 	THEN fail with 404
try /l/		THEN try 		/	THEN fail with 404
```

I never got around to looking into it too far though. It's been good. Assembler Games was where I tended to hang around when I had free time during the mid 2010s. They ignited my love of retrogaming once more and gave me reason. They will be missed. All the best Kevin! :-)

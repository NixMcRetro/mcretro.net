---
title: "Xbox DVT4 Network Update (XDK 5933)"
author: "Nix McRetro"
date: 2019-11-24T18:18:03.000+11:00
last_modified_at: 2026-10-22
categories: [devkit, microsoft, youtube]
---

{% include youtube.html id="WDFh2T2vEuY" %}

With the DVT4 restored to XDK 5849, I wanted to update it to build 5933. I'd originally been looking for another recovery disc, but it turned out that this particular update could be installed over the network instead. Much more interesting!

Unfortunately, I wasn't having much luck getting the tools working under Windows 10. Windows 7 running in Parallels on the Mac was far more cooperative. I configured the virtual machine to use bridged networking so it could communicate directly with the Xbox.

The update utility detected the console using its previous name, Mean Machine, rather than Dave, which was what I'd called it during the recovery video. A quick adjustment and we were ready to proceed. I also selected the option to restore the console's settings to their defaults.

From there, the updater copied the necessary files across the network while the Xbox displayed its own progress. There was rather a lot of waiting involved, but eventually the installation finished and the machine restarted.

Back at the development dashboard, everything appeared to be working properly. I'd referred to 5933 as the latest available XDK at the time, although I'm still not entirely certain whether it was an official public release or an internal build.

Not bad for hardware that's been sitting around for so many years. Now to see what else we can make this development kit do!

### Related posts

- [Xbox DVT4 Factory Restore (XDK Recovery 5849)](/xbox-dvt4-factory-restore-recovery-5849/)
- [Xbox DVT4 Running UnleashX](/xbox-dvt4-running-unleashx/)

### Sources

- [ConsoleMods Wiki - Xbox Debug](https://consolemods.org/wiki/Xbox%3ADebug)
- [xboxdevwiki - Microsoft XDK](https://xboxdevwiki.net/Microsoft_XDK)

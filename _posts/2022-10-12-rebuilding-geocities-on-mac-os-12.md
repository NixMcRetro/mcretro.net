---
title: "Rebuilding GeoCities on Mac OS 12"
author: "Nix McRetro"
date: 2022-10-12T08:27:53.000+11:00
categories: [guides, news, raspberry-pi]
---

![](/assets/images/2022/img_0976.jpg)

A while back, some of you may remember that I entered [RetroChallenge 2021/10](https://www.retrochallenge.org/2021/10/). I was [somewhat successfully](/the-geocities-rebuild-worklog/) at a rebuild of the [GeoCities Archive](https://archive.org/details/archiveteam-geocities), also known as The Archive Team Geocities Valhalla, and managed to host it on a Raspberry Pi.

Of course it wasn't perfect and I knew that. So since then I've tried to reboot it again using the [GitHub repository from despens](https://github.com/despens/Geocities) as it would potentially solve some of the problems I had when I started to merge data together. But then this happened...

![](/assets/images/2022/img_0975.jpg)

Ideally, I wanted to use Mac OS instead of Ubuntu, but Mac OS doesn't support long file names. Limit of 1024 characters apparently. Ubuntu can hit a whopping 4096 or so. Nice!

![](/assets/images/2022/img_0978.jpg)

I was also getting checksum mismatches compared to the original torrent, which needless to say, is very bad. Not sure what caused that, but it was possibly the same thing that resulted in duplicates. Note the ".1." in the file names.

![](/assets/images/2022/img_0974.jpg)

I did find what appears to be a typo in the [despens GitHub](https://github.com/despens/Geocities) too.

![](/assets/images/2022/img_0977.jpg)

GEO SCRIPTS/filer-indexes.pl should probably be GEO SCRIPTS/filter-indexes.pl. Don't worry, I'll fix it in post.

The following is just for my reference and was more related to the pre-004 steps on despens instructions under Mac OS. You can see at the end I hit the 1024-character limit in Mac OS which is where I headed back to Ubuntu 22.04.

```
Verify and complete your Geocities Download
From here - https://blog.geocities.institute/archives/3209

curl -L https://install.perlbrew.pl | bash
source ~/perl5/perlbrew/etc/bashrc
perlbrew install perl-5.36.0	
perlbrew switch perl-5.36.0	This needs to be done repeatedly in the active terminal window, find bin file
/usr/bin/which -a perl
sudo cpan -i XML::LibXSLT

This makes future installs less questiony
cpan -i App::cpanminus

This is needed for the thing
cpanm XML::TreePP

Also needs this to calculate md5s on Mac
brew install md5sha1sum

perl geo-torrent-checksums.pl 2009-archiveteam-geocities-part1_files.xml > download1.sh
perl geo-torrent-checksums.pl 2009-archiveteam-geocities-part2_files.xml > download2.sh
perl geo-torrent-checksums.pl 2009-archiveteam-geocities-part3_files.xml > download3.sh
perl geo-torrent-checksums.pl 2009-archiveteam-geocities-part4_files.xml > download4.sh
perl geo-torrent-checksums.pl 2009-archiveteam-geocities-part5_files.xml > download5.sh
perl geo-torrent-checksums.pl 2009-archiveteam-geocities-part6_files.xml > download6.sh
perl geo-torrent-checksums.pl 2009-archiveteam-geocities-part7_files.xml > download7.sh
perl geo-torrent-checksums.pl 2009-archiveteam-geocities-part8_files.xml > download8.sh

Note: All must be in the same directory when verifying

Next, backup files to root to avoid accidental erasure.
Then sudo chmod +x download*.sh
./download1.sh
./download2.sh
./download3.sh
./download4.sh
./download5.sh
./download6.sh
./download7.sh
./download8.sh

Once completed sudo rm download*.sh files re-run the md5 checker:
perl geo-torrent-checksums.pl 2009-archiveteam-geocities-part1_files.xml > download1-1.sh
perl geo-torrent-checksums.pl 2009-archiveteam-geocities-part2_files.xml > download2-1.sh
perl geo-torrent-checksums.pl 2009-archiveteam-geocities-part3_files.xml > download3-1.sh
perl geo-torrent-checksums.pl 2009-archiveteam-geocities-part4_files.xml > download4-1.sh
perl geo-torrent-checksums.pl 2009-archiveteam-geocities-part5_files.xml > download5-1.sh
perl geo-torrent-checksums.pl 2009-archiveteam-geocities-part6_files.xml > download6-1.sh
perl geo-torrent-checksums.pl 2009-archiveteam-geocities-part7_files.xml > download7-1.sh
perl geo-torrent-checksums.pl 2009-archiveteam-geocities-part8_files.xml > download8-1.sh

Everything *should* be commented out, indicating no issues. Then it is time to decompress.

https://blog.geocities.institute/archives/3288
https://github.com/despens/Geocities/tree/master/scripts/geocities.archiveteam.torrent

Per readme on https://github.com/despens/Geocities
check variables in terminal with env
nano ~/.zshrc

This appears to be updated!
https://github.com/kyledrake/Geocities

Mac OS limit of ~1024 characters
/Volumes/GeoCities/work/geocities/YAHOOIDS/E/n/EnchantedForest/Dell/2237/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino/dino-d.html
```

![](/assets/images/2022/img_0976a.jpg){: width="100" style="float:left; margin:0 1em 0.5em 0;"} For now, I'm back in the game with [RetroChallenge 2022/10](https://www.retrochallenge.org/2022/) doing something similar but different on hardware and software from 2012. I'm thinking a Mac Pro and Ubuntu 12.04.5. This should result in less errors and a more accurate replication of despens results. :)
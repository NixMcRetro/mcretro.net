---
title: "Dial-up on Windows 95 on the MiSTer FPGA"
author: "Nix McRetro"
date: 2021-07-12T21:11:21.000+10:00
categories: [hacks, livestream, raspberry-pi]
last_modified_at: 2026-10-11
ai_assistance:
  model: "GPT-6.1 Sol"
  date: 2026-10-11
  purpose: "fact-checking, sourcing, and editorial quality"
---

{% include youtube.html id="i-k2nwFDKoU" %}

I can't believe it worked. I switched from Prolific PL2303 to an FTDI FT232RL USB to serial cable which was recognised _natively_ by the MiSTer as `/dev/ttyUSB0`.

 

```
FTDI USB Serial Device converter now attached to ttyUSB0

```

This means I don't need to compile a kernel driver thing. One thing led to another and I was able to connect one computer to another and download/upload between two modems, with Windows 95 running on MiSTer's ao486 core at 28,800 bps! It's insane the number of levels here. I love it! ❤️

I am working toward being able to browse the olden-days internet, with no HTTPS/TLS, on some self-hosted GeoCities homepages. It's a massive bunch of data and I have no idea of what the quality will be. 640GB. It's just another fun project in itself.

Another major step was realising that, on my RPi3, the forwarding rules I'd put in UFW weren't active while UFW was disabled. No packets were getting through my `ppp0` connection. I enabled UFW and it came to life: ping was working!

 

![](/assets/images/2021/img_0729.jpg)

 

```
[ 1835.122153] usb 1-1.2: new full-speed USB device number 5 using dwc2
[ 1835.216757] usb 1-1.2: New USB device found, idVendor=0403, idProduct=6001, bcdDevice= 6.00
[ 1835.216771] usb 1-1.2: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[ 1835.216778] usb 1-1.2: Product: UT232R
[ 1835.216785] usb 1-1.2: Manufacturer: FTDI
[ 1835.216791] usb 1-1.2: SerialNumber: FT4QRZWJ
[ 1835.221556] ftdi_sio 1-1.2:1.0: FTDI USB Serial Device converter detected
[ 1835.221696] usb 1-1.2: Detected FT232RL
[ 1835.223786] usb 1-1.2: FTDI USB Serial Device converter now attached to ttyUSB0
```

### Sources

- [MiSTer documentation - Computer core networking](https://mister-devel.github.io/MkDocs_MiSTer/advanced/computer/)
- [Ubuntu Server documentation - Firewalls](https://ubuntu.com/server/docs/how-to/security/firewalls/)

### Related posts

- [MiSTer FPGA on the DE10-Nano](/mister-fpga-on-the-de10-nano/)
- Later project update: [The GeoCities Archive Rebuild Blog](/the-geocities-archive-rebuild-blog/)

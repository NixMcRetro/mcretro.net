---
title: "TP-Link VR1600v Firmware Dump Attempt"
author: "Nix McRetro"
date: 2021-05-30T09:37:17.000+10:00
categories: [guides]
---

![](/assets/images/2021/img_0686.jpg)

The [TP-Link VR1600v VDSL/ADSL Modem Router](https://www.tp-link.com/au/service-provider/xdsl/archer-vr1600v/). Just a word of warning, this post **_does not_** result in a successful firmware dump. Over five days I had a look into how to dump the firmware off a spare modem I had. This wasn't my main modem, it wasn't even my backup modem - for me, there was no risk of loss if I had to bin the modem.

![](/assets/images/2021/img_0693.jpg)

Why did I even try this? It turns out someone I knew was actively using the OpenVPN software that's built into the modem. The internet service provider (ISP) was TPG Australia. They were removing the software via an update to improve security - which makes sense if you think about it. Anyway, I was interested to see if I could force flash an older firmware then disable auto-update, leaving you vulnerable to exploits...

![](/assets/images/2021/img_0692.jpg)

It turns out you can disable the auto-update functionality by logging in with [the hidden super user password](https://www.marcelvarallo.com/so-we-cracked-the-archer-vr1600v-v2-super-user-password/). This password is not provided to the end user by TPG. So if your router has been updated with their push of their new firmware via the Technical Report 069 (TR-069) and CWMP functionality, OpenVPN is gone. My spare (offline) modem still had the old firmware though. This phrase stuck - "anti-user behaviour".

![](/assets/images/2021/img_0694.jpg)

Our goal now becomes, how to extract the existing firmware from the modem. We were running firmware version 0.1.0 0.9.1 v5006.0 build 190228 rel.72265n on our donor modem. Apparently [TPG changed the super user password](https://forums.whirlpool.net.au/archive/3yz2q0n9#r67949962) - which is good but also bad. Bad actors knowing your router super user password is bad, not being able to configure VoIP is bad though.

## Day 1

Most of day one was tracking down the serial TTL port / UART header location. First I had to learn about serial and how on earth I was meant to extract anything from it.

The OpenWrt Project provided a fair amount of knowledge on the topic - [here](https://openwrt.org/docs/techref/hardware/port.serial), [here](https://openwrt.org/docs/guide-user/troubleshooting/generic.debrick), [here](https://web.archive.org/web/20210522202158/http://www.devttys0.com/2012/11/reverse-engineering-serial-ports/) and [here](https://openwrt.org/docs/techref/hardware/soc/soc.broadcom.bcm63xx). [This Reddit comment thread](https://www.reddit.com/r/HomeNetworking/comments/cz1fus/archer_vr1600v_modem_router_can_i_install_openwrt/) helped me work out the chipset used. [Googling a bit](https://www.google.com/search?q=UART+port+on+TP+LINK) helped of course, it's all about keywords. [This page](https://www.cyberark.com/resources/threat-research-blog/accessing-and-dumping-firmware-through-uart) gave great insight into how the dumping process should look. [Here's another page](http://router-mod.blogspot.com/2018/09/router-serial-or-uart-port-how-to-find.html) that gave me some valuable hints. No way! [Another page](https://wiki.dd-wrt.com/wiki/index.php/Serial_port_pinouts#TP-Link_TL-WR941ND_v3)?

![](/assets/images/2021/img_0695.jpg)

This looks to be the UART header with solder pads for components C317, R283 and R279 nearby. Next was to guess as to [what the values might have been](https://forum.openwrt.org/t/tplink-ac1750-v4-serial-resistors-capacitor-values-solved/26364/9) or whether just to bridge them. I went with a wire bridge to start thanks to [this OpenWrt forum post](https://forum.openwrt.org/t/tplink-ac1750-v4-serial-resistors-capacitor-values-solved/26364/6). [This blog post](https://www.zerodayinitiative.com/blog/2019/9/2/mindshare-hardware-reversing-with-the-tp-link-tl-wr841n-router) had a great image half-way down. Ha ha!

![](/assets/images/2021/img_0726.jpg)

Above is a V1 revision of the VR1600v taken from [the world's shittiest teardown](https://www.marcelvarallo.com/so-i-tore-apart-my-archer-vr1600v/) - which helped greatly, thank you! However, of course mine is a V2. Note the date code on the PCBs. V1 is 1850, that's Week 50 of 2018. My V2 date code is 2010, i.e. Week 10 of 2020. Overall the boards look **_very_** similar. Using the multimeter, we get the following on the likely serial header location.

 

```
PIN 1 - Likely VCC - *DO NOT CONNECT*
- Quick chirp when tested against pin 2 (GND)
- Thicker trace on board vs pins 3 and 4
- 3.36V

PIN 2
- Continuity with Ground on USB port and heatsink
- Cross pattern on through-hole

PIN 3
- Thin trace (likely data)

PIN 4
- Thin trace (likely data)

TX (transmit) will be more active.
RX (receive) will be less active.

```

![](/assets/images/2021/img_0724.jpg)

![](/assets/images/2021/img_0725.jpg)

Let's attach a header and make some bridges at the TX and RX pins, the pinout should be similar to the above two images taken from one of the sites above.

![](/assets/images/2021/img_0687.jpg)

Yes, the first bridge is a bread tie.

![](/assets/images/2021/img_0688.jpg)

It was better than the second bridge... which just looks to be a blob of solder. I really need to not do things late at night on a work day.

![](/assets/images/2021/img_0689.jpg)

Looks good from the other side though! 😅 Connecting TX, RX and GND were all that mattered. Do not connect voltage from the serial -> USB adapter or you will cook something. The two resistor bridges were now bridged. Are TX and RX beaming anything down over serial from the Broadcom SoC now?

![](/assets/images/2021/img_0696.jpg)

![](/assets/images/2021/img_0697.jpg)

Alright that isn't quite right. Flow settings maybe? Perhaps it's just a software setting in Minicom.

![](/assets/images/2021/img_0698.jpg)

Rejiggered some Minicom settings, trying again.

![](/assets/images/2021/img_0699.jpg)

Oh my goodness, it's still a mess. Let's revisit my incredible soldering and use a multimeter to probe.

![](/assets/images/2021/img_0700.jpg)

Something wasn't right, see the first column, why is my RX open line? Bad soldering. Not surprised with the amount of flux on the board and I have no isopropyl on hand to clean it. A quick reflow and...

![](/assets/images/2021/img_0701.jpg)

Well, I'll be damned. We have readable, formatted output. The full output is below.

 

```
Welcome to minicom 2.7.1

OPTIONS: I18n 
Compiled on Dec 23 2019, 02:06:26.
Port /dev/ttyUSB1, 11:41:46

Press CTRL-A Z for help on special keys

HELO                                    
CPUI                                    
L1CI                                    
HELO                                    
CPUI                                    
L1CI                                    
4.1603-1.0.38-116.174                   
DRAM                                    
---- 
PHYS                                    
STRF                                    
400H
PHYE
DDR3
SIZ4
SIZ3
SIZ2
DINT
USYN
LSYN
MFAS
LMBE
RACE
PASS
----
ZBSS
CODE
DATA
L12F
MAIN
FPS0
B000
0001
B999
0492
NAN3
RFS2
NAN5

Base: 4.16_03
CFE version 1.0.38-116.174 for BCM963268 (32bit,SP,BE)
Build Date: Wed Feb 20 15:09:27 HKT 2019 (root@localhost.localdomain)
Copyright (C) 2000-2013 Broadcom Corporation.

Boot Strap Register:  0x1ff97bf
Chip ID: BCM63167D0, MIPS: 400MHz, DDR: 400MHz, Bus: 200MHz
Main Thread: TP0
Memory Test Passed
Total Memory: 134217728 bytes (128MB)
Boot Address: 0xb8000000

NAND ECC BCH-4, page size 0x800 bytes, spare size used 64 bytes
NAND flash device: ESMT F59L1G81MA, id 0xc8d1 block 128KB size 131072KB
read : 580
read : 580
read : 580
read : 580
read : 580
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 580
read : 580
read : 0
read : 0
read : 580
read : 0
read : 0
Board IP address                  : 192.168.1.1:ffffff00  
Host IP address                   : 192.168.1.100  
Gateway IP address                :   
Run from flash/host/tftp (f/h/c)  : f  
Default host run file name        : vmlinux  
Default host flash file name      : bcm963xx_fs_kernel  
Boot delay (0-9 seconds)          : 1  
Boot image (0=latest, 1=previous) : 0  
Default host ramdisk file name    :   
Default ramdisk store address     :   
read : 580
read : 580
read : 580
Board Id (0-36)                   : 963167TP_VOIP  
Number of MAC Addresses (1-32)    : 11  
Base MAC Address                  : e0:05:c5:06:00:1c  
PSI Size (1-64) KBytes            : 48  
Enable Backup PSI [0|1]           : 0  
System Log Size (0-256) KBytes    : 0  
Auxillary File System Size Percent: 0  
Main Thread Number [0|1]          : 0  
read : 580
WLan Feature                      : 0x00  
read : 580
Voice Board Configuration (0-0)   : LE9642_ZSI_BB  

*** Press 't' to stop auto run (0.1 seconds) ***
read : 580
read : 0
read : 0
read : 580
read : 0
read : 0
read : 580
Booting from latest image (address 0xb8020000, flash offset 0x00020000) ...
read : 580
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
read : 0
***** Found UBIFS Marker at 0x0029ff00
read : 580
Decompression OK!
Entry at 0x804389f0
Starting program at 0x804389f0
Linux version 3.4.11-rt19 (root@localhost.localdomain) (gcc version 4.6.2 (Buildroot 2011.11) ) #123 SMP PREEMPT Thu Feb 28 19:08:52 HKT 2019
reading nvram into inMemNvramData
ulPsiSize 0x30
backupPsi 0x0
ulSyslogSize 0x0
szBoardId 963167TP_VOIP
963167TP_VOIP prom init
CPU revision is: 0002a080 (Broadcom BMIPS4350)
DSL SDRAM reserved: 0x132000
Determined physical RAM map:
 memory: 07ece000 @ 00000000 (usable)
Zone PFN ranges:
  DMA      0x00000000 -> 0x00001000
  Normal   0x00001000 -> 0x00007ece
Movable zone start PFN for each node
Early memory PFN ranges
    0: 0x00000000 -> 0x00007ece
On node 0 totalpages: 32462
free_area_init_node: node 0, pgdat 8055e750, node_mem_map 81000000
  DMA zone: 32 pages used for memmap
  DMA zone: 0 pages reserved
  DMA zone: 4064 pages, LIFO batch:0
  Normal zone: 222 pages used for memmap
  Normal zone: 28144 pages, LIFO batch:7
PERCPU: Embedded 7 pages/cpu @81103000 s5360 r8192 d15120 u32768
pcpu-alloc: s5360 r8192 d15120 u32768 alloc=8*4096
pcpu-alloc: [0] 0 [0] 1 
Built 1 zonelists in Zone order, mobility grouping on.  Total pages: 32208
Kernel command line: ro noinitrd  irqaffinity=0
PID hash table entries: 512 (order: -1, 2048 bytes)
Dentry cache hash table entries: 16384 (order: 4, 65536 bytes)
Inode-cache hash table entries: 8192 (order: 3, 32768 bytes)
Primary instruction cache 64kB, VIPT, 4-way, linesize 16 bytes.
Primary data cache 32kB, 2-way, VIPT, cache aliases, linesize 16 bytes
Memory: 122672k/129848k available (4314k kernel code, 7176k reserved, 1121k data, 220k init, 0k highmem)
Preemptible hierarchical RCU implementation.
NR_IRQS:128
console [ttyS0] enabled
Allocating memory for DSP module core and initialization code
Allocated DSP module memory - CORE=0x0 SIZE=0, INIT=0x0 SIZE=0
Calibrating delay loop... 397.31 BogoMIPS (lpj=198656)
pid_max: default: 32768 minimum: 301
Mount-cache hash table entries: 512
--Kernel Config--
  SMP=1
  PREEMPT=1
  DEBUG_SPINLOCK=0
  DEBUG_MUTEXES=0
Broadcom Logger v0.1 Feb 28 2019 19:02:29
CPU revision is: 0002a080 (Broadcom BMIPS4350)
Primary instruction cache 64kB, VIPT, 4-way, linesize 16 bytes.
Primary data cache 32kB, 2-way, VIPT, cache aliases, linesize 16 bytes
Brought up 2 CPUs
NET: Registered protocol family 16
registering PCI controller with io_map_base unset
registering PCI controller with io_map_base unset
bio: create slab  at 0
SCSI subsystem initialized
usbcore: registered new interface driver usbfs
usbcore: registered new interface driver hub
usbcore: registered new device driver usb
PCI host bridge to bus 0000:00
pci_bus 0000:00: root bus resource [mem 0xa0f00000-0xa0ffffff]
pci_bus 0000:00: root bus resource [io  0xa2000000-0xa200ffff]
pci 0000:00:00.0: [14e4:435f] type 00 class 0x028000
pci 0000:00:00.0: reg 10: [mem 0x10004000-0x10005fff]
pci 0000:00:09.0: [14e4:6300] type 00 class 0x0c0310
pci 0000:00:09.0: reg 10: [mem 0x10002600-0x100026ff]
pci 0000:00:0a.0: [14e4:6300] type 00 class 0x0c0320
pci 0000:00:0a.0: reg 10: [mem 0x10002500-0x100025ff]
PCI host bridge to bus 0000:01
pci_bus 0000:01: root bus resource [mem 0x11000000-0x11efffff]
pci_bus 0000:01: root bus resource [??? 0x00000000 flags 0x0]
pci 0000:01:00.0: [14e4:6326] type 01 class 0x060400
pci 0000:01:00.0: PME# supported from D0 D3hot
pci 0000:02:00.0: [14e4:aa52] type 00 class 0x028000
pci 0000:02:00.0: reg 10: [mem 0x00000000-0x00007fff 64bit]
pci 0000:02:00.0: reg 18: [mem 0x00000000-0x003fffff 64bit]
pci 0000:02:00.0: supports D1 D2
pci 0000:01:00.0: BAR 8: assigned [mem 0x11000000-0x115fffff]
pci 0000:02:00.0: BAR 2: assigned [mem 0x11000000-0x113fffff 64bit]
pci 0000:02:00.0: BAR 0: assigned [mem 0x11400000-0x11407fff 64bit]
pci 0000:01:00.0: PCI bridge to [bus 02-02]
pci 0000:01:00.0:   bridge window [mem 0x11000000-0x115fffff]
PCI: Enabling device 0000:01:00.0 (0000 -> 0002)
bcmhs_spi bcmhs_spi.1: master is unqueued, this is deprecated
bcmleg_spi bcmleg_spi.0: master is unqueued, this is deprecated
skbFreeTask created successfully
BLOG v3.0 Initialized
BLOG Rule v1.0 Initialized
Broadcom IQoS v0.1 Feb 28 2019 19:06:54 initialized
Broadcom GBPM v0.1 Feb 28 2019 19:06:54 initialized
NET: Registered protocol family 8
NET: Registered protocol family 20
Switching to clocksource MIPS
NET: Registered protocol family 2
IP route cache hash table entries: 1024 (order: 0, 4096 bytes)
TCP established hash table entries: 4096 (order: 3, 32768 bytes)
TCP bind hash table entries: 4096 (order: 3, 32768 bytes)
TCP: Hash tables configured (established 4096 bind 4096)
TCP: reno registered
UDP hash table entries: 128 (order: 0, 4096 bytes)
UDP-Lite hash table entries: 128 (order: 0, 4096 bytes)
NET: Registered protocol family 1
PCI: CLS mismatch (64 != 16), using 16 bytes
bcm_tstamp initialized, (hpt_freq=200000000 2us_div=200 2ns_mult=5 2ns_shift=0)
exFAT: Version 1.2.9
jffs2: version 2.2. (NAND) Â© 2001-2006 Red Hat, Inc.
fuse init (API version 7.18)
msgmni has been set to 239
io scheduler noop registered (default)
Broadcom NAND controller (BrcmNand Controller)
mtd->oobsize=0, mtd->eccOobSize=0
NAND_CS_NAND_XOR=00000000
B4: NandSelect=40000001, nandConfig=15142200, chipSelect=0
brcmnand_read_id: CS0: dev_id=c8d18095
After: NandSelect=40000001, nandConfig=15142200
DevId c8d18095 may not be supported.  Will use config info
Spare Area Size = 16B/512B
Block size=00020000, erase shift=17
NAND Config: Reg=15142200, chipSize=128 MB, blockSize=128K, erase_shift=11
busWidth=1, pageSize=2048B, page_shift=11, page_mask=000007ff
timing1 not adjusted: 6574845b
timing2 not adjusted: 00001e96
ECC level changed to 4
OOB size changed to 16
BrcmNAND mfg 0 0 UNSUPPORTED NAND CHIP 128MB on CS0

Found NAND on CS0: ACC=e3441010, cfg=15142200, flashId=c8d18095, tim1=6574845b, tim2=00001e96
BrcmNAND version = 0x0400 128MB @00000000
brcmnand_scan: B4 nand_select = 40000001
brcmnand_scan: After nand_select = 40000001
handle_acc_control: default CORR ERR threshold  1 bits
ACC: 16 OOB bytes per 512B ECC step; from ID probe: 16
page_shift=11, bbt_erase_shift=17, chip_shift=27, phys_erase_shift=17
Brcm NAND controller version = 4.0 NAND flash size 128MB @18000000
ECC layout=brcmnand_oob_bch4_2k
brcmnand_scan:  mtd->oobsize=64
brcmnand_scan: oobavail=35, eccsize=512, writesize=2048
brcmnand_scan, eccsize=512, writesize=2048, eccsteps=4, ecclevel=4, eccbytes=7
-->brcmnand_default_bbt
brcmnand_default_bbt: bbt_td = bbt_slc_bch4_main_descr
Bad block table Bbt0 found at page 0000ffc0, version 0x01 for chip on CS0
Bad block table 1tbB found at page 0000ff80, version 0x01 for chip on CS0
brcmnand_reset_corr_threshold: default CORR ERR threshold  1 bits for CS0
brcmnand_reset_corr_threshold: CORR ERR threshold changed to 3 bits for CS0
brcmnandCET: Status -> Deferred
***** Found UBIFS Marker at 0x002bff00
***** Found UBIFS Marker at 0x040fff00
Creating 8 MTD partitions on "brcmnand.0":
0x0000002c0000-0x000003d80000 : "rootfs"
0x000004100000-0x000007ae0000 : "rootfs_update"
0x000007b00000-0x000007f00000 : "data"
0x000000000000-0x000000020000 : "nvram"
0x000000020000-0x000003d80000 : "image"
0x000003d80000-0x000007ae0000 : "image_update"
0x000000020000-0x0000002c0000 : "bootfs"
0x000003d80000-0x000004100000 : "bootfs_update"
UBI: attaching mtd0 to ubi0
UBI: physical eraseblock size:   131072 bytes (128 KiB)
UBI: logical eraseblock size:    126976 bytes
UBI: smallest flash I/O unit:    2048
UBI: VID header offset:          2048 (aligned 2048)
UBI: data offset:                4096
UBI: max. sequence number:       2
UBI: attached mtd0 to ubi0
UBI: MTD device name:            "rootfs"
UBI: MTD device size:            58 MiB
UBI: number of good PEBs:        470
UBI: number of bad PEBs:         0
UBI: number of corrupted PEBs:   0
UBI: max. allowed volumes:       128
UBI: wear-leveling threshold:    4096
UBI: number of internal volumes: 1
UBI: number of user volumes:     1
UBI: available PEBs:             0
UBI: total number of reserved PEBs: 470
UBI: number of PEBs reserved for bad PEB handling: 4
UBI: max/mean erase counter: 1/0
UBI: image sequence number:  0
UBI: background thread "ubi_bgt0d" started, PID 232
PPP generic driver version 2.4.2
NET: Registered protocol family 24
brcmboard: brcm_board_init entry
WIFI: Button Interrupt 0x3 is enabled
RESET: Button Interrupt 0x0 is enabled
SES: Button Interrupt 0x1 is enabled
SES: LED GPIO 0x800f is enabled
DYING GASP IRQ initialized 
Register flash device: flash0
sector size 00020000 config1 addr 07b00000 config2 addr 07c00000 fixcfg addr 07d00000
l_calllog_addr 07e00000
offset = 0x04d20000
Serial: BCM63XX driver $Revision: 3.00 $
Magic SysRq with Auxilliary trigger char enabled (type ^ h for list of supported commands)
ttyS0 at MMIO 0xb0000180 (irq = 13) is a BCM63XX
ttyS1 at MMIO 0xb00001a0 (irq = 42) is a BCM63XX
Total # RxBds=1448
bcmPktDmaBds_init: Broadcom Packet DMA BDs initialized

bcmPktDma_init: Broadcom Packet DMA Library initialized
GACT probability NOT on
Mirror/redirect action on
u32 classifier
    input device check on
    Actions configured
Netfilter messages via NETLINK v0.30.
nf_conntrack version 0.5.0 (1916 buckets, 10240 max)
gre: GRE over IPv4 demultiplexor driver
ip_gre: GRE over IPv4 tunneling driver
ip_tables: (C) 2000-2006 Netfilter Core Team
TCP: cubic registered
Initializing XFRM netlink socket
NET: Registered protocol family 10
ip6_tables: (C) 2000-2006 Netfilter Core Team
IPv6 over IPv4 tunneling driver
NET: Registered protocol family 17
NET: Registered protocol family 15
Ebtables v2.0 registered
ebt_ftos registered
ebt_wmm_mark registered
8021q: 802.1Q VLAN Support v1.8
UBIFS: mounted UBI device 0, volume 0, name "rootfs_ubifs"
UBIFS: mounted read-only
UBIFS: file system size:   57266176 bytes (55924 KiB, 54 MiB, 451 LEBs)
UBIFS: journal size:       9023488 bytes (8812 KiB, 8 MiB, 72 LEBs)
UBIFS: media format:       w4/r0 (latest is w4/r0)
UBIFS: default compressor: zlib
UBIFS: reserved for root:  0 bytes (0 KiB)
VFS: Mounted root (ubifs filesystem) readonly on device 0:9.
Freeing unused kernel memory: 220k freed
starting pid 268, tty '': '/etc/init.d/rcS'
jffs2: jffs2_scan_eraseblock(): Node at 0x003217f8 {0x1985, 0xe002, 0x00000074) has invalid CRC 0x1985e002 (calculated 0x82361292)
L2TP core: blog_l2tp_rcv_check 
L2TP core driver, V2.0
PPPoL2TP kernel driver, V2.0
insmod: can't insert '/lib/modules/kmdir/kernel/net/l2tp/l2tp_fastpath.ko': No such file or directory
chipinfo: module license 'proprietary' taints kernel.
Disabling lock debugging due to kernel taint
brcmchipinfo: brcm_chipinfo_init entry
bcmxtmrt: Broadcom BCM3167D0 ATM/PTM Network Device v0.6 Feb 28 2019 19:12:24
Broadcom Ingress QoS Module  Char Driver v0.1 Feb 28 2019 19:10:12 Registered<243>

Broadcom Ingress QoS ver 0.1 initialized
BPM: tot_mem_size=134217728B (128MB), buf_mem_size <15%> =20132655B (19MB), num of buffers=9986, buf size=2016
Broadcom BPM Module Char Driver v0.1 Feb 28 2019 19:09:54 Registered<244>
NBUFF v1.0 Initialized
Initialized fcache state
Broadcom Packet Flow Cache  Char Driver v2.2 Feb 28 2019 19:10:12 Registered<242>
Created Proc FS /procfs/fcache
Broadcom Packet Flow Cache registered with netdev chain
Broadcom Packet Flow Cache learning via BLOG enabled.
[FHW]  pktDbgLvl[0xc01c0290]=0
[FHW]  fhw_construct: 
Initialized Fcache HW accelerator layer state
flwStatsThread created
Constructed Broadcom Packet Flow Cache v2.2 Feb 28 2019 19:10:12
chipId 0x631670D0
Broadcom Forwarding Assist Processor (FAP) Char Driver v0.1 Feb 28 2019 19:10:03 Registered <241>
Enabling SMISBUS PHYS_FAP_BASE[0] is 0x10c01000
FAP Soft Reset Done
4ke Reset Done
Enabling SMISBUS PHYS_FAP_BASE[1] is 0x10c01000
FAP Soft Reset Done
4ke Reset Done
FAP Debug values at 0xa5f22330 0xa5fa2330
fapGso_LoopBkThread created successfully
Allocated FAP0 SWQ_HOST2FAP_GSO_LOOPBACK_Q mem=a7ab4000 : 16384 bytes
Allocated FAP0 SWQ_FAP2HOST_GSO_LOOPBACK_Q mem=a7ab8000 : 16384 bytes
GSO LOOPBACK Cached HOST2FAP Q INFO:
 Swq =b0825e50 qStart=a7ab4000 qEnd=a7ab8000 msgSize=4 dqm=18 fapId=0
GSO LOOPBACK Cached FAP2HOST Q INFO:
 Swq =b0825e20 qStart=a7ab8000 qEnd=a7abc000 msgSize=2 dqm=19 fapId=0
Allocated FAP0 SWQ_FAP2HOST_WFD_Q mem=a5d78000 : 7200 bytes
Allocated FAP1 SWQ_FAP2HOST_WFD_Q mem=a5d1c000 : 7200 bytes
Allocated FAP0 SWQ_FAP2HOST_WFD_Q mem=a5d7a000 : 7200 bytes
Allocated FAP1 SWQ_FAP2HOST_WFD_Q mem=a5cf8000 : 7200 bytes
Allocated FAP0 TM SDRAM Queue Storage (a5f2fbc0) : 390144 bytes @ a5800000
Allocated FAP1 TM SDRAM Queue Storage (a5fafbc0) : 390144 bytes @ a5880000
[NTC fapProto] fapReset  : Reset FAP Protocol layer
[FAP0] DSPRAM : stack <0x80000000><1536>, global <0x80000600><4576>, free <2080>, total<8192>
[FAP1] DSPRAM : stack <0x80000000><1536>, global <0x80000600><4576>, free <2080>, total<8192>
[FAP0] PSM : addr<0x80002000>, used <24304>, free <272>, total <24576>
[FAP1] PSM : addr<0x80002000>, used <24304>, free <272>, total <24576>
[FAP0] DQM : availableMemory 14668 bytes, nextByteAddress 0xE00048B0
[FAP1] DQM : availableMemory 14668 bytes, nextByteAddress 0xE00048B0
[FAP0] Initializing FAP4KE GSO LOOPBACK on fapIdx=0 ...
[FAP1] IC Timer started
[FAP0] SWQ: HOST2FAP_GSO_LOOPBACK 
[FAP1] FAP4KE WFD Init Done...
[FAP0] >>>>------------------
[FAP0] swq =80007e50 msgSize =4 words , maxDepth=1024
[FAP0] qStart =a7ab4000 qEnd=a7ab8000
[FAP0] rdPtr =a7ab4000 wrPtr=a7ab4000 count=0
[FAP0]  swq->interrupts 0 processed =0 dropped =0 
[FAP0]  Associated DQM=18 dir HOST2FAP
[FAP0] ------------------<<<<
[FAP0] SWQ: FAP2HOST_GSO_LOOPBACK 
[FAP0] >>>>------------------
[FAP0] swq =80007e20 msgSize =2 words , maxDepth=2048
[FAP0] qStart =a7ab8000 qEnd=a7abc000
[FAP0] rdPtr =a7ab8000 wrPtr=a7ab8000 count=0
[FAP0]  swq->interrupts 0 processed =0 dropped =0 
[FAP0]  Associated DQM=19 dir FAP2HOST
[FAP0] ------------------<<<<
[FAP0] FAP4KE GSO LOOPBACK Init Done...
[FAP0] IC Timer started
[FAP0] FAP4KE WFD Init Done...
[FAP1] FAP BPM Initialized.
[FAP0] FAP BPM Initialized.
Broadcom Packet Flow Cache HW acceleration enabled.
fapDrv_construct: FAP0: pManagedMemory=b0820650. wastage 8 bytes
fapDrv_construct: FAP1: pManagedMemory=b0a20650. wastage 8 bytes
bcmPktDma_bind: FAP Driver binding successfull
[FAP1] FAP TM: ON
[FAP0] FAP TM: ON
bcmxtmcfg: bcmxtmcfg_init entry
adsl: adsl_init entry
Broadcom BCM63167D0 Ethernet Network Device v0.1 Feb 28 2019 19:12:17
Broadcom GMAC Char Driver v0.1 Feb 28 2019 19:12:23 Registered<249>
Broadcom GMAC Driver v0.1 Feb 28 2019 19:12:23 Initialized
fapDrv_psmAlloc: fapIdx=1, size: 4800, offset=b0a20650 bytes remaining 7000
ETH Init: Ch:0 - 200 tx BDs at 0xb0a20650
fapDrv_psmAlloc: fapIdx=0, size: 4800, offset=b0820650 bytes remaining 7000
ETH Init: Ch:1 - 200 tx BDs at 0xb0820650
fapDrv_psmAlloc: wastage 8 bytes
fapDrv_psmAlloc: fapIdx=0, size: 4808, offset=b0821910 bytes remaining 2184
ETH Init: Ch:0 - 600 rx BDs at 0xb0821910
[FAP0] enetRxChannel 0
fapDrv_psmAlloc: wastage 8 bytes
fapDrv_psmAlloc: fapIdx=1, size: 4808, offset=b0a21910 bytes remaining 2184
ETH Init: Ch:1 - 600 rx BDs at 0xb0a21910
[FAP1] enetRxChannel 1
dgasp: kerSysRegisterDyingGaspHandler: bcmsw registered 
eth0.2:   PHY_ID <0x20000000 : 0x00> MAC : D8:47:32:79:95:14
eth0.3:   PHY_ID <0x20000001 : 0x01> MAC : D8:47:32:79:95:14
eth0.4:   PHY_ID <0x20000002 : 0x02> MAC : D8:47:32:79:95:14
eth0.5:   PHY_ID <0x20000003 : 0x03> MAC : D8:47:32:79:95:14
eth1:   PHY_ID <0x01800044 : 0x04> MAC : D8:47:32:79:95:14
Ethernet Auto Power Down and Sleep: Enabled
  Chip WAN Only Port 00000000, Defined WAN Only Port 00000000, WAN Only Port Result: 0x00000000
  Chip WAN Preffered Port 00000000, Defined WAN Preffered Port 00000000, WAN Preffered Port Result: 0x00000000
  Chip LAN Only Port 00000000, Defined LAN Only Port 00000000, LAN Only Port Result: 0x00000000
[NTC arl] arlEnable : Enabled ARL binding to FAP
Broadcom Address Resolution Logic Processor (ARL) Char Driver v0.1 Feb 28 2019 19:09:54 Registered <245>
Broadcom 802.1Q VLAN Interface, v0.1
Loading PCM shim driver
Endpoint: endpoint_init entry
Endpoint: endpoint_init COMPLETED
Wifi Forwarding Driver is initialized!
Initializing WLCSM Module
WLCSM Module loaded successfully 
dhd_module_init in
dhd_queue_budget = 256
dhd_sta_threshold = 512
no wifi platform data, skip
dhdpcie_chipmatch: Unsupported vendor 14e4 device 435f
dhdpcie_pci_probe: chipmatch failed!!
PCI_PROBE:  bus 2, slot 0,vendor 14E4, device AA52(good PCI location)
dhdpcie_init: can't find adapter info for this chip
PCI: Enabling device 0000:02:00.0 (0000 -> 0002)
DHD: dongle ram size is set to 983040(orig 983040) at 0x180000
dhd_attach: wl0: pre-allocated buffer mode is enabled (allocskbsz=2048)
dhd_attach: wl0: watermark total is 3552
dhd_attach(): thread:dhd_watchdog_thread:16f started
dhd_attach(): thread:dhd0_dpc:170 started
dhd_deferred_work_init: work queue initialized 
 wfd_bind: Dev wl%d wfd_idx 0 Type fkb configured WFD thread wfd0-thrd RxQId (20), status (0) number_of_queues 2 qmask 0x3
Instantiating WFD 0 thread
Dongle Host Driver, version 7.14.89.3303.cpe4.16L03.0u1-kdb
Compiled in drivers/net/wireless/bcmdhd on Feb 20 2019 at 15:24:32
+++++ Added gso loopback support for dev=wl0 <84c0f800>
dhdpcie_download_code_file: download firmware /etc/wlan/dhd/43602a1/rtecdc.bin
wl:srom/otp not programmed, using main memory mapped srom info(wombo board)
wl: ID=pci/2/0/
wl: ID=pci/2/0/
wl: loading /etc/wlan/bcm43602_map.bin
wl: updating srom from flash...
wl: reading /etc/wlan/bcmcmn_nvramvars.bin, file size=224
wl: reading /etc/wlan/bcm43602_nvramvars.bin, file size=320
Replace or append with internal Mac Address
dhdpcie_bus_write_vars: Download, Upload and compare of NVRAM succeeded.
PCIe shared addr (0x001dd81c) read took 59023 usec before dongle is ready
DMA RX offset from shared Area 0
bus->txmode_push is set to 0
ring_info_raw: 56 
ac a7 26 00 3c b0 26 00 54 b2 26 00 6c b4 26 00 
78 b4 26 00 00 00 00 00 00 00 00 00 00 00 00 00 
00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
00 00 00 00 86 00 00 00 
dhdpcie_readshared: max H2D queues 134
dhd_bus_start: Initializing 134 flowrings
dhd_bus_cmn_writeshared:
  0000: 00 80 9c 05 00 00 00 00 
dhd_bus_cmn_writeshared:
  0000: 00 94 9d 05 00 00 00 00 
dhd_bus_cmn_writeshared:
  0000: 00 00 9d 05 00 00 00 00 
dhd_bus_cmn_writeshared:
  0000: 00 80 ed 05 00 00 00 00 
dhd_bus_cmn_writeshared:
  0000: 00 20 05 07 00 00 00 00 
dhd_bus_cmn_writeshared:
  0000: 04 c5 94 00 
dhd_bus_cmn_writeshared:
  0000: 00 00 00 08 
CUR_ETHERADDR : 6 
d8 47 32 79 95 14 
dhd_sync_with_dongle: GET_REVINFO device 0xbc430000, vendor 0xe4140000, chipnum 0x52aa0000
Broadcom PCI Device 0x6326 has allocated with driver pcieport
dhd_module_init out
CONSOLE: hndarm_armr addr: 0x18002000, cr4_idx: 0
CONSOLE: 000000.001 
CONSOLE: RTE (PCIE-MSG_BUF) 7.14.89.3303 (r542340) on BCM43602 r1 @ 40.0/160.0/160.0MHz
CONSOLE: 000000.008 allocating a max of 511 rxcplid buffers
CONSOLE: 000000.008 pciemsgbuf0: Broadcom PCIE MSGBUF driver
CONSOLE: 000000.016 reclaim section 0: Returned 47532 bytes to the heap
CONSOLE: 000000.052 wl0: Broadcom BCM43602 802.11 Wireless Controller 7.14.89.3303 (r542340)
CONSOLE: 000000.052 TCAM: 256 used: 203 exceed:0
CONSOLE: 000000.053 reclaim section 1: Returned 141244 bytes to the heap
CONSOLE: 
--SMP support
wl: dsl_tx_pkt_flush_len=338
wl: norm_wmark_tot=3552, pktc_wmark_tot=3552
wl 0000:00:00.0: setting latency timer to 64
wl: passivemode=1
wl1: creating kthread wl1-kthrd
wl: napimode=0
Neither SPROM nor OTP has valid image
wl:srom/otp not programmed, using main memory mapped srom info(wombo board)
wl: ID=sb/0/
wl: ID=sb/0/
wl: loading /etc/wlan/bcm6362_map.bin
wl: updating srom from flash...
wl: updating srom from flash...
srom rev:8
wl: reading /etc/wlan/bcmcmn_nvramvars.bin, file size=224
wl1: allocskbmode=1 currallocskbsz=2300
 wfd_bind: Dev wl%d wfd_idx 1 Type skb configured WFD thread wfd1-thrd RxQId (21), status (0) number_of_queues 2 qmask 0xc
Instantiating WFD 1 thread
+++++ Added gso loopback support for dev=wl1 <84ad8800>
wl1: Broadcom BCM435f 802.11 Wireless Controller 7.14.89.3303.cpe4.16L03.0u1-kdb
dgasp: kerSysRegisterDyingGaspHandler: wl1 registered 
ehci_hcd: USB 2.0 'Enhanced' Host Controller (EHCI) Driver
PCI: Enabling device 0000:00:0a.0 (0000 -> 0002)
ehci_hcd 0000:00:0a.0: setting latency timer to 64
ehci_hcd 0000:00:0a.0: EHCI Host Controller
ehci_hcd 0000:00:0a.0: new USB bus registered, assigned bus number 1
ehci_hcd 0000:00:0a.0: Enabling legacy PCI PM
ehci_hcd 0000:00:0a.0: irq 18, io mem 0x10002500
ehci_hcd 0000:00:0a.0: USB f.f started, EHCI 1.00
hub 1-0:1.0: USB hub found
hub 1-0:1.0: 2 ports detected
ohci_hcd: USB 1.1 'Open' Host Controller (OHCI) Driver
PCI: Enabling device 0000:00:09.0 (0000 -> 0002)
ohci_hcd 0000:00:09.0: setting latency timer to 64
ohci_hcd 0000:00:09.0: OHCI Host Controller
ohci_hcd 0000:00:09.0: new USB bus registered, assigned bus number 2
ohci_hcd 0000:00:09.0: irq 17, io mem 0x10002600
hub 2-0:1.0: USB hub found
hub 2-0:1.0: 2 ports detected
Initializing USB Mass Storage driver...
usbcore: registered new interface driver usb-storage
USB Mass Storage support registered.
hub 1-0:1.0: over-current condition on port 2
dns_init
domain_name:tplinkmodem.net
PPP MPPE Compression module registered
PPTP driver version 0.8.5
insmod: can't insert '/lib/modules/kmdir/kernel/drivers/net/ppp/pptp_fastpath.ko': No such file or directory

Please press Enter to activate this console. BOS: Enter bosInit 
bosTimerInit
Enter bosAppInit Exit bosAppInit BOS: Exit bosInit 
00:00:12  RTP read thread started with pid 433 

00:00:12  RTP read thread started with pid 434 

00:00:12  RTP read thread started with pid 435 

00:00:12  RTP read thread started with pid 436 

00:00:12  RTP read thread started with pid 437 

00:00:12  RTP read thread started with pid 438 

00:00:12  RTP read thread started with pid 439 

00:00:12  RTP read thread started with pid 440 

00:00:12  RTP read thread started with pid 441 

00:00:12  RTP read thread started with pid 442 

00:00:12  RTP read thread started with pid 443 

00:00:12  RTP read thread started with pid 444 

00:00:12  RTP read thread started with pid 445 

00:00:12  RTP read thread started with pid 446 

00:00:12  RTP read thread started with pid 447 

00:00:12  RTP read thread started with pid 448 

00:00:12  RTP read thread started with pid 449 

00:00:12  RTP read thread started with pid 450 

00:00:12  RTP read thread started with pid 451 

00:00:12  RTP read thread started with pid 452 

00:00:12  RTCP thread started with pid 453 

00:00:12 rtpInit: RTCP task created, taskId = 21526
[ dm_readFile ] 2063:  can not open xml file /var/tmp/pc/reduced_data_model.xml!, about to open file /etc/reduced_data_model.xml
seq1 = 23 addr1 00fc0000 seq2 = 24 addr2 04d20000
curr config index = 24,raddr = 04d20000 waddr = 00fc0000, reading config
cfg header is : 00 00 23 09 98 76 54 32 f1 50 c3 18 00 18 00 01 55 aa 00 01 01 00 00 00 
[ initKernelMonitorFd ] 446:  kernelMonitorFd=6

monitor task is initialized pid= 623 
[ initKernelMonitorFd ] 464:  registered fd 6 with kernel monitor

[ rsl_initDevInfo ] 1517:  Get hwver 2.0 from flash .
ddns_ud> start enable = 0, server: , auth: , request 
[ oal_eth_setPauseEnable ] 1032:  ZYH: value: 00821f0f
ioctl: No such device
Note: Loading 6300 MDK (default) driver for 63167 chip 
Note: Forcing 53115 driver for 53134 
Switch MDK: num_switches = 2
Switch MDK: unit = 0; phy_pbmp = 0x8; config_pbmp = 0x18 
ADDRCONF(NETDEV_UP): br0: link is not ready
Switch MDK: unit = 1; phy_pbmp = 0xf; config_pbmp = 0xf 
Switch MDK link poll thread: unit=1; phypbmp=0xf config_pbmp=0xf
Switch MDK link poll thread: unit=0; phypbmp=0x8 config_pbmp=0x18
Energy Efficient Ethernet: Enabled
ADDRCONF(NETDEV_UP): eth0.2: link is not ready
device eth0.2 entered promiscuous mode
Success 
ADDRCONF(NETDEV_UP): eth0.3: link is not ready
device eth0.3 entered promiscuous mode
Success 
ADDRCONF(NETDEV_UP): eth0.4: link is not ready
device eth0.4 entered promiscuous mode
Success 
ADDRCONF(NETDEV_UP): eth0.5: link is not ready
device eth0.5 entered promiscuous mode
Success 
[DBG:700] ADSL driver returns error

[ oal_dsl_isAtmConnection ] 4002:  Failed t*** dslThread dslPid=691
BcmAdsl_Initialize=0xC0390050, g_pFnNotifyCallback=0xC03CC270
o freshAdslMibInfo
lmemhdr[2]=0x100CE000, pAdslLMem[2]=0x100CE000
AdslCoreSetSdramImageAddr: lmem2(0xce000) vs ADSL_PHY_SDRAM_BIAS(0xce000); origAddr=0xA7ECE000 newAddr=0xA7ECE000
pSdramPHY=0xA7FFFFF8, 0xFFFFFFFF 0xFFFFFFFF
*** XfaceOffset: 0x5FF90 => 0x5FF90 ***
*** PhySdramSize got adjusted: 0xF7BE4 => 0x12C0C0 ***
AdslCoreSharedMemInit: shareMemSize=24352(24352)
AdslCoreHwReset:  pLocSbSta=84ae0000 bkupThreshold=3072
AdslCoreHwReset:  AdslOemDataAddr = 0xA7FB6608, time=16 ms
VersionInfo: A2pv6F039v2.d26m
***BcmDiagsMgrRegisterClient: 0 ***
dgasp: kerSysRegisterDyingGaspHandler: dsl0 registered 
bcmxtmcfg: DS xDSL G.inp Mode = DISABLED 
bcmxtmcfg: xDSL G.Fast Mode = DISABLED 
fapDrv_psmAlloc: fapIdx=1, size: 1600, offset=b0a22be0 bytes remaining 584
XTM Init: Ch:0 - 200 rx BDs at 0xb0a22be0
fapDrv_psmAlloc: fapIdx=1, size: 128, offset=b0a23220 bytes remaining 456
XTM Init: Ch:1 - 16 rx BDs at 0xb0a23220
bcmxtmrt: PTM/ATM Non-Bonding Mode configured in system
bcmxtmcfg: Out of sequence call to XTM_ASM_HANDLER::Uninitialize().  Recovering.
bcmxtmcfg: ATM Bonding configured in system. Fallback mode = Enabled 
bcmxtmcfg: Bonding State is DATA_IDLE 
bcmxtmcfg: SID MODE SET to 12 BIT MODE 
bcmxtmcfg: ATM Bonding Mgmt Log Area = 82824d04 
[ rsl_wan_wanMacConnToolInit ] 1059:  finish rsl_wan_wanMacConnToolInit

open DNS error: No such file or directory
[ oal_sys_getOldTZInfo ] 519:  Open TZ file error!
Setting SSID: "WiFi-9514"
Chanspec set to 0x1806
wlctl: Unsupported
wlctl: Bad Argument
wlctl: Not up
device wl1 entered promiscuous mode
br0: port 5(wl1) entered forwarding state
br0: port 5(wl1) entered forwarding state
sh: can't create /proc/sys/net/ipv6/conf/wl1.1/disable_ipv6: nonexistent directory
brctl: iface wl1.1: No such device
sh: can't create /proc/sys/net/ipv6/conf/wl1.3/disable_ipv6: nonexistent directory
brctl: iface wl1.3: No such device
sh: can't create /proc/sys/net/ipv6/conf/wl1.4/disable_ipv6: nonexistent directory
brctl: iface wl1.4: No such device
sh: can't create /proc/sys/net/ipv6/conf/wl1.2/disable_ipv6: nonexistent directory
brctl: iface wl1.2: No such device
Setting SSID: "WiFi-9514-5G"
CONSOLE: 000018.551 wl0: wlc_enable_probe_req: state down, deferring setting of host flags
Chanspec set to 0xe02a
wlctl: Bad Argument
dhd_wmf_igs_broadcast: WMF: send failure
IGMP Query send failed
CONSOLE: 000020.031 wl0: wlc_enable_probe_req: state down, deferring setting of host flags
acsd: scan in progress ...
acsd: scan in progress ...
acsd: scan in progress ...
device wl0 entered promiscuous mode
br0: port 6(wl0) entered forwarding state
br0: port 6(wl0) entered forwarding state
sh: can't create /proc/sys/net/ipv6/conf/wl0.1/disable_ipv6: nonexistent directory
brctl: iface wl0.1: No such device
sh: can't create /proc/sys/net/ipv6/conf/wl0.3/disable_ipv6: nonexistent directory
brctl: iface wl0.3: No such device
sh: can't create /proc/sys/net/ipv6/conf/wl0.4/disable_ipv6: nonexistent directory
brctl: iface wl0.4: No such device
sh: can't create /proc/sys/net/ipv6/conf/wl0.2/disable_ipv6: nonexistent directory
brctl: iface wl0.2: No such device
sendto /var/tmp/8 msg 2030 error No such file or directory ,pid 425
acsd: scan in progress ...
sendto /var/tmp/8 msg 2030 error No such file or directory ,pid 425
sendto /var/tmp/9 msg 2004 error No such file or directory ,pid 425
killall: dnsmasq: no process killed
acsd: scan in progress ...
acsd: scan in progress ...
HTB: quantum of class 510053 is big. Consider r2q change.
HTB: quantum of class 510054 is big. Consider r2q change.
acsd: scan in progress ...
[ tc_getWanItfNameList ] 390:  Get WAN interface name FAILED!  (wanConnNum=0)

tun: Universal TUN/TAP device driver, 1.6
tun: (C) 1999-2004 Max Krasnyansky 
insmod: can't insert '/lib/modules/kmdir/kernel/drivers/net/ppp/ppp_mppe.ko': File exists
[ rsl_getManagementServerObj ] 619:  cannot set connectionRequestURL yet because no WAN intf is up
acsd: scan in progress ...
[ rsl_getManagementServerObj ] 619:  cannot set connectionRequestURL yet because no WAN intf is up
[ rsl_getManagementServerObj ] 619:  cannot set connectionRequestURL yet because no WAN intf is up
iptables: Bad rule (does a matching rule exist in that chain?).
iptables: Bad rule (does a matching rule exist in that chain?).
radvd starting
acsd: scan in progress ...
ADDRCONF(NETDEV_UP): eth1: link is not ready
ifconfig: ioctl 0x8913 failed: No such device
[ wan_conn_pppoeConn ] 089:  L2 interface not exist(up), don't start pppd!
ifconfig: ioctl 0x8913 failed: No such device
[ wan_conn_pppoeConn ] 089:  L2 interface not exist(up), don't start pppd!
eth1.2 MAC address set to D8:47:32:79:95:14
netdev path : eth1.2 -> eth1
BCMVLAN : eth1 mode was set to RG
acsd: selected channel spec: 0xe09b
acsd: Adjusted channel spec: 0xe09b
acsd: selected DFS-exit channel spec: 0xe09b
Created new Tag Rule: dev=eth1, dir=1, tags=0, id=0

Created new Tag Rule: dev=eth1, dir=0, tags=0, id=0

Created new Tag Rule: dev=eth1, dir=0, tags=1, id=0

Created new Tag Rule: dev=eth1, dir=0, tags=2, id=0

Created new Tag Rule: dev=eth1, dir=0, tags=1, id=1

Created new Teth1.2 MAC address set to 22:47:32:79:95:15
ag Rule: dev=device eth1 entered promiscuous mode
eth1, dir=0, tags=2, id=1

acsd: selected channel spec: 0xe09b
acsd: Adjusted channel spec: 0xe09b
acsd: selected channel spec: 0xe09b
[ getPidFromPidFile ] 112:  Cann't open file: /var/run/zebra.pid.
[ getPidFromPidFile ] 112:  Cann't open file: /var/run/ripd.pid.
iptables: Bad rule (does a matching rule exist in that chain?).
iptables: Bad rule (does a matching rule exist in that chain?).
iptables: Bad rule (does a matching rule exist in that chain?).
acsd: scan in progress ...
rmmod: can't unload 'nf_nat_sip': unknown symbol in module, or unknown parameter
rmmod: can't unload 'nf_conntrack_sip': unknown symbol in module, or unknown parameter
rmmod: can't unload 'nf_nat_rtsp': unknown symbol in module, or unknown parameter
rmmod: can't unload 'nf_conntrack_rtsp': unknown symbol in module, or unknown parameter
acsd: scan in progress ...
iptables: Bad rule (does a matching rule exist in that chain?).
[ rsl_setLanWlanAccelation ] 9404:  Set fcache enable.
ip6tables: Bad rule (does a matching rule exist in that chain?).
ip6tables: Bad rule (does a matching rule exist in that chain?).
acsd: scan in progress ...
bosEventRegisterTask() - No free entries in TCB listbosEventRegisterTask() - No free entries in TCB listbosEventRegisterTask() - No free entries in TCB listbosEBOS: Enter bosInit 
BOS: Exit bosInit 
ventRegisterTask() - No free entries in TCB listbosEventRegisterTask() - No free entries in TCB listvrgEndptDriverOpen: Endpoint driver open success
1451606432 140024 ERR            openDriver 03996 01024 ¡ö Totally 2 endpts, but we thought it should be 6
acsd: scan in progress ...
rsl_setStorageServiceObj(): before 0 usb de******* DSP: Found BCM63268 *******
******* DSP: In PCM Mode *******
******* DSP: PCM running in 16 bit mode *******
vices and 0 logical volumegInterruptCounter     = 0xC0B0B814 
s are alive
rgInterruptErrors      = 0xC0B0B810 
gNextRxDesc           = 0xC0B0B948 
sl_setStorageServiceObj(): 0 usb devices and 0 logical volumes argNextTxDesc           = 0xC0B0B94C 
gDectTestMode         = 0xc0b0b95c 
e alive
mountflag : 3
[ rsl_setStorageServiceObj ] 1717:  mountdectBuffStart         = 0xc0b0b950 
Flag is 3,We gDectRxOutOfSyncCounter = 0xc0b0b970 
start usb server

gDectTxOutOfSyncCounter = 0xc0b0b974 
32 ms ECAN tail-length
*** gStartRxDesc[0] = 0xA2012000 
*** gBufferSizeBytes = 640 
*** gStartTxDesc[0] = 0xA20127D0 
halPcmInit 367 nextTxDesc = 0xA20127D0 
halPcmInit 367 nextTxDesc = 0xA20127D8 
halPcmIkillall: mnit 371 Ownership for TX desc not set. Use this buffer. 
inidlnad: no Binding 0x82b90e68
process killed
acsd: scan in progress ...
acsd: scan in progress ...
acsd: scan in progress ...
acsd: scan in progress ...
acsd: scan in progress ...
acsd: scan in progress ...
acsd: scan in progress ...
iptables: Bad rule (does a matching rule exist in that chain?).
iptables: Bad rule (does a matching rule exist in that chain?).
boardHalInit completed
[ERROR ept] endpacsd: scantProvInitDefaults,645: (ts: 34s 320ms):ERROR provision item is not configured
 in progress ...
ip6tables: Bad rule (does a matching rule e0    | 208   | EPPROV_ToneCallWaiting       | 292 
[ERROR ept] endptProvInitDefaults,645: (ts: 34s 345ms):ERROR provision item is not configured
0    | 210   | EPPROV_ToneCallWaiting2      | 292 
[ERROR ept] endptProvInitDefaults,645: (ts: 34s 359ms):ERROR provision item is not configured
0    | 211   | EPPROV_ToneCallWaiting3      | 292 
[ERROR ept] endptProvInitDefaults,645: (ts: 34s 374ms):ERROR provision item is not configured
xist in that chain?).
0    | 212   | EPPROV_ToneCallWaiting4      | 292 
[ERROR ept] endptProvInitDefaults,645: (ts: 34s 401ms):ERROR provision item is not configured
0    | 218   | EPPROV_ToneCongestion        | 292 
[ERROR ept] endptProvInitDefaults,645: (ts: 34s 419ms):ERROR provision item is not configured
1    | 208   | EPPROV_ToneCallWaiting       | 292 
[ERROR ept] endptProvInitDefaults,645: (ts: 34s 434ms):ERROR provision item is not configured
1    | 210   | EPPROV_ToneCallWaiting2      | 292 
[ERROR ept] endptProvInitDefaults,645: (ts: 34s 448ms):ERROR provision item is not configured
1    | 211   | EPPROV_ToneCallWaiting3      | 292 
[ERROR ept] endptProvInitDefaults,645: (ts: 34s 463ms):ERROR provision item is not configured
1    | 212   | EPPROV_ToneCallWaiting4      | 292 
[ERROR ept] endptProvInitDefaults,645: (ts: 34s 484ms):ERROR provision item is not configured
1    | 218   | EPPROV_ToneCongestion        | 292 
DSP: Interrupt Ids
---------------
InterruptId/Location      = 42/HIGH 

DSP: Interrupt Masks
---------------
IrqMask                   = 0x0000B100 
IrqMaskLow                = 0x83806680 
IrqMask1                  = 0x00000400 
IrqMaskLow1               = 0x00000020 

DSP: Interrupt Status
-----------------
IrqStatus                 = 0x00000000 
IrqStatusLow              = 0x00038000 
IrqStatus1                = 0x00000000 
IrqStatusLow1             = 0x00038000 
acsd: scan in progress ...
acsd: selected channel spec: 0x1006
acsd: Adjusted channel spec: 0x1006
acsd: selected DFS-exit channel spec: 0x1006
acsd: selected channel spec: 0x1006
acsd: Adjusted channel spec: 0x1006
acsd: selected channel spec: 0x1006
EndpointInit completed
dgasp: kerSysRegisterDyingGaspHandler: endpoint registered 
00:00:35 Endpoint Event task started with pid 2793...

00:00:35 Endpoint Packet task started with pid 2794 ...

Broadcom Packet Flow Cache flushing the flows
open DNS error: No such file or directory

```

Nailed it! Somehow. Now that we have output from UART that looks to be in order. We can see that the RAM total is reported as 134217728 bytes (128MB). And the NAND itself is an ESMT F59L1G81MA, id 0xc8d1 block 128KB size 131072KB (128MB). The BCM63167D0 seems to be a D0 revision of the BCM63167 chipset along with the BCM963268 chip. Remember this is a TP-LINK Archer VR1600v V2 (AU).

![](/assets/images/2021/img_0702.jpg)

Well that's promising, a login prompt. Except it's not useful without a valid login. One of the threads above had a potential login for another model. I don't remember trying it, but we need even root-ier access. Looking back at the boot code above we find this.

 

```
*** Press 't' to stop auto run (0.1 seconds) ***

```

0.1 seconds to stop auto run. Sure why not! Let's see what happens.

![](/assets/images/2021/img_0703.jpg)

I might have spammed the t key a little too much. That's new, a [CFE prompt](https://openwrt.org/docs/techref/bootloader/cfe).

> Common Firmware Environment, sometimes pronounced as 'cafe', is a firmware interface and bootloader developed by Broadcom for 32-bit and 64-bit system-on-a-chip systems.

![](/assets/images/2021/img_0704.jpg)

Running a help commands gives us the lowdown on what's available. Let's start with something basic - dn for dumping the NAND.

 

```
CFE> help
Available commands:

fb                  Find NAND bad blocks
dn                  Dump NAND contents along with spare area
phy                 Set memory or registers.
mtest               Test memory.
sm                  Set memory or registers.
dm                  Dump memory or registers.
db                  Dump bytes.
dh                  Dump half-words.
dw                  Dump words.
e                   Erase NAND flash
r                   Run program from flash image or from host depend on [f/h] flag
p                   Print boot line and board parameter info
c                   Change booline parameters
f                   Write image to the flash 
i                   Erase persistent storage data
a                   Change board AFE ID
b                   Change board parameters
reset               Reset the board
pmdio               Pseudo MDIO access for external switches.
spi                 Legacy SPI access of external switch.
force               override chipid check for images.
help                Obtain help for CFE commands

For more information about a command, enter 'help command-name'
*** command status = 0
CFE> dn
------------------ block: 0, page: 0 ------------------
read : 0
00000000: 10000024 00000000 80003c38 80003c40    ...$......<8..<@
00000010: 80003c90 80003cd0 80000000 80003c90    ..<...<.......<.
00000020: 8000bc60 00000000 00000000 00000000    ...`............
00000030: 80001d50 80001e5c 80001e54 80003658    ...P...\...T..6X
00000040: 80003744 80003744 80003744 8000374c    ..7D..7D..7D..7L
00000050: 800023b8 80003754 8000380c 800014cc    ..#...7T..8.....
00000060: 800014bc 800014c4 80001f1c 800014a8    ................
00000070: 80002060 80001d3c 80001ea8 80003744    .. `...<......7D
00000080: 80003744 80003744 80001ef0 80003588    ..7D..7D......5.
00000090: 80003590 0000e021 04110001 00000000    ..5....!........
000000a0: 00000000 3c151fff 02bfa824 3c168000    ....<......$<...
000000b0: 26d600bc 04110001 00000000 03f6b022    &.............."
000000c0: 02a02021 3c1b8000 277b0030 0376d821    .. !<...'{.0.v.!
000000d0: 3c01a000 0361d825 8f7b0000 0376d821    <....a.%.{...v.!
000000e0: 3c01a000 0361d825 0360f809 00000000    <....a.%.`......
000000f0: 3c044845 34844c4f 3c1b8000 277b0030    <.HE4.LO<...'{.0
00000100: 0376d821 3c01a000 0361d825 8f7b0004    .v.!<....a.%.{..
00000110: 0376d821 3c01a000 0361d825 0360f809    .v.!<....a.%.`..
00000120: 00000000 3c1b8000 277b0030 0376d821    ....<...'{.0.v.!
00000130: 3c01a000 0361d825 8f7b000c 0376d821    <....a.%.{...v.!
00000140: 3c01a000 0361d825 0360f809 00000000    <....a.%.`......
00000150: 041102f5 00000000 3c168000 26d60168    ........<...&..h
00000160: 04110001 00000000 03f6b022 3c1b8000    ..........."<...
00000170: 277b0030 0376d821 8f7b0040 0376d821    '{.0.v.!.{.@.v.!
00000180: 0360f809 00000000 3c1b8000 277b0030    .`......<...'{.0
00000190: 0376d821 8f7b005c 0376d821 0360f809    .v.!.{.\.v.!.`..
000001a0: 00000000 14400009 00000000 00000000    .....@..........
000001b0: 3c1b8000 277b0030 0376d821 8f7b0038    <...'{.0.v.!.{.8
000001c0: 0376d821 0360f809 00000000 00000000    .v.!.`..........
000001d0: 3c048000 24840d44 00962021 3c1b8000    <...$..D.. !<...
000001e0: 277b0030 0376d821 8f7b0048 0376d821    '{.0.v.!.{.H.v.!
000001f0: 0360f809 00000000 0411025c 00000000    .`.........\....
00000200: 00000000 3c044452 3484414d 3c1b8000    ....<.DR4.AM<...
00000210: 277b0030 0376d821 8f7b0004 0376d821    '{.0.v.!.{...v.!
00000220: 0360f809 00000000 3c1b8000 277b0030    .`......<...'{.0
00000230: 0376d821 8f7b0008 0376d821 0360f809    .v.!.{...v.!.`..
00000240: 00000000 00402021 3c1b8000 277b0030    .....@ !<...'{.0
00000250: 0376d821 8f7b0020 0376d821 0360f809    .v.!.{. .v.!.`..
00000260: 00000000 3c1b8000 277b0030 0376d821    ....<...'{.0.v.!
00000270: 8f7b003c 0376d821 0360f809 00000000    .{.<.v.!.`......
00000280: 0040d021 1740000c 00000000 3c045241    .@.!.@......<.RA
00000290: 34844d58 3c1b8000 277b0030 0376d821    4.MX<...'{.0.v.!
000002a0: 8f7b0004 0376d821 0360f809 00000000    .{...v.!.`......
000002b0: 1000ffff 00000000 24180100 031a082a    ........$......*
000002c0: 14200002 00000000 0340c021 0018c500    . .......@.!....
000002d0: 241e0000 24190000 3c048000 24840008    $...$...<...$...
000002e0: 00962021 8c9c0018 039ee020 3c045a42    .. !....... <.ZB
000002f0: 34845353 3c1b8000 277b0030 0376d821    4.SS<...'{.0.v.!
00000300: 8f7b0004 0376d821 0360f809 00000000    .{...v.!.`......
00000310: 3c048000 24840008 00962021 8c820014    <...$..... !....
00000320: 8c83000c 005e1020 007e1820 ac400000    .....^. .~. .@..
00000330: ac400004 ac400008 ac40000c 20420010    .@...@...@.. B..
00000340: 0043082a 1420fff9 00000000 3c04434f    .C.*. ......<.CO
00000350: 34844445 3c1b8000 277b0030 0376d821    4.DE<...'{.0.v.!
00000360: 8f7b0004 0376d821 0360f809 00000000    .{...v.!.`......
00000370: 3c048000 24840008 00962021 8c890010    <...$..... !....
00000380: 0120b821 8c8a0010 01565021 8c8b0000    . .!.....VP!....
00000390: 01765821 8d4c0000 8d4d0004 8d4e0008    .vX!.L...M...N..
000003a0: 8d4f000c ad2c0000 ad2d0004 ad2e0008    .O...,...-......
000003b0: ad2f000c 21290010 214a0010 014b082b    ./..!)..!J...K.+
000003c0: 1420fff4 00000000 3c044441 34845441    . ......<.DA4.TA
000003d0: 3c1b8000 277b0030 0376d821 8f7b0004    <...'{.0.v.!.{..
000003e0: 0376d821 0360f809 00000000 3c048000    .v.!.`......<...
000003f0: 24840008 00962021 8c890004 01364821    $..... !.....6H!
00000400: 2408000f 01284820 01004027 01284824    $....(H ..@'.(H$
00000410: 8c8a0004 8c8b0008 015e5020 017e5820    .........^P .~X 
00000420: 8d2c0000 8d2d0004 8d2e0008 8d2f000c    .,...-......./..
00000430: ad4c0000 ad4d0004 ad4e0008 ad4f000c    .L...M...N...O..
00000440: 21290010 214a0010 014b082b 1420fff4    !)..!J...K.+. ..
00000450: 00000000 1000014b 00000000 00000000    .......K........
00000460: 00000000 00000000 00000000 00000000    ................
00000470: 00000000 00000000 00000000 00000000    ................
00000480: 00000000 00000000 00000000 00000000    ................
00000490: 00000000 00000000 00000000 00000000    ................
000004a0: 00000000 00000000 00000000 00000000    ................
000004b0: 00000000 00000000 00000000 00000000    ................
000004c0: 00000000 00000000 00000000 00000000    ................
000004d0: 00000000 00000000 00000000 00000000    ................
000004e0: 00000000 00000000 00000000 00000000    ................
000004f0: 00000000 00000000 00000000 00000000    ................
00000500: 00000000 00000000 00000000 00000000    ................
00000510: 00000000 00000000 00000000 00000000    ................
00000520: 00000000 00000000 00000000 00000000    ................
00000530: 00000000 00000000 00000000 00000000    ................
00000540: 00000000 00000000 00000000 00000000    ................
00000550: 00000000 00000000 00000000 00000000    ................
00000560: 00000000 00000000 00000000 00003c90    ..............<.
00000570: 6366652d 76010026 74ae0000 00000000    cfe-v..&t.......
00000580: 00000006 653d3139 322e3136 382e312e    ....e=192.168.1.
00000590: 313a6666 66666666 30302068 3d313932    1:ffffff00 h=192
000005a0: 2e313638 2e312e31 30302067 3d20723d    .168.1.100 g= r=
000005b0: 6620663d 766d6c69 6e757820 693d6263    f f=vmlinux i=bc
000005c0: 6d393633 78785f66 735f6b65 726e656c    m963xx_fs_kernel
000005d0: 20643d31 20703d30 20633d20 613d2000     d=1 p=0 c= a= .
000005e0: ffffffff ffffffff ffffffff ffffffff    ................
000005f0: ffffffff ffffffff ffffffff ffffffff    ................
00000600: ffffffff ffffffff ffffffff ffffffff    ................
00000610: ffffffff ffffffff ffffffff ffffffff    ................
00000620: ffffffff ffffffff ffffffff ffffffff    ................
00000630: ffffffff ffffffff ffffffff ffffffff    ................
00000640: ffffffff ffffffff ffffffff ffffffff    ................
00000650: ffffffff ffffffff ffffffff ffffffff    ................
00000660: ffffffff ffffffff ffffffff ffffffff    ................
00000670: ffffffff ffffffff ffffffff ffffffff    ................
00000680: ffffffff 39363331 36375450 5f564f49    ....963167TP_VOI
00000690: 50000000 00000000 00000030 0000000b    P..........0....
000006a0: e005c506 001cff00 cd8c9daa 00000000    ................
000006b0: 00000000 00000000 00000000 00000000    ................
000006c0: 00000000 ffffffff ffffffff 00027362    ..............sb
000006d0: 2f302f00 00000000 00000000 00000009    /0/.............
000006e0: 0061ff13 00621744 0063fa91 0071ff61    .a...b.D.c...q.a
000006f0: 00721788 0073faec 00000000 00000000    .r...s..........
00000700: 00000000 7063692f 322f302f 00000000    ....pci/2/0/....
00000710: 00000000 00280074 ff4f0075 1afc0076    .....(.t.O.u...v
00000720: fcde0077 ff370078 13690079 fd8f007a    ...w.7.x.i.y...z
00000730: ff43007b 1403007c fd8a007d ff70007e    .C.{...|...}.p.~
00000740: 17dc007f fd610088 ff650089 1842008a    .....a...e...B..
00000750: fd54008b ff3b008c 12a9008d fd9f008e    .T...;..........
00000760: ff46008f 12fd0090 fda20091 ff760092    .F...........v..
00000770: 181f0093 fd7c009c ff4e009d 1812009e    .....|...N......
00000780: fd29009f ff4c00a0 135400a1 fd9f00a2    .)...L...T......
00000790: ff4800a3 134600a4 fd9f00a5 ff4a00a6    .H...F.......J..
000007a0: 16dd00a7 fd3600b7 250900be 000000bf    .....6..%.......
000007b0: 000000c6 41160000 00000000 00000000    ....A...........
000007c0: 00000000 00000000 00000000 00000000    ................
000007d0: 00000000 00000080 0000f600 0001ec00    ................
000007e0: 0001fc00 00000080 0000f580 0000f580    ................
000007f0: 00001000 00000400 4c453936 34325f5a    ........LE9642_Z

----------- spare area for block 0, page 0 -----------
00000800: ff198520 03000000 0806db15 fc545269    ... .........TRi
00000810: ffffffff ffffffff ff03c53d 8b3c38cc    ...........=.<8.
00000820: ffffffff ffffffff ff0bb75c 5ac953cd    ...........\Z.S.
00000830: ffffffff ffffffff ff00e73b c5fba68b    ...........;....

*** command status = 1
CFE> 

```

The next part gets a little messy, alright messier. After trying a few tools such as [FlashDumpScript](https://github.com/waldo-irc/IOTToolkit/tree/master/FlashDumpScript) and Python 2 vs Python 3 issues. I came across this [Polish forum post](https://openrouter.info/forum/viewtopic.php?f=24&t=4818&start=0&_x_tr_sl=pl&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=sc), with the help of Google Translate... I ended up with [this](https://web.archive.org/web/20230822235816/https://openrouter-info.translate.goog/forum/viewtopic.php?f=24&t=4818&start=0&_x_tr_sl=pl&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=sc) - which led me onto [this set of tools](https://github.com/danitool/bootloader-dump-tools) and a slightly newer version [here](https://github.com/Depau/bcm-cfedump).

![](/assets/images/2021/img_0709.jpg)

Above is a quick peek inside the file being dumped. Why, that's html from the web interface.

![](/assets/images/2021/img_0710.jpg)

It was definitely doing something, so I left it to run overnight. [This guide](https://openwrt.org/docs/techref/hardware/soc/soc.broadcom.bcm63xx) was the key.

## Day 2

![](/assets/images/2021/img_0711.jpg)

![](/assets/images/2021/img_0712.jpg)

Hmmm, something was dumped. If we convert 33554432 from binary to decimal we get... drum roll!

![](/assets/images/2021/img_0720.jpg)

And the winner is - 32MB. So what I did was dump 32MB of **_\*something\*_** overnight. Is 32MB the right size? Probably not. Is it the right part of the firmware? Also probably not. Damn looking at the boot log above, the device has 128MB RAM and 128MB NAND. Well at least we know we can dump things somewhat.

![](/assets/images/2021/img_0713.jpg)

![](/assets/images/2021/img_0714.jpg)

The firmware for the TP-Link V1600v is not available online except through that pesky auto-download function (TR-069) that we're trying to work around. So I did a quick compare with some available firmware for the TP-Link Archer VR600v V2 and found similarities albeit at different offsets. Progress, is still progress.

![](/assets/images/2021/img_0705.jpg)

One thing I did notice while poking around in cfenand.py via the dn command and our [VR600v firmware](https://www.tp-link.com/au/support/download/archer-vr600v/#Firmware) was the repeating pattern:

```
..7D..7D..7D..7L

```

This wasn't in the test.bin from day 1, but is definitely in the firmware from TP-Link for the Archer VR600v and it's right near the top.

![](/assets/images/2021/img_0706.jpg)

That's good, more similarities - and it shows I probably was dumping the (very) wrong way.

![](/assets/images/2021/img_0707.jpg)

Viewing the code we are trying to dump is easier than dumping it, or so it would seem.

![](/assets/images/2021/img_0708.jpg)

Eventually, I entered a command that looked like it might do something. Full of hubris, I entered the file name as **_nand\_winner.img_** and left it running overnight.

## Day 3

![](/assets/images/2021/img_0715.jpg)

It dumped something overnight at 1.2 bytes per second... but we need to compare. So let's take the firmware for the VR600v again, as we have no frame of reference for the VR1600v V2. So far we have this set of firmware for comparison with our nand\_winner.img firmware.

 

```
Archer_VR600vV2_1.0.0_0.9.1_up_boot(170814)_2017-08-14_18.28.17.bin
Archer_VR600vV2_1.1.0_0.9.1_up_boot(200228)_2020-02-28_09.20.55.bin
Archer_VR600vV2_1.2.0_0.9.1_up_boot(200625)_2020-06-25_16.19.17.bin 

```

![](/assets/images/2021/img_0721.gif)

Hmm, there's differences in those fancy 7Ds we saw earlier. I should compare my firmware dump with all three and see if we have any large contiguous blocks in common.

![](/assets/images/2021/img_0723.gif)

In common? Definitely, let's adjust the offset by 512 bytes.

![](/assets/images/2021/img_0722.gif)

Well we've definitely got something that [resembles](https://fma.fandom.com/wiki/Resembool) firmware. The extra changes this early on that we see compared to the VR600v modem are likely user configuration data. Because I know that searching for my own TPG username returns a few results. Performing a factory restore on the modem and dumping the same data again overnight.

![](/assets/images/2021/img_0716.jpg)

Probably worth mentioning that inside [bcm\_cfedump.py](https://github.com/Depau/bcm-cfedump) the only settings I changed were the following. They were also in effect for the nand\_winner.img above. They may not be correct as I am using **_a lot_** of guess work. Here's our command and the changes we made to the code.

 

```
sudo python3 -m bcm_cfedump -D /dev/ttyUSB0 -O nand.img -t 0.01 nand

```

 

```
MAX_RETRIES = 5
NAND_SIZE = 131072 * 1024
BLOCK_SIZE = 128 * 1024
PAGE_SIZE = 2048

```

Actually on second inspection I also modified bcm\_cfedump.py even further with the following code. I think that was to dump the hex on lines that started with the word "read :" - which makes sense. Not all modems are created equally.

 

```
if line.startswith(b"read :"):
continue

```

## Day 4

![](/assets/images/2021/img_0717.jpg)

![](/assets/images/2021/img_0718.jpg)

The second dump has completed. Filesizes are the same, which should be expected. Comparing the two dumps in [Hex Fiend](https://hexfiend.com) shows the following:

![](/assets/images/2021/img_0719.jpg)

Hmmm, that's not identical. That's exactly 16kB of data that isn't the same. Which means a factory restore does \*something\* but my TPG username is still in there... 🤔

![](/assets/images/2021/img_0690.jpg)

And that's it, that's as far as I got. Because the firmware has my credentials in it, I can't release it but hopefully some of the above might help you if you are trying to do something similar.

![](/assets/images/2021/img_0691.jpg)

I certainly learnt a lot from this exercise. Would I do it again? Probably not, but now the information is here if I ever do! 😄

---
title: "Sega Mega-CD Region-free BIOS Burn in the GQ-4X4"
author: "Nix McRetro"
date: 2020-08-31T13:29:25.000+10:00
categories: [guides, sega, youtube]
last_modified_at: 2026-10-18
---

{% include youtube.html id="XlMTqFnDd2g" %}

Today we have a very quick video from the archives that gives a vague idea of how I flashed a patched region-free Mega-CD BIOS. Little endian, big endian, we all cuss asparagus? It sounds terribly complicated, but once you've done it a few times the whole process isn't quite as frightening as it first appears.

I'm using my GQ-4X4 programmer for this job, along with its 16-bit EPROM adapter. It's not that I don't trust the MiniPro programmer I've also got here, but I'm rather more familiar with the GQ-4X4. When you're demonstrating something on camera, it's nice to use the equipment you're reasonably confident won't decide to do something unexpected.

The chip is a 27C1024, a 1 Mbit EPROM organised as 64K x 16. That's 1,048,576 bits, or 131,072 bytes (128 KiB), which is rather a lot of space for a console BIOS from the early 1990s. These are 16-bit devices, which is why the correct adapter is important when using this programmer.

For the software side, I loaded the patched region-free BIOS image into the GQ-4X4 application as a binary file. This particular image came from the community around ASSEMbler Games, where people have been doing some rather entertaining things with Mega-CD hardware for years.

The interesting complication is byte order. The image can appear perfectly normal when loaded into the programmer's buffer, but the Sega Mega-CD expects its 16-bit data arranged correctly for the hardware. The programmer provides a byte-swap function, which changes the order of the bytes within each 16-bit word. It's rather amusing seeing the readable text in the buffer turn into nonsense when the byte order is swapped!

Once I'd checked the selected chip, adapter and byte order, I programmed the EPROM and ran the verification. Excellent news! The write completed successfully, and the programmer reported that the device verified against the data in the buffer.

I also read the contents back for a further look and confirmed that the data appeared as expected after accounting for the byte order. So the EPROM programming side of the exercise had worked. That's not quite the same as proving the BIOS will boot in every Mega-CD, of course, but it's an encouraging result.

There are other ways of preparing the image, including external byte-swapping utilities, although I was still investigating how consistently those behaved with my different programmers. For this particular demonstration, the GQ-4X4 and its adapter did exactly what I needed.

In other news, I'm trying to decide whether to keep going with university. I've deferred for two years so far, and if it goes any further I'll lose the course. I'd best transfer to a local university that isn't two major cities away!

Anyway, another successful little ROM-programming job. Now I can send this BIOS chip back to where it belongs and move on to whatever bizarre piece of Sega hardware demands attention next.

**Sources**

- [STMicroelectronics - M27C1024 datasheet (RS-hosted copy)](https://docs.rs-online.com/54f7/0900766b800256db.pdf)

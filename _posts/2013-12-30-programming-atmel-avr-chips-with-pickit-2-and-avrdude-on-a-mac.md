---
title: "Programming Atmel AVR Chips with a PICkit 2 and AVRDUDE on a Mac"
author: "Nix McRetro"
date: 2013-12-30T05:43:56.000+11:00
last_modified_at: 2026-09-30
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-30
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [guides, programming]
---

![](/assets/images/2013/img_0435.jpg)

PICkit 2 is a Microchip programmer/debugger designed primarily for Microchip devices.

The fun part is that AVRDUDE can also use a PICkit 2 as an ISP programmer for AVR microcontrollers, including the ATmega328P I was working with here. That AVR support comes from AVRDUDE rather than Microchip's PICkit 2 application.

Back in 2013, Atmel and Microchip were separate competitors. I originally repeated speculation that Microchip had stopped supporting PICkit 2 because people were using it to program Atmel devices. I have not found evidence for that, so that claim is coming out. Microchip simply moved on to newer programmer/debugger hardware. In a fun historical twist, Microchip later acquired Atmel in 2016.

What I used:

- PICkit 2
- the programmer / adapter hardware linked from [obddiag.net](https://web.archive.org/web/20140217175948/http://www.obddiag.net/picprog.html) in the original post
- [PIC12F508](http://ww1.microchip.com/downloads/en/DeviceDoc/41236E.pdf), useful for checking that the PICkit 2 setup was functioning
- [ATmega328P](https://web.archive.org/web/20130928215235/http://www.atmel.com/Images/doc8161.pdf) as the AVR target
- AVRDUDE on the Mac

Compiling all of this was particularly entertaining because I had very little idea what I was doing! 😅

This experiment was all part of the Lunchbeat project. I originally intended to come back and document more of the process here, but that never quite happened. The project itself did continue later, including a proper Lunchbeat PICkit 2 PCB and a much longer series of hardware and programming experiments.

### Related posts

- [Lunchbeat 1-bit Groovebox by Buranelectrix: Introduction](/lunchbeat-1-bit-groovebox-by-buranelectrix-introduction/)
- [Lunchbeat 1-bit Groovebox by Buranelectrix - Demo](/lunchbeat-1-bit-groovebox-by-buranelectrix-demo/)
- [Lunchbeat PICkit 2 PCB Arrival (Part 1)](/lunchbeat-pickit-2-pcb-arrival-part-1/)

### Sources

- [Microchip Technology - PICkit 2 Development Programmer/Debugger](https://www.microchip.com/en-us/development-tool/pg164120)
- [AVRDUDE - List of Programmers](https://avrdudes.github.io/avrdude/8.1/avrdude_45.html)
- [Microchip Technology - Microchip Completes Atmel Acquisition](https://ir.microchip.com/sec-filings/all-sec-filings/content/0001193125-16-529460/d174903dex991.htm)

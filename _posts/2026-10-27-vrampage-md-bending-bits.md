---
layout: post
title: "VRAMpage MD: Bending Bits"
author: "Nix McRetro"
date: 2026-10-27T03:17:08+11:00
categories: [ai-assisted, programming, sega]
---

{% include youtube.html id="Prp6OLZkeD4" %}

*Some of [my earlier VRAM experiments](https://mcretro.net/circuit-bending-vram-on-a-sega-mega-drive-2/) on real hardware. The browser version came rather later!*

I've spent plenty of time persuading Mega Drives to produce pictures they were never asked to draw. Usually this involved a length of wire and a console that wasn't especially pleased about it. VRAMpage MD brings that experiment into the browser, with considerably less opportunity to damage the actual machine.

I worked with Codex on a modified Genesis Plus GX emulator, compiled to WebAssembly. The faults go into the emulated memory accesses and sound-chip inputs, so the emulator has to deal with the consequences. The work grew into three main parts.

![Conceptual illustration of a chip trailing rainbow pixels, memory blocks and a sound wave over an ivory workbench](/assets/images/2026/10/vrampage-md/05-bending-bits.jxl)

*Bending bits, with the soldering iron left in the drawer. Conceptual illustration.*

## Part 1: SRAM and the Game's Working Memory

The Mega Drive has 64 KiB of Work RAM, labelled **SRAM (Work RAM)** above the chip. Bridging two modelled address lines can make normally separate addresses land on the same location. Altering the data lines can change what gets read or stored.

Hooking one convenient write routine wasn't enough. Instruction fetches, ordinary reads and writes, and DMA can reach memory through different paths, so those needed checking too. Otherwise we'd have a button claiming to bend RAM while part of the emulator quietly carried on around it.

The write-only contacts became particularly useful. There are ten A11 to A15 pairs, held while pressed or applied for eight frames. Letting go disconnects the contact, but anything already written stays changed. A temporary bend can leave a fairly lasting mess inside the running game.

![A modelled A11 and A12 bridge maps FF0000, FF0800 and FF1000 to FF0000, while FF1800 stays unchanged](/assets/images/2026/10/vrampage-md/03-sram-addresses.jxl)

*Three requested addresses can land on one location. Disconnecting the bridge does not undo values already written.*

## Part 2: VRAM and the Picture

VRAM needed two approaches. **Frame** mode projects the address fault across the frame's VRAM view. **Transaction** mode applies it at the emulator's VRAM access points, including reads, writes and DMA operations.

The awkward part was the renderer. Emulators keep decoded graphics ready to draw, so changing an address doesn't automatically make every cached tile agree. Those caches had to follow the altered accesses as well. Otherwise the screen could show a mixture of the bent memory view and graphics it had prepared earlier.

![Three real emulator frames show the original colour pattern, AD3 forced low and an AD2 to AD5 bridge](/assets/images/2026/10/vrampage-md/04-vram-comparison.jxl)

*The same ROM with faults off, AD3 forced low, and AD2 bridged to AD5. Actual v0.5.0 output using the Transaction model.*

## Part 3: FM and PSG Sound

The sound controls change writes going into the **YM2612 FM** and **PSG** chips before synthesis. Each chip has independent controls. For FM, corrupting an address write can select a different register altogether, which is rather more interesting than simply changing the volume.

Both 68000 and Z80 routes needed coverage, because the sound driver doesn't have to use the same path as the main CPU. Removing a bridge only fixes future inputs. Earlier register changes can keep making noise, and CPU Reset preserves sound-chip state. **Clean Restart** is the full reboot when the orchestra refuses to leave.

![Three rows showing faults applied to Work RAM accesses, VRAM addressing and FM or PSG input writes before their outputs are produced](/assets/images/2026/10/vrampage-md/02-fault-paths.jxl)

*Where the changes happen. These are simplified digital models, not a physical pinout or a reproduction of every electrical oddity on a real board.*

## Getting Back to Something Usable

A hard lock is still possible. **Force Resume** tries to get the CPU moving; **CPU Recovery** allows one reset if HALT persists for eight further frames. Both can be switched off. There's also an explicit session checkpoint for saving a clean state and returning to it after an experiment.

We checked the core with small original test programs that produce known pictures, audio and memory changes, then exercised the real WebAssembly build in browsers. That helped separate deliberate corruption from bugs we'd accidentally introduced ourselves.

## Try the Test Pattern

![VRAMpage MD workbench running an original multicolour diagnostic pattern beside the four chip controls](/assets/images/2026/10/vrampage-md/01-workbench.jxl)

*The real v0.5.0 workbench running the downloadable colour-test ROM, with all faults off.*

[VRAMpage MD is now live on McRetro.net](https://mcretro.net/homepages/vrampage-md/). Bring your own ROM; the file stays in your browser. The [source and complete browser download](https://github.com/NixMcRetro/VRAMpage-MD) are available too. No soldering iron required this time.

Don't have a game handy? [Download the original colour-test ROM](/assets/downloads/2026/10/vrampage-md/VRAMpage-MD-Colour-Test.bin), then open it with **Load ROM** in VRAMpage MD to get the pattern shown above. It uses original code and graphics, with no commercial game assets. It's silent, so use another cartridge for FM and PSG sound experiments.

[Download the ROM and Python source as a ZIP](/assets/downloads/2026/10/vrampage-md/VRAMpage-MD-Colour-Test.zip).

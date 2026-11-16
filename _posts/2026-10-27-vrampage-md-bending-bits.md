---
layout: post
title: "VRAMpage MD: Bending Bits"
author: "Nix McRetro"
date: 2026-10-27T03:17:08+11:00
categories: [ai-assisted, programming, sega]
share_description: >-
  Mega Drive circuit bending goes digital! Explore SRAM, VRAM and sound-chip glitches in a browser, with considerably less risk to the original hardware. 🎮
---

{% include youtube.html id="Prp6OLZkeD4" %}

*Some of [my earlier VRAM experiments](https://mcretro.net/circuit-bending-vram-on-a-sega-mega-drive-2/) on real hardware. The browser version came rather later!*
{: .media-caption }

I've spent plenty of time persuading Mega Drives to produce pictures they were never asked to draw. Usually this involved a length of wire and a console that wasn't especially pleased about it. VRAMpage MD brings that experiment into the browser, with considerably less opportunity to damage the actual machine.

I worked with Codex on a modified Genesis Plus GX emulator, compiled to WebAssembly. The faults go into the emulated memory accesses and sound-chip inputs, so the emulator has to deal with the consequences. The work grew into three main parts.

![Conceptual illustration of a black integrated circuit on a light workbench, with loose leads and colourful pixel trails and waveforms flowing out from its pins.](/assets/images/2026/10/vrampage-md/05-bending-bits.jxl)

*Bending bits, with the soldering iron left in the drawer.*
{: .media-caption }

## Part 1: SRAM and the Game's Working Memory

The Mega Drive has 64 KiB of Work RAM, labelled **SRAM (Work RAM)** above the chip. Bridging two modelled address lines can make normally separate addresses land on the same location. Altering the data lines can change what gets read or stored.

Hooking one convenient write routine wasn't enough. Instruction fetches, ordinary reads and writes, and DMA can reach memory through different paths, so those needed checking too. Otherwise we'd have a button claiming to bend RAM while part of the emulator quietly carried on around it.

The write-only contacts became particularly useful. There are ten A11 to A15 pairs, held while pressed or applied for eight frames. Letting go disconnects the contact, but anything already written stays changed. A temporary bend can leave a fairly lasting mess inside the running game.

![Diagram of a modelled low-dominant bridge between Work RAM address lines A11 and A12. Requests for $FF0000, $FF0800, and $FF1000 map to $FF0000, while $FF1800 remains unchanged; written values persist when the bridge is removed.](/assets/images/2026/10/vrampage-md/03-sram-addresses.jxl)

*Three requested addresses can land on one location. Disconnecting the bridge does not undo values already written.*
{: .media-caption }

## Part 2: VRAM and the Picture

VRAM needed two approaches. **Frame** mode projects the address fault across the frame's VRAM view. **Transaction** mode applies it at the emulator's VRAM access points, including reads, writes and DMA operations.

The awkward part was the renderer. Emulators keep decoded graphics ready to draw, so changing an address doesn't automatically make every cached tile agree. Those caches had to follow the altered accesses as well. Otherwise the screen could show a mixture of the bent memory view and graphics it had prepared earlier.

![Three panels from the same colour-test ROM compare VRAM faults: faults off shows regular coloured squares, AD3 forced low adds black interruptions, and an AD2-to-AD5 bridge distorts the pattern into dense horizontal stripes.](/assets/images/2026/10/vrampage-md/04-vram-comparison.jxl)

*The same ROM with faults off, AD3 forced low, and AD2 bridged to AD5. Actual v0.5.0 output using the Transaction model.*
{: .media-caption }

## Part 3: FM and PSG Sound

The sound controls change writes going into the **YM2612 FM** and **PSG** chips before synthesis. Each chip has independent controls. For FM, corrupting an address write can select a different register altogether, which is rather more interesting than simply changing the volume.

Both 68000 and Z80 routes needed coverage, because the sound driver doesn't have to use the same path as the main CPU. Removing a bridge only fixes future inputs. Earlier register changes can keep making noise, and CPU Reset preserves sound-chip state. **Clean Restart** is the full reboot when the orchestra refuses to leave.

![Three flow diagrams show where digital faults enter the VRAMpage MD emulator: SRAM address/data changes before storing game state, VRAM address mapping before picture generation, and FM/PSG input-bit changes before sound synthesis.](/assets/images/2026/10/vrampage-md/02-fault-paths.jxl)

*Where the changes happen. These are simplified digital models, not a physical pinout or a reproduction of every electrical oddity on a real board.*
{: .media-caption }

## Getting Back to Something Usable

A hard lock is still possible. **Force Resume** tries to get the CPU moving; **CPU Recovery** allows one reset if HALT persists for eight further frames. Both can be switched off. There's also an explicit session checkpoint for saving a clean state and returning to it after an experiment.

We checked the core with small original test programs that produce known pictures, audio and memory changes, then exercised the real WebAssembly build in browsers. That helped separate deliberate corruption from bugs we'd accidentally introduced ourselves.

## Try the Test Pattern

![Screenshot of the VRAMpage MD v0.5.0 workbench, with a multicoloured diagnostic tile pattern on the left and controls for VRAM, SRAM, FM, and PSG faults on the right. All faults are off.](/assets/images/2026/10/vrampage-md/01-workbench.jxl)

*The real v0.5.0 workbench running the downloadable colour-test ROM, with all faults off.*
{: .media-caption }

Want to give it a go? [Open VRAMpage MD](https://mcretro.net/homepages/vrampage-md/). The **Choose Cartridge** menu has two original homebrew ROMs built in, and you can load a compatible Mega Drive ROM of your own. Your files stay in your browser.

Here are three original ROMs to try:

- **[Colour Test ROM](/assets/downloads/2026/10/vrampage-md/VRAMpage-MD-Colour-Test.bin):** The silent multicolour pattern pictured above. A good place to start experimenting with VRAM glitches. There's also a [ZIP containing the ROM and its Python source](/assets/downloads/2026/10/vrampage-md/VRAMpage-MD-Colour-Test.zip).
- **[Demo Cart v0.3.5](/assets/downloads/2026/10/vrampage-md/VRAMpage-MD-Demo-Cart-v0.3.5.bin):** The earlier built-in demo, with animated effects and an interactive Chroma Reactor scene. Try **A** and **C** to bend the picture, or **B** to restore it.
- **[Demo Cart v0.3.8 (latest released)](/assets/downloads/2026/10/vrampage-md/VRAMpage-MD-Demo-Cart-v0.3.8.bin):** A full three-minute show with six visual scenes and original FM/PSG music. Download the ROM, then choose **Load Your Own ROM** in the online workbench. Enable sound to hear the music. This newer version isn't built into the hosted site yet.

The Colour Test doesn't produce sound, so try a cartridge with audio if you want to experiment with the FM and PSG controls. The [project source and complete browser downloads](https://github.com/NixMcRetro/VRAMpage-MD) are available on GitHub too. No soldering iron required this time.

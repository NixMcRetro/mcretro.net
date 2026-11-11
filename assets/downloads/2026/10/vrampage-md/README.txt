VRAMpage MD Original Cartridge Downloads

All three standalone ROMs mentioned in the article are here:
- VRAMpage-MD-Colour-Test.bin: silent original colour/memory test
- VRAMpage-MD-Demo-Cart-v0.3.5.bin: earlier interactive demo
- VRAMpage-MD-Demo-Cart-v0.3.8.bin: full show with original FM/PSG music

Use Choose Cartridge / Load Your Own ROM in the live VRAMpage MD workbench:
https://mcretro.net/homepages/vrampage-md/

The hosted workbench keeps its separate built-in v0.3.5 copy; the downloadable
v0.3.5 is byte-for-byte the same ROM. The standalone v0.3.8 does not replace
that default. SHA256SUMS.txt records the exact download identities.

VRAMpage MD Original Colour Test

Load VRAMpage-MD-Colour-Test.bin using Load ROM in VRAMpage MD.
Live app: https://mcretro.net/homepages/vrampage-md/

This 64 KiB original homebrew cartridge draws the colour pattern used in the
blog illustration. It sets up the VDP directly and continuously increments a
Work RAM word at $FF1000. There is no game or controller interaction and it
does not generate audio, so it is for visual/memory experiments, not FM/PSG demos.
VRAM controls can change the picture. Work RAM contacts affect the background
counter; the picture does not use that counter, so they need not change it.

Use Python 3 to reproduce the ROM: python3 build_colour_test.py
On Windows: py -3 build_colour_test.py
No assembler, emulator source or third-party Python packages are required.
Header padding, length and checksum are normalised for the download. All program
instructions and graphics are byte-for-byte identical to the screenshot's ROM.

No commercial game code/assets, BIOS or SDK routines are included. The SEGA
header identifies the cartridge format; this is not an official Sega product.
Tested with VRAMpage MD v0.5.0; physical console/flash-cart use is not verified.
Check SHA256SUMS.txt for the exact downloadable file identity.

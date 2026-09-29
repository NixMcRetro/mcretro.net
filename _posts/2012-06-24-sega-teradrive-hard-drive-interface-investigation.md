---
title: "Sega TeraDrive Hard Drive Interface Investigation"
author: "Nix McRetro"
date: 2012-06-24T12:26:38.000+10:00
last_modified_at: 2026-09-29
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-09-29
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ibm-pc, repairs, sega]
---

![](/assets/images/2012/img_0211.jpg)

![](/assets/images/2012/img_0212.jpg)

![](/assets/images/2012/img_0213.jpg)

Above are some photos of a Sega TeraDrive hard drive.

When I wrote this in 2012 I was trying to work out exactly what the interface was. IDE? ESDI? XTA? Something else entirely?

The connector has 44 pins and carries both data and power, but the pinout does not match standard ATA/IDE.

At the time I wondered whether the reduced number of apparent signal lines implied some kind of 8-bit versus 16-bit distinction. That observation alone was nowhere near enough to identify the bus.

Sure, I could install an ISA hard-drive controller.

But where is the fun in that?

The motherboard connector is sitting there waiting to be understood.

If anyone stumbles upon this, I apologise for the lack of immediate success.

[Nemesis](https://www.exodusemulator.com), author of the Exodus Emulation Platform, also believed there was more to uncover because several controller chips in the TeraDrive are closely related to hardware found in IBM-derived systems.

I pulled together information from old XTA references and Vintage Computer Forum discussions and started comparing pinouts.

![](/assets/images/2012/img_0210.jpg)

![](/assets/images/2012/img_0209.jpg)

![](/assets/images/2012/img_0214.jpg)

### What the interface actually appears to be

Later IBM preservation work gives us a much better description.

The closely related drives used in early IBM PS/2 Model 25 and Model 30 systems are proprietary direct-bus-attachment devices. They are not standard ESDI, and they are not normal ATA/IDE drives.

The TeraDrive's confirmed compatibility with IBM WDL-330P drives strongly links it to this same unusual IBM storage family.

I would therefore no longer label the TeraDrive interface simply "IDE", "ESDI" or "XTA". Those names are useful history because they show what I was investigating, but "proprietary IBM-family direct-bus storage interface" is a much safer modern description.

The 44-pin connector carries both data and power, including 5 V and 12 V rails.

### Drives tested or investigated

**20 MB WDL-320**
- Candidate only. Likely used in Model 30, physical size unknown.

**20 MB WDI-325Q**
- Compatibility remains unconfirmed. The unit I bought was faulty and physically too large for the intended TeraDrive mounting arrangement, so its failure does not prove the interface itself was incompatible.

**20 MB WD-325N**
- Candidate only.
- Appears to use the same style of 44-pin connection.
- Physically similar in size to the WDI-325Q.

**20 MB ST-125L**
- Candidate only.
- Used in the IBM PS/2 Model 30, physical size unknown.
- IBM P/N: 6373538.
- Drive Type 36.

**30 MB WDL-330PS**
- Historically reported candidate. I cannot confirm it firsthand.

**30 MB WDL-330P**
- Confirmed working firsthand. I tested several of these successfully in the TeraDrive.

**40 MB ST-151L**
- Candidate only. Reported as a 40 MB relative of the ST-125L.

### Related posts

- [The Sega TeraDrive Model 3](/the-sega-teradrive-model-3/)
- [Sega TeraDrive Model 3 Hard Drive Replacement](/sega-teradrive-model-3-hard-drive-replacement/)

### Sources

- [IBM Files - PS/2 Model 25](https://www.ibmfiles.com/pages/ps2model25.htm) - documents the proprietary direct-bus-attachment hard-drive arrangement used in early PS/2 systems and distinguishes it from standard IDE and ESDI.

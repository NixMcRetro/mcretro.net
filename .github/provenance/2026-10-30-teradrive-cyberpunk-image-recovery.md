# 2026-10-30: TeraDrive / Cyberpunk photo association repaired

## Incident

Two TeraDrive articles dated May 2012 and two Cyberpunk 2077 PS4 articles dated February/April 2022 inadvertently shared four `/assets/images/2012/img_####.jpg` paths. The website's 2026 import had assigned Cyberpunk photographs to those 2012 paths, causing anachronistic pictures in historical posts.

## Recovery

PR #28 restored the 2012 image paths using the correct contemporaneous TeraDrive photographs from user-supplied October 2023 Wayback complete-page archives. The displaced Cyberpunk binaries were held byte-for-byte in `assets/images/_unassigned/teradrive-misfiled-2026-10-30/`.

This follow-up restores the four Cyberpunk photographs to the appropriate **2022** article positions, giving each image an unambiguous, descriptive URL; it retires the temporary unassigned copies from the current tree. Git history retains the original blobs and the previous holding folder. TeraDrive image paths, contents, articles and links remain unchanged.

| Original misfiled URL | Restored Cyberpunk URL | Target article | Preserved Git blob SHA |
| --- | --- | --- | --- |
| `/assets/images/2012/img_0117.jpg` | `/assets/images/2022/cyberpunk-2077-ps4-car-explosion.jpg` | 2022-02-17 Patch Update | `f6b029264dde91c827146e9077fa17ecede08aa9` |
| `/assets/images/2012/img_0118.jpg` | `/assets/images/2022/cyberpunk-2077-ps4-car-aftermath.jpg` | 2022-02-17 Patch Update | `bc998f51a0a517978e5d131495c6942f302c0e0a` |
| `/assets/images/2012/img_0136.jpg` | `/assets/images/2022/cyberpunk-2077-ps4-update-151-notification.jpg` | 2022-02-17 Patch Update | `5a70de037e625e7b1223b2488eaeb6d8e4b50030` |
| `/assets/images/2012/img_0138.jpg` | `/assets/images/2022/cyberpunk-2077-ps4-ce-34878-0-crash.jpg` | 2022-04-02 Patch Update Update | `c458c01fa4ee7d2d3096daa617fb6525162f224f` |

The four JPEGs in their 2022 destinations are **bit-for-bit identical** to the displaced originals. The association with these two articles is supported by exact references in each article's pre-repair Markdown, as well as the context of the surrounding photographs and prose.

### Remaining uncertainty

The root cause of the incorrect cross-period associations in the pre-2026 image processing/migration pipeline is not yet definitively established. The broader photo provenance audit remains a separate task. This fix does not claim to have audited all other 2012 assets.

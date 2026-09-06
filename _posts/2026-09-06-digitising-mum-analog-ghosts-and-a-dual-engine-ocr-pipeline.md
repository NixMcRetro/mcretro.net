---
title: "Digitising Mum: Analog Ghosts, Bureaucracy, and a Dual-Engine OCR Pipeline"
author: "Nix McRetro"
date: 2026-09-06T09:00:00.000+10:00
categories: [ai-generated, programming]
---

If I've been quiet lately, or if I've seemed perpetually distracted for the past twelve months, this is why. It's almost the one-year anniversary of my mother's death, and I am still drowning in paperwork. Grief, it turns out, is mostly just an endless series of administrative tasks.

The Australian Taxation Office wanted her tax affairs regularised going back to 2018–19. The bank's automated deceased-estate data package only covered the last three years, and even then it was sparse. What I actually had was a ~200-page scanned PDF of her historical statements. What the ATO needed was every interest entry, categorised by financial year, in a form I could legally sign my name to.

I wasn't about to sit there with a highlighter for three weeks, and I wasn't going to pay an accountant hundreds of dollars to do it. So I did what I always do: I turned a deeply personal, emotionally exhausting problem into a homelab engineering sprint. A local vision-language model on the M4 mini, AWS Textract in the cloud, a Python date state machine, and a human-in-the-loop (me, with the original paper) as the tiebreaker.

Here's how you digitise an analog life when the bureaucracy demands perfect fidelity.

---

## The problem with standard OCR

First pass was the classic open-source stack: PyMuPDF for rendering, OCRmyPDF and Tesseract for the text layer. It worked the way a 56k modem works. Fine for making the document technically *searchable*, useless for data extraction. Tesseract mangles the spatial relationships inside tables, reading `03 Apr | Transfer to xx673319 | 60.00 | $7422.73 CR` as a jumble of disconnected words. Not trustworthy for financial figures.

I briefly opened Adobe Acrobat Pro, got hit with a paywall (the trial on that Adobe ID lapsed years ago), and closed it on principle. We were going to build this ourselves.

---

## Engine A: a local VLM that dreams too vividly

I pointed `omlx` on the M4 Mac mini at **Chandra OCR 2**, a vision-language model quantised to 8-bit MLX. Fully on-device, so her financials never left the house. The magic of a VLM is that you can prompt it for structure — I asked for semantic HTML with explicit bounding boxes on a normalised 1000×1000 canvas:

```text
Transcribe the document. Output valid HTML. Every block must include a
data-bbox attribute formatted as space-separated coordinates (x1 y1 x2 y2)
on a 1000x1000 canvas...
```

The spatial awareness was incredible: headers, paragraphs, table structures, all correct. Then I hit the blank pages.

Generative models cannot say "I don't know." Show a VLM a blank scan and ask what it says, and it will confidently invent a reality.

> Prompted for page 6 (a blank scan), Chandra returned a detailed Spanish agricultural campaign — "CAMPAÑA 2017", goat prices per kilo. Prompted for page 12 (also blank), it returned the meeting agenda of the Assam Meghalaya Veterinary Association.

The fix was a pre-flight guardrail: PyMuPDF ink-coverage analysis, with any page under ~1% ink quarantined and its PNG deleted before it could ever reach the model. Plus junk filters for the microprint control codes banks print vertically down the margin, and a lesson learned the hard way about PDF rotation traps (`/Rotate 270`, I'm looking at you).

The takeaway: **generative models have high recall but terrible precision.** They'll find your text, and occasionally invent goats.

---

## Engine B: rent a discriminative robot

To solve the precision problem I needed a discriminative model. I spun up an AWS account, created an IAM user scoped to `AmazonTextractFullAccess`, and ran `AnalyzeDocument` with the `TABLES` feature (Sydney region) over the whole `pages/` directory.

Textract doesn't hallucinate. Show it a blank page and it returns an empty payload. More importantly it gives **cell-level geometry**, it knows exactly which words belong to Row 4, Column 2. Cost for the entire 200-page batch: about a dollar.

But it has the opposite failure mode. Textract missed seven tiny credit-interest entries ($0.03–$1.35) that Chandra caught. **Discriminative models have high precision but lower recall on faint or oddly-placed text.**

---

## The architecture: cross-validation

This is the part I'd write a post about even without the personal angle: if you're extracting critical data from legacy documents, **never trust one OCR engine. Trust two that can't talk to each other, and keep the paper as the tiebreaker.**

I wrote a comparison script that independently parsed the Chandra HTML and the Textract JSON, kept rows whose description mentioned interest, and diffed the two datasets on (date, debit, credit). First, though, I had to solve the date problem.

### The date state machine

Banks print statements in reverse-chronological order (newest first, because of course), and to save space they print the year *once*, on the first page, or when the year rolls over. Every other row just says `16 Dec` or `06 Jan`. So the extractor carries a "current year" state forward down the rows and across page breaks: an explicit year anywhere in a row resets the state, and a December to January transition ticks the year forward. Only then do you have clean ISO `YYYY-MM-DD` dates to diff on.

### The diff

- **75 rows** — identical date and amount in both engines. Bulletproof.
- **8 rows** — Chandra only. Textract only: **0**.
- **Final: 82 verified credit-interest rows.**

```text
statements.pdf
 └─ render.py              # PyMuPDF: 200 DPI, ink filter drops blank pages
     ├─ batch_ocr.py       # Engine A: Chandra OCR 2 (local VLM via oMLX)
     └─ batch_textract.py  # Engine B: AWS Textract (cloud, discriminative)
         └─ compare_interest.py   # cross-validate, print the symmetric difference
             └─ human eyes        # open page_N.png, be the tiebreaker
                 └─ interest_final.csv -> Appendices A/B -> ATO
```

---

## The human tiebreaker

The 8 disputed rows got adjudicated the old-fashioned way: I opened the original scans and looked. Seven were real — tiny monthly interest credits Textract's boxes had skipped. I added them to a `VERIFIED` list. The eighth was a "Debit Interest Adjusted" entry for $0.26; debit interest is money the bank *charges* you, which isn't assessable income, so it was filtered out. Only credit interest matters to the ATO.

| Financial year | Interest earned |
| --- | --- |
| 2018–19 | $3.53 |
| 2019–20 | $1.81 |
| 2020–21 | $0.33 |
| 2021–22 | $0.41 |
| 2022–23 | $51.64 |
| 2023–24 | $152.24 |
| 2024–25 | $171.39 |
| 2025–26 | $98.24 |

Eight years of "hidden income": **$479.59**. That's the whole mystery the tax office was worried about.

---

## The output

One last script turns the final CSV into a print-ready A4 HTML appendix: the per-FY summary, the 82-row detail table, and a methodology declaration documenting the dual-engine process so the numbers are auditable. A second script writes the same methodology out as plain text for the estate folder. The letter to Penrith went together with certified copies of the Death Certificate and Grant of Probate, and the whole envelope went Registered Post this week.

When the processing officer opens it, they won't see a messy spreadsheet. They'll see a verified summary proving her interest income was microscopic, well below the tax-free threshold, backed by a documented method.

---

## Analog ghosts

The tagline on this site says I document the analog ghosts and digital debris of a life lived across both worlds. I didn't expect that to one day mean my own mother's filing cabinet, but here we are.

What I keep coming back to is that "archival fidelity" was never about which engine benchmarks better. It's a process: two independent readers, a human with the original paper as tiebreaker, and everything written down. That's not OCR. That's just good archiving. The exact same instinct that makes us label our floppy disks.

The ATO gets their numbers. I keep the archive, every statement, searchable, forever. The analog ghosts are at rest now, and the digital debris is organised.

I'm going to take a few days off the terminal. Keep being awesome 🙂

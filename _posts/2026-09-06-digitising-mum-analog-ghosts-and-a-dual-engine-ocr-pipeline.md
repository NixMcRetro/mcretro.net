---
title: "Digitising Mum: Analog Ghosts, Bureaucracy, and a Dual-Engine OCR Pipeline"
author: "Nix McRetro"
date: 2026-09-06T09:00:00.000+10:00
last_modified_at: 2026-10-01
ai_assistance:
  model: "OpenAI GPT-5.6 Sol"
  date: 2026-10-01
  purpose: "fact-checking, sourcing, and editorial cleanup"
categories: [ai-generated, programming]
---

If I've been quiet lately, or if I've seemed perpetually distracted for the past twelve months, this is why. It's almost the one-year anniversary of my mother's death, and I am still drowning in paperwork. Grief, it turns out, is mostly just an endless series of administrative tasks.

The Australian Taxation Office wanted her tax affairs regularised going back to 2018-19. The bank's automated deceased-estate data package only covered the last three years, and even then it was sparse. What I actually had was a ~200-page scanned PDF of her historical statements. What the ATO needed was every interest entry, categorised by financial year, in a form I could legally sign my name to.

The tax job actually crossed two contexts: historical income belonging to Mum's outstanding individual tax years, and any income earned by the estate after her death. The OCR problem was the same either way, but which return an interest credit belongs to depends on when it was earned or credited.

I wasn't about to sit there with a highlighter for three weeks, and I wasn't going to pay an accountant hundreds of dollars to do it. So I did what I always do: I turned a deeply personal, emotionally exhausting problem into a homelab engineering sprint. A local vision-language model on the M4 mini, AWS Textract in the cloud, a Python date state machine, and a human-in-the-loop (me, with the original paper) as the tiebreaker.

Here's how you digitise an analog life when the bureaucracy demands perfect fidelity.

---

## The problem with standard OCR

First pass was the classic open-source stack: PyMuPDF for rendering, OCRmyPDF and Tesseract for the text layer. It worked the way a 56k modem works. Fine for making the document technically *searchable*, useless for data extraction. Tesseract mangles the spatial relationships inside tables, reading `03 Apr | Transfer to xx673319 | 60.00 | $7422.73 CR` as a jumble of disconnected words. Not trustworthy for financial figures.

I briefly opened Adobe Acrobat Pro, got hit with a paywall (the trial on that Adobe ID lapsed years ago), and closed it on principle. We were going to build this ourselves.

---

## Engine A: a local VLM that dreams too vividly

I pointed `omlx` on the M4 Mac mini at **Chandra OCR 2**, a vision-language model quantised to 8-bit MLX. Fully on-device, so her financials never left the house. The magic of a VLM is that you can prompt it for structure - I asked for semantic HTML with explicit bounding boxes on a normalised 1000×1000 canvas:

```text
Transcribe the document. Output valid HTML. Every block must include a
data-bbox attribute formatted as space-separated coordinates (x1 y1 x2 y2)
on a 1000x1000 canvas...
```

The spatial awareness was incredible: headers, paragraphs, table structures, all correct. Then I hit the blank pages.

The generative OCR model I tested did not reliably abstain when given blank or ambiguous scans. In this workflow, asking the VLM to transcribe a blank page could still produce a confident-looking invention.

> Prompted for page 6 (a blank scan), Chandra returned a detailed Spanish agricultural campaign - "CAMPAÑA 2017", goat prices per kilo. Prompted for page 12 (also blank), it returned the meeting agenda of the Assam Meghalaya Veterinary Association.

The fix was a pre-flight guardrail: PyMuPDF ink-coverage analysis, with any page under ~1% ink quarantined and its PNG deleted before it could ever reach the model. Plus junk filters for the microprint control codes banks print vertically down the margin, and a lesson learned the hard way about PDF rotation traps (`/Rotate 270`, I'm looking at you).

The takeaway from **this dataset**: Chandra behaved like a high-recall reader. It recovered faint text that the second engine missed, but it could also generate false content on blank scans. Occasionally, that meant invented goats.

---

## Engine B: rent a document-analysis robot

To solve the precision problem I wanted an independent document-analysis engine with very different behaviour from the generative VLM. For this one-off run I spun up an AWS account, created an IAM user with the managed `AmazonTextractFullAccess` policy, and ran `AnalyzeDocument` with the `TABLES` feature in the Sydney region over the whole `pages/` directory. That broad managed policy was convenient while I was experimenting, but it was more access than this workflow actually required. A repeatable setup should use temporary credentials and least-privilege permissions restricted to the Textract actions and resources it needs.

In my tests, Textract returned no text for the blank pages that caused Chandra to invent content. More importantly, it provides **cell-level geometry** and row/column structure for detected tables. My actual charge for the ~200-page batch was about a dollar, helped by AWS's free-tier allowance; pricing varies by region and usage.

But it had the opposite failure mode on these statements. Textract missed seven tiny credit-interest entries ($0.03-$1.35) that Chandra caught. **On this dataset, Textract produced fewer false textual detections but lower recall on some faint or oddly placed text.**

---

## The architecture: cross-validation

This is the part I'd write a post about even without the personal angle: if you're extracting critical data from legacy documents, **never trust one OCR engine. Trust two that can't talk to each other, and keep the paper as the tiebreaker.**

I wrote a comparison script that independently parsed the Chandra HTML and the Textract JSON, kept rows whose description mentioned interest, and diffed the two datasets on (date, debit, credit). First, though, I had to solve the date problem.

### The date state machine

These statements were printed in reverse-chronological order, newest first, because of course, and to save space they printed the year only occasionally. Every other row just says `16 Dec` or `06 Jan`. The extractor therefore carries a current-year state across rows and page breaks. An explicit year resets the state. When processing the document in its printed newest-to-oldest order, a transition from January to December means we have crossed into the **previous** calendar year, so the year decrements. If the rows are reversed into chronological order first, the logic flips and December to January increments instead. The important thing is that the year transition follows the direction in which the rows are being traversed. Only then do you have clean ISO `YYYY-MM-DD` dates to diff on.

### The diff

- **75 rows** - identical date and amount in both engines. High-confidence agreement.
- **8 rows** - Chandra only. Textract only: **0**.
- Human review of those eight confirmed seven real credits and rejected one debit-interest adjustment.
- **Final: 82 accepted credit-interest rows.**

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

The 8 disputed rows got adjudicated the old-fashioned way: I opened the original scans and looked. Seven were real, tiny monthly interest credits Textract's boxes had skipped. The eighth was a "Debit Interest Adjusted" entry for $0.26, so it was excluded from the interest-income dataset. The other 75 rows had independent agreement between both OCR pipelines. If I wanted to call every row individually "human verified", I would still need to compare those 75 against the source scans as well. For this extraction task I only needed assessable interest credited to the account.

| Financial year | Interest earned |
| --- | --- |
| 2018-19 | $3.53 |
| 2019-20 | $1.81 |
| 2020-21 | $0.33 |
| 2021-22 | $0.41 |
| 2022-23 | $51.64 |
| 2023-24 | $152.24 |
| 2024-25 | $171.39 |
| 2025-26 | $98.24 |

Eight years of "hidden income": **$479.59**. That's the whole mystery the tax office was worried about.

---

## The output

One last script turns the final CSV into a print-ready A4 HTML appendix: the per-FY summary, the 82-row detail table, and a methodology declaration documenting the dual-engine process so the numbers are auditable. A second script writes the same methodology out as plain text for the estate folder. The letter to Penrith went together with certified copies of the Death Certificate and Grant of Probate, and the whole envelope went Registered Post this week.

When the processing officer opens it, they won't see a messy spreadsheet. They'll see a cross-validated summary showing that the previously unaccounted-for bank interest totalled only $479.59 across eight financial years, backed by a documented method.

---

## Analog ghosts

The tagline on this site says I document the analog ghosts and digital debris of a life lived across both worlds. I didn't expect that to one day mean my own mother's filing cabinet, but here we are.

What I keep coming back to is that "archival fidelity" was never about which engine benchmarks better. It's a process: two independent readers, a human with the original paper as tiebreaker, and everything written down. That's not OCR. That's just good archiving. The exact same instinct that makes us label our floppy disks.

The ATO gets their numbers. I keep the archive, every statement, searchable, forever. The analog ghosts are at rest now, and the digital debris is organised.

## Sources and technical notes

- [Datalab - Chandra OCR 2](https://api.datalab.to/blog/chandra-2) - model capabilities, structured output, and bounding boxes.
- [AWS - Amazon Textract pricing](https://aws.amazon.com/textract/pricing/) - current AnalyzeDocument/TABLES pricing and Free Tier allowances.
- [AWS - Tables in Amazon Textract](https://docs.aws.amazon.com/textract/latest/dg/how-it-works-tables.html) - cell, row/column, confidence, and geometry output.
- [ATO - When and how to lodge returns for a deceased estate](https://www.ato.gov.au/individuals-and-families/deceased-estates/doing-trust-tax-returns-for-the-deceased-estate/when-and-how-to-lodge-returns-for-a-deceased-estate) - distinction between the deceased person's return and later estate trust returns.

I'm going to take a few days off the terminal. Keep being awesome 🙂

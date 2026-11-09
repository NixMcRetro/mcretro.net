#!/usr/bin/env python3
"""Verify the single Flicky article contains all ten original diaries without legacy pages."""
from pathlib import Path
import sys

site = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("_site")
page_path = site / "flicky-the-floury-baker-cicada" / "index.html"
assert page_path.is_file(), "Missing canonical Flicky article"
html = page_path.read_text(encoding="utf-8")
assert '/assets/images/2024/img_1266.jpg' in html, "Original Flicky photograph missing"
assert (site / "assets/images/2024/img_1266.jpg").is_file(), "Original Flicky photo asset missing"
videos = ["inaf1T782e4","4kexAmtZprk","au51dyfSsyw","ylVdX7cuG-U","iDnK-XNniJ4","APQOxmmoPkU","9U64Pu1CoJ0","Pc8eGAHuEuc","NlZ-JLDtDvg","TJcM_pNHOSw"]
assert html.count('name="mcretro-flicky"') == 10, "Expected ten diary panels"
for day, video in enumerate(videos, 1):
    assert html.count(f'id="day-{day}"') == 1, f"Missing or duplicate day {day}"
    assert f"youtube.com/embed/{video}" in html, f"Missing original day {day} video"
    assert not (site / f"flicky-the-floury-baker-day-{day}" / "index.html").exists(), f"Legacy day {day} must not publish or redirect"
for source in [
    "https://www.inaturalist.org/taxa/338899-Aleeta-curvicosta",
    "https://www.cicadamania.com/cicadas/what-do-cicadas-eat/",
    "https://www.scientificamerican.com/article/how-do-large-trees-such-a/",
    "https://allcreativedesigns.com.au/pages/leaf_characteristics.html",
    "https://www.cicadamania.com/cicadas/is-it-possible-to-raise-cicadas/",
    "https://askentomologists.com/2015/04/23/how-would-one-go-about-raising-cicadas-in-captivity/",
]:
    assert source in html, f"Missing historical source {source}"
assert "38°C" in html, "Previously approved Celsius correction missing"
print("PASS: original hero, 10 exclusive chapters, 10 videos, 6 sources, no redirects, original R08 correction.")

# Fish Tank World historical restoration

Source: owner-provided PHP-based Fish Tank World archive in Google Drive. The original prose, fish profiles, artwork, and 13 gallery photographs are retained. PHP includes have been converted to static HTML with paths under `/homepages/fishtankworld/`; the historic visitor counter is decorative rather than functional.

The original PHP/Stuporglue InstaGallery viewer cannot run on GitHub Pages. Its replacement preserves the 13 original JPEG photographs and thumbnail files, linked from a static gallery.

The 12 large photos (other than `barry1.jpg`) are stored **losslessly** as consecutively numbered binary parts in `gallery-source/Fish/` to accommodate connector upload limits. The committed source parts are excluded from the public site; `.github/tests/restore-fishtank-gallery.py` concatenates them to exact original JPEG bytes before the Jekyll build. It validates byte sizes, JPEG markers, contiguous parts, all 13 thumbnails, and the final generated site. No images are recompressed.

For a local build, run:

```sh
python3 .github/tests/restore-fishtank-gallery.py
bundle exec jekyll build --destination _site
python3 .github/tests/restore-fishtank-gallery.py --verify-built _site
```

GitHub Actions runs these steps automatically. Do not merge until the gallery and GOATPAD have passed review and browser checks.

# McRetro R2 archive sites (starter)

These are two independently deployable static websites for the existing public Cloudflare R2 buckets. They do not require PHP, databases, Workers, or deployment secrets.

| Source folder | Bucket | Domain |
| --- | --- | --- |
| archive-sites/file-server/ | mcretro-files | https://files.mcretro.net/ |
| archive-sites/photo-gallery/ | mcretro-photos | https://photos.mcretro.net/ |

The first catalogues list ONLY the two already confirmed working test objects: mcretro-r2-check.txt and mcretro-r2-check.png. This PR does not change the existing GitHub Pages blog, Goodies page or historical placeholder paths.

## Preview on a local computer

Run the following from the repository root, then open both preview URLs:

    python3 -m http.server 8765

- http://localhost:8765/archive-sites/file-server/
- http://localhost:8765/archive-sites/photo-gallery/

The HTML and catalogue work locally, but the images/downloads will not until their actual R2 objects are provided at these local paths. Test them on R2 after deployment.

To validate:

    node --test .github/tests/r2-archive-sites.test.mjs

## Deploy the two static sites to R2 after owner approval

No GitHub Actions credentials are required for this initial manual deployment.

1. In Cloudflare Dashboard → R2 → mcretro-files → Objects, upload archive-sites/file-server/index.html and archive-sites/file-server/catalogue.json at the BUCKET ROOT. The object keys must be exactly index.html and catalogue.json.
2. Confirm the content types are text/html for index.html and application/json for catalogue.json (charset UTF-8 is fine).
3. In mcretro-photos → Objects, upload archive-sites/photo-gallery/index.html and archive-sites/photo-gallery/albums.json at the BUCKET ROOT. Confirm text/html and application/json.
4. Visit https://files.mcretro.net/index.html and https://photos.mcretro.net/index.html. Verify search, filters and the test-file download/image viewer. The test objects must remain at the bucket root.
5. To make each bare hostname show a homepage, go to mcretro.net zone → Rules → Transform Rules → URL Rewrite Rules. Add STATIC PATH rewrites:
   - Condition: (http.host eq "files.mcretro.net" and http.request.uri.path eq "/") → rewrite path to /index.html
   - Condition: (http.host eq "photos.mcretro.net" and http.request.uri.path eq "/") → rewrite path to /index.html
6. Verify https://files.mcretro.net/ and https://photos.mcretro.net/ load the landing pages, while the existing test URLs still work.

Do not rewrite every path, modify existing DNS, enable r2.dev URLs, or update the Goodies page during this initial test.

Cloudflare's documentation: https://developers.cloudflare.com/rules/transform/url-rewrite/

## Adding verified downloads

1. Upload a publicly distributable object under a stable key, such as drivers/example.zip.
2. Add an entry to archive-sites/file-server/catalogue.json:
   - path: the EXACT raw R2 object key (no leading slash, not the full URL).
   - title, description, category: nonempty descriptive text.
   - year and hardware: optional verified facts.
   - size_bytes: optional actual byte count.
   - sha256: optional exact 64-character hash.
3. Review in GitHub, run the test, then upload the revised catalogue.json to the file bucket.

The catalogue is curated: adding an object to R2 alone does not automatically list it.

## Adding photo albums

1. Upload publicly shareable originals to the photo bucket. Prefer stable keys such as sega-saturn/example.jpg.
2. For larger galleries, add small thumbnail objects such as thumbs/sega-saturn/example.jpg.
3. Add albums with unique IDs and titles to archive-sites/photo-gallery/albums.json.
4. Add photos with path, title, a matching album ID, and helpful alt text. thumbnail, description, hardware and credit are optional. If thumbnail is omitted, the full-sized original is used in the grid.
5. Review in GitHub, test, then upload the revised albums.json to the photo bucket.

Blog images and articles remain untouched. Do not upload private photographs, questionable ROM distributions or copyright-restricted software without clearing their redistribution rights.

## Later phases

- Inventory the actual historical archives and add only verified content.
- Generate catalogues and checksums automatically from reviewed source files.
- Add a narrowly scoped R2 deployment workflow using GitHub Actions secrets after approval.
- Once both public sites are working, update the Goodies links and optionally the old /files/ and /photos/ placeholders in a separate PR.

## Rollback

Remove the two R2 index.html objects or disable the two URL Rewrite Rules. No change to GitHub Pages or historical content is needed.

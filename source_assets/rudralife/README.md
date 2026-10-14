# Rudralife asset provenance

All newly downloaded individual bead photographs, expert/client portraits, logo,
and the silk product editorial image are direct Rudralife assets. The complete
records are `sources.json` and `additional-sources.json` in this folder.

Bead products: official `/product/` pages matching the slugs in
`frontend/src/data/content.js`. The product OpenGraph image was extracted and
downloaded; Ganesh uses its third official gallery image to avoid scenic background.
Studio neutral backgrounds were removed with chroma masking, without replacing
the product or generating new bead detail. Existing photographic watermarks remain.

## Full necklace PNG
The full floating necklace is derived from the pre-existing supplied product photo:
https://customer-assets.emergentagent.com/job_siddha-mala-sacred/artifacts/dxvn2os4_siddamala.jpg

This photo existed in the previous implementation, and was also referenced by the
crawl result for rudralife.com/siddha-mala. It is not represented as a newly scraped
official transparent PNG. The original is archived as `necklace-original.png`.
Its blue textile background was removed with a red/blue colour-difference alpha
mask, rotated to place the pendant downward, and saved as
`frontend/public/assets/rudralife/siddha-mala-gold.png`.

No stock imagery, generated product photos, fake 360 scans or substituted Mukhi
types are used in the redesigned site. 3D meshes are front-facing curved photo
surfaces; the actual necklace remains a PNG with scroll transforms.

Original high-resolution assets stay here; optimized public images use WebP for
portraits/editorial content and PNG for transparent beads/logo/necklace.
# PRD — Rudralife Siddha Mala

## Original request
Build a premium Siddha Mala landing experience inspired by the scroll-driven product
presentation at capsul-in-pro.com/home-compost-capsule/. Include descending Rudraksha,
a complete mala presentation, 1–14 Mukhi plus Gauri Shankar and Ganesh selector,
brand story, benefits, Milind Soman and Dimple Kapadia, expert panel, FAQs, enquiry
form (name/email/phone/city/profession/message), thank-you route and protected admin
for leads and page content.

## Latest user requirements — 14 October 2026
- Respond in Hinglish. User wants actual implementation, not elaborate assurances.
- Previous dark, symbol-led design was explicitly rejected as looking "local".
- Off-white background, brown typography, restrained gold details.
- NO Om symbols, mantras, or 27+1 Nakshatra presentation in the visible site.
- Full transparent Siddha Mala photo, genuine Rudraksha descending top-to-bottom
  with scroll, optional automated journey, no text/image collisions.
- Spacious circle using the CORRECT images for all 16 bead forms: 1–14 Mukhi,
  Gauri Shankar and Ganesh (not repeating unrelated products).
- Authentic Rudralife logo, photos, names and sourced content.

## Architecture
- React 19, React Router, Tailwind/shadcn form and accordion, Manrope + Cormorant Garamond.
- Framer Motion scroll transforms, Three.js/R3F/drei actual-photo curved bead meshes,
  Lenis smooth anchors. Optional play/pause journey stops on wheel/touch/Escape.
- FastAPI + Motor/MongoDB. JWT access-token httpOnly secure cookie, bcrypt.
- Mongo account lockout helper: stable normalized-email hash, atomic fixed-window
  counter, five failures then 429, 15-minute expiry, TTL cleanup, Retry-After.
- Routes: `/`, `/thank-you`, `/admin/login`, `/admin`.
- APIs: GET `/api/content`; POST `/api/enquiries`; POST `/api/auth/login|logout`;
  GET `/api/auth/me`; GET/DELETE `/api/admin/leads`; PUT `/api/admin/content`.
- Always use frontend REACT_APP_BACKEND_URL and backend MONGO_URL, DB_NAME from env.
  Do not rely on old preview URLs. Current credentials in test_credentials.md.

## Implemented — 14 October 2026
### Redesign
- Replaced dark/glass presentation with off-white editorial layout and real logo.
- Full transparent necklace cutout, descending/tilting scroll sequence, real-photo
  3D bead surfaces instead of previous distorted sphere, no central symbols.
- Two clear hero chapters with separately reserved title, copy and control regions.
- Mobile side-lane bead animation; compact screens fade beads before copy regions.
- Full image always visible without WebGL; reduced-motion keeps static product view.
- Optional Play/Pause journey; scroll itself remains user-controlled by default.
- Rebuilt 16-node circle with correct photos, keyboard tabs, next/previous wrapping,
  detail view, deity, quantity, description and official product links.
- Replaced inaccurate generic bead mappings (old 6/14/Gauri/Ganesh used other beads).
- Official product story/benefits adapted without invented customer stories or
  guaranteed health/wealth claims. Authentic Dimple quote and seven expert bios.
- Rebuilt enquiry, FAQ, portraits, footer and thank-you. No dead brochure button.
- Existing admin hero/contact/stats editing preserved; labels match new presentation.
- Source portraits/editorial images converted to WebP; all visible images served
  locally. Total public image assets approximately 3.8 MB.
- Source data/archives: `/app/source_assets/rudralife/`; acquisition scripts:
  `/app/scripts/source_rudralife_assets.py`, `/app/scripts/prepare_rudralife_images.py`.
- Full hero necklace is cut out of the existing supplied product photograph.
  All newly acquired beads/logo/expert/editorial assets have Rudralife source records.
- Removed unused old Composition and Trusted components to avoid stale Nakshatra
  copy and references to deleted content arrays.

### Functional fixes
- Enquiry validation/error/loading flow, thank-you confirmation and contact links.
- New default brand copy only migrates exact old starter values, preserving custom edits.
- Critical login lockout fixed: proxy IP rotation no longer splits account counters.
- Atomic concurrent failures and expiry handling verified; credentials unchanged.
- Removed obsolete index creation and fixed Framer Motion static-container warning.
- Final manual check restored a test-agent leftover hero tagline to real brand copy.
- Necklace-to-play-control clearance verified at 0/20/40/70/100% hero progress:
  minimum bounding-box gap approximately 25px on tested desktop viewport.

## Verification
- `yarn build`: PASS, final log `/app/test_reports/build.log`.
- Full API suite + targeted login regressions: **19/19 passed**, sequential run,
  `/app/test_reports/pytest/final_results.xml`.
- Testing agent round 1: core flows worked; reported mobile overlap and lockout bug.
- Testing agent round 2: both fixed, frontend/backend 100% for targeted regression.
- `/app/test_reports/iteration_1.json`, `/app/test_reports/iteration_2.json`.
- UI: 320/390/768/1024/1440/1920 widths, scroll 0/20/40/70%, no horizontal overflow;
  nonblank moving WebGL canvas verified; all 16 selector nodes and keyboard controls;
  journey cancellation; mobile navigation; experts; FAQ; enquiry -> thank-you;
  admin login/guard/leads/delete/content save/logout.
- Final self-check after round 2: real tagline restored; static-container warning
  absent; corrected necklace/control spacing passed at five scroll checkpoints.
- Browser automation produces GPU ReadPixels performance warnings and occasionally
  aborted platform telemetry requests; no application runtime failure observed.
- No mocked APIs or integrations. No current known broken implemented flow.

## Important limits / honest representation
- The 3D effect uses authentic photo-textured curved geometry and PNG transforms.
  It is NOT a photogrammetry/scanned 360-degree Rudraksha/necklace model.
- Full necklace cutout provenance is the pre-existing provided product photo, not
  a newly scraped official transparent PNG. See source_assets/rudralife/README.md.
- Admin editor covers hero tagline/description, contact and displayed trust stats;
  it does not yet edit every bead/profile/section. Do not claim full-page CMS.
- No team email notification, brochure file or payment integration implemented.
- Actual source-site product composition includes repeats of 2–7 Mukhi; selector
  depicts 16 distinct forms, not a necklace containing only 16 beads.

## Prioritised next actions
### P0
- None currently blocking; functional regression tests pass.
### P1
- User visual approval of the redesigned hero and scroll pace.
- Expand admin editor to all section copy, bead descriptions, experts and FAQs.
### P2 / Future
- Obtain/licence a high-detail scanned Rudraksha GLB for true 360° inspection.
- Optional lead CSV export and team email notification (provider setup required).
- Optional official downloadable brochure, Hindi toggle.
- Suggested conversion enhancement: carry selected Mukhi into consultation message.

## Latest request: reference audit first, then approved implementation
User supplied `https://siddha-mala-sacred.preview.emergentagent.com/siddha-mala.html`
and requested a complete section-by-section audit before an implementation plan.
Additional preferences: longer/richer whole-page scroll journey; better gold Mala
PNG and bead presentation; stronger Milind/Dimple section; BOTH visible inline and
button-triggered popup consultation forms with mandatory phone country selection.
User's clarification response was `Samrt Answer`; implementation approval was not
explicitly given. Do not claim the remote reference has been modified.

### Audit completed (read-only)
- All sections reviewed in downloaded HTML plus browser testing at
  320/390/768/1024/1440/1920. Initial desktop smoke also captured by main agent.
- Full report/plan: `/app/audit/AUDIT_REPORT.md`; evidence:
  `/app/audit/reference-audit.json`, `/app/test_reports/iteration_3.json`.
- No application code, credentials or user data changed for this audit.
- Reference is a DIFFERENT host/codebase from the editable current app. Readable
  public HTML archived at `/app/audit/reference/siddha-mala.html`; reference backend
  and database access unavailable. Its lead persistence has NOT been verified.
- TEST-SIDE SIMULATED503 proved reference wrongly confirms/redirects after failure
  and writes personal enquiry fields to localStorage. No actual integration mocked.
- Reference H1 is blank because public CMS fields are whitespace.
- Reference FAQ has duplicate conflicting handlers. Expert cards/mobile menu/modal
  have keyboard/focus issues. Footer policy links are# placeholders.
- Counters are NOT permanently zero: observed5,00,000+,90%,52+ after scroll. Their
  accuracy needs evidence; large-target final value has a hardcoded formatting bug.
- Brochure IS valid PDF,200,%PDF,~9.22MB. Do not call it broken or invent a replacement.
- Dimple exists in client marquee, not a dedicated block; Milind text implies
  unsupported motivations/endorsement. Aarav story lacks fictional disclosure.
- Official listed composition sums28 (18+7+3) across16 forms.27+1 has the same total;
  rare Nakshatra arrangement needs separate substantiation. Keep rejected hero
  symbols/pattern out; exact total applies only to source-confirmed SKU.

### Proposed next priorities (approval pending)
P0: Reliable dual-form enquiry, country selection and backend validation; maintain
current app's existing real error handling, accessible FAQ/experts and admin flows.
P1: Longer product chapters, better verified golden necklace photography, animated
bead/detail points, gallery, stronger Milind/Dimple, complete educational content;
source-confirmed claims only; keyboard/SEO/performance improvements.
P2: Full-page CMS expansion, real360 scanned assets and optional lead notifications.
Do not silently change company contact data or publish unverified counters.
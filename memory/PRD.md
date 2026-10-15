# PRD — Rudralife Siddha Mala

## User goal / original scope
Premium Rudralife Siddha Mala landing page with scroll-driven Rudraksha descent,
full mala imagery and an interactive 1–14 Mukhi + Gauri Shankar + Ganesh selector.
Include hero, emotional introduction, Sacred Signature, story, collection, Milind
Soman/Dimple Kapadia, educational content, composition, responsible spiritual
benefits, trust, panel experts, community, FAQs, consultation and footer.
Reference: https://siddha-mala-sacred.preview.emergentagent.com/siddha-mala.html
The reference is a DIFFERENT project; this job updates the current workspace app.
Current frontend origin MUST come from frontend/.env REACT_APP_BACKEND_URL.

## Explicit preferences and approval
- User primarily uses Hinglish; latest approval was in English.
- Latest: peach-white (not white), mahogany/copper text; no dark template, Om/mantra or
  decorative 27+1 Nakshatra pattern.
- Genuine, better-quality gold-fitted Mala PNG and Rudraksha photos; longer smooth
  scroll journey with animated content; stronger Milind/Dimple presentation.
- Both visible inline and button-triggered popup consultation forms. Mandatory
  country-code selection and actual backend lead persistence.
- Complete admin editing of ALL sections, images, text, banners, form settings and
  other content; lead management; PRESERVE existing admin credentials.
- No fabricated endorsements, customer counts or certification details. No medical
  or financial guarantees. Verify before claiming completion.
- Explicit user approval: "Perfect, please proceed with the implementation as
  discussed." Requested working preview/admin URLs and VERIFIED existing login.

## Current status — implemented and verified, 14 October 2026
### Public experience
- Routes `/` and `/siddha-mala.html` render the updated experience.
- 3.8-viewport hero journey (admin-adjustable2–6), full transparent product photo,
  photo-textured Three.js bead surfaces, longer scroll descent and chapter reveals.
- Authentic gold-fitted product photograph prepared as PNG using LOCAL background
  segmentation (rembg/u2netp); no generated/fabricated product imagery.
- Actual Rudralife blog visit photos replace the low-resolution client thumbnail:
  Milind source2048×1152; Dimple source1200×800. Framed without cropping subjects.
- 13 configurable body sections plus hero/footer. New emotional intro, Sacred
  Signature, gallery/lightbox, educational accordion, trust and community sections.
- Correct16 distinct bead forms, source-confirmed28bead total and quantities.
- All7 experts,10FAQs,3educational questions; accessible expansion and consultation
  CTAs, optional interest prefilled from gallery/bead/expert.
- Original brochure preserved (valid9.22MBPDF), clearly labelled source brochure
  with a traditional-beliefs/outcomes disclaimer. Not presented as guaranteed advice.
- Community customer counters supported in CMS but HIDDEN until supplied value,
  verification acknowledgement and evidence URL. No invented5lakh/90%/52 figures.
- Reduced-motion fallback, paused offscreen WebGL, mobile sticky consultation,
  keyboard-accessible dialogs, semantic metadata/canonical/OpenGraph/WebPage JSON-LD.
- All headline/product copy remain populated; no leftover QA test tagline.

### Forms and leads
- Shared inline/popup form with explicit country selection (all supported countries),
  client libphonenumber-js and server phonenumbers validation, normalized E.164.
- Name/email/phone+country required; city/profession/message optional by default;
  optional-field requirements and labels/placeholders editable in CMS.
- Actual POST `/api/enquiries`; sourceinline/popup, interest, country and dial code
  saved in Mongo. UUID submission_id makes retries idempotent.
- Only accepted API response redirects to thank-you. Error retains entered data,
  no false success and no localStorage PII fallback. Enter submission supported.
- Lead inbox: search, status filter,25-rowpagination, details, country/interest,
  notes/status update, CSV export (formula escaped), confirmed deletion.
- Any authorized admin can delete a selected lead after confirmation. "Delete only
  QA leads" was a restriction on testing activity, NOT an app authorization rule.

### Full content studio
-21 editor groups: brand/header/banner, hero, intro, signature, story, gallery,
  beads, education, benefits, Milind/Dimple, trust, experts, community/statistics,
  FAQ, consultation section, form settings, footer, thank-you, SEO, motion, order.
- Text and image replacement throughout; media previews and selection; array
  add/remove/reorder; section visibility/order; dirty state, discard and publish.
- Required structural invariants protect16forms, required lead fields and headline.
- Versioned Mongo content with optimistic concurrency: stale revision returns409.
- Legacy `/api/content` updates synchronize relevant hero/contact fields into CMS.
- Existing admin email/password/hash and JWT-cookie flow preserved, not reset.

### Durable media storage
- Managed object storage via existing INTEGRATION_PROXY_URL and EMERGENT_LLM_KEY
  from backend environment; STORAGE_APP_NAME configured. No keys exposed to browser.
- Admin PNG/JPEG/WebP/PDF upload up to12MB; actual signature/image validation;
  image dimensions bounded and raster images optimized; SVG/HTML rejected.
- Public `/api/media/{id}` proxy resolves Mongo metadata to durable storage path;
  identifiers/path/key are not disclosed beyond public media ID/URL.
- Media library includes original assets and uploaded files; selecting standalone
  library item opens the real image; CMS picker selects the image for publishing.
- No mocked services. Managed storage upload/read and CMS image use actually tested.

## Architecture / important files
- React19, Tailwind/shadcn, Lenis, Framer Motion, R3F/drei/Three, FastAPI, Motor/Mongo.
- `frontend/src/data/pageDefaults.js`: complete source-backed editable page defaults.
- `backend/page_defaults.json`: committed server copy generated by
  `node /app/scripts/sync_page_defaults.js` whenever defaults change.
- `frontend/src/context/PageContext.jsx`: fetches versioned page and legacy settings.
- `frontend/src/context/ConsultationContext.jsx`: shared accessible consultation dialog.
- `frontend/src/components/ConsultationForm.jsx`: country/phone validation and submit.
- `frontend/src/sections/`: all public sections consume page context (no separate CMS).
- `frontend/src/experience.css`: current visual refinements over established index.css.
- `frontend/src/admin/`: PageEditor, recursive ContentField, MediaLibrary, LeadInbox,
  LeadDetail and admin.css. AdminDashboard owns authenticated tabs.
- `backend/page_content.py`: schema/structure/link/content validation, seed, CAS save.
- `backend/enquiry_models.py`: lead data, phone validation and status update models.
- `backend/media_storage.py`: managed storage init/upload/public proxy and metadata.
- `backend/server.py`: existing auth preserved plus content/media/lead routes.
- `backend/login_limits.py`: previous verified account-based atomic lockout unchanged.

## API contracts
- GET `/api/page-content` → page, revision, updated_at (public).
- PUT `/api/admin/page-content` {page,revision} (protected;409 stale).
- POST `/api/enquiries` requires countryISO2 and country_code, valid local/E.164
  phone, name,email; source, interest,submission_id and optional business fields.
- GET `/api/admin/leads/page?query=&status=&page=1`; PATCH/DELETE `/api/admin/leads/{id}`.
- GET `/api/admin/leads/export` authenticated CSV; legacyGET `/api/admin/leads` kept.
- POST `/api/admin/media` multipartfile; GET `/api/admin/media`; GET `/api/media/{id}`.
- Existing `/api/auth/login|logout|me`, `/api/content`, `/api/admin/content` retained.
- Project config from env, no changed MONGO_URL/DB_NAME/REACT_APP_BACKEND_URL values.

## Verification and resolved issues
- Iteration4:20backend passes plus one skipped old module; forms/storage/CMS worked.
  Its claimed QA-only deletion bug was a test-requirement misunderstanding, corrected.
- Iteration5: **33/33 backend tests passed** with old payloads updated to required
  country fields and no silent auth skips. Full functional frontend recheck passed.
- Actual inline and popup submissions verified in admin and Mongo, E.164+source+
  interest saved;503 test interception confirms no false success or PII fallback.
- CMS round-trips cover text, images via real upload, experts, FAQadd/edit/delete,
  footer, form labels/required flags, gallery, order/visibility, motion and SEO.
- Existing admin login verified through browser and API; logout returns to login
  and authenticated lead endpoint returns401 after logout. Credentials unchanged.
- Responsive checks320/390/768/1024/1440/1920; no horizontal overflow or UI failures.
- Full product visible with reduced motion; actual canvas has nonblank pixels.
- Tester centroid heuristic was inconclusive, NOT a product failure. Main agent
  closed that gap using compositor image subtraction and isolated real bead pixels:
  normal400pxscroll moved bead centroidY191.48→301.65 (**110.2px downward**), with
  >11,000 actual rendered changed pixels at both positions. No test renderer/mocks.
- Bottom controls protected with actual CSS canvas clipping; browser confirmed
  canvasBottom800−clip100=700 < controlsTop730. Initial broad footer pixel heuristic
  also picked up animated controls/progress, so use this geometry check instead.
- Native option markup corrected using React.createElement to avoid dev visual-edit
  injection of invalidspanchildren. Both forms/admin selects reverified with0 children.
- Recursive CMS JSX triggered dev-only Babel instrumentation recursion; `x-excluded`
  DID NOT fix it. Correct fix: React.createElement for recursive ContentField calls.
  Do not reintroduce self-recursive JSX; production build alone missed this issue.
- Startup brieflyfailed when generated defaultsJSON didn't exist; file is now
  committed, startupAPI200. Always generate defaults before loading backend changes.
- Final published content restored, no QA test image/tagline; source-backed photos intact.
- Final browser self-check verified media opens, login and logout redirect; the
  script's lastwait used nonexistent admin-login-form testID (actualadmin-login-page),
  a test selector typo, NOT auth failure. APIlogout401 independently verified.
- Reports: `/app/test_reports/iteration_4.json`, `iteration_5.json`,
  `pytest/pytest_results_iteration5_final.xml`, `final-implementation-build.log`,
  `final_implementation_verification.md`.

## Source material / representation limits
- Prior read-only reference audit: `/app/audit/AUDIT_REPORT.md` and archived HTML.
- Assets/provenance: `/app/source_assets/rudralife/`, `/app/source_assets/reference2/`.
- Gold PNG source is pre-existing supplied real product photograph, not generated.
- New Milind/Dimple images are from official Rudralife2023blog article; quote from
  official client voices. No invented quote for Milind or promised personal outcomes.
- Animation is genuine photo-textured 3D geometry plus PNG scroll transforms, NOT
  a scanned360degree necklace model. Do not overstate model fidelity.
- No payments or email/WhatsApp message automation; contactlinks open external apps.

## Next actions / backlog
P0: None known blocking in implemented scope; user visual approval pending.
P1: Owner reviews final copy/images and supplies documentary evidence before
enabling any real customer/repeat-rate/country statistics in CMS.
P2: Optional new-lead email notifications; high-detail licensed/scanned360GLB;
Hindi language toggle. Full-pageCMS andCSVexport are DONE, not backlog anymore.

Credentials and current verified URLs: `/app/memory/test_credentials.md`.

## Peach edition — 15 October 2026 (latest approved work)
User rejected the remaining white theme and previous necklace, supplied a PNG,
requested a left-scrolling16-form bead rail with synchronized right-side stories,
click-to-locate actual beads,5secondMilind/Dimple/Sunanda stories, sharper expert
portraits, Shiva content and richer but compact content. Asked to proceed without
further clarification. All existing CMS/form/lead functionality preserved.

### Implemented
- Actual peach palette: background#fae7dc, alternate#f3d8c8, surface#fff1e7,
  mahogany#642c2b, body#795048, copper#a25737. Editable under Page colours.
- User's exact supplied transparent Mala PNG (`siddha-user.png`,408×612) replaces
  hero/signature/composition andfirstgallery. Do NOTcallthisgeneratedorhigherresolution.
-16official bead sourcephotos regenerated via segmentation + filledmatte to remove
  previous chroma-cutout holes; originalrealbead texture preserved (`bead-clean-N.png`).
- `BeadJourney.jsx`: leftvertical16-beadrail, largerPNG and synchronizedname/deity/
  description,5secondautoplay, scroll-linkedselection,keyboard/manualnavigation.
- `useVisibleSequence.js`: reducer-based playback state, only visible/documentactive;
  mousehoverpauses,touchdoesn'tcreatehover,focusednonPlaycontrolpauses,explicitPlay
  owns ONLY thatPlaybuttonfocus. Manualselectionpauses;Playresumesafterpointerleaves.
- `Celebrity.jsx`: one compact alternating-layout5secondcarousel: Milindleft,
  Dimpleright,Sunandaleft; fullerfactualcopy,officialphotos,source links. No invented
  Sunanda testimonial. Exit0.12s/enter0.28s meets visibleT+5.5s requirement.
- Replaced oldcircularselector with16phototabs + full-mala locator + isolateddetailPNG.
- `MalaLocator.jsx` andadmin`BeadMappingEditor.jsx`: clickphoto/addcenter,editpercentXY,
  multiplepositionsforrepeatedtypes,verificationnote+checkbox,fullview/reset+1.75xzoom.
  Onlyverifiedpositions matchingcurrentimage appearpublic; changingphoto invalidates
  alloldconfirmations. No AI-inferred or inventedphysicalMukhi labels.
- **Content dependency remains:** actual Mukhi-to-photo positions were NOT supplied
  or verified. AllrealbaselinepositionsremainEMPTY. Publicshows honest placement
  note instead of falselylabellingnecklace. Owner can confirmpositions inadmin.
  Do NOTclaim exactphysicalbeadidentificationcompleted untilowner verifieslocations.
- `SpiritualStory.jsx`: official Shivaimage and3source-groundedparagraphs, explicitly
  traditionalstory/notmedicalorscientificclaims. More detailedMala/signature/storycopy.
- Expertportraits replaced withofficial recommendation403×470/400×540sources;
  mappings Tanay1,Hemlata2,Saumil4,Dhruv6,Shruti5,Madhulika7,Shilpa3.
- NewPagecolours/Scrollingbeadstories/Shiva/CMSmapping controls;24editorgroups,
 15configurablebodysections+hero/footer. Compactmobilegalleryandone-storycarousel
  balanceadditionalcopywithoutstackingallthreefullcelebritystories.
- Currentbodyregistry includes `beadJourney` and`spiritual`; `appearance` isNOTinorder.
- New files: `frontend/src/peach.css`, `components/PageTheme.jsx`, `components/MalaLocator.jsx`,
  `sections/BeadJourney.jsx`, `sections/SpiritualStory.jsx`, `hooks/useVisibleSequence.js`,
  `admin/BeadMappingEditor.jsx`, `scripts/clean_bead_photos.py`, `scripts/publish_peach_update.py`.
- Backendvalidateshexcolours,3–30secondintervals,locations0..100,quantitylimits,
  verifiedcurrentimage+note. Updated committed defaultsJSON using existing syncscript.
- Migrationcomparesolddefaultsnapshotwithcurrentpage to preservecustomedits; explicitly
  swapsapprovedimages,addsnewsections. Snapshot `/app/source_assets/peach/defaults-before.json`.

### Testing / fixes
- Mandatory testingagents used foruserreportedvisualbug; reportsiteration6through10.
- Iteration6 broadresponsive/CMS/marker/APIverified; foundPlayfocusblock.
- Iteration7 fixedbeadresume,foundcelebrityhoveroverride. Iteration8 foundfurtherfocus
  edges; its syntheticmobilecheck was NON-authoritative and replacedbyrealcontext.
- RCAtool consulted forpersistentplaybackissues. Finalfixwas deterministicreducer
  tracking actualfocusedcontrol andPlayowner, nota fragileexplicit boolean override.
- Iteration9: focuspause,hoverpause,beadresume,reducedmotionandTRUEtouchcontextPASS
  (`has_touch`, `is_mobile`, maxTouchPoints1, coarsepointer, realtapactions).
- Iteration10 FINALPASS: Milind→DimplevisibleT+5.5s,SunandaT+11s;focusretainedonPlay;
  hover6secondsstayssame,leaveadvances;stable535pxstagewithnooverlap/heightshift.
- ActualWebGLrenderer proofiteration7: centroidshift142.93px,notjustaCSSanimation.
- Responsive320/390/768/1024/1440/1920,nohorizontaloverflowreported;suppliedPNGwhole.
- Finalfocusedbackend suite **18/18PASS**, `/app/test_reports/pytest/peach_final.xml`.
- FinalbuildPASS `/app/test_reports/peach-final-build.log`.
- Publiccontentverifiedaftercleanup: revision71, suppliedPNG,peach#fae7dc,threepatrons,
  zeroQAmarkers,originaltagline,noQAcontent. Existingadminlogin200verifiedagain;
  credentials unchanged. Authcookie/logout,realinline/popup leads,adminsearch and
  leadcleanupverifiedbyagents. No brokenimplementedflow leftinfinalreport.
- Reports `/app/test_reports/iteration_6.json`…`iteration_10.json`; finalsummary
  `/app/test_reports/peach_verification.md`. Do not changeplaybacktimingswithoutretest.

### Source limitations / next actions
- Reference `siddha-divine-shop.preview...` returnedawakeserverpage; do NOTclaimits
  actualdesignwasreviewed. ThethreeofficialRudralifeURLs were successfullyscraped.
- Sunandaofficialclientphoto300×300;do notclaimhigher-resoriginalorpersonalresults.
- Noexactplacementmappingprovided: thisis thepriorityownerconfirmationnextstep.
- Futureoption: new-leademailnotifications,licensedtrue360GLB. Currenteffectis
  realphoto-texturedThree.jsdepth+PNGmotion,notaphotogrammetrynecklacemodel.
# Rudralife Siddha Mala — reference audit and proposed implementation

## Scope and evidence
Audited actual page: https://siddha-mala-sacred.preview.emergentagent.com/siddha-mala.html

Read-only inspection: downloaded HTML/inline JS, live rendered DOM, all 16 requested
section groups, browser interactions, viewport widths320/390/768/1024/1440/1920,
PDF response/content bytes, public CMS fields and a controlled form-failure test.
No application code or remote content changed. No third-party contact messages sent.

**TEST-SIDE SIMULATION ONLY:** intercepted POST /api/leads with503 to verify failure
behavior. Reference backend lead persistence was NOT tested or verified. Do not
describe this test as proof that actual leads are stored or lost in normal operation.

The reference host is separate from the editable React/FastAPI application at
REACT_APP_BACKEND_URL. Its public HTML is readable; its backend/database and remote
application source are not available in this workspace. Any implementation here
would update the current project, not silently modify the reference host.

## Section-by-section audit
| Existing section | Observed issue / verification gap | Recommended improvement | Priority | Expected impact |
|---|---|---|---|---|
| Hero banner | Rendered H1 is whitespace; CMS title values overwrite it. Secondary CTA has weak contrast. | Required, trimmed headline with safe fallback; full gold-fitted necklace PNG, readable CTA and reserved animation lanes. | Critical | Immediate product understanding and a visible next step. |
| Emotional introduction | Long spiritual hook repeats later material; centuries-old tradition is attributed to the specific branded combination without evidence. | Short emotionally resonant introduction; distinguish Rudraksha tradition from product history. | High | Faster comprehension without questionable history. |
| Sacred Signature | Composition and brochure present. Claims such as95% sourcing, refrigerated/non-human-touched handling lack substantiation in reviewed evidence. | Retain verified composition; approve sourcing/handling/certification wording before use. | High | More credible product differentiation. |
| Siddha Mala story | Aarav transformation story is presented without an explicit fictional label or provenance. | Use verified Rudralife product story, or clearly label any allegory; never present it as a customer result. | High | Avoid misleading social proof. |
| Collection | Five product photos repeatedly cloned for marquee effect; not fifteen distinct products. | Curated, named photo gallery with full necklace/detail views, accessible pause and optional scroll reveal. | Medium | Better product inspection and less repetition. |
| Milind Soman / Dimple Kapadia | Milind copy asserts motivation, outcomes and endorsement without cited evidence. Dimple appears only in client ticker. | Stronger portrait-led scroll presentation; factual captions and approved/source-verifiable quotes only. | High | Higher visual credibility without fabricated endorsements. |
| About / educational content | About and What-is sections repeat composition and benefit explanations. | One concise explanation plus accessible, nonduplicative educational accordion. | Medium | Shorter reading path and clearer hierarchy. |
| Bead composition / Mukhi | Sixteen distinct forms, quantities sum to28. Mixed exact/approximate/pattern terminology; number/symbol presentation less inspectable than genuine photos. | Accurate actual-photo selector, clear quantities, deity/traditional association and source-backed descriptions. | High | Resolves composition uncertainty. |
| Spiritual benefits | Several statements imply reliable financial, career, anxiety/health or protective outcomes. | Frame as traditional spiritual associations; no guarantees or medical-treatment implications. | High | Responsible expectations and brand trust. |
| Sacred composition / trust strip | 100% certification,25+years and5lakh claims are displayed without supporting evidence reviewed in this audit. | Use verified, appropriately attributed information; don't invent lab identity, certificate numbers or statistics. | High | Evidence-led reassurance. |
| Panel experts | Seven complete front/back cards render; none keyboard-focusable. Experience/role claims need official confirmation. | Accessible expandable profile buttons, official names/roles/bios, optional consult-this-expert CTA. | High | Enables all users to inspect expert qualifications. |
| Worldwide counters | Initial0 values animate correctly to5,00,000+,90%,52+ after visibility. Any large target is incorrectly forced to5,00,000 by final-frame code. Statistics themselves unverified. | Render verified final values without JS; enhance with optional counting, or omit unsupported statistics. | High | Prevents false zero impressions and misleading numbers. |
| FAQ | Ten items present. Two handlers conflict; visual class and expanded height disagree. No aria-expanded. | Single accessible accordion state, complete source-approved answers on composition/authenticity/wearing/care/consultation. | High | Reliable objection handling. |
| Free personalised consultation | Only popup CTA; no visible inline form. Message is compulsory despite being nonessential. | Shared inline + popup form; mandatory country selection, concise validation, optional message. | High | More ways to enquire with less friction. |
| Footer/contact | Contact URL formats coherent; Privacy and Terms use# placeholders. Business details require preservation/confirmation, not silent replacement. | Real policy links, current verified details and readable disclosure. | High | Trust and meaningful navigation. |
| Consultation popup | On503, shows success, stores personal fields in localStorage and redirects. Country selection already enforced. Enter submission/focus trapping/restoration absent. | Only confirm after accepted API response; recoverable inline error, no silent local PII fallback, native submit, accessible dialog. | Critical | Avoids false confirmation and inaccessible submissions. |

## Composition clarification
The official Rudralife Siddha Mala product description and reference composition
agree numerically: 3each2–7Mukhi=18; 1each8–14Mukhi=7; Half-Moon1Mukhi+GauriShankar+
Ganesh=3; total28, with16 distinct bead forms.

27+1 equals28 mathematically; it is not a conflicting total. However, a claim that
this represents a particular rare Nakshatra arrangement needs evidence of that
arrangement and the role of the additional bead. For the verified listed SKU,
prefer exact28 over approximately28. Do not reintroduce the user's rejected
27+1 hero pattern, Om symbols or decorative mantra.

## Functional and cross-cutting checks
- Main About/Collection/Experts/FAQ anchors and tested consultation triggers: pass.
- No horizontal overflow observed at the six tested widths; keyboard access issues
  remain in hamburger, hidden mobile links, expert cards and modal.
- Brochure: HTTP200, application/pdf, %PDF magic bytes,9,224,883bytes. Valid, not broken;
  about9.22MB merits size disclosure and optimization without degrading print detail.
- Thank-you route returns200; this alone does not prove lead persistence.
- WhatsApp/phone/email hrefs are coherent within the reference. No message/call sent.
- SEO: title and description exist; rendered H1 empty; canonical/OpenGraph/JSON-LD absent.
- Performance samples are lab observations, not field Core Web Vitals or a Lighthouse
  certification. Largest sampled image transfer ~521KB; document decoded~169KB.
- Animation should be intentional across chapters, not perpetual motion on every
  paragraph. Preserve pause/reduced-motion and offscreen work suspension.

## Complete proposed implementation plan (approval pending)
1. Reliability first: no fake form success; required country selector in both forms;
   shared component, validated international phone storage, proper errors/loading,
   Enter submission, dialog focus behavior, preserved lead/admin integration.
2. Content/source ledger: approve company contacts, product composition, photos,
   expert bios, celebrity quotations and claims. Consolidate duplicated content;
   withhold unverified statistics/endorsements. Reuse functioning brochure/policies
   only after verifying destination and content provenance.
3. Longer product journey: four purposeful scroll chapters—Rudraksha arrival, full
   gold-fitted PNG reveal, individual bead/composition education, meaningful benefit
   points. Add depth/parallax and sequential content reveals while reserving text lanes.
   Inspect actual asset quality before replacing current PNG; do not fabricate a
   product photograph or call photo surfaces scanned360 models.
4. Premium supporting sections: genuine product gallery, stronger separate Milind
   and Dimple presentation, complete experts, source-backed FAQs and trust indicators.
   Maintain off-white/brown/gold direction and original verified company information.
5. CRO/accessibility/performance/SEO: persistent mobile consultation entry point,
   consistent buttons, keyboard navigation, reduced-motion, optimized imagery/lazy
   loading, semantic heading hierarchy and factual social metadata/structured data.
6. Regression: real accepted submissions from inline and popup to current backend,
   verify lead in admin, test server errors without false success, country validation,
   keyboard/focus, every anchor/download/contact link, all responsive widths,
   scroll framing and reduced-motion; restore test content and remove only QA leads.

## Deliverable boundary
This is an audit and plan, NOT a claim that reference bugs were fixed. Approval of
the plan/target precedes implementation. Existing editable app already has some
better behavior (real submit errors, accessible FAQ/experts, inline form); preserve
it rather than copying the reference's broken static JavaScript.
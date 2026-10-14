# PRD — Rudralife Siddha Mala Landing Experience

## Original Problem Statement
User wants a world-class Siddha Mala (Rudraksha) landing page for Rudralife, inspired by capsul-in-pro.com's scroll-driven 3D animation: a Rudraksha bead that travels/rotates while scrolling, a Siddha Mala that assembles bead-by-bead around a Beej mantra, an interactive 1–14 Mukhi + Gaurishankar + Ganesh bead selector, celebrity story section (Milind Soman, Dimple Kapadia), panel experts cards, enquiry form (Name, Email, Phone, City, Profession, Message) → thank-you page → lead in backend, plus a password-protected admin panel with page-content editing. Must be mobile-friendly. Real images from rudralife.com.

## Architecture
- Frontend: React 19 + Tailwind + shadcn/ui, React Three Fiber + drei (3D scroll bead), framer-motion (scroll/reveal animations), lenis (smooth scroll), react-fast-marquee
- Backend: FastAPI + motor (MongoDB), JWT httpOnly-cookie auth (bcrypt), brute-force lockout
- Routes: `/` landing, `/thank-you`, `/admin/login`, `/admin` (protected)
- APIs: POST /api/enquiries, GET /api/content, POST /api/auth/login|logout, GET /api/auth/me, GET/DELETE /api/admin/leads, PUT /api/admin/content

## User Personas
- Spiritual seeker / professional exploring Siddha Mala (mobile + desktop)
- Rudralife admin managing leads and page content

## Implemented (14 Oct 2026)
- Fixed 3D canvas: distort-material Rudraksha bead with gold orbit ring + gold sparkles, scroll-driven descent/rotation, fades after hero journey; prefers-reduced-motion support
- Mala Assembly: 340vh sticky scroll section, 28 beads fly into a Nakshatra circle around ॐ नमः शिवाय
- Interactive Bead Selector: 16 slots (1–14 Mukhi, Gaurishankar, Ganesh) with real Rudralife product photos, 3D flip transitions, deity/mantra/description
- Sections: Hero, Siddha Intro (trademark features + brochure button), Aarav story timeline, Benefits bento (8), Composition grid (28 beads) + stats, Milind Soman feature, 7 expert flip-cards (real photos), dual trusted-by marquees, 10 FAQs accordion, enquiry form, footer with disclaimer
- Enquiry form → thank-you page → lead saved to MongoDB
- Admin: login (JWT cookie), leads list/delete, live content editor (hero, contact, stats)
- Real images from rudralife.com (experts, beads, Milind Soman) and siddha-mala product shots
- Fixed: lenis React-19 incompat (moved to `lenis` pkg), zustand/mediapipe compile warnings (craco ignoreWarnings), hero bead visibility/lighting, assembly/title overlap

## Test Credentials
- Admin: admin@rudralife.com / Rudralife@2025 (see /app/memory/test_credentials.md)

## Backlog
- P0: Brochure PDF (currently placeholder button — need PDF from user)
- P1: CSV export of leads in admin
- P1: Email notification to team on new enquiry (Resend)
- P2: Rotating celebrity story carousel (Dimple Kapadia card next to Milind)
- P2: Real .glb Rudraksha 3D model for photoreal bead
- P2: Hindi language toggle

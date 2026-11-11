# Oblique homepage clone: page brief

**Source:** https://oblique.com.my/ (captured 11 Nov 2026)
**Local route:** `/` (replaces the template's placeholder homepage)

## Where things live

| What | File |
| --- | --- |
| All text, links, image paths, logo | `src/components/sites/oblique/content.ts` |
| Brand colours | `src/app/globals.css`, "BRAND COLOURS" block |
| Font (Inter 400–800) | `src/app/layout.tsx` |
| Section components | `src/components/sites/oblique/*.tsx` |
| Images, logos, videos | `public/sites/oblique/` |
| Source screenshots | `docs/design-references/oblique/` (`local/` = clone, `compare/` = side by side) |

## Section order

1. Header: sticky glass pill nav, Services dropdown (hover/click), mobile full-screen menu
2. Hero: rotating red word (stronger, faster, smarter, louder, further), every 2.4s
3. Client logo marquee: 55s loop, pauses on hover
4. Problem (dark): words light up in a 110ms stagger when each line enters view; numbers count up
5. Services: click a row to swap the image and details
6. Integration diagram: core drifts toward the cursor
7. Featured work: 4 showreel videos, play only while on screen
8. Process: 3 full-screen cards that stick and stack (light, beige, dark)
9. Testimonials: 4 quotes, dots + arrows, auto-advance every 7s (pauses on hover)
10. FAQ: accordion, first item open
11. Call to action
12. Footer

## Design tokens (from source CSS)

- Accent `#e51c42`, ink `#141312`, ink-2 `#2b2926`, muted `#8b8880`, rule `#e5e2d8`
- Surfaces `#faf9f6`, `#f3f1ea`, `#ece9df`
- Max width 1440px, gutters 24px mobile / 40px desktop, 12-column grid

## Known gaps

- Links to other Oblique pages (About, Contact, service pages) point to the live oblique.com.my site. Only the homepage was cloned.
- Hero word-swap and reveal motions are close approximations of the source's animation timing, not frame-exact.
- Google Analytics / Tag Manager scripts were intentionally left out.

## Update: clickTRUE test version

The clone was then rebranded as a test of editing by request:

- **Colours:** clickTRUE blue `#1aaae2`, navy `#154882`, grey `#828486` (see "BRAND COLOURS" in `src/app/globals.css`)
- **Logo:** clickTRUE 15-years logo (colour in header, white in footer), files in `public/sites/oblique/brand/`
- **Copy and facts:** taken from https://enquiry.clicktrue.biz/ (captured 11 Nov 2026), including the UniKL case study, 4 FAQs, 6 Google reviews quoted word for word, 14 client logos, PJ address and WhatsApp number
- **Photos:** all Oblique photos replaced with branded placeholders (`image: null` in `content.ts`). Add a real photo by putting the file in `public/sites/clicktrue/` and setting its path.
- **Years:** "17+ years" is used in copy, as on the enquiry page. The logo says 15 years.

## Update: real photos, awards and contact form

- **Photos and illustrations:** taken from enquiry.clicktrue.biz (service icons, 3D animations as looping .mp4, UniKL landing page, Google review screenshot, B2B video thumbnail) and from clickTRUE's own Drive (team photos, awards night). Files in `public/sites/clicktrue/` (`services/`, `illustrations/`, `photos/`, `awards/`, `case-study/`).
- **Awards & partnerships section:** `awards.tsx`, placed after "By the numbers". Copy and badges in `content.ts` → `awards`.
- **Contact form:** `contact.tsx`, placed before the footer. Fields: name, email, company, phone. **Not connected yet**: submitting only shows a test note. Replace the `<form>` with the real form embed before launch.
- **Nav:** "Contact" added to the header menu and the footer.
- **Deploy:** standard Next.js app, deploys to Vercel as-is (import the repo, pick this branch).

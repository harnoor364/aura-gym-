# Aura Gym — BRS Nagar · branch website concept

A proposed, branch-specific website for **Aura Gym, Lodhi Club Road, New BRS Nagar, Ludhiana**. It is built for the owner to review.

> **Status: concept / preview.** Aura Gym already has an official website ([auragyms.com](https://www.auragyms.com/)). This project is a *proposed* BRS Nagar landing page. Until the owner approves its purpose and domain, it shows a "Concept" bar, tells search engines not to index it (`noindex` meta, `X-Robots-Tag`, `robots.txt`), and its footer links to the official site. Do not publish it on a look-alike domain or present it as the official site without authorisation.

**No photographs of the branch have been supplied yet.** Every image area is an art-directed placeholder, labelled with its shot brief and target filename. No stock or AI images are presented as Aura Gym. See [Photos to supply](#photos-to-supply).

---

## Run & build

Requires **Node 22.12+** (`.nvmrc` → 22).

```bash
npm install
npm run dev       # http://localhost:4321 — live reload
npm run build     # static site → dist/
npm run preview   # serve the built site locally
npm test          # enquiry-validation unit tests
```

**Stack:** [Astro 7](https://astro.build) (static output, zero client framework), self-hosted fonts via Fontsource, plain CSS with design tokens, and about 3 KB of vanilla TypeScript for the menu, reveals, map and form. There are no animation libraries, no Three.js and no UI kit. `npm audit` reports 0 vulnerabilities. Astro 7.3.8 is used because all releases ≤ 7.2.7 carry a critical advisory.

```
src/
  data/site.ts        ← ALL business facts + verification flags, programmes, FAQs
  data/photos.ts      ← photo slots: shot briefs, alt text, crops
  assets/photos/      ← drop real photos here (see below)
  components/         Header, Hero, Club, Facilities, Training, Experience,
                      Trust, Faq, Visit (location + contact), Footer,
                      Photo (real photo or placeholder), Icon, Wordmark
  layouts/Base.astro  <head>: title, description, canonical, OG, JSON-LD
  styles/global.css   design tokens (colour, type scale, spacing), base styles
  scripts/site.ts     reveal-on-scroll, click-to-load map, enquiry form
  lib/enquiry.js      form validation (unit-tested)
  pages/              index, 404, thank-you (Netlify Forms redirect)
public/               favicon.svg, apple-touch-icon.png, og-image.jpg, robots.txt
```

---

## Design decisions

- **Reference research.** `burngym.com` and `auragyms.com` could **not** be opened from the build environment (network-blocked). The design follows the written brief, not an inspection of those pages. Nothing was copied from either site.
- **Palette.** Near-black `#0d0d0c`, warm white `#f3efe8`, charcoal greys, and **one accent, "ember" `#f05a28`**. The accent is reserved for calls to action, the location marker, section indices and the word "you", so it always signals *act* or *you are here*. Contrast is checked: body text on ink is about 16:1, muted text 7.2:1, ember on ink 5.6:1, and the darker ember on warm white 5.2:1.
- **Typography.** One variable family, **Archivo**, does two jobs. At 68% width and heavy weight it gives condensed, athletic uppercase headlines; at normal width it is a calm, readable text face. **IBM Plex Mono** is used only for small labels (section indices, captions) to give a training-log, "specification" voice. A fluid type scale and an 8-point spacing scale live in `global.css`.
- **Rhythm, not repetition.** Dark and light sections alternate (hero → warm-white "club" → dark facilities → warm-white training → dark experience band → trust → warm-white FAQ → dark location and contact). Each section has its own composition:
  - Facilities: an asymmetric editorial grid.
  - Training: alternating split layouts with outlined numerals.
  - "Ask about": a ruled index list.
  - Experience: a full-bleed band with steps divided by rules.
  - FAQ: a sticky heading with native accordions.

  There is no repeated three-card grid, no glassmorphism and no gradient blobs.
- **Honest content architecture.** Only universal gym-floor offerings (strength and cardio) get full sections. Functional training, personal coaching, group classes and pool/Aqua Zumba appear only as **"Ask at the front desk"** items until the branch confirms them. Hours say "call to confirm". The rating is hidden until verified. There are no testimonials, counters, prices or promises.
- **Conversion path.** Introduce the club → show the floor → explain training → a three-step "first visit" process → trust (Google reviews) → FAQ → location → contact. The phone number is the primary enquiry route: it appears in the hero bar, the location block, the large contact link, the FAQ and the footer. There are no pop-ups, urgency tricks or discounts.
- **Motion.** All motion is CSS-first and purposeful:
  - the hero settles in on load;
  - sections fade up once as they enter the viewport;
  - the experience band has a subtle CSS scroll-driven parallax where the browser supports it;
  - the navigation hides on scroll down and returns on scroll up.

  Everything is disabled under `prefers-reduced-motion`. Content is fully visible without JavaScript.
- **Accessibility.** Semantic landmarks, one `h1` and an ordered heading hierarchy, a skip link, visible focus styles, an accessible mobile menu (focus moves in, Tab is trapped, Esc closes and returns focus), native `<details>` FAQs, labelled form fields with inline errors, and touch targets of 44 px or more.
- **Performance.** Static HTML, self-hosted `woff2` fonts with `font-display: swap`, real photos automatically converted to AVIF/WebP in responsive sizes (`<Photo>` → Astro `<Picture>`), lazy loading below the fold, and Google Maps loaded only when the visitor clicks.

---

## Verify before launch

Facts and their status live in **`src/data/site.ts`**. Flip `verified: true` only after checking with the branch.

| Item | Current status | Shown on the page as |
|---|---|---|
| Address (Lodhi Club Road, opp. G.S. Memorial School, New BRS Nagar, Rajguru Nagar Ext. Part-1, Ludhiana 142022) | Supplied in the brief from the Google listing | Shown. **Re-check the wording and PIN code** |
| Phone **+91 93367 60005** | Supplied in the brief; also listed on a directory (yappe.in) | Shown as the main enquiry route. **Confirm it reaches the BRS Nagar front desk** |
| Google rating **4.5★ / 302 reviews** | Supplied; a directory showed 293 earlier, so the figure moves | **Hidden.** Set `rating.verified`, `value`, `count` and `checkedOn` |
| Opening hours | Unknown (a directory listing contradicts itself) | "Please call to confirm current hours" |
| Strength & cardio equipment (racks, free weights, machines) | Assumed standard; **confirm** | Full sections |
| Functional training, personal coaching, group classes | Unconfirmed | "Ask at the front desk" only |
| Pool / Aqua Zumba at **this** branch | Mentioned in the listing; branch not confirmed | "Ask whether they run at BRS Nagar" |
| Changing rooms, lockers, showers, steam, nutrition/healthy food | Unconfirmed | Not mentioned |
| Membership process ("call or drop in → look around → join") | Sensible default; **confirm** | "Your first steps" |
| Membership prices, trainer credentials | Unknown | Not shown, by design |
| Reviews to quote | None collected | Not shown. Add only real public quotes with author, date and link in `site.reviews` |
| Logo / brand assets | Not supplied | Typographic placeholder wordmark and favicon ("A" monogram). **Replace with approved logo files** |
| Final domain and purpose | Not decided | `noindex`. Set `PUBLIC_SITE_URL` when approved |

The JSON-LD (`ExerciseGym`) includes only name, address, phone and map link. The rating is added automatically once `rating.verified` is true. Add opening hours to the JSON-LD only once confirmed.

---

## Photos to supply

Save each photo as **`src/assets/photos/<slot>.jpg`** (`.jpeg`, `.png` and `.webp` also work). The placeholder for that slot is replaced automatically, and the photo is optimised and given responsive sizes. Update the slot's `alt` in `src/data/photos.ts` so it describes the actual photo.

| Slot | Where | Shot brief |
|---|---|---|
| `hero` | Opening screen, full-bleed | Wide training floor, low angle, warm practical light, one member mid-lift (with consent). **Landscape, ≥ 2400 px wide** |
| `club` | "The club", portrait 4:5 | Coach and member between sets, natural moment |
| `floor` | Facilities A, large | Widest view of the training floor from a corner, all lights on |
| `detail-plates` | Facilities B, square | Detail: plates, grips, chalk (tight crop) |
| `cardio` | Facilities C, 4:3 | Cardio machines in a row, shot down the line |
| `front` | Facilities D, 21:9 | Entrance and signage on Lodhi Club Road, early evening |
| `strength` | Training 01, 5:4 | Racks and plates, side light, shallow depth of field |
| `cardio-session` | Training 02, 4:5 | Member mid-interval on a bike or rower (with consent) |
| `experience` | Full-bleed band | Atmospheric wide shot, movement, deep shadows |
| `functional`, `studio`, `lockers` | Reserved | Only if those spaces exist and are confirmed |

**Photography guidance:** real photos of the BRS Nagar branch; people only with written consent; consistent warm lighting; horizontal frames at least 2400 px for full-bleed slots; no heavy filters. Licensed stock may be used temporarily only if it is clearly not presented as the branch. Also supply: the logo as SVG (light-on-dark version), a final favicon, and a real photo for `public/og-image.jpg` (1200×630).

---

## Enquiry form

The form never shows success unless the submission was accepted. Delivery mode is chosen at build time (`src/data/site.ts → formMode`):

| Mode | When | Setup |
|---|---|---|
| **Endpoint** | `PUBLIC_FORM_ENDPOINT` is set | A public form-service URL (Formspree, Web3Forms, …). It is not a secret. Works on any host |
| **Netlify Forms** | Building on Netlify with no endpoint set | Nothing to do. Submissions appear in Netlify → Forms. Works without JavaScript (redirects to `/thank-you/`) |
| **None** | Neither of the above | No form. A phone-first "How to enquire" panel is shown instead (current default) |

If a send fails, the visitor sees "Your enquiry was not sent" with the phone number.

---

## Deploy

### Vercel
1. On vercel.com: **Add New → Project** → import `harnoor364/aura-gym-`. The framework is detected as **Astro** (also set in `vercel.json`).
2. Optional environment variables: `PUBLIC_FORM_ENDPOINT` (to enable the form) and `PUBLIC_SITE_URL` (final URL).
3. Deploy. `vercel.json` adds the preview `noindex` header and long-term caching for `/_astro/*`.

### Netlify
1. **Add new site → Import from Git** → `harnoor364/aura-gym-`. `netlify.toml` sets the build command `npm run build`, publish directory `dist` and Node 22.
2. The enquiry form switches to Netlify Forms automatically. Turn on email notifications in **Site → Forms**.

### Going live (after owner approval)
1. In `src/data/site.ts`, set `preview: false` and complete the verification flags.
2. Set `PUBLIC_SITE_URL` to the approved domain.
3. Remove the `X-Robots-Tag` header from `vercel.json` or `netlify.toml`, and replace `public/robots.txt` (instructions are inside).
4. Add real photos and the logo, then rebuild and re-check the page.
5. Link the page from the Google Business Profile if the owner wants it as the branch page. (Nothing here guarantees ranking changes.)

---

Website concept by Harnoor Singh.

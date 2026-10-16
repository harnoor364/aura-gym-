/**
 * Aura Gym — BRS Nagar · single source of truth for business facts.
 *
 * Every fact carries its provenance. Anything marked `verified: false` is
 * either hidden or worded as "ask / call to confirm" on the page. Flip a flag
 * only after checking it with the branch (see README → "Verify before launch").
 */

export const site = {
  /** Concept/preview mode: banner, noindex, "proposed concept" footer note. */
  preview: true,

  /** Final URL is unknown until the owner approves the purpose and domain. */
  url: import.meta.env.PUBLIC_SITE_URL || "https://aura-gym-brs-nagar.vercel.app",

  name: "Aura Gym",
  branch: "BRS Nagar",
  fullName: "Aura Gym — BRS Nagar",
  city: "Ludhiana",

  // Supplied by the client from the Google Maps listing. Re-check before launch.
  address: {
    street: "Lodhi Club Road, opposite G.S. Memorial School",
    area: "New BRS Nagar, Rajguru Nagar Extension Part-1",
    city: "Ludhiana",
    region: "Punjab",
    postalCode: "142022",
    country: "IN",
    source: "Client brief (Google Maps listing)",
    verified: false,
  },

  phone: {
    display: "+91 93367 60005",
    tel: "+919336760005",
    source: "Client brief (Google Maps listing); also listed on yappe.in",
    verified: false,
  },

  /** Unconfirmed: a directory shows contradictory hours. Never shown as fact. */
  hours: {
    lines: [] as { days: string; time: string }[],
    verified: false,
  },

  /** Supplied listing: 4.5★ from 302 reviews (a directory showed 293 earlier). */
  rating: {
    value: 4.5,
    count: 302,
    checkedOn: "",
    verified: false,
  },

  /** Public review text with attribution — add only real, linked quotes. */
  reviews: [] as { quote: string; author: string; date: string; url: string }[],

  maps: {
    query: "Aura Gym, Lodhi Club Road, New BRS Nagar, Ludhiana, Punjab 142022",
  },

  /** Officially, Aura Gym has its own website — this is a proposed branch page. */
  officialSite: "https://www.auragyms.com/",

  /**
   * Enquiry form delivery. Resolved at build time:
   *  - PUBLIC_FORM_ENDPOINT set → POST to that endpoint (Formspree/Web3Forms…)
   *  - building on Netlify       → Netlify Forms
   *  - otherwise                 → no form; phone-first enquiry panel
   */
  form: {
    endpoint: import.meta.env.PUBLIC_FORM_ENDPOINT || "",
    netlify: Boolean(process.env.NETLIFY),
  },
} as const;

export const formMode: "endpoint" | "netlify" | "none" = site.form.endpoint
  ? "endpoint"
  : site.form.netlify
    ? "netlify"
    : "none";

export const fullAddress = [
  site.address.street,
  site.address.area,
  `${site.address.city}, ${site.address.region} ${site.address.postalCode}`,
].join(", ");

export const mapsLinks = {
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.maps.query)}`,
  listing: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.maps.query)}`,
  embed: `https://www.google.com/maps?q=${encodeURIComponent(site.maps.query)}&z=16&output=embed`,
};

/**
 * Training & facilities. `status`:
 *  - "core"  → presented as a main section (a standard gym floor offering;
 *              still listed in README for confirmation)
 *  - "ask"   → shown only as "ask the front desk" — never as a promise
 */
export const programmes = [
  {
    id: "strength",
    status: "core",
    index: "01",
    title: "Strength & resistance",
    kicker: "The weights floor",
    body: "Free weights, racks and machines for progressive, structured strength work — whether you are learning the basics or chasing a new number.",
    photo: "strength",
  },
  {
    id: "cardio",
    status: "core",
    index: "02",
    title: "Cardio & conditioning",
    kicker: "Engine work",
    body: "Machines for steady sessions, intervals and warm-ups. Build the conditioning that makes everything else easier.",
    photo: "cardio-session",
  },
] as const;

export const askAbout = [
  { id: "functional", title: "Functional training", note: "Ask which areas and equipment are available for functional work." },
  { id: "coaching", title: "Personal coaching", note: "Ask about one-to-one coaching options and how they are arranged." },
  { id: "classes", title: "Group classes", note: "Ask for the current class timetable at this branch." },
  { id: "pool", title: "Pool & Aqua Zumba", note: "The listing mentions pool activities and Aqua Zumba — ask whether they run at BRS Nagar and when." },
] as const;

export const faqs = [
  {
    q: "How much does membership cost?",
    a: "Membership options and current fees are best confirmed directly with the branch. Call us and we will talk you through what is available.",
  },
  {
    q: "What are the opening hours?",
    a: "Please call the branch to confirm today's hours before your first visit.",
  },
  {
    q: "Can I see the gym before I join?",
    a: "Call ahead and ask to look around the training floor. It is the best way to decide whether the space suits the way you train.",
  },
  {
    q: "Is there a pool or Aqua Zumba at this branch?",
    a: "Our listing mentions pool activities and Aqua Zumba. Ask the front desk whether they are currently offered at BRS Nagar and how to join a session.",
  },
  {
    q: "I am new to the gym. Is that okay?",
    a: "Yes. Tell the team what you are working towards when you enquire, and ask what guidance is available for getting started.",
  },
] as const;

/**
 * Photo slots. Each slot is a shot on the brief for the photographer.
 *
 * To use a real photo, save it as  src/assets/photos/<id>.jpg  (or .jpeg/.png/.webp).
 * The <Photo> component picks it up automatically, optimises it (AVIF/WebP,
 * responsive sizes) and the art-directed placeholder disappears.
 *
 * Only use photographs of THIS branch (or licensed images clearly labelled
 * as such). Never present stock or AI images as Aura Gym BRS Nagar.
 */

export type PhotoSlot = {
  id: string;
  /** Alt text for the real photo — update it to describe what the photo shows. */
  alt: string;
  /** Shot brief, shown on the placeholder. */
  brief: string;
  /** Placeholder line-drawing motif. */
  motif: "weights" | "cardio" | "functional" | "studio" | "lockers" | "front" | "pool" | "people";
  /** Placeholder lighting direction. */
  light?: "top" | "left" | "right" | "low";
  /** CSS object-position for the real photo's crop. */
  focus?: string;
};

export const photos: Record<string, PhotoSlot> = {
  hero: {
    id: "hero",
    alt: "The training floor at Aura Gym, BRS Nagar",
    brief: "Hero · wide training floor, low angle, warm practical light, one member mid-lift (with consent)",
    motif: "weights",
    light: "top",
    focus: "50% 45%",
  },
  club: {
    id: "club",
    alt: "Members training at Aura Gym, BRS Nagar",
    brief: "Portrait crop · coach and member between sets, natural moment",
    motif: "people",
    light: "left",
  },
  strength: {
    id: "strength",
    alt: "Racks, barbells and free weights on the strength floor",
    brief: "Strength floor · racks and plates, side light, shallow depth of field",
    motif: "weights",
    light: "left",
  },
  cardio: {
    id: "cardio",
    alt: "Row of cardio machines on the training floor",
    brief: "Cardio line · machines in a row, shot down the line, daylight",
    motif: "cardio",
    light: "right",
  },
  "cardio-session": {
    id: "cardio-session",
    alt: "Member doing a conditioning session",
    brief: "Conditioning · member mid-interval on a bike or rower, motion blur, side light (with consent)",
    motif: "cardio",
    light: "left",
  },
  floor: {
    id: "floor",
    alt: "Wide view of the training floor at Aura Gym, BRS Nagar",
    brief: "Training floor · widest possible view from a corner, all lights on, no people or with consent",
    motif: "weights",
    light: "top",
  },
  "detail-plates": {
    id: "detail-plates",
    alt: "Close-up of weight plates and chalk",
    brief: "Detail · plates, grips, chalk — tight crop",
    motif: "weights",
    light: "low",
  },
  functional: {
    id: "functional",
    alt: "Functional training area",
    brief: "Functional zone · open floor, kettlebells, ropes (only if it exists)",
    motif: "functional",
    light: "top",
  },
  studio: {
    id: "studio",
    alt: "Group exercise studio",
    brief: "Studio · mirrors and open floor (only if classes run here)",
    motif: "studio",
    light: "right",
  },
  front: {
    id: "front",
    alt: "Aura Gym BRS Nagar building and entrance on Lodhi Club Road",
    brief: "Exterior · entrance and signage on Lodhi Club Road, early evening",
    motif: "front",
    light: "low",
  },
  lockers: {
    id: "lockers",
    alt: "Changing area",
    brief: "Changing area · clean, wide, empty (confirm facilities first)",
    motif: "lockers",
    light: "top",
  },
  experience: {
    id: "experience",
    alt: "Member training with focus at Aura Gym, BRS Nagar",
    brief: "Full-bleed band · atmospheric wide shot, movement, deep shadows",
    motif: "people",
    light: "top",
    focus: "50% 40%",
  },
};

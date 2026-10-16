// Enquiry validation — pure functions, shared by the browser and the tests.

/** @param {string} raw */
export function normalisePhone(raw) {
  const d = String(raw ?? "").replace(/\D/g, "");
  if (d.length === 10 && /^[6-9]/.test(d)) return `91${d}`;
  if (d.length === 11 && d.startsWith("0")) return `91${d.slice(1)}`;
  if (d.length === 12 && d.startsWith("91")) return d;
  return d;
}

export const LIMITS = { name: 80, phone: 20, interest: 60, time: 40, message: 800 };

/**
 * @param {Record<string, unknown>} input
 * @returns {{ ok: boolean, errors: Record<string,string>, value: Record<string,string> }}
 */
export function validateEnquiry(input) {
  /** @type {Record<string,string>} */
  const value = {};
  for (const [k, max] of Object.entries(LIMITS)) value[k] = String(input[k] ?? "").trim().slice(0, max);
  /** @type {Record<string,string>} */
  const errors = {};
  if (value.name.length < 2) errors.name = "Please enter your name.";
  const phone = normalisePhone(value.phone);
  if (!/^91[6-9]\d{9}$/.test(phone) && !(phone.length >= 11 && phone.length <= 15 && !phone.startsWith("91"))) {
    errors.phone = "Please enter a valid mobile number.";
  }
  if (!input.consent) errors.consent = "Please confirm we may call you about this enquiry.";
  return { ok: Object.keys(errors).length === 0, errors, value: { ...value, phone } };
}

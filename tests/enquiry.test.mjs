import { test } from "node:test";
import assert from "node:assert/strict";
import { validateEnquiry, normalisePhone } from "../src/lib/enquiry.js";

test("normalises Indian mobile numbers", () => {
  assert.equal(normalisePhone("93367 60005"), "919336760005");
  assert.equal(normalisePhone("093367-60005"), "919336760005");
  assert.equal(normalisePhone("+91 93367 60005"), "919336760005");
});

test("rejects incomplete enquiries", () => {
  const r = validateEnquiry({ name: "A", phone: "12345", consent: false });
  assert.equal(r.ok, false);
  assert.ok(r.errors.name && r.errors.phone && r.errors.consent);
});

test("accepts a valid enquiry and trims fields", () => {
  const r = validateEnquiry({ name: "  Simran  ", phone: "9876543210", interest: "Membership options", consent: true });
  assert.equal(r.ok, true);
  assert.equal(r.value.name, "Simran");
  assert.equal(r.value.phone, "919876543210");
});

test("rejects Indian numbers that are not mobiles", () => {
  assert.equal(validateEnquiry({ name: "Test", phone: "1234567890", consent: true }).ok, false);
});

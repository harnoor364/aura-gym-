// Progressive enhancements: reveal-on-scroll, click-to-load map, enquiry form.
import { validateEnquiry } from "../lib/enquiry.js";

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---- Reveal on scroll (content is visible without JS; this only animates) ----
const revealEls = document.querySelectorAll<HTMLElement>("[data-reveal]");
if (reduced || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("is-in"));
} else {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }),
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
  );
  revealEls.forEach((el) => io.observe(el));
}

// ---- Map: load Google Maps only when asked (privacy + performance) ----
document.querySelector<HTMLButtonElement>("[data-map-load]")?.addEventListener("click", (e) => {
  const btn = e.currentTarget as HTMLButtonElement;
  const iframe = document.createElement("iframe");
  iframe.src = btn.dataset.src!;
  iframe.title = "Map: Aura Gym, Lodhi Club Road, BRS Nagar, Ludhiana";
  iframe.loading = "lazy";
  iframe.referrerPolicy = "no-referrer-when-downgrade";
  iframe.allowFullscreen = true;
  btn.replaceWith(iframe);
});

// ---- Enquiry form ----
const form = document.querySelector<HTMLFormElement>("[data-enquiry]");
if (form) {
  const status = form.querySelector<HTMLElement>("[data-status]")!;
  const submit = form.querySelector<HTMLButtonElement>("[data-submit]")!;
  const phoneLink = document.querySelector<HTMLAnchorElement>('a[href^="tel:"]');

  const setStatus = (kind: "ok" | "error", html: string) => {
    status.hidden = false;
    status.className = `form-status is-${kind}`;
    status.innerHTML = html;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if ((form.elements.namedItem("company") as HTMLInputElement)?.value) return; // honeypot
    const fd = new FormData(form);
    const { ok, errors, value } = validateEnquiry({ ...Object.fromEntries(fd.entries()), consent: fd.get("consent") === "yes" });

    form.querySelectorAll<HTMLElement>("[data-err]").forEach((p) => {
      const key = p.dataset.err!;
      p.textContent = errors[key] ?? "";
      form.querySelector(`[name="${key}"]`)?.setAttribute("aria-invalid", errors[key] ? "true" : "false");
    });
    if (!ok) { (form.querySelector(`[name="${Object.keys(errors)[0]}"]`) as HTMLElement)?.focus(); return; }

    const mode = form.dataset.mode;
    const local = ["localhost", "127.0.0.1", ""].includes(location.hostname);
    submit.disabled = true;
    status.hidden = true;
    try {
      let res: Response;
      if (mode === "netlify") {
        if (local) throw new Error("Netlify Forms only work on the deployed Netlify site.");
        res = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(fd as unknown as Record<string, string>).toString() });
      } else {
        res = await fetch(form.dataset.endpoint!, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ ...value, source: "Aura Gym BRS Nagar website" }) });
      }
      if (!res.ok) throw new Error(`The form service responded with ${res.status}.`);
      setStatus("ok", `<strong>Thank you, ${escapeHtml(value.name)}.</strong> Your enquiry has been sent — the branch will call you back.`);
      form.reset();
    } catch (err) {
      const tel = phoneLink ? ` Please call <a href="${phoneLink.href}">${phoneLink.textContent?.trim()}</a> instead.` : "";
      const msg = err instanceof TypeError ? "We couldn't reach the form service." : (err as Error).message;
      setStatus("error", `<strong>Your enquiry was not sent.</strong> ${escapeHtml(msg)}${tel}`);
    } finally {
      submit.disabled = false;
    }
  });
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

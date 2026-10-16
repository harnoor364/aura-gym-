import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || "https://aura-gym-brs-nagar.vercel.app",
  trailingSlash: "ignore",
  build: { inlineStylesheets: "auto" },
  image: { responsiveStyles: false },
});

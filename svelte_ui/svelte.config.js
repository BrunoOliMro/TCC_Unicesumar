import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: "../server/public",
      assets: "../server/public",
      fallback: "index.html",
      precompress: false,
      strict: false,
    }),
    alias: {
      $assets: ".\\src\\assets",
    },
  },
};

export default config;

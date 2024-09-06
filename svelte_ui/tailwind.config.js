/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      height: {
        "nav-height": "60px",
        "content-height": "calc(100dvh - 60px)",
        "content-with-selector": "calc(100% - 96px)",
        "horizontal-card": "6rem",
        "gap-vertical-1/2-box": "calc(50% - 0.5rem)",
        "gap-vertical-1/3-box": "calc(33% - 0.3rem)",
        "gap-vertical-2/3-box": "calc(76% - 0.5rem)",
      },
      colors: {
        "main-color": "#0B5778",
        "main-color-hover": "rgba(11, 87, 120, 0.6)",
        "light-gray": "#F4F4F4",
        "base-red": "rgb(220, 53, 69)",
        "base-red-hover": "rgba(220, 53, 69, 0.6)",
        "base-green": "rgb(16, 189, 147)",
        "base-green-hover": "rgba(16, 189, 147, 0.6)",
        "remodel-bg": "rgb(185, 249, 233)",
        "base-yellow": "#F5A524",
        "text-gray": "#9E9E9E",
        "black-hover": "rgba(0,0,0,0.6)",
      },
      gap: {
        base: "1rem",
      },
      padding: {
        base: "1rem",
        box: "1.5rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

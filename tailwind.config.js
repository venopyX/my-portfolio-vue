module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      // Customize DaisyUI components or override existing Tailwind styles here
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark"], // Define themes or keep the defaults
    base: true, // Set to false if you want DaisyUI's base styles off
  },
};

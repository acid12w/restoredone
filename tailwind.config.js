/** @type {import('tailwindcss').Config} */
module.exports = {
  // Every file that contains Tailwind class names.
  content: ["./*.html", "./index.js"],
  theme: {
    // Same font stack the pages used with the CDN build.
    fontFamily: {
      sans: ["Poppins", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      display: ["Oswald"],
      body: ["Poppins"],
    },
  },
};

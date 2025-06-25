// postcss.config.mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // Assuming you're using Tailwind CSS
    autoprefixer: {},
    // Add other PostCSS plugins here as needed
  },
};

export default config;
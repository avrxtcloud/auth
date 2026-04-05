/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        zinc: {
          custom: "#121212",
        },
        border: {
          custom: "#1f1f1f",
        },
        accent: {
          gray: "#333333",
          mono: "#666666",
        },
        emerald: {
          500: "#10b981",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "Space Mono", "monospace"],
        outfit: ["Outfit", "sans-serif"],
        accent: ["Instrument Serif", "serif"],
      },
      animation: {
        "fade-in": "fadeInPage 0.8s ease-out forwards",
        "progress-flow": "progress-flow 2s linear infinite",
        "slow-spin": "slow-spin 12s linear infinite",
      },
      keyframes: {
        fadeInPage: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "progress-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        "slow-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};

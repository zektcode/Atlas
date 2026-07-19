import type { Config } from "tailwindcss";

// Design tokens sourced from /design/Color_Tokens.md and /design/Typography.md.
// Do not hardcode hex values in components — extend this file instead.
const config: Config = {
  darkMode: "class",
  content: [
    "./frontend/app/**/*.{ts,tsx}",
    "./frontend/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "#08090c", elevated: "#12141b", surface: "#161922" },
        border: { DEFAULT: "rgba(255,255,255,0.07)", strong: "rgba(255,255,255,0.14)" },
        text: { 1: "#f0f1f4", 2: "#9aa0ac", 3: "#5b6270" },
        indigo: { DEFAULT: "#7c8cff", dim: "#4a52a8" },
        bull: "#4ade9a",
        neutral: "#e8b04b",
        bear: "#f0665a",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: {
        lg: "14px",
        md: "9px",
      },
    },
  },
  plugins: [],
};

export default config;

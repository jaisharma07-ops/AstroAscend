import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        subtle: "var(--subtle)",
        border: "var(--border)",
        accent: {
          teal: "var(--accent-teal)",
          violet: "var(--accent-violet)",
          magenta: "var(--accent-magenta)",
        },
        glass: "var(--glass)",
        "glass-border": "var(--glass-border)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.22, 1, 0.36, 1)",
        "in-out-quint": "cubic-bezier(0.83, 0, 0.17, 1)",
      },
      backdropBlur: {
        "3xl": "64px",
      },
      keyframes: {
        "blob-drift-1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(8%, -6%) scale(1.08)" },
          "66%": { transform: "translate(-5%, 8%) scale(0.96)" },
        },
        "blob-drift-2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(-7%, 5%) scale(1.05)" },
          "66%": { transform: "translate(6%, -4%) scale(0.98)" },
        },
        "blob-drift-3": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(4%, 7%) scale(1.1)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "blob-drift-1": "blob-drift-1 38s ease-in-out infinite",
        "blob-drift-2": "blob-drift-2 44s ease-in-out infinite",
        "blob-drift-3": "blob-drift-3 36s ease-in-out infinite",
        "fade-in-up": "fade-in-up 600ms cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

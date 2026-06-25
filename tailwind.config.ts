import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          deep: "#6e150f",
          vibrant: "#b92a1c",
        },
        gold: {
          antique: "#d0a139",
          bright: "#fad64a",
        },
        cream: "#F5EFE6",
        surface: "#FFFFFF",
        charcoal: "#1A1A1A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "clamp(1.875rem, 2.5vw + 1rem, 3.5rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "clamp(1.5rem, 1.5vw + 0.75rem, 2.25rem)",
          { lineHeight: "1.15", letterSpacing: "-0.015em" },
        ],
        "display-md": [
          "clamp(1.25rem, 1vw + 0.625rem, 1.75rem)",
          { lineHeight: "1.2", letterSpacing: "-0.01em" },
        ],
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, #6e150f 0%, #b92a1c 100%)",
        "gradient-gold": "linear-gradient(90deg, #d0a139 0%, #fad64a 100%)",
        "gradient-brand": "linear-gradient(135deg, #b92a1c 0%, #d0a139 100%)",
      },
      boxShadow: {
        card: "0 4px 24px rgba(110, 21, 15, 0.08)",
        "card-hover": "0 8px 32px rgba(110, 21, 15, 0.14)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;

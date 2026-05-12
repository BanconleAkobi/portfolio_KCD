import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          tertiary: "var(--bg-tertiary)",
        },
        accent: {
          blue: "var(--accent-blue)",
          cyan: "var(--accent-cyan)",
          amber: "var(--accent-amber)",
          silver: "var(--accent-silver)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          accent: "var(--text-accent)",
        },
        line: {
          subtle: "var(--line-subtle)",
          medium: "var(--line-medium)",
          bright: "var(--line-bright)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem,8vw,7.5rem)", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
        "display-l": ["clamp(2.5rem,5.5vw,5rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "heading-1": ["clamp(2rem,3.5vw,3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "heading-2": ["clamp(1.5rem,2.5vw,2.375rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "heading-3": ["clamp(1.125rem,2vw,1.625rem)", { lineHeight: "1.3" }],
        "body-l": ["1.125rem", { lineHeight: "1.7" }],
        "body": ["1rem", { lineHeight: "1.65" }],
        "body-s": ["0.875rem", { lineHeight: "1.5" }],
        "mono-s": ["0.8125rem", { lineHeight: "1.4" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "100": "25rem",
        "120": "30rem",
      },
      animation: {
        "spin-slow": "spin 25s linear infinite",
        "float": "float 7s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "draw-line": "drawLine 1s ease-out forwards",
        "blink": "blink 1.2s step-end infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        drawLine: {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glow-blue": "0 0 30px -8px var(--accent-blue)",
        "glow-blue-sm": "0 0 16px -4px var(--accent-blue)",
        "card": "0 1px 0 0 var(--line-subtle), 0 4px 32px 0 rgba(0,0,0,0.4)",
        "card-hover": "0 1px 0 0 var(--line-medium), 0 8px 48px 0 rgba(0,0,0,0.5)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      maxWidth: {
        "8xl": "88rem",
      },
    },
  },
  plugins: [],
};

export default config;

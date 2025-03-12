import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "var(--foreground)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          foreground: "var(--secondary-foreground)",
        },
        success: {
          DEFAULT: "var(--color-success)",
          foreground: "hsl(var(--success-foreground))",
        },
        danger: {
          DEFAULT: "var(--color-danger)",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        complement: {
          DEFAULT: "var(--color-complement)",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        background: {
          DEFAULT: "var(--color-background)",
          foreground: "var(--color-primary)",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          manager: "var(--sidebar-manager-background)",
          "manager-foreground": "var(--sidebar-manager-foreground)",
          "manager-active": "var(--sidebar-manager-active)",
          reviewer: "var(--sidebar-reviewer-background)",
          "reviewer-foreground": "var(--sidebar-reviewer-foreground)",
          "reviewer-active": "var(--sidebar-reviewer-active)",
          requester: "var(--sidebar-requester-background)",
          "requester-foreground": "var(--sidebar-requester-foreground)",
          "requester-active": "var(--sidebar-requester-active)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        raleway: ["var(--font-raleway)"],
      },
      fontSize: {
        h1: "calc(var(--font-size) * 3)",
        h2: "calc(var(--font-size) * 2.25)",
        h3: "calc(var(--font-size) + 7px)",
        h4: "calc(var(--font-size) + 1px)",
        h5: "calc(var(--font-size) + 1px)",
        md: "calc(var(--font-size) - 1px)",
        sm: "calc(var(--font-size) - 5px)",
      },
      spacing: {
        0: "0px",
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "24px",
        6: "32px",
        7: "48px",
        8: "64px",
        9: "96px",
        10: "128px",
      },
    },
  },
  plugins: [animate],
};
export default config;

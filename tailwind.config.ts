import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    fontFamily: {
      sans:    ["Inter",        "system-ui", "sans-serif"],
      display: ["Space Grotesk","Inter",     "system-ui", "sans-serif"],
      mono:    ["ui-monospace", "JetBrains Mono", "Fira Code", "monospace"],
    },
    extend: {
      /* ── Colors (shadcn/ui compat) ── */
      colors: {
        border:     "hsl(var(--border))",
        input:      "hsl(var(--input))",
        ring:       "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT:            "hsl(var(--sidebar-background))",
          foreground:         "hsl(var(--sidebar-foreground))",
          primary:            "hsl(var(--sidebar-primary))",
          "primary-foreground":"hsl(var(--sidebar-primary-foreground))",
          accent:             "hsl(var(--sidebar-accent))",
          "accent-foreground":"hsl(var(--sidebar-accent-foreground))",
          border:             "hsl(var(--sidebar-border))",
          ring:               "hsl(var(--sidebar-ring))",
        },
      },

      /* ── Border radius — maps to CSS token scale ── */
      borderRadius: {
        none:  "var(--radius-none)",
        sm:    "var(--radius-sm)",
        base:  "var(--radius-base)",
        DEFAULT:"var(--radius-md)",    /* 8px — buttons */
        md:    "var(--radius-md)",
        lg:    "var(--radius-lg)",
        xl:    "var(--radius-xl)",    /* 12px — cards */
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
        full:  "var(--radius-full)",
      },

      /* ── Box shadows ── */
      boxShadow: {
        xs:          "var(--shadow-xs)",
        sm:          "var(--shadow-sm)",
        md:          "var(--shadow-md)",
        lg:          "var(--shadow-lg)",
        xl:          "var(--shadow-xl)",
        "2xl":       "var(--shadow-2xl)",
        card:        "var(--shadow-card)",
        "card-hover":"var(--shadow-card-hover)",
        "glow-brand":"var(--shadow-glow-brand)",
        focus:       "var(--shadow-focus)",
        none:        "none",
      },

      /* ── Transition timing functions ── */
      transitionTimingFunction: {
        "ease-spring":   "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "ease-back-out": "cubic-bezier(0.34, 1.30, 0.64, 1)",
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-in-expo":  "cubic-bezier(0.7, 0, 0.84, 0)",
      },

      /* ── Transition durations ── */
      transitionDuration: {
        instant: "75ms",
        fast:    "150ms",
        base:    "250ms",
        slow:    "400ms",
        slower:  "550ms",
        slowest: "700ms",
      },

      /* ── Z-index ── */
      zIndex: {
        hide:     "-1",
        base:     "0",
        raised:   "10",
        dropdown: "100",
        sticky:   "200",
        overlay:  "300",
        modal:    "400",
        toast:    "500",
        tooltip:  "600",
      },

      /* ── Keyframes ── */
      keyframes: {
        /* Radix accordion */
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        /* Entrance */
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        /* Ambient */
        "aurora-shift": {
          "0%":   { transform: "translate(0%, 0%) scale(1)",    opacity: "1"    },
          "33%":  { transform: "translate(2%, -3%) scale(1.04)", opacity: "0.92" },
          "66%":  { transform: "translate(-2%, 2%) scale(0.97)", opacity: "0.96" },
          "100%": { transform: "translate(0%, 0%) scale(1)",    opacity: "1"    },
        },
        "float-ambient": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.35" },
          "50%":      { opacity: "0.65" },
        },
        "skeleton-shimmer": {
          from: { backgroundPosition: "-200% 0" },
          to:   { backgroundPosition: "200% 0"  },
        },
      },

      /* ── Animation utilities ── */
      animation: {
        "accordion-down":    "accordion-down 0.2s ease-out",
        "accordion-up":      "accordion-up 0.2s ease-out",
        "fade-up":           "fade-up 0.55s cubic-bezier(0.25,0.46,0.45,0.94) both",
        "fade-in":           "fade-in 0.4s cubic-bezier(0,0,0.2,1) both",
        "scale-in":          "scale-in 0.3s cubic-bezier(0.34,1.56,0.64,1) both",
        "aurora-shift":      "aurora-shift 60s ease-in-out infinite alternate",
        "float-ambient":     "float-ambient 6s ease-in-out infinite",
        "glow-pulse":        "glow-pulse 3s ease-in-out infinite",
        "skeleton-shimmer":  "skeleton-shimmer 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

import tailwindcssAnimate from "tailwindcss-animate";
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        sans: ['Rubik Variable', 'Rubik', 'system-ui', 'sans-serif'],
        display: ['Rubik Variable', 'Rubik', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'eyebrow': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.12em', fontWeight: '600' }],
        'label': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '500' }],
        'body': ['1rem', { lineHeight: '1.65' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'display-sm': ['clamp(1.375rem, 2vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '700' }],
        'display-lg': ['clamp(2.25rem, 4vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-xl': ['clamp(3rem, 7vw, 6.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '900' }],
      },
      boxShadow: {
        'depth-1': 'var(--shadow-sm)',
        'depth-2': 'var(--shadow-md)',
        'depth-3': 'var(--shadow-lg)',
        'depth-4': 'var(--shadow-xl)',
        'card-warm': '0 12px 32px -12px hsl(24 60% 30% / 0.18), 0 2px 6px -1px hsl(24 60% 30% / 0.08)',
        'glow-sm': '0 0 10px hsl(var(--primary) / 0.3)',
        'glow-md': '0 0 20px hsl(var(--primary) / 0.4)',
        'glow-primary': '0 12px 40px hsl(var(--primary) / 0.35)',
        'glow-accent': '0 8px 32px hsl(var(--accent) / 0.3)',
        'glow-cream': '0 12px 40px hsl(36 33% 70% / 0.4)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        pill: "9999px",
        editorial: "1.75rem",
      },
      spacing: {
        'section-sm': 'var(--space-section-sm)',
        'section-md': 'var(--space-section-md)',
        'section-lg': 'var(--space-section-lg)',
        'section-xl': 'var(--space-section-xl)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;

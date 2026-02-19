// Tailwind CSS configuration tailored to src/styles/global.css
// - Dark mode controlled via `.dark` class
// - Theme values wired to the CSS variables defined in global.css (@theme inline)
// - Content paths cover Astro and typical template/script files

/** @type {import('tailwindcss').Config} */
export default {
  // v4 prefers @source in CSS, but keeping content here helps editor tooling and v3 compatibility
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}",
    "./public/**/*.{html,astro}",
    "./**/*.{mdx,md}",
  ],

  darkMode: ["class", ".dark"],

  theme: {
    extend: {
      colors: {
        // Brand palette
        "brand-forest-green": "var(--color-brand-forest-green)",
        "brand-thermo-red": "var(--color-brand-thermo-red)",
        "brand-natural-green": "var(--color-brand-natural-green)",
        "brand-logo-green": "var(--color-brand-logo-green)",

        // Base palette mapped to CSS variables from @theme inline
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        card: "var(--color-card)",
        "card-foreground": "var(--color-card-foreground)",
        popover: "var(--color-popover)",
        "popover-foreground": "var(--color-popover-foreground)",
        primary: "var(--color-primary)",
        "primary-foreground": "var(--color-primary-foreground)",
        secondary: "var(--color-secondary)",
        "secondary-foreground": "var(--color-secondary-foreground)",
        muted: "var(--color-muted)",
        "muted-foreground": "var(--color-muted-foreground)",
        accent: "var(--color-accent)",
        "accent-foreground": "var(--color-accent-foreground)",
        destructive: "var(--color-destructive)",
        "destructive-foreground": "var(--color-destructive-foreground)",
        border: "var(--color-border)",
        input: "var(--color-input)",
        "input-background": "var(--color-input-background)",
        "switch-background": "var(--color-switch-background)",
        ring: "var(--color-ring)",
        // Text helpers
        "text-primary": "var(--color-text-primary)",
        "text-body": "var(--color-text-body)",
        "text-inactive": "var(--color-text-inactive)",
        // Charts
        "chart-1": "var(--color-chart-1)",
        "chart-2": "var(--color-chart-2)",
        "chart-3": "var(--color-chart-3)",
        "chart-4": "var(--color-chart-4)",
        "chart-5": "var(--color-chart-5)",
        // Sidebar
        sidebar: "var(--color-sidebar)",
        "sidebar-foreground": "var(--color-sidebar-foreground)",
        "sidebar-primary": "var(--color-sidebar-primary)",
        "sidebar-primary-foreground": "var(--color-sidebar-primary-foreground)",
        "sidebar-accent": "var(--color-sidebar-accent)",
        "sidebar-accent-foreground": "var(--color-sidebar-accent-foreground)",
        "sidebar-border": "var(--color-sidebar-border)",
        "sidebar-ring": "var(--color-sidebar-ring)",
      },

      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },

      fontFamily: {
        // Uses the variable to keep a single source of truth
        sans: ["var(--font-family)"],
      },
    },
  },

  // No plugins enabled by default; add common ones if/when needed
  plugins: [
    // require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
  ],
};


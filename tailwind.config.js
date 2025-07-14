/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
        border: "#C7C9D9",
        input: "#F4F5F8",
        ring: "#6753FF",
        background: "#FFFFFF",
        foreground: "#0B0D17",
        primary: {
          DEFAULT: "#6753FF",
          foreground: "#FFFFFF",
          hover: "#4E3BC0",
        },
        secondary: {
          DEFAULT: "#F4F5F8",
          foreground: "#0B0D17",
        },
        destructive: {
          DEFAULT: "#FF4F4F",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F4F5F8",
          foreground: "#6C6F80",
        },
        accent: {
          DEFAULT: "#EEF0FF",
          foreground: "#0B0D17",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#0B0D17",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#0B0D17",
        },
        surface: "#FFFFFF",
        success: "#1DB67D",
        warning: "#FFC857",
        "background-light": "#EEF0FF",
        "text-primary": "#0B0D17",
        "text-secondary": "#2E2F38",
        "text-muted": "#6C6F80",
        "bg-muted": "#F4F5F8",
      },
      borderRadius: {
        sm: "0.375rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
        full: "9999px",
      },
      boxShadow: {
        card: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      fontWeight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      keyframes: {
        "accordion-down": {
          from: { 
            height: "0",
            opacity: "0"
          },
          to: { 
            height: "var(--radix-accordion-content-height)",
            opacity: "1"
          },
        },
        "accordion-up": {
          from: { 
            height: "var(--radix-accordion-content-height)",
            opacity: "1"
          },
          to: { 
            height: "0",
            opacity: "0"
          },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-down": {
          from: { transform: "translateY(-10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(0)", opacity: "1" },
          to: { transform: "translateY(-10px)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "accordion-up": "accordion-up 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-out",
        "slide-down": "slide-down 0.2s ease-out",
        "slide-up": "slide-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

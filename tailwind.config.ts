import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#9029CB",
        primary_light: "#B85DEC",
        dark: "#232730",
        dark_blue: "#2C364B",
        gray_light: '#535D74',
      },
    },
  },
  plugins: [],
} satisfies Config;

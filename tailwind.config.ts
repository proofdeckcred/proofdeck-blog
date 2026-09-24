import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        pd: {
          indigo: "#4A3AA8",
          "indigo-dark": "#3b2e88",
          ink: "#0B0B12",
          paper: "#F7F7FA",
          "paper-dot": "#E7E7EF",
          line: "#E7E5F0",
          mute: "#6B6B7C",
        },
      },
    },
  },
  plugins: [],
};
export default config;

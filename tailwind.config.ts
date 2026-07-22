import type { Config } from "tailwindcss";

const config: Config = {
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
        navy: {
          50: '#f0f4f9',
          100: '#dce5f1',
          200: '#becfe2',
          300: '#91b0cc',
          400: '#5f8cb3',
          500: '#3e709a',
          600: '#2c5980',
          700: '#244869',
          800: '#1f3e58',
          900: '#0b1f3a', // Deep Navy
          950: '#071325',
        },
        primary: "#2563EB", // Blue
        success: "#10B981", // Emerald
        warning: "#F97316", // Orange
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      colors: {
        rustik: {
          cream: '#F5F2ED',
          dark: '#1A1A18',
          olive: '#5C5C3D',
          stone: '#8C8070',
          warm: '#D4C5B0',
        },
      },
    },
  },
  plugins: [],
};

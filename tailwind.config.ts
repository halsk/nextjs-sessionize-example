import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#041E42',
        secondary: '#003877',
      },
    },
    darkMode: false,
  },
  safelist: [
    // Generate classes from grid-cols-1 to grid-cols-12
    ...Array.from({ length: 12 }, (_, i) => `grid-cols-${i + 1}`),
  ],
  plugins: [],
}
export default config

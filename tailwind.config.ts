import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: 'var(--black)',
        white: 'var(--white)',
        cream: 'var(--cream)',
        orange: 'var(--orange)',
        'orange-dim': 'var(--orange-dim)',
        grey: 'var(--grey)',
        'grey-mid': 'var(--grey-mid)',
        'grey-light': 'var(--grey-light)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        serif: 'var(--font-serif)',
        body: 'var(--font-body)',
      },
    },
  },
  plugins: [],
};

export default config;

import tailwindTypography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import tailwindAnimate from 'tailwindcss-animate';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/contents/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-hanken-grotesk)', ...fontFamily.sans],
        spacemono: ['var(--font-space-mono)', ...fontFamily.sans],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      typography: {
        DEFAULT: {
          css: {
            p: {
              fontSize: '1rem',
              lineHeight: '1.75',
            },
            h2: {
              marginBottom: '0.75rem',
              fontSize: '1.5rem',
            },
            h3: {
              marginTop: '1rem',
              marginBottom: '0.5rem',
              fontSize: '1.25rem',
            },
            h4: {
              marginTop: '1rem',
              marginBottom: '0.5rem',
              fontSize: '1rem',
            },
            figure: {
              margin: 0,
            },
          },
        },
      },
    },
  },
  plugins: [tailwindAnimate, tailwindTypography],
} satisfies Config;

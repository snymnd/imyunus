import type { AppProps } from 'next/app';
import { Hanken_Grotesk, Space_Mono } from 'next/font/google';

import '@/styles/globals.css';

import cn from '@/lib/cn';

const hanken_grotesk = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-hanken-grotesk',
});

const space_mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: 'italic',
  variable: '--font-space-mono',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={cn(
        hanken_grotesk.variable,
        space_mono.variable,
        'font-primary',
      )}
    >
      <Component {...pageProps} />;
    </div>
  );
}

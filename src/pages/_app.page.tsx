import { MotionConfig } from 'motion/react';
import type { AppProps } from 'next/app';
import { Hanken_Grotesk, Space_Mono } from 'next/font/google';
import { useRemoteRefresh } from 'next-remote-refresh/hook';

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
  useRemoteRefresh();

  return (
    <div
      className={cn(
        hanken_grotesk.variable,
        space_mono.variable,
        'font-primary',
      )}
    >
      <MotionConfig
        transition={{
          delay: 0.1,
          type: 'spring',
          ease: 'easeIn',
          duration: 0.4,
          bounce: 0.1,
        }}
      >
        <Component {...pageProps} />;
      </MotionConfig>
    </div>
  );
}

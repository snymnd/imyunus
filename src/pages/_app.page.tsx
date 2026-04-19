import { MotionConfig } from 'motion/react';
import type { AppProps } from 'next/app';
import { Hanken_Grotesk, Space_Mono } from 'next/font/google';
import { useRemoteRefresh } from 'next-remote-refresh/hook';
import { ThemeProvider } from 'next-themes';

import '@/styles/globals.css';

import cn from '@/lib/cn';

const hanken_grotesk = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-hanken-grotesk',
});

const space_mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: 'italic',
  variable: '--font-space-mono',
});

function DevRefresh() {
  useRemoteRefresh();
  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
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
          {process.env.NODE_ENV !== 'production' && <DevRefresh />}
          <Component {...pageProps} />
        </MotionConfig>
      </div>
    </ThemeProvider>
  );
}

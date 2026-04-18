import Image from 'next/image';
import * as React from 'react';

import NextLink from '@/components/NextLink';
import ThemeToggle from '@/components/ThemeToggle';
import { headerNav } from '@/constant/navigation';

export default function Header() {
  return (
    <header className='sticky top-0 z-30 bg-background'>
      <nav aria-label='Primary' className='py-3 border-b-2 border-border'>
        <div className='layout flex items-center justify-between gap-x-2 sm:gap-x-4'>
          <NextLink
            href='/'
            aria-label='Muhammad Yunus — home'
            className='focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded'
          >
            <figure className='w-10 sm:w-[4.375rem]'>
              <Image
                src='/images/logo.png'
                alt=''
                aria-hidden='true'
                width={70}
                height={30}
                sizes='(min-width: 640px) 70px, 40px'
                className='w-full dark:invert'
              />
            </figure>
          </NextLink>
          <div className='flex items-center gap-x-4 sm:gap-x-6'>
            {headerNav.map((nav) => (
              <NextLink
                key={nav.href}
                href={nav.href}
                className='sm:text-xl font-semibold group transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded'
              >
                {nav.label}
                {/* scaleX avoids layout-triggering max-width animation */}
                <span className='block h-1 bg-foreground -mt-1 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500' />
              </NextLink>
            ))}
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}

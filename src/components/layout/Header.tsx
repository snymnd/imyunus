import Image from 'next/image';
import * as React from 'react';

import NextLink from '@/components/NextLink';
import { headerNav } from '@/constant/navigation';

export default function Header() {
  return (
    <header className='sticky top-0 z-30 bg-background'>
      <nav className='py-3 border-b-2 border-black'>
        <div className='layout flex items-center justify-between gap-x-2 sm:gap-x-4'>
          <NextLink href='/'>
            <figure className='w-10 sm:w-[4.375rem]'>
              <Image
                src='/images/logo.png'
                alt='Muhammad Yunus logo'
                width={70}
                height={30}
                className='w-full'
              />
            </figure>
          </NextLink>
          <div className='space-x-4 sm:space-x-6'>
            {headerNav.map((nav) => (
              <NextLink
                key={nav.href}
                href={nav.href}
                className='sm:text-xl font-semibold'
              >
                {nav.label}
              </NextLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

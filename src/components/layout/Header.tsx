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
                sizes='(min-width: 640px) 70px, 40px'
                className='w-full'
              />
            </figure>
          </NextLink>
          <div className='flex gap-x-4 sm:gap-x-6'>
            {headerNav.map((nav) => (
              <NextLink
                key={nav.href}
                href={nav.href}
                className='sm:text-xl font-semibold group transition duration-150'
              >
                {nav.label}
                <span className='block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 bg-black -mt-1 rounded-full' />
              </NextLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

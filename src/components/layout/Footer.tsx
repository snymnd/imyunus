import Image from 'next/image';
import * as React from 'react';

import IconLink from '@/components/IconLink';
import NextLink from '@/components/NextLink';

import Email from '~/svg/email.svg';
import Github from '~/svg/github.svg';
import Linkedin from '~/svg/linkedin.svg';

export default function Footer() {
  return (
    <footer className='border-t-2 border-border py-6 mt-10'>
      <div className='flex flex-col sm:flex-row gap-4 sm:justify-between layout'>
        <div>
          <NextLink
            href='/'
            aria-label='Muhammad Yunus — home'
            className='focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded inline-block'
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
          <p className='text-muted mt-2'>
            &copy; {new Date().getFullYear()} Muhammad Yunus.
          </p>
        </div>

        <div>
          <h3 className='text-xl font-semibold'>Get in touch</h3>
          <div className='flex gap-2 items-center'>
            <IconLink
              href='mailto:muh.yunus310502@gmail.com'
              aria-label='Send email to Muhammad Yunus'
            >
              <Email className='size-8 dark:invert' aria-hidden='true' />
            </IconLink>
            <IconLink
              href='https://linkedin.com/in/muh-yunus31'
              aria-label='Muhammad Yunus on LinkedIn'
            >
              <Linkedin className='size-8 dark:invert' aria-hidden='true' />
            </IconLink>
            <IconLink
              href='https://github.com/snymnd'
              aria-label='Muhammad Yunus on GitHub'
            >
              <Github className='size-8 dark:invert' aria-hidden='true' />
            </IconLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

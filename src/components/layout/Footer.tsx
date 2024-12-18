import Image from 'next/image';
import * as React from 'react';

import NextLink from '@/components/NextLink';

import Email from '~/svg/email.svg';
import Github from '~/svg/github.svg';
import Linkedin from '~/svg/linkedin.svg';

export default function Footer() {
  return (
    <footer className='border-t-2 border-black py-6 mt-10'>
      <div className='flex flex-col sm:flex-row gap-4 sm:justify-between layout'>
        <div>
          <NextLink href='/' aria-label='my logo'>
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
          <p className='text-gray-500 mt-2'>
            &copy; {new Date().getFullYear()} Muhammad Yunus.
          </p>
        </div>

        <div>
          <h3 className='text-xl font-semibold'>Get in touch</h3>
          <div className='flex gap-2 items-center'>
            <a
              href='mailto:muh.yunus31050@gmail.com'
              aria-label='email'
              rel='noopener noreferrer'
            >
              <Email className='size-9' />
            </a>
            <a
              href='https://linkedin.com/in/muh-yunus31'
              aria-label='linkedin'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Linkedin className='size-8' />
            </a>
            <a
              href='https://github.com/snymnd'
              aria-label='github'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Github className='size-8' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

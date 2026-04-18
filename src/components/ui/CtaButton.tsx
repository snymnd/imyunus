import * as React from 'react';

import cn from '@/lib/cn';

import NextLink from '@/components/NextLink';

type CtaButtonProps = React.ComponentPropsWithoutRef<'a'>;

export default function CtaButton({
  className,
  children,
  ...rest
}: CtaButtonProps) {
  return (
    <NextLink
      className={cn(
        'duration-200 transition-all',
        'border-2 border-border inline-block cursor-pointer',
        'text-xl py-2 px-4 sm:py-4 sm:px-8 rounded-full font-spacemono',
        'hover:shadow-[2px_2px_0_2px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0_2px_rgba(237,237,237,1)]',
        'hover:-translate-x-0.5 hover:-translate-y-0.5',
        'active:shadow-none active:translate-x-0 active:translate-y-0',
        'active:bg-foreground active:text-background',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
      {...rest}
    >
      {children}
    </NextLink>
  );
}

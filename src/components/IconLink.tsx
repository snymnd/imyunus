import * as React from 'react';

import cn from '@/lib/cn';

import NextLink from '@/components/NextLink';

type IconLinkProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'a'>;

export default function IconLink({
  children,
  className,
  ...rest
}: IconLinkProps) {
  return (
    <NextLink
      className={cn(
        'p-1 border rounded-lg group',
        'duration-200 transition-all',
        'hover:shadow-[1px_1px_0_1px_rgba(0,0,0,1)] hover:-translate-x-[1px] hover:-translate-y-[1px]',
        'active:shadow-none active:-translate-y-0 active:translate-x-0',
        className,
      )}
      aria-label='icon-link'
      {...rest}
    >
      {children}
    </NextLink>
  );
}

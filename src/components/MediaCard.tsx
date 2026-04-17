import * as React from 'react';

import cn from '@/lib/cn';

type MediaCardProps = {
  title: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;

export default function MediaCard({
  className,
  title,
  children,
  ...rest
}: MediaCardProps) {
  return (
    <div className={cn('', className)} {...rest}>
      <p className='m-0 px-2 py-1 text-sm rounded-t-lg border-2 border-border bg-foreground text-background'>
        {title}
      </p>
      <div className='border-2 border-t-0 my-0 rounded-b-lg border-border overflow-hidden'>
        {children}
      </div>
    </div>
  );
}

import * as React from 'react';

import cn from '@/lib/cn';

import MediaCard from '@/components/MediaCard';

type VideoCardProps = {
  src: string;
  title: string;
  type: string;
} & React.ComponentPropsWithoutRef<'video'>;

export default function VideoCard({
  className,
  title,
  type = 'video/mp4',
  src,
  ...rest
}: VideoCardProps) {
  return (
    <MediaCard title={title}>
      <video
        preload='none'
        className={cn('my-0 w-full h-full', className)}
        autoPlay
        controls
        muted
        loop
        {...rest}
      >
        <source src={src} type={type} />
      </video>
    </MediaCard>
  );
}

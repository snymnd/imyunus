import { ImageProps } from 'next/image';
import * as React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import 'yet-another-react-lightbox/styles.css';

import cn from '@/lib/cn';

import LazyLoadImage from '@/components/LazyLoadImage';
import MediaCard from '@/components/MediaCard';

type ImageCardProps = {
  title: string;
  containerClassName?: string;
} & ImageProps;

export default function ImageCard({
  title,
  containerClassName,
  className,
  ...rest
}: ImageCardProps) {
  const [openLightBox, setOpenLightBox] = React.useState(false);

  return (
    <MediaCard title={title} className={cn('w-fit h-fit', containerClassName)}>
      <Lightbox
        open={openLightBox}
        close={() => setOpenLightBox(false)}
        slides={[{ src: rest.src as string, alt: title }]}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
        plugins={[Zoom]}
      />
      <button
        type='button'
        onClick={() => setOpenLightBox(true)}
        className='cursor-zoom-in block w-full'
      >
        <LazyLoadImage
          className='w-full'
          imageClassname={cn('object-contain', className)}
          {...rest}
          alt={title}
        />
      </button>
    </MediaCard>
  );
}

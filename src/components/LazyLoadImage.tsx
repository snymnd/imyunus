import Image, { ImageProps } from 'next/image';
import * as React from 'react';

type LazyLoadImageProps = {
  className?: string;
  imageClassname?: string;
  alt: string;
} & ImageProps;

export default function LazyLoadImage({
  className,
  imageClassname,
  alt,
  ...rest
}: LazyLoadImageProps) {
  const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  return (
    <figure className={className}>
      <Image
        alt={alt}
        width={650}
        height={366}
        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(Number(rest.width) || 650, Number(rest.height) || 366))}`}
        className={imageClassname}
        {...rest}
      />
    </figure>
  );
}

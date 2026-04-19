import Image, { ImageProps } from 'next/image';
import * as React from 'react';

type LazyLoadImageProps = {
  className?: string;
  imageClassname?: string;
  alt: string;
} & ImageProps;

type ShimmerDataUrl = `data:image/svg+xml;base64,${string}`;

const shimmerCache = new Map<string, ShimmerDataUrl>();

function getShimmerPlaceholder(w: number, h: number): ShimmerDataUrl {
  const key = `${w}x${h}`;
  const cached = shimmerCache.get(key);
  if (cached) return cached;

  const svg = `<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
  </svg>`;

  const encoded =
    typeof window === 'undefined'
      ? Buffer.from(svg).toString('base64')
      : window.btoa(svg);

  const result: ShimmerDataUrl = `data:image/svg+xml;base64,${encoded}`;
  shimmerCache.set(key, result);
  return result;
}

export default function LazyLoadImage({
  className,
  imageClassname,
  alt,
  ...rest
}: LazyLoadImageProps) {
  const w = Number(rest.width) || 650;
  const h = Number(rest.height) || 366;

  return (
    <figure className={className}>
      <Image
        alt={alt}
        width={650}
        height={366}
        placeholder={getShimmerPlaceholder(w, h)}
        className={imageClassname}
        {...rest}
      />
    </figure>
  );
}

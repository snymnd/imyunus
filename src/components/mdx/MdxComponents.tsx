import { MDXComponents } from 'next-mdx-remote-client';

import ImageCard from '@/components/ImageCard';
import Toc from '@/components/mdx/Toc';
import NextLink from '@/components/NextLink';
import TechStackToolTip from '@/components/TechStackTooltip';
import VideoCard from '@/components/VideoCard';

/** any component that will be used in .mdx file format */
export const MdxComponents: MDXComponents = {
  Toc,
  TechStackToolTip,
  VideoCard,
  ImageCard,
  a: (props) => <NextLink {...props} />,
};

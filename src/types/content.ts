import { TocItem } from 'remark-flexible-toc';

import { TechStackType } from '@/constant/tech-stack';

export type Frontmatter = {
  title: string;
  author: string;
  publishedAt?: string;
  updatedAt?: string;
  techStack?: TechStackType[];
  summary: string;
  priority?: number;
  repositories?: {
    name: string;
    url: string;
  }[];
  liveDemo?: string;
  images: string[];
};

export type Post = Frontmatter & { slug: string };

export type Scope = {
  readingTime?: string;
  toc: TocItem[];
};

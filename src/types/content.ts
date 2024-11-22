import { TocItem } from 'remark-flexible-toc';

export type Frontmatter = {
  title: string;
  author: string;
  publishedAt?: string;
  updatedAt?: string;
  summary: string;
  liveDemo: string;
  repositories: {
    name: string;
    url: string;
  }[];
  priority: number;
  images: string[];
};

export type Post = Frontmatter & { slug: string };

export type Scope = {
  readingTime?: string;
  toc: TocItem[];
};

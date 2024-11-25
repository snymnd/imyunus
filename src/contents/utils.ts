import fs from 'fs';
import { getFrontmatter } from 'next-mdx-remote-client/utils';
import path from 'path';

import { Frontmatter } from '@/types/content';

export const RE = /\.mdx$/; // Only .mdx files
export type MdxPostCategory = 'projects' | 'blogs';

type Post = {
  slug: string;
} & Frontmatter;

export const getMdxSource = async (
  filename: string,
  postCategory: MdxPostCategory,
): Promise<string | undefined> => {
  const sourcePath = path.join(
    process.cwd(),
    'src',
    'contents',
    postCategory,
    filename,
  );
  if (!fs.existsSync(sourcePath)) {
    return;
  }
  return await fs.promises.readFile(sourcePath, 'utf8');
};

/** get the markdown file list */
export const getMarkdownFiles = (postCategory: MdxPostCategory): string[] => {
  return fs
    .readdirSync(path.join(process.cwd(), 'src', 'contents', postCategory))
    .filter((filePath: string) => RE.test(filePath));
};

/** Get post list and its information */
export const getPostListWithInformation = (
  postCategory: MdxPostCategory,
): (Post | undefined)[] => {
  const files = getMarkdownFiles(postCategory);

  const posts = files.map((filename) => {
    return getPostInformation(filename, postCategory);
  });

  return posts;
};

/** get the source and format from a slug !*/
export const getMarkdownFromSlug = async (
  slug: string,
  postCategory: MdxPostCategory,
): Promise<
  | {
      source: string;
      format: 'md' | 'mdx';
    }
  | undefined
> => {
  const filename = slug + '.mdx';
  const fullPath = path.join(
    process.cwd(),
    'src',
    'contents',
    postCategory,
    filename,
  );

  if (fs.existsSync(fullPath)) {
    const source = await getMdxSource(filename, postCategory);

    if (!source) return;

    return {
      source,
      format: 'mdx',
    };
  }
};

export const getSourceSync = (
  filename: string,
  postCategory: MdxPostCategory,
): string | undefined => {
  const sourcePath = path.join(
    process.cwd(),
    'src',
    'contents',
    postCategory,
    filename,
  );
  if (!fs.existsSync(sourcePath)) return;
  return fs.readFileSync(sourcePath, 'utf8');
};

/** get the frontmatter and slug of a file */
export const getPostInformation = (
  filename: string,
  postCategory: MdxPostCategory,
) => {
  const source = getSourceSync(filename, postCategory);

  if (!source) return;

  const frontmatter = getFrontmatter<Frontmatter>(source).frontmatter;

  const post = {
    ...frontmatter,
    // remove the .mdx extension for the slug
    slug: filename.replace(/\.mdx$/, ''),
  };

  return post;
};

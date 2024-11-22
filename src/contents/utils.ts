import fs from 'fs';
import path from 'path';

export const RE = /\.mdx?$/; // Only .md(x) files
export type MdxPostCategory = 'projects' | 'blogs';

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

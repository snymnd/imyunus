import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Link } from 'lucide-icons-react';
import { MDXClient } from 'next-mdx-remote-client';
import {
  serialize,
  SerializeOptions,
  SerializeResult,
} from 'next-mdx-remote-client/serialize';
import * as React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/styles.css';

import { plugins } from '@/lib/mdx';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/Carousel';
import Layout from '@/components/layout/Layout';
import LazyLoadImage from '@/components/LazyLoadImage';
import { MdxComponents } from '@/components/mdx/MdxComponents';
import Toc from '@/components/mdx/Toc';
import NextLink from '@/components/NextLink';
import Seo from '@/components/Seo';
import { getMarkdownFiles, getMarkdownFromSlug } from '@/contents/utils';

import { Frontmatter, Scope } from '@/types/content';

import Github from '~/svg/github.svg';

type PostProps = {
  mdxSource?: SerializeResult<Frontmatter, Scope>;
};
export default function Post({ mdxSource }: PostProps) {
  const [openLightBox, setOpenLightBox] = React.useState(false);
  if (!mdxSource || 'error' in mdxSource) {
    return;
  }

  const { frontmatter, scope } = mdxSource;

  return (
    <Layout className='layout py-10 space-y-4'>
      <Seo
        templateTitle={`${frontmatter.title} Project`}
        description={frontmatter.summary}
      />

      <Lightbox
        open={openLightBox}
        close={() => setOpenLightBox(false)}
        slides={frontmatter.images.map((image) => ({
          src: `/images/projects/${image}`,
          alt: frontmatter.title,
        }))}
        plugins={[Zoom]}
      />

      <section>
        <Carousel
          className='bg-black p-1 sm:p-2 rounded-lg space-y-2'
          opts={{ duration: 40 }}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnMouseEnter: true,
            }),
          ]}
        >
          <div className='flex gap-x-2 items-center justify-end text-xl px-2'>
            <div className='flex gap-x-4'>
              <CarouselPrevious>
                <ChevronLeft className='text-white size-4 sm:size-6' />
              </CarouselPrevious>
              <CarouselNext>
                <ChevronRight className='text-white size-4 sm:size-6' />
              </CarouselNext>
            </div>
          </div>
          <CarouselContent>
            {frontmatter.images.map((image) => (
              <CarouselItem key={image}>
                <button
                  className='cursor-zoom-in'
                  onClick={() => setOpenLightBox(true)}
                >
                  <LazyLoadImage
                    src={`/images/projects/${image}`}
                    alt={frontmatter.title}
                    width={1080}
                    height={620}
                    imageClassname='rounded object-cover aspect-video object-top hover:object-bottom ease-linear'
                    style={{ transitionDuration: '15000ms' }}
                    sizes='(min-width: 1260px) 1202px, 95.96vw'
                  />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between sm:items-end'>
          <div className='mt-4'>
            <h1 className='font-bold text-3xl tracking-tighter'>
              {frontmatter.title}
            </h1>
            <p className='text-gray-700 mt-2'>{frontmatter.summary}</p>
          </div>
          <div className='flex flex-wrap gap-2 sm:gap-4'>
            {frontmatter.repositories &&
              frontmatter.repositories.length > 0 && (
                <div className='flex gap-x-1 items-center'>
                  <Github className='size-4' />
                  {frontmatter.repositories.map((repo) => (
                    <NextLink
                      key={repo.name}
                      href={repo.url}
                      className='underline'
                    >
                      {repo.name}
                    </NextLink>
                  ))}
                </div>
              )}
            {frontmatter.liveDemo && (
              <div className='flex gap-x-1 items-center underline'>
                <Link className='size-4' />
                <NextLink href={frontmatter.liveDemo}>
                  {frontmatter.liveDemo.split('//')[1]}
                </NextLink>
              </div>
            )}
          </div>
        </div>
      </section>
      <hr />
      <section className='flex flex-col sm:flex-row gap-6'>
        <aside className='flex-shrink-0 flex-1 sm:border-r sm:pr-2'>
          <Toc
            toc={scope.toc || []}
            maxDepth={5}
            skipParents={['listItem', 'container']}
            className='max-w-md'
          />
        </aside>
        <hr className='block sm:hidden' />
        <article className='prose max-w-[50rem] font-sans'>
          <MDXClient {...mdxSource} components={MdxComponents} />
        </article>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = getMarkdownFiles('projects');

  const paths = files.map((filename) => ({
    // replace the extension .mdx with '' in the filename for slug
    params: { slug: filename.replace(/\.mdx$/, '') },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const file = await getMarkdownFromSlug(params.slug, 'projects');
  if (!file) return { props: {} };

  const { source, format } = file;

  const options: SerializeOptions<Scope> = {
    parseFrontmatter: true,
    /** the "remark-flexible-toc" plugin produces vfile.data.toc */
    vfileDataIntoScope: 'toc',
    mdxOptions: {
      format,
      ...plugins,
    },
  };

  const mdxSource = await serialize<Frontmatter, Scope>({
    source,
    options,
  });

  return { props: { mdxSource } };
}

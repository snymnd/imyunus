import React from 'react';
import type { HeadingDepth, HeadingParent, TocItem } from 'remark-flexible-toc';

import cn from '@/lib/cn';

import NextLink from '@/components/NextLink';

type Props = {
  /**  toc - an array of table of contents items provided by the remark plugin "remark-flexible-toc" */
  toc: TocItem[];
  /**  maxDepth (default: 6) — max heading depth to include in the table of contents; this is inclusive: when set to 3, level three headings are included */
  maxDepth?: HeadingDepth;
  /** exclude — headings to skip, wrapped in new RegExp('^(' + value + ')$', 'i'); any heading matching this expression will not be present in the table of contents */
  exclude?: string | string[];
  /** skipLevels (default: [1]) — disallowed heading levels, by default the article h1 is not expected to be in the TOC */
  skipLevels?: HeadingDepth[];
  /** skipParents — disallow headings to be children of certain node types,(if the parent is "root", it is not skipped) */
  skipParents?: Exclude<HeadingParent, 'root'>[];
} & React.ComponentPropsWithoutRef<'div'>;

const Toc = ({
  toc,
  maxDepth = 6,
  exclude,
  skipLevels = [1],
  skipParents = [],
  className,
  ...rest
}: Props) => {
  const [activeSection, setActiveSection] = React.useState('');

  const scrollToSection = (section: Element) => {
    const elementRect = section.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.scrollY;
    const top = absoluteElementTop - window.innerHeight / 5;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleTocClick = (href: string) => {
    const section = document.querySelector(href);
    if (section) scrollToSection(section);
  };

  // Set initial active state from URL hash on mount
  React.useEffect(() => {
    if (window.location.hash) {
      setActiveSection(window.location.hash);
    }
  }, []);

  // Track which heading is in view via IntersectionObserver
  React.useEffect(() => {
    if (!toc || toc.length === 0) return;

    const headingIds = toc.map((h) => h.href.replace('#', ''));
    const elements = headingIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSection(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

  if (!toc) return null;

  const exludeRegexFilter = exclude
    ? Array.isArray(exclude)
      ? new RegExp(exclude.join('|'), 'i')
      : new RegExp(exclude, 'i')
    : new RegExp('(?!.*)');

  const skipLevelsFilter = (depth: TocItem['depth']): boolean =>
    skipLevels.includes(depth);

  const skipParentsFilter = (parent: TocItem['parent']): boolean =>
    parent !== 'root' && skipParents.includes(parent);

  const maxDepthFilter = (depth: TocItem['depth']): boolean => depth > maxDepth;

  const filteredToc = toc.filter(
    (heading) =>
      !maxDepthFilter(heading.depth) &&
      !skipLevelsFilter(heading.depth) &&
      !skipParentsFilter(heading.parent) &&
      !exludeRegexFilter.test(heading.value),
  );

  return (
    <div className={cn(className, 'sticky top-28')} {...rest}>
      <h2 className='text-xl font-semibold'>Table Of Content</h2>

      <ul className='space-y-1 sm:space-y-2 mt-2 sm:mt-3'>
        {filteredToc.map((heading) => {
          const isActive = activeSection === heading.href;
          return (
            <li
              key={heading.value}
              className={cn('leading-tight')}
              style={{ marginLeft: `${(heading.depth - 2) * 1}rem` }}
            >
              <NextLink
                href={heading.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleTocClick(heading.href);
                }}
                className={cn(
                  'block border-l-2 pl-2 transition-colors duration-150',
                  isActive
                    ? 'border-foreground text-foreground font-medium'
                    : 'border-transparent text-muted hover:text-foreground hover:border-foreground/40',
                )}
              >
                {heading.value}
              </NextLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Toc;

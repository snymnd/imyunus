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
    // set top as 1/5 window height above the element, avoid element covered by sticky header
    const top = absoluteElementTop - window.innerHeight / 5;
    window.scrollTo({
      top: top,
      behavior: 'smooth',
    });
  };

  React.useEffect(() => {
    const handleHashChange = () => {
      setActiveSection(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  React.useEffect(() => {
    if (activeSection) {
      const section = document.querySelector(activeSection);
      if (section) {
        scrollToSection(section);
      }
    }
  }, [activeSection]);

  if (!toc) return null;

  /* #region  /**=========== Filter =========== */
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
  /* #endregion  /**======== Filter =========== */

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
        {filteredToc.map((heading) => (
          <li
            key={heading.value}
            className={cn('leading-tight')}
            style={{ marginLeft: `${(heading.depth - 2) * 1}rem` }}
          >
            <NextLink href={heading.href}>
              <span className='text-gray-700'>{heading.value}</span>
            </NextLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Toc;

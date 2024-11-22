import recmaMdxChangeProps from 'recma-mdx-change-props';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkEmoji from 'remark-emoji';
import remarkFlexibleCodeTitles from 'remark-flexible-code-titles';
import remarkFlexibleContainers, {
  type FlexibleContainerOptions,
} from 'remark-flexible-containers';
import remarkFlexibleToc from 'remark-flexible-toc';
import remarkGfm from 'remark-gfm';
import { type PluggableList } from 'unified';

import { toTitleCase } from '@/lib/helper';

// from @mdx-js/mdx
const nodeTypes = [
  'mdxFlowExpression',
  'mdxJsxFlowElement',
  'mdxJsxTextElement',
  'mdxTextExpression',
  'mdxjsEsm',
];

const remarkPlugins: PluggableList = [
  remarkGfm,
  remarkEmoji,
  [
    remarkFlexibleContainers,
    {
      title: () => null,
      containerTagName: 'admonition',
      containerProperties: (type: string, title: string) => {
        return {
          ['data-type']: type?.toLowerCase(),
          ['data-title']: title ?? toTitleCase(type),
        };
      },
    } as FlexibleContainerOptions,
  ],
  remarkFlexibleCodeTitles,
  remarkFlexibleToc,
];

const rehypePlugins: PluggableList = [
  rehypePrettyCode,
  rehypeSlug,
  // to allow HTML elements in "md" format, "passThrough" is for "mdx" works as well
  [rehypeRaw, { passThrough: nodeTypes }],
];

const recmaPlugins: PluggableList = [recmaMdxChangeProps];

export const plugins = {
  remarkPlugins,
  rehypePlugins,
  recmaPlugins,
};

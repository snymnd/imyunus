import { ElementType } from 'react';

import Bootstrap from '~/svg/bootstrap.svg';
import Bun from '~/svg/bun.svg';
import Gcp from '~/svg/gcp.svg';
import Laravel from '~/svg/laravel.svg';
import Mongodb from '~/svg/mongodb.svg';
import NextjsIcons from '~/svg/nextjs.svg';
import ReactIcons from '~/svg/react.svg';
import TailwindIcons from '~/svg/tailwind.svg';
import TypescriptIcons from '~/svg/typescript.svg';
import Webrtc from '~/svg/webrtc.svg';

const _techStack = [
  'react',
  'tailwind',
  'nextjs',
  'typescript',
  'webrtc',
  'bun',
  'mongodb',
  'gcp',
  'laravel',
  'bootstrap',
] as const;
export type TechStackType = (typeof _techStack)[number];

type TechStackProps = {
  name: string;
  docs?: string;
  Icon?: ElementType;
};
export const TechStackIcons: {
  [K in TechStackType]: TechStackProps;
} = {
  react: {
    name: 'React.js',
    Icon: ReactIcons,
  },
  tailwind: {
    name: 'TailwindCSS',
    Icon: TailwindIcons,
  },
  nextjs: {
    name: 'Next.js',
    Icon: NextjsIcons,
  },
  typescript: {
    name: 'TypeScript',
    Icon: TypescriptIcons,
  },
  webrtc: {
    name: 'WebRTC',
    Icon: Webrtc,
  },
  bun: {
    name: 'Bun',
    Icon: Bun,
  },
  mongodb: {
    name: 'MongoDB',
    Icon: Mongodb,
  },
  gcp: {
    name: 'Google Cloud Platform (GCP)',
    Icon: Gcp,
  },
  laravel: {
    name: 'Laravel',
    Icon: Laravel,
  },
  bootstrap: {
    name: 'Bootstrap',
    Icon: Bootstrap,
  },
};

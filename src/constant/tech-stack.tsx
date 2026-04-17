import { ElementType } from 'react';

import Bootstrap from '~/svg/bootstrap.svg';
import Bun from '~/svg/bun.svg';
import Elysia from '~/svg/elysia.svg';
import Flask from '~/svg/flask.svg';
import Gcp from '~/svg/gcp.svg';
import Hapi from '~/svg/hapi.svg';
import Laravel from '~/svg/laravel.svg';
import Mongodb from '~/svg/mongodb.svg';
import NextjsIcons from '~/svg/nextjs.svg';
import Nodejs from '~/svg/nodejs.svg';
import Postgre from '~/svg/postgresql.svg';
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
  'hapi',
  'nodejs',
  'postgre',
  'laravel',
  'elysia',
  'flask',
  'bootstrap',
] as const;
export type TechStackType = (typeof _techStack)[number];

type TechStackProps = {
  name: string;
  docs?: string;
  Icon?: ElementType;
  invertOnDark?: boolean;
};
export const TechStackIcons: {
  [K in TechStackType]: TechStackProps;
} = {
  react: {
    name: 'React.js',
    Icon: ReactIcons,
    invertOnDark: true,
  },
  tailwind: {
    name: 'TailwindCSS',
    Icon: TailwindIcons,
    invertOnDark: true,
  },
  nextjs: {
    name: 'Next.js',
    Icon: NextjsIcons,
    invertOnDark: true,
  },
  typescript: {
    name: 'TypeScript',
    Icon: TypescriptIcons,
    invertOnDark: true,
  },
  postgre: {
    name: 'PostgreSQL',
    Icon: Postgre,
    invertOnDark: true,
  },
  webrtc: {
    name: 'WebRTC',
    Icon: Webrtc,
    invertOnDark: true,
  },
  bun: {
    name: 'Bun',
    Icon: Bun,
    invertOnDark: true,
  },
  elysia: {
    name: 'Elysia',
    Icon: Elysia,
  },
  flask: {
    name: 'Flask',
    Icon: Flask,
  },
  mongodb: {
    name: 'MongoDB',
    Icon: Mongodb,
    invertOnDark: true,
  },
  nodejs: {
    name: 'Nodejs',
    Icon: Nodejs,
    invertOnDark: true,
  },
  hapi: {
    name: 'Hapi',
    Icon: Hapi,
    invertOnDark: true,
  },
  gcp: {
    name: 'Google Cloud Platform (GCP)',
    Icon: Gcp,
    invertOnDark: true,
  },
  laravel: {
    name: 'Laravel',
    Icon: Laravel,
    invertOnDark: true,
  },
  bootstrap: {
    name: 'Bootstrap',
    Icon: Bootstrap,
    invertOnDark: true,
  },
};

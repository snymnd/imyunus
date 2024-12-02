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
  postgre: {
    name: 'PostgreSQL',
    Icon: Postgre,
  },
  webrtc: {
    name: 'WebRTC',
    Icon: Webrtc,
  },
  bun: {
    name: 'Bun',
    Icon: Bun,
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
  },
  nodejs: {
    name: 'Nodejs',
    Icon: Nodejs,
  },
  hapi: {
    name: 'Hapi',
    Icon: Hapi,
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

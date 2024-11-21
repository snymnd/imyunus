import { TechStackType } from '@/constant/tech-stack';

export type Project = {
  name: string;
  description: string;
  techStack: TechStackType[];
  href: string;
  imagesPath: string[];
};

export const projects: Project[] = [
  {
    name: 'Medihause',
    description:
      'Web app providing electronic medical records and integrated health facility management with AI technology.',
    techStack: ['nextjs', 'typescript', 'tailwind'],
    href: '/projects/medihause',
    imagesPath: ['/images/projects/medihause-1.png'],
  },
  {
    name: 'Chalo',
    description:
      'Random video chat app like Omegle, allowing video calls with strangers worldwide.',
    href: '/projects/chalo',
    techStack: [
      'nextjs',
      'typescript',
      'tailwind',
      'bun',
      'webrtc',
      'mongodb',
      'gcp',
    ],
    imagesPath: ['/images/projects/chalo-1.png'],
  },
  {
    name: 'Filinmovie',
    description: 'A transactional video on demand (TVOD) platform.',
    href: '/projects/filinmovie',
    techStack: ['nextjs', 'typescript', 'tailwind'],
    imagesPath: ['/images/projects/chalo-1.png'],
  },
  {
    name: 'Chernival 2023',
    description: 'Platform for Chernival 2023 event.',
    href: '/projects/chernival-2023',
    techStack: ['nextjs', 'typescript', 'tailwind'],
    imagesPath: ['/images/projects/chalo-1.png'],
  },
  {
    name: 'ILITS 2024',
    description: 'Platform for Ini Lho ITS! (ILITS) 2024 event.',
    techStack: ['laravel', 'bootstrap', 'tailwind'],
    href: '/projects/ilits-2024',
    imagesPath: ['/images/projects/chalo-1.png'],
  },
];

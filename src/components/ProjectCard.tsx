import Image from 'next/image';
import * as React from 'react';

import cn from '@/lib/cn';

import NextLink from '@/components/NextLink';
import TechStackToolTip from '@/components/TechStackTooltip';
import { TechStackType } from '@/constant/tech-stack';

type ProjectCardProps = {
  className?: string;
  name: string;
  description: string;
  href: string;
  techStack: TechStackType[];
  imagePath: string;
} & React.ComponentPropsWithoutRef<'a'>;

export default function ProjectCard({
  className,
  name: title,
  description,
  href,
  techStack,
  imagePath,
  ...rest
}: ProjectCardProps) {
  return (
    <NextLink
      href={href}
      className={cn(
        'group flex flex-col rounded-xl overflow-hidden transition-all duration-200 cursor-pointer shadow-sm h-full',
        'hover:shadow-[4px_4px_0_4px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1',
        'active:shadow-none active:-translate-y-0 active:translate-x-0',
        className,
      )}
      {...rest}
    >
      <figure className='w-full aspect-video rounded-md overflow-hidden'>
        <Image
          src={`/images/projects/${imagePath}`}
          alt={title}
          width={400}
          height={245}
          className='w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-grayscale duration-300'
          priority
        />
      </figure>

      <div className='bg-[#F7F7F7] flex-grow flex flex-col'>
        <div className='bg-white px-4 py-3 space-y-1 rounded-b-xl shadow-sm flex-grow'>
          <h4 className='text-2xl font-spacemono tracking-tighter'>{title}</h4>
          <p className='font-light'>{description}</p>
        </div>
        <div className='px-4 py-3 flex justify-between items-center'>
          <div className='flex gap-x-1.5'>
            {techStack.slice(0, 8).map((tech) => (
              <TechStackToolTip key={tech} techStack={tech} />
            ))}
          </div>
          <p className='group-hover:font-bold'>More -{'>'}</p>
        </div>
      </div>
    </NextLink>
  );
}

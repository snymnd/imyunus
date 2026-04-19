import { motion, MotionProps } from 'motion/react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import * as React from 'react';

import cn from '@/lib/cn';

import Layout from '@/components/layout/Layout';
import ProjectCard from '@/components/ProjectCard';
import Seo from '@/components/Seo';
import TechStackToolTip from '@/components/TechStackTooltip';
import CtaButton from '@/components/ui/CtaButton';
import { getPostListWithInformation } from '@/contents/utils';
import FadeInMotion, { fadeInVariant } from '@/motion/FadeInMotion';

import { Post } from '@/types/content';

type HomeProps = {
  projects: Post[];
};

const unifyMotionProps: MotionProps = {
  variants: fadeInVariant,
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true },
};

const heroFadeVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const heroMotionProps: MotionProps = {
  variants: heroFadeVariant,
  initial: 'hidden',
  animate: 'visible',
};

export default function Home({ projects }: HomeProps) {
  return (
    <Layout>
      <Seo
        title='Muhammad Yunus — Frontend Developer'
        description='Frontend Developer, specializing in React, Next.js, and TypeScript. Building fast, accessible, and delightful web experiences.'
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Muhammad Yunus',
            url: 'https://imyunus.com',
            jobTitle: 'Frontend Developer',
            knowsAbout: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
            sameAs: [
              'https://github.com/snymnd',
              'https://linkedin.com/in/muh-yunus31',
            ],
          }),
        }}
      />

      {/* Hero */}
      <section
        aria-labelledby='hero-heading'
        className='relative layout flex gap-x-8 flex-col sm:flex-row sm:items-center justify-center sm:justify-between section-screen'
      >
        <div className='space-y-10 sm:space-y-16'>
          <motion.h1
            id='hero-heading'
            {...heroMotionProps}
            className='font-spacemono font-bold text-5xl sm:text-7xl md:text-[5.5rem] tracking-tight leading-tight sm:leading-snug md:leading-[6.5rem]'
          >
            Hey!
            <br />
            I&apos;m Yunus
          </motion.h1>

          <div className='sm:mt-16 sm:block hidden'>
            <motion.p
              {...heroMotionProps}
              transition={{ delay: 0.2 }}
              className='sm:text-lg text-muted'
            >
              Turning designs into fast, accessible, and delightful web
              experiences.
            </motion.p>
            <motion.div {...heroMotionProps} transition={{ delay: 0.2 }}>
              <CtaButton href='#about' className='mt-8'>
                About Me
              </CtaButton>
            </motion.div>
          </div>
        </div>

        <figure className='sm:w-[24rem] md:w-[30rem] mt-10 sm:mt-0'>
          <Image
            src='/images/hero.png'
            alt='Muhammad Yunus — Frontend Developer'
            width={804}
            height={804}
            className='w-full'
            sizes='(min-width: 1140px) 480px, (min-width: 640px) 41.88vw, 91.56vw'
            priority
            fetchPriority='high'
          />
        </figure>

        <div className='mt-10 sm:hidden'>
          <motion.p
            {...heroMotionProps}
            transition={{ delay: 0.2 }}
            className='sm:text-lg text-muted'
          >
            Turning designs into fast, accessible, and delightful web
            experiences.
          </motion.p>
          <motion.div {...heroMotionProps} transition={{ delay: 0.3 }}>
            <CtaButton href='#about' className='mt-8'>
              About Me
            </CtaButton>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section
        id='about'
        aria-labelledby='about-heading'
        className='flex items-center -mt-10 pt-10 layout section-screen'
      >
        <div className='py-10 flex flex-col md:flex-row md:items-start justify-between gap-8 w-full'>
          <div className='md:basis-2/5 md:flex-shrink-0'>
            <motion.h2
              id='about-heading'
              {...unifyMotionProps}
              className='text-4xl sm:hidden font-spacemono font-bold tracking-tighter'
            >
              About Me
            </motion.h2>
            <motion.figure {...unifyMotionProps}>
              <Image
                className='w-full object-cover rounded-lg mt-4'
                src='/images/about.png'
                alt='Muhammad Yunus profile photo'
                width={720}
                height={900}
                sizes='(min-width: 768px) 40vw, 100vw'
              />
            </motion.figure>
          </div>

          <article className='md:basis-3/5'>
            <motion.h2
              {...unifyMotionProps}
              className={cn(
                'hidden sm:block',
                'text-5xl font-spacemono font-bold tracking-tighter',
              )}
            >
              About Me
            </motion.h2>
            <motion.p
              {...unifyMotionProps}
              className='mt-2 text-muted leading-loose'
            >
              I&apos;m <strong>Muhammad Yunus</strong>, a Frontend Developer. I
              build web applications that are fast, accessible, and a pleasure
              to use — bridging the gap between great design and solid
              engineering.
              <br />
              <br />I thrive in collaborative environments, and I&apos;m always
              looking for problems worth solving.
            </motion.p>
            <motion.h3
              {...unifyMotionProps}
              className='text-3xl sm:text-4xl font-spacemono font-bold mt-6 tracking-tight'
            >
              Tech Stack
            </motion.h3>
            <motion.p
              {...unifyMotionProps}
              className='text-sm sm:text-base text-muted'
            >
              Technologies I reach for on most projects
            </motion.p>
            <FadeInMotion className='flex gap-x-3 mt-3'>
              <TechStackToolTip techStack='typescript' className='size-14' />
              <TechStackToolTip techStack='react' className='size-14' />
              <TechStackToolTip techStack='nextjs' className='size-14' />
              <TechStackToolTip techStack='tailwind' className='size-14' />
            </FadeInMotion>
          </article>
        </div>
      </section>

      {/* Projects */}
      <section
        id='projects'
        aria-labelledby='projects-heading'
        className='layout py-20'
      >
        <div>
          <motion.h2
            id='projects-heading'
            {...unifyMotionProps}
            className='text-4xl sm:text-5xl font-spacemono font-bold tracking-tighter leading-tight'
          >
            Projects
          </motion.h2>
          <motion.p
            {...unifyMotionProps}
            className='text-sm sm:text-base leading-relaxed text-muted mt-2'
          >
            A selection of things I&apos;ve built
          </motion.p>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4'>
            {projects.map((project, index) => (
              <FadeInMotion key={index}>
                <ProjectCard
                  description={project.summary}
                  href={`/projects/${project.slug}`}
                  name={project.title}
                  techStack={project.techStack || []}
                  imagePath={project.images[0]}
                  priority={index < 3}
                />
              </FadeInMotion>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = () => {
  const projects = getPostListWithInformation('projects')
    .filter((p): p is Post => p !== undefined)
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

  return {
    props: { projects },
  };
};

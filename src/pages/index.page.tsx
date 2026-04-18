import { motion, MotionProps } from 'motion/react';
import Image from 'next/image';
import * as React from 'react';

import cn from '@/lib/cn';

import Layout from '@/components/layout/Layout';
import NextLink from '@/components/NextLink';
import ProjectCard from '@/components/ProjectCard';
import Seo from '@/components/Seo';
import TechStackToolTip from '@/components/TechStackTooltip';
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

export default function Home({ projects }: HomeProps) {
  return (
    <Layout>
      <Seo
        title='Muhammad Yunus — Frontend Developer'
        description='Frontend Developer specializing in React, Next.js, and TypeScript. Building intuitive and fully functional web applications.'
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
              'https://linkedin.com/in/imyunus',
            ],
          }),
        }}
      />

      {/* Hero */}
      <section className='relative layout flex gap-x-8 flex-col sm:flex-row sm:items-center justify-center sm:justify-between section-screen'>
        <div className='space-y-10 sm:space-y-16'>
          <motion.h1
            {...unifyMotionProps}
            className='font-spacemono font-bold text-5xl sm:text-7xl md:text-[5.5rem] tracking-tight leading-tight sm:leading-snug md:leading-[6.5rem]'
          >
            Hey!
            <br />
            I&apos;m Yunus
          </motion.h1>

          <div className='sm:mt-16 sm:block hidden'>
            <motion.p
              {...unifyMotionProps}
              transition={{ delay: 0.2 }}
              className='sm:text-lg text-muted'
            >
              I’m Front-end Developer. Implementing design <br />
              into intuitive and fully functional website.
            </motion.p>
            <FadeInMotion transition={{ delay: 0.2 }}>
              <NextLink
                href='#about'
                className={cn(
                  'duration-200 transition-all',
                  'hover:shadow-[2px_2px_0_2px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5',
                  'active:shadow-none active:-translate-y-0 active:translate-x-0 active:bg-black active:text-white',
                  'border-2 border-black inline-block mt-8 cursor-pointer text-xl py-2 px-4 sm:py-4 sm:px-8 rounded-full font-spacemono',
                )}
              >
                About Me
              </NextLink>
            </FadeInMotion>
          </div>
        </div>

        <motion.figure
          {...unifyMotionProps}
          transition={{ duration: 0.4 }}
          className='sm:w-[24rem] md:w-[30rem] mt-10 sm:mt-0'
        >
          <Image
            src='/images/hero.png'
            alt='Muhammad Yunus — Frontend Developer'
            width={804}
            height={804}
            className='w-full'
            sizes='(min-width: 1140px) 480px, (min-width: 640px) 41.88vw, 91.56vw'
            priority
          />
        </motion.figure>

        <div className='mt-10 sm:hidden'>
          <motion.p
            {...unifyMotionProps}
            transition={{ delay: 0.2 }}
            className='sm:text-lg text-muted'
          >
            I’m Front-end Developer. Implementing design <br />
            into intuitive and fully functional website.
          </motion.p>
          <FadeInMotion transition={{ delay: 0.3 }}>
            <NextLink
              href='#about'
              className={cn(
                'duration-200 transition-all',
                'hover:shadow-[2px_2px_0_2px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0_2px_rgba(237,237,237,1)] hover:-translate-x-0.5 hover:-translate-y-0.5',
                'active:shadow-none active:-translate-y-0 active:translate-x-0 active:bg-foreground active:text-background',
                'border-2 border-border inline-block mt-8 cursor-pointer text-xl py-2 px-4 sm:py-4 sm:px-8 rounded-full font-spacemono',
              )}
            >
              About Me
            </NextLink>
          </FadeInMotion>
        </div>
      </section>

      {/* About */}
      <section
        id='about'
        className='flex items-center -mt-10 pt-10 layout section-screen'
      >
        <div className='py-10 flex flex-col md:flex-row md:items-start justify-between gap-8 w-full'>
          <div className='md:basis-2/5 md:flex-shrink-0'>
            <motion.h2
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
                priority
              />
            </motion.figure>
          </div>

          <article className='md:basis-3/5'>
            <motion.h2
              {...unifyMotionProps}
              className='hidden sm:block text-5xl font-spacemono font-bold tracking-tighter'
            >
              About Me
            </motion.h2>
            <motion.p
              {...unifyMotionProps}
              className='mt-2 text-muted leading-loose'
            >
              Hi, I’m <strong>Muhammad Yunus!</strong> I’m a Frontend Developer
              who loves building intuitive and functional web applications. I
              enjoy solving problems and working collaboratively to bring ideas
              to life. <br /> <br /> My journey in tech has taught me the
              importance of learning, adaptability, and teamwork, and I’m always
              excited to tackle new challenges. <br /> Outside of coding, I’m
              passionate about creating meaningful user experiences and
              continuously improving my skills to grow as a developer.
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
              Here some tech stack that I most likely to used
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
      <section id='projects' className='layout py-20'>
        <div>
          <motion.h2
            {...unifyMotionProps}
            className='text-4xl sm:text-5xl font-spacemono font-bold tracking-tighter leading-tight'
          >
            Projects
          </motion.h2>
          <motion.p
            {...unifyMotionProps}
            className='text-sm sm:text-base leading-relaxed text-muted mt-2'
          >
            Here are some of my works
          </motion.p>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4'>
            {projects
              ?.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
              .map((project, index) => (
                <FadeInMotion key={index}>
                  <ProjectCard
                    description={project.summary}
                    href={`/projects/${project.slug}`}
                    name={project.title}
                    techStack={project.techStack || []}
                    imagePath={project.images[0]}
                  />
                </FadeInMotion>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export function getStaticProps() {
  const projects = getPostListWithInformation('projects');

  return {
    props: {
      projects,
    },
  };
}

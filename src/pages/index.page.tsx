import Image from 'next/image';

import cn from '@/lib/cn';

import Layout from '@/components/layout/Layout';
import NextLink from '@/components/NextLink';
import ProjectCard from '@/components/ProjectCard';
import Seo from '@/components/Seo';
import TechStackToolTip from '@/components/TechStackTooltip';
import { getPostListWithInformation } from '@/contents/utils';

import { Post } from '@/types/content';

type HomeProps = {
  projects: Post[];
};

export default function Home({ projects }: HomeProps) {
  return (
    <Layout>
      <Seo templateTitle='Home' />

      {/* Hero */}
      <section className='relative layout flex gap-x-8 flex-col sm:flex-row items-center justify-center sm:justify-between section-screen'>
        <div className='space-y-10 sm:space-y-16'>
          <h1 className='font-spacemono font-bold text-5xl sm:text-7xl md:text-[5.5rem] tracking-tight leading-tight sm:leading-snug md:leading-[6.5rem]'>
            Hay!
            <br />
            I'M Yunus
          </h1>
          <Image
            src='/images/hero.png'
            alt='Hero Image'
            width={504}
            height={504}
            className='sm:hidden sm:w-[22rem] md:w-[28rem]'
            priority
          />
          <div className='sm:mt-16'>
            <p className='sm:text-lg text-gray-700 '>
              I’m Front-end Developer. Implementing design <br />
              into interactive and fully functional website.
            </p>
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
          </div>
        </div>
        <Image
          src='/images/hero.png'
          alt='Hero Image'
          width={504}
          height={504}
          className='hidden sm:block sm:w-[22rem] md:w-[28rem]'
          priority
        />
      </section>

      {/* About */}
      <section
        id='about'
        className='flex items-center -mt-10 pt-10 layout section-screen'
      >
        <div className='py-10 flex flex-col md:flex-row justify-between gap-8 w-full'>
          <div>
            <h2 className='text-4xl sm:hidden font-spacemono font-bold tracking-tighter'>
              About Me
            </h2>
            <figure>
              <Image
                className='h-full object-cover rounded-lg mt-4'
                src='/images/about.png'
                alt='About Image'
                width={360}
                height={450}
                priority
              />
            </figure>
          </div>

          <article className='basis-3/5'>
            <h2 className='hidden sm:block text-5xl font-spacemono font-bold tracking-tighter'>
              About Me
            </h2>
            <p className='mt-2 text-gray-600 leading-loose'>
              Hi, I’m <strong>Muhammad Yunus!</strong> I’m a Frontend Developer
              who loves building intuitive and functional web applications. I
              enjoy solving problems and working collaboratively to bring ideas
              to life. <br /> <br /> My journey in tech has taught me the
              importance of learning, adaptability, and teamwork, and I’m always
              excited to tackle new challenges. <br /> Outside of coding, I’m
              passionate about creating meaningful user experiences and
              continuously improving my skills to grow as a developer.
            </p>
            <h3 className='text-3xl sm:text-4xl font-spacemono font-bold mt-6 tracking-tight'>
              Tech Stack
            </h3>
            <p className='text-sm sm:text-base text-gray-500'>
              Here some tech stack that I most likely to used
            </p>
            <div className='flex gap-x-3 mt-3'>
              <TechStackToolTip techStack='typescript' className='size-14' />
              <TechStackToolTip techStack='react' className='size-14' />
              <TechStackToolTip techStack='nextjs' className='size-14' />
              <TechStackToolTip techStack='tailwind' className='size-14' />
            </div>
          </article>
        </div>
      </section>

      {/* Projects */}
      <section id='projects' className='layout py-20'>
        <div>
          <h2 className='text-4xl sm:text-5xl font-spacemono font-bold tracking-tighter leading-tight'>
            Projects
          </h2>
          <p className='text-sm sm:text-base leading-relaxed text-gray-500 mt-2'>
            Here are some of my works
          </p>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4'>
            {projects
              ?.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
              .map((project, index) => (
                <ProjectCard
                  description={project.summary}
                  href={`/projects/${project.slug}`}
                  name={project.title}
                  techStack={project.techStack || []}
                  imagePath={project.images[0]}
                  key={index}
                />
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

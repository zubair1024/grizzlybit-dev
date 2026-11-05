import socialLinks from 'data/socialLinks';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { trackEvent } from '@/util/ga';
import Statistics from './Statistics';

const info = {
  name: 'Zubair Ahmed',
  roles: [
    'Software Engineer',
    'Entrepreneur',
    'JavaScript Developer',
    'Node.js Developer',
  ],
  badges: [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'TailwindCSS',
    'MongoDB',
    'MSSQL',
    'Docker',
    'Figma',
  ],
};

const Banner = () => {
  return (
    <>
      <div className="hero min-h-screen flex flex-col justify-center items-center pt-20">
        <motion.div
          initial={{ y: 300, opacity: 0 }}
          whileInView={{
            y: 0,
            opacity: 1,
            transition: {
              duration: 1,
            },
          }}
        >
          <div className="z-40 hero-card w-96 backdrop-blur-lg">
          <div className="flex items-center justify-center w-40 mx-auto mt-5">
            <Image
              src="/zubair_avatar.png"
              alt="Zubair Ahmed - Software Engineer and Entrepreneur"
              width="200"
              height="200"
              priority
            />
          </div>
          <div className="text-center hero-card-body text-base">
            <h1 className="text-2xl font-semibold tracking-wider text-center">
              Zubair Ahmed
              <span className="sr-only">
                {' '}— Full-stack software engineer & CTO at RAZRLAB. Node.js,
                React, TypeScript, and IoT.
              </span>
            </h1>
            <p className="text-sm font-light">{info.roles.join(' | ')}</p>
            <div>
              {info.badges.map((i) => (
                <span key={i} className="mx-1 hero-badge">
                  {i}
                </span>
              ))}
            </div>
            <div className="hero-social flex justify-between mx-4 mt-6">
              {socialLinks.map((i) => {
                return (
                  <div
                    className="hero-tooltip"
                    data-tip={i.name}
                    key={i.name}
                  >
                    <Link
                      target={'_blank'}
                      href={i.url}
                      rel="noopener noreferrer"
                      aria-label={`${i.name} profile`}
                      onClick={() =>
                        trackEvent('social_click', {
                          network: i.name,
                          url: i.url,
                          location: 'banner',
                        })
                      }
                      className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-md focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      <motion.div whileHover={{ scale: 1.5 }}>
                        <Image
                          src={i.img}
                          height={32}
                          width={32}
                          alt=""
                        ></Image>
                      </motion.div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          </div>
        </motion.div>
        <div className="z-50 flex items-center justify-center pt-10">
          <Statistics></Statistics>
        </div>
      </div>
      <div aria-hidden="true">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
};

export default Banner;

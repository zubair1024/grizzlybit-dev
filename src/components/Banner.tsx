import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { trackEvent } from '@/util/ga';
import socialLinks from 'data/socialLinks';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import Statistics from './Statistics';

const info = {
  name: 'Zubair Ahmed',
  roles: [
    'Software engineer',
    'Entrepreneur',
    'JavaScript developer',
    'Node.js developer',
  ],
  badges: [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Tailwind CSS',
    'MongoDB',
    'MSSQL',
    'Docker',
    'Figma',
  ],
};

const Banner = () => {
  return (
    <>
      <div className="hero flex min-h-screen flex-col items-center justify-center pt-20">
        <motion.div
          className="z-40 w-full max-w-[26rem] px-4"
          initial={{ y: 300, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { duration: 1 } }}
        >
          <Card className="w-full items-center gap-4 px-6 py-8 text-center shadow-md">
            <div className="size-40 overflow-hidden border-2 border-border bg-secondary shadow">
              <Image
                src="/zubair_avatar.png"
                alt="Zubair Ahmed - Software Engineer and Entrepreneur"
                width="200"
                height="200"
                priority
                className="size-full object-cover"
              />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Zubair Ahmed
              <span className="sr-only">
                {' '}
                — Full-stack software engineer & CTO at RAZRLAB. Node.js, React,
                TypeScript, and IoT.
              </span>
            </h1>
            <p className="text-sm text-muted-foreground text-balance">
              {info.roles.join(' · ')}
            </p>
            <ul className="flex flex-wrap justify-center gap-2">
              {info.badges.map((i) => (
                <li key={i}>
                  <Badge variant="outline">{i}</Badge>
                </li>
              ))}
            </ul>
            <ul className="hero-social mt-2 flex w-full justify-between">
              {socialLinks.map((i) => (
                <li key={i.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        asChild
                        variant="outline"
                        size="icon"
                        className="size-11"
                      >
                        <Link
                          target="_blank"
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
                        >
                          <Image src={i.img} height={22} width={22} alt="" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">{i.name}</TooltipContent>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
        <div className="z-50 flex w-full items-center justify-center pt-10">
          <Statistics />
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

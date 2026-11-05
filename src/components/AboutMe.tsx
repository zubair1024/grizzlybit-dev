import Image from 'next/image';
import BadgesSection from './BadgesSection';
import { Reveal, Section } from './Section';

const COMPANY_START_YEAR = 2017;
const JOURNEY_START_YEAR = 2014;

const AboutMe = () => {
  const year = new Date().getFullYear();
  const yearsAtCompany = year - COMPANY_START_YEAR;
  const yearsInSoftware = year - JOURNEY_START_YEAR;

  return (
    <Section
      id="about-me"
      title="About Zubair Ahmed, CTO and full-stack engineer in Dubai"
    >
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] md:items-center">
        <Reveal className="order-2 max-w-prose space-y-6 text-lg leading-relaxed text-pretty md:order-1">
          <p>
            I&apos;m a developer, entrepreneur, author and traveller with a
            habit of tinkering and scrutinising the details. I&apos;ve been the
            Chief Technology Officer at RAZRLAB for about{' '}
            <strong className="bg-secondary px-1 text-secondary-foreground tabular-nums">
              {yearsAtCompany} years
            </strong>
            .
          </p>
          <p>
            Since starting out as a software engineer over{' '}
            <strong className="bg-secondary px-1 text-secondary-foreground tabular-nums">
              {yearsInSoftware} years
            </strong>{' '}
            ago, I&apos;ve worked remotely for agencies, consulted for startups
            and collaborated with talented people to build digital products for
            businesses and consumers.
          </p>
          <p>
            I&apos;m quietly confident, naturally curious and always sharpening
            my skills, one coding problem at a time.
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="order-1 mx-auto w-full max-w-xs md:order-2 md:max-w-none"
        >
          <div className="border-2 border-border bg-card p-2 shadow-lg">
            <Image
              src="/zubair_2.webp"
              width={900}
              height={1200}
              sizes="(min-width: 768px) 320px, 320px"
              alt="Portrait of Zubair Ahmed, CTO and full-stack engineer"
              className="h-auto w-full"
            />
          </div>
        </Reveal>
      </div>

      <BadgesSection />
    </Section>
  );
};

export default AboutMe;

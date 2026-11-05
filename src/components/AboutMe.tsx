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
            Zubair Ahmed is a full-stack software engineer and the Chief
            Technology Officer of RAZRLAB in Dubai, UAE. He has led engineering
            at RAZRLAB since {COMPANY_START_YEAR} (
            <strong className="bg-secondary px-1 text-secondary-foreground tabular-nums">
              {yearsAtCompany} years
            </strong>
            ) and has been building software professionally since{' '}
            {JOURNEY_START_YEAR} (
            <strong className="bg-secondary px-1 text-secondary-foreground tabular-nums">
              {yearsInSoftware} years
            </strong>
            ).
          </p>
          <p>
            Along the way I&apos;ve worked remotely for agencies, consulted for
            startups and collaborated with talented people to build digital
            products for businesses and consumers.
          </p>
          <p>
            Day to day I build with Node.js, React and TypeScript, mostly
            IoT and real-time fleet-tracking platforms with their web
            dashboards and mobile apps. I&apos;ve built software with teams at
            Dubai Police, Dubai Municipality, Haifa Logistics and Roamworks,
            and my vehicle tracking work earned a certificate of appreciation
            from Dubai Police.
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

import {
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
  animate,
} from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import BadgesSection from './BadgesSection';
import { useCapabilities } from './fx/CapabilityProvider';
import { MDiv } from './fx/m';

const Counter = ({ to }: { to: number }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    amount: 0.5,
  });
  const value = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [inView, to, value]);

  return (
    <span
      ref={ref}
      className="font-mono text-brand-glow tabular-nums"
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {display}
    </span>
  );
};

const AboutMe = () => {
  const companyStartDate = new Date('2017-03-01');
  const journeyStartDate = new Date('2014-01-01');
  const now = new Date();
  const yearsSinceJourneyStart =
    now.getFullYear() - journeyStartDate.getFullYear();
  const yearsSinceCompany = now.getFullYear() - companyStartDate.getFullYear();

  const { reducedMotion } = useCapabilities();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef as React.RefObject<HTMLElement>,
    offset: ['start end', 'end start'],
  });
  const photoYRaw = useTransform(scrollYProgress, [0, 1], [40, -60]);
  const textYRaw = useTransform(scrollYProgress, [0, 1], [-20, 30]);
  const zero = useMotionValue(0);
  const photoY = reducedMotion ? zero : photoYRaw;
  const textY = reducedMotion ? zero : textYRaw;

  return (
    <section
      ref={sectionRef}
      id="about-me"
      className="relative my-6 scroll-m-10"
    >
      <div className="relative py-12 px-6">
        <div className="text-center mb-8">
          <p className="font-mono text-xs tracking-[0.3em] text-brand-glow uppercase">
            About
          </p>
          <h2 className="font-mono text-2xl md:text-3xl tracking-wider uppercase mt-2">
            A little about me
          </h2>
        </div>

        <div className="flex flex-col-reverse justify-between md:flex-row md:gap-10 items-center">
          <MDiv
            style={{ y: textY }}
            className="max-w-xl py-6 font-mono text-lg md:text-xl text-white/90"
          >
            <p>
              I&apos;m a developer, an entrepreneur, an ambitious tweaker,
              author, traveller and over-scrutinizer 😝 . I work at RAZRLAB as
              the Chief Technology Officer for about{' '}
              <Counter to={yearsSinceCompany} /> years now.
            </p>
            <p className="mt-6">
              Since beginning my journey as a software engineer over{' '}
              <Counter to={yearsSinceJourneyStart} /> years ago, I&apos;ve done
              remote work for agencies, consulted for startups, and collaborated
              with talented people to create digital products for both business
              and consumer use. I&apos;m quietly confident, naturally curious,
              and perpetually working on improving my chops one coding problem
              at a time.
            </p>
            <BadgesSection />
          </MDiv>

          <MDiv
            style={{ y: photoY }}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: 'spring', stiffness: 110, damping: 16 }}
            className="relative"
          >
            <div
              aria-hidden
              className="absolute -inset-3 rounded-2xl"
              style={{
                background:
                  'conic-gradient(from var(--angle,0deg), #f28c18, #a991f7, #37cdbe, #f28c18)',
                filter: 'blur(28px)',
                opacity: 0.55,
                animation: 'borderSpin 8s linear infinite',
              }}
            />
            <div className="relative flex items-center justify-center p-2 rounded-2xl bg-black/40 backdrop-blur-sm">
              <Image
                src="/zubair_2.webp"
                width={400}
                height={500}
                alt="Zubair Ahmed - Software Engineer profile photo"
                className="rounded-xl"
                loading="lazy"
              />
            </div>
          </MDiv>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

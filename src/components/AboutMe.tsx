import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

const cardVariants: Variants = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const AboutMe = () => {
  const companyStartDate = new Date('2017-03-01');
  const journeyStartDate = new Date('2014-01-01');
  const now = new Date();
  const yearsSinceJourneyStart =
    now.getFullYear() - journeyStartDate.getFullYear();
  const yearsSinceCompany = now.getFullYear() - companyStartDate.getFullYear();
  return (
    <div className="my-10">
      <div className="py-10">
        <h2 className="font-mono text-2xl tracking-wider text-center uppercase">
          A little about me
        </h2>
        <div className="flex flex-col justify-between px-5 md:flex-row">
          <div className="max-w-xl py-10 font-mono text-xl">
            <p>
              I&apos;m a developer, an entrepreneur, an ambitious tweaker,
              author, traveller and over-scrutinizer 😝 . I work at RAZRLAB as
              the Chief Technology Officer for about {yearsSinceCompany} years
              now.
            </p>
            <p className="mt-6">
              Since beginning my journey as a software engineer over{' '}
              {yearsSinceJourneyStart} years ago, I&apos;ve done remote work for
              agencies, consulted for startups, and collaborated with talented
              people to create digital products for both business and consumer
              use. I&apos;m quietly confident, naturally curious, and
              perpetually working on improving my chops one coding problem at a
              time.
            </p>
          </div>
          <motion.div
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            className="right-0 p-5 rounded-lg"
          >
            <Image
              src="/zubair_2.jpg"
              width={400}
              height={500}
              alt="Zubair"
              className="rounded-lg"
            ></Image>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;

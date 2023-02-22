import socialLinks from 'data/socialLinks';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Statistics from './Statistics';

const info = {
  name: 'Zubair Ahmed',
  roles: [
    'Software Engineer',
    'Entrepreneur',
    'JavaScript Developer',
    'Node.JS Developer',
  ],
  badges: [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.JS',
    'Node.JS',
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
      <div className=" min-h-[100vh] flex flex-col justify-center items-center bg-gradient-to-b from-black to-[#212121] pt-20">
        <motion.div
          className="z-40 card w-96 backdrop-blur-lg border-[0.5px]"
          initial={{ y: 300, opacity: 0 }}
          whileInView={{
            y: 0,
            opacity: 1,
            transition: {
              duration: 1,
            },
          }}
        >
          <div className="flex items-center justify-center w-40 mx-auto mt-5">
            <Image
              src="/zubair_avatar.png"
              alt="Zubair Ahmed"
              width="200"
              height="200"
            />
          </div>
          <div className="text-center card-body">
            <h2 className="text-2xl font-semibold tracking-wider text-center">
              Zubair Ahmed
            </h2>
            <div className="text-sm font-light">{info.roles.join(' | ')}</div>
            <div>
              {info.badges.map((i) => (
                <span key={i} className="mx-1 badge glass">
                  {i}
                </span>
              ))}
            </div>
            <div className="flex justify-between mx-4 mt-6">
              {socialLinks.map((i) => {
                return (
                  <div
                    className="tooltip tooltip-bottom "
                    data-tip={i.name}
                    key={i.name}
                  >
                    <Link target={'_blank'} href={i.url} rel="noreferrer">
                      <motion.div whileHover={{ scale: 1.5 }}>
                        <Image
                          src={i.img}
                          height={32}
                          width={32}
                          alt={i.name}
                        ></Image>
                      </motion.div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
        <div className="pt-10  flex items-center justify-center z-50">
          <Statistics></Statistics>
        </div>
      </div>
      <div className="area">
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

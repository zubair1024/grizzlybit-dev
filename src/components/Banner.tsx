import { motion } from 'framer-motion';
import Image from 'next/image';

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

const socialLinks = [
  {
    img: '/social/linkedin.png',
    name: 'LinkedIn',
    url: '',
  },
  {
    img: '/social/twitter.png',
    name: 'Twitter',
    url: '',
  },
  {
    img: '/social/github.png',
    name: 'Github',
    url: '',
  },
  {
    img: '/social/medium.png',
    name: 'Medium',
    url: '',
  },
  {
    img: '/social/stack-overflow.png',
    name: 'Stack-Overflow',
    url: '',
  },
];

const Banner = () => {
  return (
    <>
      <div className=" min-h-[100vh] flex flex-col justify-center items-center bg-gradient-to-b from-black to-[#212121]">
        <motion.div
          className="z-40 card w-96 glass"
          initial={{ y: 300, opacity: 0 }}
          whileInView={{
            y: 0,
            opacity: 1,
            transition: {
              duration: 1,
            },
          }}
        >
          <div className="flex items-center justify-center w-40 mx-auto mt-10 bg-yellow-400 border-2 rounded-full">
            <Image
              src="/Image.png"
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
                    <motion.div whileHover={{ scale: 1.5 }}>
                      <Image
                        src={i.img}
                        height={32}
                        width={32}
                        alt={i.name}
                      ></Image>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
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

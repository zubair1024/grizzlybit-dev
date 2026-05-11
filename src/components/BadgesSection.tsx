import badges from 'data/badges';
import Image from 'next/image';
import Link from 'next/link';
import { MDiv } from './fx/m';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.06, type: 'spring', stiffness: 220 },
  }),
};

const BadgesSection = () => {
  return (
    <MDiv
      className="grid grid-cols-3 gap-2 py-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {badges.map((item, i) => (
        <MDiv key={item.title} custom={i} variants={itemVariants}>
          <Link target={'_blank'} href={item.url}>
            <div className="flex flex-col items-center justify-center space-x-2 text-center md:flex-row md:text-left transition-transform hover:scale-105">
              <Image
                src={item.imageUrl}
                height={50}
                width={50}
                alt={`${item.title} certification badge`}
                loading="lazy"
              />
              <div className="text-[12px] py-2 tracking-tight leading-tight">
                {item.title}
              </div>
            </div>
          </Link>
        </MDiv>
      ))}
    </MDiv>
  );
};

export default BadgesSection;

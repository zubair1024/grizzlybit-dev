import badges from 'data/badges';
import Image from 'next/image';
import Link from 'next/link';

const BadgesSection = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-2 py-10">
        {badges.map((item) => {
          return (
            <Link target={'_blank'} href={item.url} key={item.title}>
              <div className="flex items-center justify-center space-x-2">
                <Image
                  src={item.imageUrl}
                  height={50}
                  width={50}
                  alt={item.title}
                ></Image>
                <div className="text-[12px] tracking-tight leading-tight">
                  {item.title}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default BadgesSection;

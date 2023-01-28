import badges from 'data/badges';
import Image from 'next/image';

const BadgesSection = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-2 py-10">
        {badges.map((item) => {
          return (
            <div
              key={item.title}
              className="flex items-center justify-center space-x-2"
            >
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
          );
        })}
      </div>
    </>
  );
};

export default BadgesSection;

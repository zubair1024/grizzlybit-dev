import portfolio, { IPortfolioItem } from 'data/portfolio';
import Image from 'next/image';
import Link from 'next/link';

export const PortfolioCardItem = (props: {
  data: IPortfolioItem;
  textSize?: 'text-sm' | 'text-md';
}) => {
  const item = props.data;
  const textSize = props.textSize ?? 'text-md';
  return (
    <Link href={item.url}>
      <div>
        <div className="relative mb-5 ml-5 group ">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <Image
            src={item.img}
            alt={item.title}
            width={400}
            height={400}
            className="relative"
          ></Image>
          <div className="absolute top-0 z-40 w-full h-full overflow-hidden opacity-0 hover:opacity-100 hover:bg-black">
            <div className="flex flex-col items-center justify-center h-full font-bold text-white">
              <p className={`${textSize} text-center`}>{item.title}</p>
              <p className={`max-w-xs font-light text-center ${textSize}`}>
                {item.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Portfolio = () => {
  return (
    <div className="mx-10 my-10 scroll-m-20" id="my-portfolio">
      <h2 className="my-10 font-mono text-2xl font-thin tracking-wider text-center capitalize">
        Some of my works
      </h2>
      <div>
        <div className="flex flex-wrap items-center justify-center">
          {portfolio.map((item) => {
            return <PortfolioCardItem key={item.title} data={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;

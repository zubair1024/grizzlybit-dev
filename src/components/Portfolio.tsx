import portfolio from 'data/portfolio';
import Image from 'next/image';

const Portfolio = () => {
  return (
    <div className="mx-10 my-10 scroll-m-20" id="my-portfolio">
      <h2 className="my-10 font-mono text-2xl font-thin tracking-wider text-center capitalize">
        Some of my works
      </h2>
      <div>
        <div className="grid gap-1 px-10 mx-auto md:grid-cols-4">
          {portfolio.map((item) => {
            return (
              <div
                key={item.title}
                className="transition ease-in hover:scale-105"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={512}
                  height={512}
                  className="p-2 card glass"
                ></Image>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;

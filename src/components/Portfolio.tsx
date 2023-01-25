import Image from 'next/image';

const Portfolio = () => {
  return (
    <div className="mx-10 my-10">
      <h2 className="my-10 font-mono text-2xl font-thin tracking-wider text-center capitalize ">
        Some of my works
      </h2>
      <div>
        <div className="grid grid-cols-4 gap-1 px-10 mx-auto">
          <div className="transition ease-in hover:scale-105">
            <Image
              src="/zubair_2.jpg"
              alt="project"
              width={512}
              height={512}
            ></Image>
          </div>
          <div className="transition ease-in hover:scale-105">
            <Image
              src="/zubair_2.jpg"
              alt="project"
              width={512}
              height={512}
            ></Image>
          </div>
          <div className="transition ease-in hover:scale-105">
            <Image
              src="/zubair_2.jpg"
              alt="project"
              width={512}
              height={512}
            ></Image>
          </div>
          <div className="transition ease-in hover:scale-105">
            <Image
              src="/zubair_2.jpg"
              alt="project"
              width={512}
              height={512}
            ></Image>
          </div>
          {/* {[1, 2, 3, 4].map((i) => {
            return (
              <div key={i} className="max-w-sm mb-10 ml-10 card glass">
                <figure>
                  <img src="https://placeimg.com/400/225/arch" alt="car!" />
                </figure>
                <div className="font-mono card-body">
                  <h2 className="card-title">Lorem Ipsum</h2>
                  <p className="py-2">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Minus itaque explicabo voluptate. Sequi perspiciatis nisi
                    facilis placeat! Hic sit obcaecati, id fugiat assumenda eius
                    quidem quasi necessitatibus inventore corporis sapiente.
                  </p>
                </div>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;

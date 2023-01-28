import Layout from '@/components/Layout';
import OtherProjects from '@/components/OtherProjects';
import portfolio from 'data/portfolio';
import Image from 'next/image';

const title = 'My247';
const otherProjects = portfolio.filter((i) => i.title !== title);

const VehicleApplicationPortfolioScreen = () => {
  return (
    <>
      <Layout>
        <div className="max-w-full min-h-screen prose prose-2xl">
          <div className="bg-fixed bg-toolBelt">
            <div className="py-20 overflow-hidden text-white bg-black bg-opacity-50 shadow-lg toolBelt-content backdrop-filter backdrop-blur-lg">
              <h1 className="text-4xl font-bold text-center md:grid-cols-4">
                {title}
              </h1>
            </div>
          </div>
          <div className="px-5 mx-auto max-w-7xl">
            {/* first section 1 */}
            <div className="flex flex-col-reverse items-center py-5 justify-evenly lg:flex-row">
              <div className="flex">
                <Image
                  src="/portfolio/my247/my247_main.webp"
                  alt="razrtrack"
                  height={1000}
                  width={1000}
                  className="transition ease-in rounded-xl hover:scale-105"
                ></Image>
              </div>
              <div className="ml-10">
                <h2>About</h2>
                <p className="text-justify">
                  24|7 Home Rescue app is designed to let customers get help,
                  make a claim, complete your eligibility, book a service and
                  use their cover from the convenience of their smartphone.
                  My247 app is free to download and keep the app stored on your
                  smartphone for extra peace of mind and should something go
                  wrong, you can view your cover plan coverage, make a claim,
                  book a service, complete your eligibility and call us directly
                  in just a few clicks.
                </p>
              </div>
            </div>
            {/* section 2 */}
            <div className="flex flex-col items-center py-5 justify-evenly lg:flex-row">
              <div>
                <h2>Key Features</h2>
                <p className="text-justify">
                  Some key features of the application include:
                  <ul>
                    <li>View your product details</li>
                    <li> Make a claim</li>
                    <li>Call in one click</li>
                    <li>Book a service</li>
                    <li>See latest offers</li>
                    <li>Complete eligibility</li>
                    <li>Keep all document in one place</li>
                  </ul>
                </p>
              </div>

              <Image
                src="/portfolio/my247/my247_home.webp"
                alt="razrtrack"
                height={250}
                width={250}
                className="ml-10 transition ease-in rounded-xl hover:scale-105"
              ></Image>
              <Image
                src="/portfolio/my247/my247_eligibility.webp"
                alt="razrtrack"
                height={250}
                width={250}
                className="ml-10 transition ease-in rounded-xl hover:scale-105"
              ></Image>
            </div>
            {/* tech stack */}
            <div className="flex flex-col-reverse items-center py-5 justify-evenly lg:flex-row">
              <Image
                src="/portfolio/my247/my247_docs.webp"
                alt="razrtrack"
                height={300}
                width={300}
                className="transition ease-in rounded-xl hover:scale-105"
              ></Image>
              <Image
                src="/portfolio/my247/my247_book.webp"
                alt="razrtrack"
                height={300}
                width={300}
                className="transition ease-in rounded-xl hover:scale-105"
              ></Image>
              <div>
                <h2>Tech Stack Used</h2>
                <div className="grid grid-cols-2 pb-10 text-md">
                  <div>TypeScript</div>
                  <div>JavaScript</div>
                  <div>Ionic</div>
                  <div>Node.JS</div>
                  <div>Express</div>
                </div>
              </div>
            </div>
            <div>
              <h2>Other projects</h2>
              <OtherProjects data={otherProjects}></OtherProjects>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default VehicleApplicationPortfolioScreen;

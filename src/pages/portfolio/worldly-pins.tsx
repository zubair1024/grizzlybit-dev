import CustomHead from '@/components/CustomHead';
import Layout from '@/components/Layout';
import OtherProjects from '@/components/OtherProjects';
import portfolio from 'data/portfolio';
import Image from 'next/image';
import Link from 'next/link';

const title = 'Worldly Pins';
const otherProjects = portfolio.filter((i) => i.title !== title);

const WorldlyPinsScreen = () => {
  return (
    <>
      <CustomHead />
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
            <div className="text-sm breadcrumbs">
              <ul>
                <li>
                  <Link href="/#my-portfolio">Portfolio</Link>
                </li>
                <li>{title}</li>
              </ul>
            </div>
            {/* first section 1 */}
            <div className="flex flex-col-reverse items-center py-5 justify-evenly md:flex-row">
              <div>
                <h2>About</h2>
                <p className="text-justify">
                  Worldly Pins is a web app designed for travelers who want to
                  keep track of the places they have visited. With Worldly Pins,
                  users can mark countries and cities they have been to and
                  visualize their travels on a map. Whether you&apos;re a
                  frequent flyer or a backpacker, this app is a great way to
                  track your adventures and share your travel experiences with
                  others. So, start pinning your way around the world with
                  Worldly Pins!
                </p>
              </div>
            </div>
            <div>
              <Link href={'https://github.com/zubair1024/worldly-pins'}>
                <div className="flex items-center justify-start space-x-5">
                  <Image
                    src="/social/github.svg"
                    alt="github"
                    width={32}
                    height={32}
                  />
                  <p>Github</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/portfolio/worldlypins/worldly-pins.png"
                alt="worldy-pins"
                height={700}
                width={700}
                className="transition ease-in rounded-xl hover:scale-105"
              ></Image>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/portfolio/worldlypins/worldly-pins-controls.jpg"
                alt="worldy-pins-controls"
                height={700}
                width={700}
                className="transition ease-in rounded-xl hover:scale-105"
              ></Image>
            </div>
            {/* tech stack */}
            <div className="flex flex-col-reverse items-center py-5 justify-evenly md:flex-row">
              {/* <Image
                src="/portfolio/he/he_vehicle.png"
                alt="he"
                height={700}
                width={700}
                className="transition ease-in rounded-xl hover:scale-105"
              ></Image> */}
              <div>
                <h2>Tech Stack Used</h2>
                <div className="grid grid-cols-2 pb-10 text-md">
                  <div>Next.JS</div>
                  <div>TypeScript</div>
                  <div>JavaScript</div>
                  <div>React</div>
                  <div>Node.JS</div>
                  <div>Express</div>
                  <div>Postgres</div>
                  <div>Prisma</div>
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

export default WorldlyPinsScreen;

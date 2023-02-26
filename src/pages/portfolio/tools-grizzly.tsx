import CustomHead from '@/components/CustomHead';
import Layout from '@/components/Layout';
import OtherProjects from '@/components/OtherProjects';
import portfolio from 'data/portfolio';
import Image from 'next/image';
import Link from 'next/link';

const title = 'Tools-Grizzlybit.dev';
const otherProjects = portfolio.filter((i) => i.title !== title);

const ToolsGrizzlyScreen = () => {
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
                  A Next.JS based application that consists of a collection of
                  tools for developers to use to get quick jobs done.
                </p>
                <Link target={'_blank'} href="https://tools.grizzlybit.dev">
                  Visit Web Application
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/portfolio/tools-grizzly/tools-grizzlybit-dev.png"
                alt="tools-grizzly"
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

export default ToolsGrizzlyScreen;

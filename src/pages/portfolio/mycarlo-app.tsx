import BreadcrumbListSchema from '@/components/BreadcrumbListSchema';
import CustomHead from '@/components/CustomHead';
import Layout from '@/components/Layout';
import OtherProjects from '@/components/OtherProjects';
import YoutubeEmbed from '@/components/YoutubeEmbed';
import {
  getPortfolioCanonicalUrl,
  getPortfolioMetadata,
} from '@/data/portfolioMetadata';
import portfolio from 'data/portfolio';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

const title = 'MyCarlo';
const otherProjects = portfolio.filter((i) => i.title !== title);
const metadata = getPortfolioMetadata('mycarlo-app');

const MyCarloAppScreen = () => {
  return (
    <>
      <CustomHead
        title={metadata.title}
        description={metadata.description}
        canonical={getPortfolioCanonicalUrl(metadata.slug)}
        ogImage={metadata.ogImage}
        ogType="article"
        keywords={metadata.keywords}
      />
      <BreadcrumbListSchema
        items={[
          { name: 'Home', url: 'https://www.grizzlybit.dev' },
          { name: 'Portfolio', url: 'https://www.grizzlybit.dev/#my-portfolio' },
          {
            name: title,
            url: getPortfolioCanonicalUrl(metadata.slug),
          },
        ]}
      />
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
            <div className="flex flex-col-reverse items-center py-5 justify-evenly lg:flex-row">
              <div className="flex">
                <Image
                  src="/portfolio/mycarlo/mycarlo-logo.jpg"
                  alt="razrtrack"
                  height={1000}
                  width={1000}
                  className="transition ease-in rounded-xl hover:scale-105"
                ></Image>
              </div>
              <div className="ml-10">
                <h2>About</h2>
                <p className="text-justify">
                  MyCarlo is a consumer vehicle tracking mobile application is a
                  real-time GPS tracking app that allows you to track the
                  location of your vehicle at all times, ensuring its safety and
                  security. The app also includes features such as custom
                  geo-fencing, vehicle health monitoring, driving history, and
                  an emergency response button. The user-friendly interface
                  makes it easy to access all of its features quickly and
                  easily. With this app, you can have peace of mind knowing that
                  your vehicle is always safe and secure.
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
                    <li>Find My Car</li>
                    <li>Fault Detection</li>
                    <li>Car Insight Information</li>
                    <li>Book a service</li>
                    <li>Vehicle Service Reminders</li>
                    <li>Battery Health</li>
                    <li>Movement Detection</li>
                    <li>Geofence Notification</li>
                    <li>Crash Detection</li>
                    <li>Eco Score / Driving Behavior</li>
                  </ul>
                </p>
              </div>

              <Image
                src="/portfolio/mycarlo/mycarlo-features.jpg"
                alt="mycarlo features"
                height={512}
                width={512}
                className="ml-10 transition ease-in rounded-xl hover:scale-105"
              ></Image>
            </div>
            {/* tech stack */}
            <div className="flex flex-col-reverse items-center py-5 justify-evenly lg:flex-row">
              <Image
                src="/portfolio/mycarlo/mycarlo-find-my-car.jpg"
                alt="MyCarlo Find My Car"
                height={300}
                width={300}
                className="transition ease-in rounded-xl hover:scale-105"
              ></Image>
              <Image
                src="/portfolio/mycarlo/mycarlo-mot-reminder.jpg"
                alt="MyCarlo Mot reminder"
                height={300}
                width={300}
                className="transition ease-in rounded-xl hover:scale-105"
              ></Image>
              <Image
                src="/portfolio/mycarlo/mycarlo-trip-report.jpg"
                alt="MyCarlo Trip Report"
                height={300}
                width={300}
                className="transition ease-in rounded-xl hover:scale-105"
              ></Image>
            </div>

            <div className="flex flex-col items-center justify-center">
              <h2>Product Video</h2>
              <YoutubeEmbed videoId="T4W6pCBWShE" title={''} />
            </div>

            <div className="flex flex-col items-center justify-center">
              <h2>Product Testimonials</h2>
              <div className="flex flex-wrap items-center justify-center w-full">
                <div className="">
                  <YoutubeEmbed videoId="sblwR6jRkIs" />
                </div>
                <div className="">
                  <YoutubeEmbed videoId="fG3KcTQOows" />
                </div>
                <div className="">
                  <YoutubeEmbed videoId="v-ZVyJ3e7eM" />
                </div>
              </div>
            </div>
            <div className="flex flex-col-reverse items-center py-5 justify-evenly lg:flex-row">
              <Image
                src="/portfolio/mycarlo/mycarlo-competition.jpg"
                alt="razrtrack"
                height={512}
                width={512}
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

export default dynamic(() => Promise.resolve(MyCarloAppScreen), { ssr: false });

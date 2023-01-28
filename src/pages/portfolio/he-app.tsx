import Layout from '@/components/Layout';
import OtherProjects from '@/components/OtherProjects';
import portfolio from 'data/portfolio';
import Image from 'next/image';
import Link from 'next/link';

const title = 'Heavy Equipment Monitoring';
const otherProjects = portfolio.filter((i) => i.title !== title);

const HeavyEquipmentMonitoringPortfolioScreen = () => {
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
              <Image
                src="/portfolio/he/he_overview.jpg"
                alt="he"
                height={700}
                width={700}
                className="transition ease-in rounded-xl hover:scale-105"
              ></Image>
              <div className="ml-10">
                <h2>About</h2>
                <p className="text-justify">
                  is a tool designed to help operators and managers keep track
                  of the performance, maintenance and overall health of gensets
                  and other heavy equipments, which are portable power
                  generators typically used in industrial and commercial
                  settings. The application is designed to provide real-time
                  data and alerts to help users quickly identify and address any
                  issues with the equipments. The application also includes a
                  feature for remote access to the genset, this allows users to
                  start, stop and control the genset from a distance.
                </p>
              </div>
            </div>
            {/* section 2 */}
            <div className="flex flex-col items-center py-5 justify-evenly md:flex-row">
              <div>
                <h2>Key Features</h2>
                <p className="text-justify">
                  Some key features of the application include:
                  <ul>
                    <li>
                      Real-time monitoring: The ability to monitor the
                      performance of the genset in real-time, including load,
                      fuel consumption, run time, and temperature.
                    </li>
                    <li>
                      Alerts and notifications: The ability to set up and
                      receive alerts for various parameters such as low oil
                      pressure, high temperature, and low fuel levels, to
                      quickly identify and address any issues.
                    </li>
                    <li>
                      Maintenance scheduling and tracking: The ability to
                      schedule regular maintenance, track the status of
                      maintenance tasks, and receive notifications when tasks
                      are due.
                    </li>
                    <li>
                      The ability to access historical data to track performance
                      over time and identify patterns or trends.
                    </li>
                    <li>
                      Remote access: The ability to start, stop and control the
                      genset from a distance, through the application.
                    </li>
                  </ul>
                </p>
              </div>
              <Image
                src="/portfolio/he/he_asset.jpg"
                alt="he"
                height={700}
                width={700}
                className="ml-10 transition ease-in rounded-xl hover:scale-105"
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
                  <div>TypeScript</div>
                  <div>JavaScript</div>
                  <div>React</div>
                  <div>Node.JS</div>
                  <div>Express</div>
                  <div>RabbitMQ</div>
                  <div>Redis</div>
                  <div>Leaflet</div>
                  <div>KendoJS</div>
                  <div>AmCharts</div>
                  <div>OSRM</div>
                  <div>OSM Tile Layer</div>
                  <div>Google Maps</div>
                  <div>Google OR Tools</div>
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

export default HeavyEquipmentMonitoringPortfolioScreen;

import Layout from '@/components/Layout';
import OtherProjects from '@/components/OtherProjects';
import portfolio from 'data/portfolio';
import Image from 'next/image';
import Link from 'next/link';

const title = 'Vehicle Tracking Mobile Application';

const otherProjects = portfolio.filter((i) => i.title !== title);

const VehicleApplicationMobilePortfolioScreen = () => {
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
              <div className="flex">
                <Image
                  src="/portfolio/razrtrack_mobile/razrtrack_mobile_login.svg"
                  alt="razrtrack"
                  height={2000}
                  width={2000}
                  className="transition ease-in rounded-xl hover:scale-105"
                ></Image>
                <Image
                  src="/portfolio/razrtrack_mobile/razrtrack_mobile_list.svg"
                  alt="razrtrack"
                  height={2000}
                  width={2000}
                  className="ml-5 transition ease-in rounded-xl hover:scale-105"
                ></Image>
              </div>
              <div className="ml-10">
                <h2>About</h2>
                <p className="text-justify">
                  The mobile application is a powerful tool for tracking and
                  monitoring vehicles in real-time. With its easy-to-use
                  interface, users can quickly and easily view the current
                  location and movement of their vehicles, as well as view
                  detailed information of the work orders being completed by the
                  drivers in real-time with push notification capability.
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
                    <li>
                      Tracking and monitoring of vehicle location and usage
                    </li>
                    <li>Scheduling and dispatching of vehicles and drivers</li>
                    <li>Maintenance and repair tracking</li>
                    <li>Fuel consumption and cost tracking</li>
                    <li>Driver performance monitoring and evaluation</li>
                    <li>
                      Multiple Stop Work Order Monitoring with time-window and
                      distance constraints
                    </li>
                    <li>
                      Estimated vs Actual monitoring for stop over arrival and
                      departures
                    </li>
                  </ul>
                </p>
              </div>
              <div className="flex">
                <Image
                  src="/portfolio/razrtrack_mobile/razrtrack_mobile_wo.svg"
                  alt="razrtrack"
                  height={250}
                  width={250}
                  className="ml-10 transition ease-in rounded-xl hover:scale-105"
                ></Image>
                <Image
                  src="/portfolio/razrtrack_mobile/razrtrack_mobile_wo_single.svg"
                  alt="razrtrack"
                  height={250}
                  width={250}
                  className="ml-10 transition ease-in rounded-xl hover:scale-105"
                ></Image>
              </div>
            </div>
            {/* tech stack */}
            <div className="flex flex-col-reverse items-center py-5 justify-evenly lg:flex-row">
              <Image
                src="/portfolio/razrtrack_mobile/razrtrack_mobile_wo_single_status.svg"
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
                  <div>OneSignal</div>
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

export default VehicleApplicationMobilePortfolioScreen;

import Layout from '@/components/Layout';
import OtherProjects from '@/components/OtherProjects';
import portfolio from 'data/portfolio';
import Image from 'next/image';

const title = 'Smart Boiler Mobile';
const otherProjects = portfolio.filter((i) => i.title !== title);

const SmartBoilerMobilePortfolioScreen = () => {
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
            <div className="flex flex-col-reverse items-center py-5 justify-evenly md:flex-row">
              <div className="flex">
                <Image
                  src="/portfolio/razrboiler/razrboiler_login.svg"
                  alt="razrtrack"
                  height={2000}
                  width={2000}
                  className="transition ease-in rounded-xl hover:scale-105"
                ></Image>
                <Image
                  src="/portfolio/razrboiler/razrboiler_list.svg"
                  alt="razrtrack"
                  height={2000}
                  width={2000}
                  className="ml-5 transition ease-in rounded-xl hover:scale-105"
                ></Image>
              </div>
              <div className="ml-10">
                <h2>About</h2>
                <p className="text-justify">
                  The application helps customers to control and manage their
                  home or office thermostats from their smartphones or tablets.
                  With this application, customers can easily adjust the
                  temperature, set schedules, and monitor energy usage from
                  anywhere, at any time. The application also includes a feature
                  for monitoring energy usage. Customers can use the application
                  to view their energy usage history, track their energy
                  consumption and set goals to reduce their energy consumption.
                  This feature can be useful for identifying patterns in energy
                  usage and making adjustments to reduce costs.
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
                      Remote temperature control: The ability for customers to
                      adjust the temperature of their thermostat remotely from
                      their smartphone or tablet.
                    </li>
                    <li>
                      Schedule setting: The ability for customers to create
                      customized schedules for their thermostat, such as turning
                      the heat down when they&apos;re away during the day or
                      turning it up just before they get home.
                    </li>
                    <li>
                      User-friendly interface: The application is designed to be
                      easy to use, with a user-friendly interface, and can be
                      accessed from any device connected to the internet.
                    </li>
                    <li>
                      Notifications and Alerts: The ability to receive
                      notifications and alerts, such as low battery, temperature
                      out of range, and schedule changes.
                    </li>
                  </ul>
                </p>
              </div>
              <div className="flex">
                <Image
                  src="/portfolio/razrboiler/razrboiler_thermostat.svg"
                  alt="razrtrack"
                  height={250}
                  width={250}
                  className="ml-10 transition ease-in rounded-xl hover:scale-105"
                ></Image>
                <Image
                  src="/portfolio/razrboiler/razrboiler_control.svg"
                  alt="razrtrack"
                  height={250}
                  width={250}
                  className="ml-10 transition ease-in rounded-xl hover:scale-105"
                ></Image>
              </div>
            </div>
            {/* tech stack */}
            <div className="flex flex-col-reverse items-center py-5 justify-evenly md:flex-row">
              <Image
                src="/portfolio/razrboiler/razrboiler_stats.svg"
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
                  <div>Cordova</div>
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

export default SmartBoilerMobilePortfolioScreen;

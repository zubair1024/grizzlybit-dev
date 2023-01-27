import Layout from '@/components/Layout';
import Image from 'next/image';

const VehicleApplicationPortfolioScreen = () => {
  return (
    <>
      <Layout>
        <div className="max-w-full min-h-screen prose prose-2xl">
          <div className="bg-fixed bg-toolBelt">
            <div className="py-20 overflow-hidden text-white bg-black bg-opacity-50 shadow-lg toolBelt-content backdrop-filter backdrop-blur-lg">
              <h1 className="text-4xl font-bold text-center md:grid-cols-4">
                Vehicle Tracking Application
              </h1>
            </div>
          </div>
          <div className="px-5 mx-auto max-w-7xl">
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
                  A software tool that allows users to monitor the location and
                  movement of vehicles in real-time. The application can be
                  accessed via a web browser and typically displays a map view
                  showing the location of all vehicles being tracked. Users can
                  also view detailed information about each vehicle, such as its
                  speed, fuel level, and route history. It also allows the user
                  to get alerts on specific events, such as when a vehicle
                  deviates from its expected route or exceeds a certain speed
                  limit.
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
                      Tracking and monitoring of vehicle location and usage
                    </li>
                    <li>Scheduling and dispatching of vehicles and drivers</li>
                    <li>Maintenance and repair tracking</li>
                    <li>Fuel consumption and cost tracking</li>
                    <li>Driver performance monitoring and evaluation</li>
                    <li>Compliance with regulations and safety standards</li>
                    <li>Reporting and data analysis capabilities</li>
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
            <div className="flex flex-col-reverse items-center py-5 justify-evenly md:flex-row">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default VehicleApplicationPortfolioScreen;

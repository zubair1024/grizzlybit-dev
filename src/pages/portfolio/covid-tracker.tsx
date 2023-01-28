import Layout from '@/components/Layout';
import OtherProjects from '@/components/OtherProjects';
import portfolio from 'data/portfolio';
import Image from 'next/image';

const title = 'COVID Tracking Mobile Application';
const otherProjects = portfolio.filter((i) => i.title !== title);

const CovidTrackingPortfolioScreen = () => {
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
                  src="/portfolio/razrlibre/razrlibre_main.svg"
                  alt="razrtrack"
                  height={2000}
                  width={2000}
                  className="transition ease-in rounded-xl hover:scale-105"
                ></Image>
              </div>
              <div className="ml-10">
                <h2>About</h2>
                <p className="text-justify">
                  The patient covid health tracking mobile application is a
                  valuable tool for managing and monitoring the health and
                  well-being of patients during the COVID-19 pandemic. With its
                  easy-to-use interface, patients can quickly and easily track
                  their symptoms, medications, and test results, as well as
                  access important information about the virus and how to stay
                  safe. It integrated with oxygen meter BLE sensor through
                  bluetooth connectivity to read the oxygen meter reading of the
                  patient.
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
                      Symptom tracking: The ability for patients to log their
                      symptoms on a daily basis, such as fever, cough, and
                      shortness of breath, and view a history of their symptoms
                      over time.
                    </li>
                    <li>
                      Medication tracking: The ability for patients to log the
                      medications they are taking, including the dosage and
                      frequency, and view a history of their medication usage.
                    </li>
                    <li>
                      Reminders: The ability to set up reminders for taking
                      medication, booking test, and other health-related
                      appointments.
                    </li>
                  </ul>
                </p>
              </div>
              <div className="flex flex-wrap md:flex-nowrap">
                <Image
                  src="/portfolio/razrlibre/razrlibre_record1.svg"
                  alt="razrtrack"
                  height={250}
                  width={250}
                  className="ml-10 transition ease-in rounded-xl hover:scale-105"
                ></Image>
                <Image
                  src="/portfolio/razrlibre/razrlibre_record2.svg"
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
                src="/portfolio/razrlibre/razrlibre_sos.svg"
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

export default CovidTrackingPortfolioScreen;

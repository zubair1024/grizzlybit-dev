import {
  AboutSection,
  CaseStudySummary,
  FeaturesSection,
  ImageRow,
  PortfolioDetailShell,
  PortfolioImage,
  TechStackSection,
} from '@/components/PortfolioDetail';

const title = 'Smart boiler mobile app';

const SmartBoilerMobilePortfolioScreen = () => {
  return (
    <PortfolioDetailShell
      slug="boiler-mobile"
      title={title}
      badges={['Mobile app', 'IoT', 'Smart home']}
    >
      <AboutSection
        copy={
          <>
            <p>
              A smart home IoT app that lets customers control their home or
              office thermostat and boiler from a smartphone or tablet. They can
              adjust the temperature, set heating schedules and monitor energy
              usage from anywhere.
            </p>
            <p>
              Energy history and consumption tracking help customers spot
              patterns, set goals and cut heating costs.
            </p>
          </>
        }
        visual={
          <ImageRow>
            <PortfolioImage
              priority
              src="/portfolio/razrboiler/razrboiler_login.svg"
              alt="Smart boiler mobile app login screen"
              width={260}
              height={260}
            />
            <PortfolioImage
              src="/portfolio/razrboiler/razrboiler_list.svg"
              alt="Smart boiler app list of connected thermostats and boilers"
              width={260}
              height={260}
            />
          </ImageRow>
        }
      />

      <CaseStudySummary
        challenge={
          <>
            <p>
              Customers wanted to control their home or office heating from
              anywhere and understand their energy use to cut heating costs.
            </p>
            <p>
              The Ionic and Cordova app, on a Node.js and Express back end,
              controls the thermostat and boiler remotely, runs heating
              schedules, tracks energy history and sends alerts through
              OneSignal.
            </p>
          </>
        }
      />

      <FeaturesSection
        reverse
        features={[
          'Remote temperature control: adjust the thermostat from a phone or tablet.',
          'Heating schedules: turn the heat down when away or up before you get home.',
          'Simple interface that works on any internet-connected device.',
          'Notifications and alerts for low battery, out-of-range temperature and schedule changes.',
        ]}
        visual={
          <ImageRow>
            <PortfolioImage
              src="/portfolio/razrboiler/razrboiler_thermostat.svg"
              alt="Smart thermostat temperature dial screen"
              width={220}
              height={220}
            />
            <PortfolioImage
              src="/portfolio/razrboiler/razrboiler_control.svg"
              alt="Remote boiler control screen"
              width={220}
              height={220}
            />
          </ImageRow>
        }
      />

      <div className="flex justify-center">
        <PortfolioImage
          src="/portfolio/razrboiler/razrboiler_stats.svg"
          alt="Boiler energy usage statistics screen"
          width={320}
          height={320}
        />
      </div>

      <TechStackSection
        tech={[
          'TypeScript',
          'JavaScript',
          'Ionic',
          'Node.js',
          'Express',
          'Cordova',
          'OneSignal',
        ]}
      />
    </PortfolioDetailShell>
  );
};

export default SmartBoilerMobilePortfolioScreen;

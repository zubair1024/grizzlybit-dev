import {
  AboutSection,
  FeaturesSection,
  ImageRow,
  PortfolioDetailShell,
  PortfolioImage,
  TechStackSection,
} from '@/components/PortfolioDetail';

const title = 'Smart Boiler Mobile';

const SmartBoilerMobilePortfolioScreen = () => {
  return (
    <PortfolioDetailShell slug="boiler-mobile" title={title} command="open razrboiler">
      <AboutSection
        copy={
          <p>
            The application helps customers control and manage their home or
            office thermostats from their smartphones or tablets. Adjust
            temperature, set schedules, and monitor energy usage from
            anywhere. Customers can view energy history, track consumption,
            and set goals to reduce cost — useful for spotting patterns and
            making adjustments.
          </p>
        }
        visual={
          <ImageRow>
            <PortfolioImage
              src="/portfolio/razrboiler/razrboiler_login.svg"
              alt="boiler login"
              width={260}
              height={260}
            />
            <PortfolioImage
              src="/portfolio/razrboiler/razrboiler_list.svg"
              alt="boiler list"
              width={260}
              height={260}
            />
          </ImageRow>
        }
      />

      <FeaturesSection
        reverse
        features={[
          'Remote temperature control — adjust thermostat from a phone or tablet.',
          'Schedule setting — turn heat down when away or up before arrival.',
          'User-friendly interface — accessible from any internet-connected device.',
          'Notifications and alerts — low battery, temperature out of range, schedule changes.',
        ]}
        visual={
          <ImageRow>
            <PortfolioImage
              src="/portfolio/razrboiler/razrboiler_thermostat.svg"
              alt="thermostat"
              width={220}
              height={220}
            />
            <PortfolioImage
              src="/portfolio/razrboiler/razrboiler_control.svg"
              alt="control"
              width={220}
              height={220}
            />
          </ImageRow>
        }
      />

      <div className="flex justify-center">
        <PortfolioImage
          src="/portfolio/razrboiler/razrboiler_stats.svg"
          alt="boiler stats"
          width={320}
          height={320}
        />
      </div>

      <TechStackSection
        tech={[
          'TypeScript',
          'JavaScript',
          'Ionic',
          'Node.JS',
          'Express',
          'Cordova',
          'OneSignal',
        ]}
      />
    </PortfolioDetailShell>
  );
};

export default SmartBoilerMobilePortfolioScreen;

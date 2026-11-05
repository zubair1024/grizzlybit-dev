import {
  AboutSection,
  FeaturesSection,
  PortfolioDetailShell,
  PortfolioImage,
  TechStackSection,
} from '@/components/PortfolioDetail';

const title = 'Heavy Equipment Monitoring';

const HeavyEquipmentMonitoringPortfolioScreen = () => {
  return (
    <PortfolioDetailShell
      slug="he-app"
      title={title}
      badges={['Web app', 'IoT', 'Construction']}
    >
      <AboutSection
        copy={
          <>
            <p>
              An IoT monitoring platform that helps operators and managers track
              the performance, maintenance and health of gensets (portable power
              generators) and other heavy equipment used in construction,
              industrial and commercial settings.
            </p>
            <p>
              Real-time data and alerts help teams find and fix issues fast, and
              remote access lets them start, stop and control a genset from a
              distance.
            </p>
          </>
        }
        visual={
          <PortfolioImage
            src="/portfolio/he/he_overview.jpg"
            alt="Heavy equipment monitoring dashboard showing the fleet overview"
          />
        }
      />

      <FeaturesSection
        reverse
        features={[
          'Real-time monitoring of load, fuel consumption, run time and temperature.',
          'Alerts for low oil pressure, high temperature and low fuel.',
          'Maintenance scheduling and tracking, with notifications for due tasks.',
          'Historical data to track performance and spot trends over time.',
          'Remote access to start, stop and control the genset.',
        ]}
        visual={
          <PortfolioImage
            src="/portfolio/he/he_asset.jpg"
            alt="Genset asset detail view with live telemetry"
          />
        }
      />

      <TechStackSection
        tech={[
          'TypeScript',
          'JavaScript',
          'React',
          'Node.js',
          'Express',
          'RabbitMQ',
          'Redis',
          'Leaflet',
          'KendoJS',
          'AmCharts',
          'OSRM',
          'OSM Tile Layer',
          'Google Maps',
          'Google OR-Tools',
        ]}
      />
    </PortfolioDetailShell>
  );
};

export default HeavyEquipmentMonitoringPortfolioScreen;

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
    <PortfolioDetailShell slug="he-app" title={title} command="open he-app">
      <AboutSection
        copy={
          <p>
            A tool designed to help operators and managers keep track of the
            performance, maintenance, and overall health of gensets and other
            heavy equipment — portable power generators typically used in
            industrial and commercial settings. The application provides
            real-time data and alerts to help users quickly identify and
            address issues, and includes a feature for remote access to start,
            stop, and control the genset from a distance.
          </p>
        }
        visual={
          <PortfolioImage
            src="/portfolio/he/he_overview.jpg"
            alt="HE overview dashboard"
          />
        }
      />

      <FeaturesSection
        reverse
        features={[
          'Real-time monitoring — load, fuel consumption, run time, and temperature.',
          'Alerts and notifications — low oil pressure, high temperature, low fuel.',
          'Maintenance scheduling and tracking — schedule, status, and due-task notifications.',
          'Historical data — track performance over time and identify patterns or trends.',
          'Remote access — start, stop, and control the genset from a distance.',
        ]}
        visual={
          <PortfolioImage
            src="/portfolio/he/he_asset.jpg"
            alt="HE asset detail"
          />
        }
      />

      <TechStackSection
        tech={[
          'TypeScript',
          'JavaScript',
          'React',
          'Node.JS',
          'Express',
          'RabbitMQ',
          'Redis',
          'Leaflet',
          'KendoJS',
          'AmCharts',
          'OSRM',
          'OSM Tile Layer',
          'Google Maps',
          'Google OR Tools',
        ]}
      />
    </PortfolioDetailShell>
  );
};

export default HeavyEquipmentMonitoringPortfolioScreen;

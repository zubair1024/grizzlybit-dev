import {
  AboutSection,
  FeaturesSection,
  PortfolioDetailShell,
  PortfolioImage,
  SectionHeading,
  TechStackSection,
} from '@/components/PortfolioDetail';
import YoutubeEmbed from '@/components/YoutubeEmbed';

const title = 'Vehicle Tracking Application';

const VehicleApplicationPortfolioScreen = () => {
  return (
    <PortfolioDetailShell slug="vehicle-tracking" title={title} command="open razrtrack">
      <AboutSection
        copy={
          <p>
            A software tool that allows users to monitor the location and
            movement of vehicles in real-time. The application is accessed via
            a web browser and displays a map view showing every tracked
            vehicle. Users can drill into each vehicle for speed, fuel level,
            and route history, and receive alerts for events such as route
            deviation or speed-limit violations.
          </p>
        }
        visual={
          <PortfolioImage
            src="/portfolio/razrtrack/razrtrack_overview.png"
            alt="razrtrack overview"
          />
        }
      />

      <FeaturesSection
        reverse
        features={[
          'Tracking and monitoring of vehicle location and usage.',
          'Scheduling and dispatching of vehicles and drivers.',
          'Maintenance and repair tracking.',
          'Fuel consumption and cost tracking.',
          'Driver performance monitoring and evaluation.',
          'Compliance with regulations and safety standards.',
          'Reporting and data analysis capabilities.',
          'Integration with ERP / CRM systems for shared data and automation.',
        ]}
        visual={
          <PortfolioImage
            src="/portfolio/razrtrack/razrtrack_vehicle.png"
            alt="razrtrack vehicle detail"
          />
        }
      />

      <div>
        <SectionHeading kicker="Watch" title="Product advertisement" />
        <div className="overflow-hidden rounded-xl border border-white/10 bg-black/50">
          <YoutubeEmbed
            videoId="USNzRm6Tae4"
            title="Vehicle Tracking Application advertisement"
          />
        </div>
      </div>

      <div>
        <SectionHeading kicker="Recognition" title="Dubai Police certificate" />
        <div className="flex justify-center">
          <PortfolioImage
            src="/dp_certificate.webp"
            alt="Dubai Police certificate of appreciation"
            width={1600}
            height={1134}
            caption="Dubai Police — certificate of appreciation"
          />
        </div>
      </div>

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

export default VehicleApplicationPortfolioScreen;

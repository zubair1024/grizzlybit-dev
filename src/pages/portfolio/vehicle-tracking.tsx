import {
  AboutSection,
  CaseStudySummary,
  DetailSection,
  FeaturesSection,
  PortfolioDetailShell,
  PortfolioImage,
  TechStackSection,
} from '@/components/PortfolioDetail';
import Link from 'next/link';
import YoutubeEmbed from '@/components/YoutubeEmbed';

const title = 'Vehicle tracking application';

const VehicleApplicationPortfolioScreen = () => {
  return (
    <PortfolioDetailShell
      slug="vehicle-tracking"
      title={title}
      badges={['Web app', 'Fleet management', 'GPS tracking']}
    >
      <AboutSection
        copy={
          <>
            <p>
              A web-based fleet management application for monitoring the
              location and movement of vehicles in real time. A live map shows
              every tracked vehicle.
            </p>
            <p>
              Users drill into each vehicle for speed, fuel level and route
              history, and get alerts for events such as route deviation or
              speeding.
            </p>
          </>
        }
        visual={
          <PortfolioImage
            priority
            src="/portfolio/razrtrack/razrtrack_overview.png"
            alt="Fleet tracking dashboard with all vehicles on a live map"
          />
        }
      />

      <CaseStudySummary
        challenge={
          <>
            <p>
              Fleet operators need to see where every vehicle is in real time,
              drill into speed, fuel level and route history, and react to
              events such as route deviation or speeding.
            </p>
            <p>
              The answer is a React web dashboard on a Node.js and Express back
              end, with RabbitMQ and Redis in the stack, maps from Leaflet, an
              OpenStreetMap tile layer and Google Maps, OSRM routing and Google
              OR-Tools. A{' '}
              <Link
                href="/portfolio/vehicle-tracking-mobile"
                className="font-bold underline underline-offset-4"
              >
                companion mobile app
              </Link>{' '}
              covers fleet operations on iOS and Android.
            </p>
          </>
        }
        outcome={
          <p>
            The vehicle tracking work was recognised by Dubai Police with a
            certificate of appreciation, shown below.
          </p>
        }
      />

      <FeaturesSection
        reverse
        features={[
          'Real-time tracking of vehicle location and usage.',
          'Scheduling and dispatching of vehicles and drivers.',
          'Maintenance and repair tracking.',
          'Fuel consumption and cost tracking.',
          'Driver performance monitoring and evaluation.',
          'Compliance with regulations and safety standards.',
          'Reporting and data analysis.',
          'ERP and CRM integration for shared data and automation.',
        ]}
        visual={
          <PortfolioImage
            src="/portfolio/razrtrack/razrtrack_vehicle.png"
            alt="Vehicle detail view with speed, fuel level and route history"
          />
        }
      />

      <DetailSection kicker="Watch" title="Vehicle tracking product video">
        <div className="border-2 border-border bg-card shadow-md">
          <YoutubeEmbed
            videoId="USNzRm6Tae4"
            title="Vehicle tracking application product advertisement"
          />
        </div>
      </DetailSection>

      <DetailSection
        kicker="Recognition"
        title="Dubai Police certificate of appreciation"
      >
        <div className="flex justify-center">
          <PortfolioImage
            src="/dp_certificate.webp"
            alt="Dubai Police certificate of appreciation"
            width={1600}
            height={1134}
          />
        </div>
      </DetailSection>

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

export default VehicleApplicationPortfolioScreen;

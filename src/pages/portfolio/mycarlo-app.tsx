import {
  AboutSection,
  FeaturesSection,
  ImageRow,
  PortfolioDetailShell,
  PortfolioImage,
  SectionHeading,
  TechStackSection,
} from '@/components/PortfolioDetail';
import YoutubeEmbed from '@/components/YoutubeEmbed';
import dynamic from 'next/dynamic';

const title = 'MyCarlo';

const MyCarloAppScreen = () => {
  return (
    <PortfolioDetailShell slug="mycarlo-app" title={title} command="open mycarlo">
      <AboutSection
        copy={
          <p>
            MyCarlo is a consumer vehicle tracking mobile application — a
            real-time GPS tracker that lets you watch the location of your
            vehicle at all times. It also includes custom geo-fencing, vehicle
            health monitoring, driving history, and an emergency response
            button. The user-friendly interface makes every feature accessible
            in a couple of taps.
          </p>
        }
        visual={
          <PortfolioImage
            src="/portfolio/mycarlo/mycarlo-logo.jpg"
            alt="MyCarlo logo"
            width={420}
            height={420}
          />
        }
      />

      <FeaturesSection
        reverse
        features={[
          'Find My Car.',
          'Fault Detection.',
          'Car Insight Information.',
          'Book a service.',
          'Vehicle Service Reminders.',
          'Battery Health.',
          'Movement Detection.',
          'Geofence Notification.',
          'Crash Detection.',
          'Eco Score / Driving Behavior.',
        ]}
        visual={
          <PortfolioImage
            src="/portfolio/mycarlo/mycarlo-features.jpg"
            alt="MyCarlo features"
            width={420}
            height={420}
          />
        }
      />

      <ImageRow>
        <PortfolioImage
          src="/portfolio/mycarlo/mycarlo-find-my-car.jpg"
          alt="MyCarlo Find My Car"
          width={260}
          height={260}
        />
        <PortfolioImage
          src="/portfolio/mycarlo/mycarlo-mot-reminder.jpg"
          alt="MyCarlo MOT reminder"
          width={260}
          height={260}
        />
        <PortfolioImage
          src="/portfolio/mycarlo/mycarlo-trip-report.jpg"
          alt="MyCarlo trip report"
          width={260}
          height={260}
        />
      </ImageRow>

      <div>
        <SectionHeading kicker="Watch" title="Product video" />
        <div className="overflow-hidden rounded-xl border border-white/10 bg-black/50">
          <YoutubeEmbed videoId="T4W6pCBWShE" title="MyCarlo product video" />
        </div>
      </div>

      <div>
        <SectionHeading kicker="Voices" title="Product testimonials" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black/50">
            <YoutubeEmbed videoId="sblwR6jRkIs" />
          </div>
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black/50">
            <YoutubeEmbed videoId="fG3KcTQOows" />
          </div>
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black/50">
            <YoutubeEmbed videoId="v-ZVyJ3e7eM" />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <PortfolioImage
          src="/portfolio/mycarlo/mycarlo-competition.jpg"
          alt="MyCarlo competition"
          width={520}
          height={520}
        />
      </div>

      <TechStackSection
        tech={['TypeScript', 'JavaScript', 'Ionic', 'Node.JS', 'Express']}
      />
    </PortfolioDetailShell>
  );
};

export default dynamic(() => Promise.resolve(MyCarloAppScreen), { ssr: false });

import {
  AboutSection,
  DetailSection,
  FeaturesSection,
  ImageRow,
  PortfolioDetailShell,
  PortfolioImage,
  TechStackSection,
} from '@/components/PortfolioDetail';
import YoutubeEmbed from '@/components/YoutubeEmbed';

const title = 'MyCarlo';

const videoFrame = 'border-2 border-border bg-card shadow-md';

const testimonials = [
  { id: 'sblwR6jRkIs', title: 'MyCarlo customer testimonial video 1' },
  { id: 'fG3KcTQOows', title: 'MyCarlo customer testimonial video 2' },
  { id: 'v-ZVyJ3e7eM', title: 'MyCarlo customer testimonial video 3' },
];

const MyCarloAppScreen = () => {
  return (
    <PortfolioDetailShell
      slug="mycarlo-app"
      title={title}
      badges={['Mobile app', 'iOS and Android', 'Vehicle tracking']}
    >
      <AboutSection
        copy={
          <>
            <p>
              MyCarlo is a consumer vehicle tracking app: a real-time GPS
              tracker that shows where your car is at all times.
            </p>
            <p>
              It adds custom geofencing, vehicle health monitoring, driving
              history and an emergency response button, each a couple of taps
              away.
            </p>
          </>
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
          'Find my car.',
          'Fault detection.',
          'Car insight information.',
          'Book a service.',
          'Vehicle service reminders.',
          'Battery health.',
          'Movement detection.',
          'Geofence notifications.',
          'Crash detection.',
          'Eco score and driving behaviour.',
        ]}
        visual={
          <PortfolioImage
            src="/portfolio/mycarlo/mycarlo-features.jpg"
            alt="Overview of MyCarlo car tracking app features"
            width={420}
            height={420}
          />
        }
      />

      <ImageRow>
        <PortfolioImage
          src="/portfolio/mycarlo/mycarlo-find-my-car.jpg"
          alt="MyCarlo find my car screen showing the vehicle on a map"
          width={260}
          height={260}
        />
        <PortfolioImage
          src="/portfolio/mycarlo/mycarlo-mot-reminder.jpg"
          alt="MyCarlo MOT reminder screen"
          width={260}
          height={260}
        />
        <PortfolioImage
          src="/portfolio/mycarlo/mycarlo-trip-report.jpg"
          alt="MyCarlo trip report screen"
          width={260}
          height={260}
        />
      </ImageRow>

      <DetailSection kicker="Watch" title="MyCarlo product video">
        <div className={videoFrame}>
          <YoutubeEmbed
            videoId="T4W6pCBWShE"
            title="MyCarlo car tracking app product video"
          />
        </div>
      </DetailSection>

      <DetailSection kicker="Customers" title="MyCarlo customer testimonials">
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.id} className={videoFrame}>
              <YoutubeEmbed videoId={t.id} title={t.title} />
            </li>
          ))}
        </ul>
      </DetailSection>

      <DetailSection kicker="Comparison" title="How MyCarlo compares">
        <div className="flex justify-center">
          <PortfolioImage
            src="/portfolio/mycarlo/mycarlo-competition.jpg"
            alt="Feature comparison table of MyCarlo against Car Genie, Carlock and Vodafone V Auto"
            width={1024}
            height={715}
          />
        </div>
      </DetailSection>

      <TechStackSection
        tech={['TypeScript', 'JavaScript', 'Ionic', 'Node.js', 'Express']}
      />
    </PortfolioDetailShell>
  );
};

export default MyCarloAppScreen;

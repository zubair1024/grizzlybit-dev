import {
  AboutSection,
  CaseStudySummary,
  DetailSection,
  FeaturesSection,
  ImageRow,
  PortfolioDetailShell,
  PortfolioImage,
  TechStackSection,
} from '@/components/PortfolioDetail';
import YoutubeEmbed from '@/components/YoutubeEmbed';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

const title = 'MyCarlo';

const videoFrame = 'border-2 border-border bg-card shadow-md';

const testimonials = [
  { id: 'sblwR6jRkIs', title: 'MyCarlo customer testimonial video 1' },
  { id: 'fG3KcTQOows', title: 'MyCarlo customer testimonial video 2' },
  { id: 'v-ZVyJ3e7eM', title: 'MyCarlo customer testimonial video 3' },
];

const competitors = ['Car Genie', 'Carlock', 'Vodafone V Auto'];

// Transcribed from the original comparison graphic: [feature, Car Genie, Carlock, Vodafone V Auto, MyCarlo]
const comparison: [string, boolean, boolean, boolean, boolean][] = [
  ['MOT reminder', false, false, false, true],
  ['Vehicle service reminders', false, false, false, true],
  ['Car insight information', false, false, false, true],
  ['Tyre change reminder', false, false, false, true],
  ['Fault detection', true, false, false, true],
  ['Breakdown service', true, false, false, true],
  ['Battery health', true, true, false, true],
  ['Movement alert*', false, true, false, true],
  ['Preferred location notification**', false, true, false, true],
  ['Jamming detection', false, true, false, true],
  ['Device tampering detection', false, true, false, true],
  ['Crash detection', true, false, true, true],
  ['Car location', true, true, true, true],
  ['Eco score (driving behaviour)', true, true, true, true],
  ['Trip history and trip information', true, true, true, true],
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

      <CaseStudySummary
        challenge={
          <>
            <p>
              Drivers want to know where their car is at all times, keep on top
              of its health and servicing, and get help fast in an emergency.
            </p>
            <p>
              MyCarlo combines real-time GPS tracking with geofencing, vehicle
              health monitoring, driving history and an emergency response
              button. It is built with Ionic and TypeScript for iOS and Android
              on a Node.js and Express back end.
            </p>
          </>
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
        <p className="mb-6 max-w-prose text-base leading-relaxed md:text-lg">
          Watch the MyCarlo product video for a short introduction to the app.
        </p>
        <div className={videoFrame}>
          <YoutubeEmbed
            videoId="T4W6pCBWShE"
            title="MyCarlo car tracking app product video"
          />
        </div>
      </DetailSection>

      <DetailSection kicker="Customers" title="MyCarlo customer testimonials">
        <p className="mb-6 max-w-prose text-base leading-relaxed md:text-lg">
          MyCarlo customers describe their experience with the app in these
          short vertical videos.
        </p>
        <ul className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-center">
          {testimonials.map((t) => (
            <li key={t.id} className="w-full max-w-[280px]">
              <YoutubeEmbed
                videoId={t.id}
                title={t.title}
                aspect="portrait"
                className={videoFrame}
              />
            </li>
          ))}
        </ul>
      </DetailSection>

      <DetailSection kicker="Comparison" title="How MyCarlo compares">
        <p className="mb-6 max-w-prose text-base leading-relaxed md:text-lg">
          A feature-by-feature comparison of MyCarlo with Car Genie, Carlock and
          Vodafone V Auto.
        </p>
        <figure>
          <div
            className="relative overflow-x-auto border-2 border-border bg-card shadow-md outline-hidden focus-visible:ring-3 focus-visible:ring-ring"
            tabIndex={0}
            role="region"
            aria-label="MyCarlo feature comparison table (scrolls horizontally)"
            data-lenis-prevent
          >
            <table className="w-full min-w-[36rem] border-collapse text-left text-base">
              <caption className="sr-only">
                Features of MyCarlo compared with Car Genie, Carlock and
                Vodafone V Auto
              </caption>
              <thead>
                <tr className="border-b-2 border-border bg-muted">
                  <th scope="col" className="p-3 font-bold">
                    Feature
                  </th>
                  {competitors.map((c) => (
                    <th
                      key={c}
                      scope="col"
                      className="p-3 text-center font-bold"
                    >
                      {c}
                    </th>
                  ))}
                  <th
                    scope="col"
                    className="bg-primary p-3 text-center font-bold text-primary-foreground"
                  >
                    MyCarlo
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(([feature, ...support]) => (
                  <tr
                    key={feature}
                    className="border-b border-border last:border-b-0"
                  >
                    <th scope="row" className="p-3 font-normal">
                      {feature}
                    </th>
                    {support.map((yes, i) => (
                      <td
                        key={i}
                        className={cn(
                          'p-3 text-center',
                          i === support.length - 1 && 'bg-muted font-bold',
                        )}
                      >
                        {yes ? (
                          <Check aria-hidden className="mx-auto size-5" />
                        ) : (
                          <X
                            aria-hidden
                            className="mx-auto size-5 text-muted-foreground"
                          />
                        )}
                        <span className="sr-only">{yes ? 'Yes' : 'No'}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <figcaption className="mt-3 text-sm text-muted-foreground">
            * Virtual security lock. ** Geofencing.
          </figcaption>
        </figure>
      </DetailSection>

      <TechStackSection
        tech={['TypeScript', 'JavaScript', 'Ionic', 'Node.js', 'Express']}
      />
    </PortfolioDetailShell>
  );
};

export default MyCarloAppScreen;

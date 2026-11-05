import {
  AboutSection,
  CaseStudySummary,
  ExternalLinkButton,
  PortfolioDetailShell,
  PortfolioImage,
  TechStackSection,
} from '@/components/PortfolioDetail';
import { FaGithub } from 'react-icons/fa';

const title = 'Worldly Pins';

const WorldlyPinsScreen = () => {
  return (
    <PortfolioDetailShell
      slug="worldly-pins"
      title={title}
      badges={['Web app', 'Next.js', 'Open source']}
    >
      <AboutSection
        copy={
          <>
            <p>
              Worldly Pins is a travel tracking web app for people who want to
              remember where they have been. Pin the countries and cities you
              have visited and see your travels on an interactive map.
            </p>
            <p>
              Whether you&apos;re a frequent flyer or a backpacker, it&apos;s a
              simple way to track your adventures and share trip stories.
            </p>
            <ExternalLinkButton
              href="https://github.com/zubair1024/worldly-pins"
              label="View source on GitHub"
              icon={<FaGithub aria-hidden />}
            />
          </>
        }
        visual={
          <PortfolioImage
            src="/portfolio/worldlypins/worldly-pins.png"
            alt="Worldly Pins interactive world map with visited countries pinned"
          />
        }
      />

      <CaseStudySummary
        role={
          <p>
            Worldly Pins is Zubair&apos;s own open-source project, published on
            his GitHub account.
          </p>
        }
        challenge={
          <p>
            Travellers want a simple way to remember where they have been. The
            app pins visited countries and cities on an interactive map, built
            with Next.js and TypeScript on a Postgres database through Prisma.
          </p>
        }
      />

      <div className="flex justify-center">
        <PortfolioImage
          src="/portfolio/worldlypins/worldly-pins-controls.jpg"
          alt="Worldly Pins dialog for adding visited countries and cities"
          width={600}
          height={600}
        />
      </div>

      <TechStackSection
        tech={[
          'Next.js',
          'TypeScript',
          'JavaScript',
          'React',
          'Node.js',
          'Express',
          'Postgres',
          'Prisma',
        ]}
      />
    </PortfolioDetailShell>
  );
};

export default WorldlyPinsScreen;

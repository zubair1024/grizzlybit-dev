import {
  AboutSection,
  ExternalLinkChip,
  ImageRow,
  PortfolioDetailShell,
  PortfolioImage,
  TechStackSection,
} from '@/components/PortfolioDetail';

const title = 'Worldly Pins';

const WorldlyPinsScreen = () => {
  return (
    <PortfolioDetailShell slug="worldly-pins" title={title} command="open worldly-pins">
      <AboutSection
        copy={
          <>
            <p>
              Worldly Pins is a web app designed for travelers who want to
              keep track of the places they have visited. Mark countries and
              cities you have been to and visualize your travels on a map.
              Whether you&apos;re a frequent flyer or a backpacker, it&apos;s
              a clean way to track adventures and share trip stories.
            </p>
            <ExternalLinkChip
              href="https://github.com/zubair1024/worldly-pins"
              label="View on GitHub"
              icon="/social/github.svg"
            />
          </>
        }
        visual={
          <PortfolioImage
            src="/portfolio/worldlypins/worldly-pins.png"
            alt="Worldly Pins map view"
          />
        }
      />

      <ImageRow>
        <PortfolioImage
          src="/portfolio/worldlypins/worldly-pins-controls.jpg"
          alt="Worldly Pins controls"
          width={600}
          height={600}
        />
      </ImageRow>

      <TechStackSection
        tech={[
          'Next.JS',
          'TypeScript',
          'JavaScript',
          'React',
          'Node.JS',
          'Express',
          'Postgres',
          'Prisma',
        ]}
      />
    </PortfolioDetailShell>
  );
};

export default WorldlyPinsScreen;

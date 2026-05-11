import {
  AboutSection,
  PortfolioDetailShell,
  PortfolioImage,
  TechStackSection,
} from '@/components/PortfolioDetail';

const title = 'TIS';

const TISPortfolioScreen = () => {
  return (
    <PortfolioDetailShell slug="tis-landing-page" title={title} command="open tis">
      <AboutSection
        copy={
          <p>
            A Next.JS based landing page created for a client whose expertise
            is in Thermal Insulation Cladding Solutions for buildings. The
            standalone web page serves as the entry point for visitors — a
            quick overview of the construction business and its services,
            designed to drive contact, quote requests, and deeper navigation.
          </p>
        }
        visual={
          <PortfolioImage
            src="/portfolio/tis/tis-website.jpg"
            alt="TIS website screenshot"
          />
        }
      />

      <TechStackSection
        tech={[
          'Next.JS',
          'TypeScript',
          'JavaScript',
          'React',
          'Node.JS',
          'Express',
        ]}
      />
    </PortfolioDetailShell>
  );
};

export default TISPortfolioScreen;

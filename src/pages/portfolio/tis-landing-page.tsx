import {
  AboutSection,
  CaseStudySummary,
  PortfolioDetailShell,
  PortfolioImage,
  TechStackSection,
} from '@/components/PortfolioDetail';

const title = 'TIS';

const TISPortfolioScreen = () => {
  return (
    <PortfolioDetailShell
      slug="tis-landing-page"
      title={title}
      badges={['Landing page', 'Next.js', 'Dubai']}
    >
      <AboutSection
        copy={
          <p>
            A Next.js landing page for a Dubai client specialising in thermal
            insulation cladding solutions for buildings. The page is the entry
            point for visitors: a quick overview of the construction business
            and its services, designed to drive enquiries, quote requests and
            deeper browsing.
          </p>
        }
        visual={
          <PortfolioImage
            src="/portfolio/tis/tis-website.jpg"
            alt="Screenshot of the TIS thermal insulation website homepage"
          />
        }
      />

      <CaseStudySummary
        challenge={
          <p>
            A Dubai thermal insulation cladding company needed an entry point
            for visitors that gives a quick overview of the business and its
            services and drives enquiries and quote requests. The landing page
            is built with Next.js, React and TypeScript.
          </p>
        }
      />

      <TechStackSection
        tech={[
          'Next.js',
          'TypeScript',
          'JavaScript',
          'React',
          'Node.js',
          'Express',
        ]}
      />
    </PortfolioDetailShell>
  );
};

export default TISPortfolioScreen;

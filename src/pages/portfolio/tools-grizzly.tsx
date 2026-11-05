import {
  AboutSection,
  ExternalLinkButton,
  PortfolioDetailShell,
  PortfolioImage,
  TechStackSection,
} from '@/components/PortfolioDetail';

const title = 'Grizzly Tools';

const ToolsGrizzlyScreen = () => {
  return (
    <PortfolioDetailShell
      slug="tools-grizzly"
      title={title}
      badges={['Web app', 'Next.js', 'Developer tools']}
    >
      <AboutSection
        copy={
          <>
            <p>
              A Next.js web app with a collection of online tools that help
              developers get quick jobs done.
            </p>
            <ExternalLinkButton
              href="https://tools.grizzlybit.dev"
              label="Visit tools.grizzlybit.dev"
            />
          </>
        }
        visual={
          <PortfolioImage
            src="/portfolio/tools-grizzly/tools-grizzlybit-dev.png"
            alt="Screenshot of the Grizzly Tools developer utilities web app"
          />
        }
      />

      <TechStackSection
        tech={['Next.js', 'TypeScript', 'JavaScript', 'React', 'Node.js']}
      />
    </PortfolioDetailShell>
  );
};

export default ToolsGrizzlyScreen;

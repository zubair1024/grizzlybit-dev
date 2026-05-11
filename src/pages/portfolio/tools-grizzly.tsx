import {
  AboutSection,
  ExternalLinkChip,
  PortfolioDetailShell,
  PortfolioImage,
  TechStackSection,
} from '@/components/PortfolioDetail';

const title = 'Tools-Grizzlybit.dev';

const ToolsGrizzlyScreen = () => {
  return (
    <PortfolioDetailShell slug="tools-grizzly" title={title} command="open tools-grizzlybit">
      <AboutSection
        copy={
          <>
            <p>
              A Next.JS based application that consists of a collection of
              tools for developers to use to get quick jobs done.
            </p>
            <ExternalLinkChip
              href="https://tools.grizzlybit.dev"
              label="Visit web application"
            />
          </>
        }
        visual={
          <PortfolioImage
            src="/portfolio/tools-grizzly/tools-grizzlybit-dev.png"
            alt="Tools Grizzlybit screenshot"
          />
        }
      />

      <TechStackSection
        tech={['Next.JS', 'TypeScript', 'JavaScript', 'React', 'Node.JS']}
      />
    </PortfolioDetailShell>
  );
};

export default ToolsGrizzlyScreen;

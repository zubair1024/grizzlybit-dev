import {
  AboutSection,
  FeaturesSection,
  ImageRow,
  PortfolioDetailShell,
  PortfolioImage,
  TechStackSection,
} from '@/components/PortfolioDetail';

const title = 'My247';

const My247PortfolioScreen = () => {
  return (
    <PortfolioDetailShell slug="my247-app" title={title} command="open my247">
      <AboutSection
        copy={
          <p>
            24|7 Home Rescue app lets customers get help, make a claim,
            complete their eligibility, book a service, and use their cover
            from the convenience of a smartphone. My247 is free to download
            and keeps cover plan details on the device for peace of mind —
            should something go wrong, customers can view coverage, make a
            claim, book a service, complete eligibility, and call support in a
            few clicks.
          </p>
        }
        visual={
          <PortfolioImage
            src="/portfolio/my247/my247_main.webp"
            alt="My247 main screen"
            width={400}
            height={400}
          />
        }
      />

      <FeaturesSection
        reverse
        features={[
          'View your product details.',
          'Make a claim.',
          'Call in one click.',
          'Book a service.',
          'See latest offers.',
          'Complete eligibility.',
          'Keep all documents in one place.',
        ]}
        visual={
          <ImageRow>
            <PortfolioImage
              src="/portfolio/my247/my247_home.webp"
              alt="My247 home"
              width={220}
              height={220}
            />
            <PortfolioImage
              src="/portfolio/my247/my247_eligibility.webp"
              alt="My247 eligibility"
              width={220}
              height={220}
            />
          </ImageRow>
        }
      />

      <ImageRow>
        <PortfolioImage
          src="/portfolio/my247/my247_docs.webp"
          alt="My247 docs"
          width={260}
          height={260}
        />
        <PortfolioImage
          src="/portfolio/my247/my247_book.webp"
          alt="My247 book"
          width={260}
          height={260}
        />
      </ImageRow>

      <TechStackSection
        tech={['TypeScript', 'JavaScript', 'Ionic', 'Node.JS', 'Express']}
      />
    </PortfolioDetailShell>
  );
};

export default My247PortfolioScreen;

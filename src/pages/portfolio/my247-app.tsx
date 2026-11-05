import {
  AboutSection,
  CaseStudySummary,
  FeaturesSection,
  ImageRow,
  PortfolioDetailShell,
  PortfolioImage,
  TechStackSection,
} from '@/components/PortfolioDetail';

const title = 'My247';

const My247PortfolioScreen = () => {
  return (
    <PortfolioDetailShell
      slug="my247-app"
      title={title}
      badges={['Mobile app', 'Home services', 'UK']}
    >
      <AboutSection
        copy={
          <>
            <p>
              My247 is the free customer app for 24|7 Home Rescue, the 4th
              largest boiler service company in the UK. Customers can get help,
              make a claim, complete their eligibility, book a service and use
              their cover from a smartphone.
            </p>
            <p>
              Cover plan details are stored on the device, so if something goes
              wrong customers can check their coverage, make a claim or call
              support in a few taps.
            </p>
          </>
        }
        visual={
          <PortfolioImage
            src="/portfolio/my247/my247_main.webp"
            alt="My247 home cover app shown on a smartphone"
            width={400}
            height={400}
          />
        }
      />

      <CaseStudySummary
        challenge={
          <>
            <p>
              Customers of 24|7 Home Rescue, the 4th largest boiler service
              company in the UK, needed to get help, make a claim, book a
              service and check their cover from a smartphone.
            </p>
            <p>
              My247 is a free Ionic and TypeScript app on a Node.js and Express
              back end. Cover plan details are stored on the device, so a claim
              or a support call is a few taps away.
            </p>
          </>
        }
      />

      <FeaturesSection
        reverse
        features={[
          'View your cover plan and product details.',
          'Make a claim.',
          'Call support in one tap.',
          'Book a service.',
          'See the latest offers.',
          'Complete your eligibility check.',
          'Keep all your documents in one place.',
        ]}
        visual={
          <ImageRow>
            <PortfolioImage
              src="/portfolio/my247/my247_home.webp"
              alt="My247 app home screen"
              width={220}
              height={220}
            />
            <PortfolioImage
              src="/portfolio/my247/my247_eligibility.webp"
              alt="My247 eligibility check screen"
              width={220}
              height={220}
            />
          </ImageRow>
        }
      />

      <ImageRow>
        <PortfolioImage
          src="/portfolio/my247/my247_docs.webp"
          alt="My247 documents screen"
          width={260}
          height={260}
        />
        <PortfolioImage
          src="/portfolio/my247/my247_book.webp"
          alt="My247 service booking screen"
          width={260}
          height={260}
        />
      </ImageRow>

      <TechStackSection
        tech={['TypeScript', 'JavaScript', 'Ionic', 'Node.js', 'Express']}
      />
    </PortfolioDetailShell>
  );
};

export default My247PortfolioScreen;

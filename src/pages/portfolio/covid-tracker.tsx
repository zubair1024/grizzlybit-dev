import {
  AboutSection,
  FeaturesSection,
  ImageRow,
  PortfolioDetailShell,
  PortfolioImage,
  TechStackSection,
} from '@/components/PortfolioDetail';

const title = 'COVID Tracking Mobile Application';

const CovidTrackingPortfolioScreen = () => {
  return (
    <PortfolioDetailShell slug="covid-tracker" title={title} command="open covid-tracker">
      <AboutSection
        copy={
          <p>
            The patient covid health tracking mobile application is a valuable
            tool for managing and monitoring the health and well-being of
            patients during the COVID-19 pandemic. With its easy-to-use
            interface, patients can quickly and easily track their symptoms,
            medications, and test results, as well as access important
            information about the virus and how to stay safe. It integrated
            with an oxygen meter BLE sensor through bluetooth connectivity to
            read the oxygen meter reading of the patient.
          </p>
        }
        visual={
          <PortfolioImage
            src="/portfolio/razrlibre/razrlibre_main.svg"
            alt="COVID tracker main screen"
            width={400}
            height={400}
          />
        }
      />

      <FeaturesSection
        reverse
        features={[
          'Symptom tracking — log symptoms daily (fever, cough, shortness of breath) and view history over time.',
          'Medication tracking — log medications, dosage, and frequency with a usage history.',
          'Reminders — set up reminders for medication, tests, and health-related appointments.',
          'BLE oximeter integration — pull SpO₂ readings via bluetooth.',
        ]}
        visual={
          <ImageRow>
            <PortfolioImage
              src="/portfolio/razrlibre/razrlibre_record1.svg"
              alt="record screen 1"
              width={220}
              height={220}
            />
            <PortfolioImage
              src="/portfolio/razrlibre/razrlibre_record2.svg"
              alt="record screen 2"
              width={220}
              height={220}
            />
          </ImageRow>
        }
      />

      <div className="flex justify-center">
        <PortfolioImage
          src="/portfolio/razrlibre/razrlibre_sos.svg"
          alt="SOS screen"
          width={300}
          height={300}
        />
      </div>

      <TechStackSection
        tech={['TypeScript', 'JavaScript', 'Ionic', 'Node.JS', 'Express']}
      />
    </PortfolioDetailShell>
  );
};

export default CovidTrackingPortfolioScreen;

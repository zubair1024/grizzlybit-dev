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
    <PortfolioDetailShell
      slug="covid-tracker"
      title={title}
      badges={['Mobile app', 'Healthcare', 'Bluetooth LE']}
    >
      <AboutSection
        copy={
          <>
            <p>
              A remote patient monitoring app built to manage the health of
              COVID-19 patients during the pandemic. Patients track their
              symptoms, medications and test results, and get guidance on how to
              stay safe.
            </p>
            <p>
              The app connects to a pulse oximeter over Bluetooth Low Energy
              (BLE) to read each patient&apos;s blood oxygen level.
            </p>
          </>
        }
        visual={
          <PortfolioImage
            src="/portfolio/razrlibre/razrlibre_main.svg"
            alt="COVID-19 patient tracking app home screen"
            width={400}
            height={400}
          />
        }
      />

      <FeaturesSection
        reverse
        features={[
          'Symptom tracking: log daily symptoms such as fever, cough and shortness of breath, and review the history.',
          'Medication tracking: record medications, dosage and frequency.',
          'Reminders for medication, tests and health appointments.',
          'BLE pulse oximeter integration for SpO₂ readings over Bluetooth.',
        ]}
        visual={
          <ImageRow>
            <PortfolioImage
              src="/portfolio/razrlibre/razrlibre_record1.svg"
              alt="Symptom recording screen in the COVID tracking app"
              width={220}
              height={220}
            />
            <PortfolioImage
              src="/portfolio/razrlibre/razrlibre_record2.svg"
              alt="Health record history screen in the COVID tracking app"
              width={220}
              height={220}
            />
          </ImageRow>
        }
      />

      <div className="flex justify-center">
        <PortfolioImage
          src="/portfolio/razrlibre/razrlibre_sos.svg"
          alt="Emergency SOS screen in the COVID tracking app"
          width={300}
          height={300}
        />
      </div>

      <TechStackSection
        tech={['TypeScript', 'JavaScript', 'Ionic', 'Node.js', 'Express']}
      />
    </PortfolioDetailShell>
  );
};

export default CovidTrackingPortfolioScreen;

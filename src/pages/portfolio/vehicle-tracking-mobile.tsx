import {
  AboutSection,
  FeaturesSection,
  ImageRow,
  PortfolioDetailShell,
  PortfolioImage,
  TechStackSection,
} from '@/components/PortfolioDetail';

const title = 'Vehicle Tracking Mobile Application';

const VehicleApplicationMobilePortfolioScreen = () => {
  return (
    <PortfolioDetailShell slug="vehicle-tracking-mobile" title={title} command="open razrtrack-mobile">
      <AboutSection
        copy={
          <p>
            The mobile application is a powerful tool for tracking and
            monitoring vehicles in real-time. With its easy-to-use interface,
            users can quickly view the current location and movement of their
            vehicles, plus detailed information about the work orders being
            completed by drivers in real-time, with push notification
            capability.
          </p>
        }
        visual={
          <ImageRow>
            <PortfolioImage
              src="/portfolio/razrtrack_mobile/razrtrack_mobile_login.svg"
              alt="login screen"
              width={260}
              height={260}
            />
            <PortfolioImage
              src="/portfolio/razrtrack_mobile/razrtrack_mobile_list.svg"
              alt="list screen"
              width={260}
              height={260}
            />
          </ImageRow>
        }
      />

      <FeaturesSection
        reverse
        features={[
          'Tracking and monitoring of vehicle location and usage.',
          'Scheduling and dispatching of vehicles and drivers.',
          'Maintenance and repair tracking.',
          'Fuel consumption and cost tracking.',
          'Driver performance monitoring and evaluation.',
          'Multiple-stop work order monitoring with time-window and distance constraints.',
          'Estimated vs actual monitoring for stop-over arrival and departure.',
        ]}
        visual={
          <ImageRow>
            <PortfolioImage
              src="/portfolio/razrtrack_mobile/razrtrack_mobile_wo.svg"
              alt="work orders"
              width={220}
              height={220}
            />
            <PortfolioImage
              src="/portfolio/razrtrack_mobile/razrtrack_mobile_wo_single.svg"
              alt="work order detail"
              width={220}
              height={220}
            />
          </ImageRow>
        }
      />

      <div className="flex justify-center">
        <PortfolioImage
          src="/portfolio/razrtrack_mobile/razrtrack_mobile_wo_single_status.svg"
          alt="work order status"
          width={300}
          height={300}
        />
      </div>

      <TechStackSection
        tech={[
          'TypeScript',
          'JavaScript',
          'Ionic',
          'Node.JS',
          'Express',
          'OneSignal',
        ]}
      />
    </PortfolioDetailShell>
  );
};

export default VehicleApplicationMobilePortfolioScreen;

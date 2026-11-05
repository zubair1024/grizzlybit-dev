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
    <PortfolioDetailShell
      slug="vehicle-tracking-mobile"
      title={title}
      badges={['Mobile app', 'Fleet management', 'Push notifications']}
    >
      <AboutSection
        copy={
          <p>
            A fleet management mobile app for tracking and monitoring vehicles
            in real time. Users see the current location and movement of their
            vehicles, follow the work orders drivers are completing as they
            happen, and get push notifications along the way.
          </p>
        }
        visual={
          <ImageRow>
            <PortfolioImage
              src="/portfolio/razrtrack_mobile/razrtrack_mobile_login.svg"
              alt="Vehicle tracking mobile app login screen"
              width={260}
              height={260}
            />
            <PortfolioImage
              src="/portfolio/razrtrack_mobile/razrtrack_mobile_list.svg"
              alt="List of tracked vehicles in the mobile app"
              width={260}
              height={260}
            />
          </ImageRow>
        }
      />

      <FeaturesSection
        reverse
        features={[
          'Real-time tracking of vehicle location and usage.',
          'Scheduling and dispatching of vehicles and drivers.',
          'Maintenance and repair tracking.',
          'Fuel consumption and cost tracking.',
          'Driver performance monitoring and evaluation.',
          'Multi-stop work order monitoring with time-window and distance constraints.',
          'Estimated vs actual arrival and departure times at each stop.',
        ]}
        visual={
          <ImageRow>
            <PortfolioImage
              src="/portfolio/razrtrack_mobile/razrtrack_mobile_wo.svg"
              alt="Driver work orders list screen"
              width={220}
              height={220}
            />
            <PortfolioImage
              src="/portfolio/razrtrack_mobile/razrtrack_mobile_wo_single.svg"
              alt="Work order detail screen with stops"
              width={220}
              height={220}
            />
          </ImageRow>
        }
      />

      <div className="flex justify-center">
        <PortfolioImage
          src="/portfolio/razrtrack_mobile/razrtrack_mobile_wo_single_status.svg"
          alt="Work order status screen showing estimated vs actual stop times"
          width={300}
          height={300}
        />
      </div>

      <TechStackSection
        tech={[
          'TypeScript',
          'JavaScript',
          'Ionic',
          'Node.js',
          'Express',
          'OneSignal',
        ]}
      />
    </PortfolioDetailShell>
  );
};

export default VehicleApplicationMobilePortfolioScreen;

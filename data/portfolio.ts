export interface IPortfolioItem {
  img: string;
  url: string;
  desc: string;
  title: string;
}

const portfolio: IPortfolioItem[] = [
  {
    img: '/portfolio/razrtrack.jpg',
    url: '/portfolio/vehicle-tracking',
    desc: 'Real-time GPS fleet management dashboard for tracking vehicles and scheduling jobs',
    title: 'Vehicle tracking application',
  },
  {
    img: '/portfolio/razrtrack-mobile.jpg',
    url: '/portfolio/vehicle-tracking-mobile',
    desc: 'Mobile app for live vehicle telemetry, driver work orders and push alerts',
    title: 'Vehicle tracking mobile application',
  },
  {
    img: '/portfolio/razrlibre.jpg',
    url: '/portfolio/covid-tracker',
    desc: 'Remote COVID-19 patient health monitoring app with BLE oximeter readings',
    title: 'COVID tracking mobile application',
  },
  {
    img: '/portfolio/my247.jpg',
    url: '/portfolio/my247-app',
    desc: 'Customer app for the 4th largest boiler service company in the UK',
    title: 'My247',
  },
  {
    img: '/portfolio/mycarlo-banner-main.jpg',
    url: '/portfolio/mycarlo-app',
    desc: 'Consumer car tracking app for vehicle health and family safety',
    title: 'MyCarlo',
  },
  {
    img: '/portfolio/razrboiler.jpg',
    url: '/portfolio/boiler-mobile',
    desc: 'IoT mobile app to control your thermostat and boiler from anywhere',
    title: 'Smart boiler mobile app',
  },
  {
    img: '/portfolio/he.jpg',
    url: '/portfolio/he-app',
    desc: 'IoT dashboard to monitor heavy equipment and gensets in construction',
    title: 'Heavy equipment monitoring',
  },
  {
    img: '/portfolio/worldlypins.jpg',
    url: '/portfolio/worldly-pins',
    desc: "Travel map web app to pin the countries and cities you've visited",
    title: 'Worldly Pins',
  },
  {
    img: '/portfolio/gizzly-tools.jpg',
    url: '/portfolio/tools-grizzly',
    desc: 'Next.js collection of online utilities for developers',
    title: 'Grizzly Tools',
  },
  {
    img: '/portfolio/tis.jpg',
    url: '/portfolio/tis-landing-page',
    desc: 'Next.js landing page for a thermal insulation company in Dubai',
    title: 'TIS',
  },
];

export default portfolio;

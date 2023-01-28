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
    desc: 'A web application dashboard to monitor vehicles remotely and schedule jobs',
    title: 'Vehicle Tracking Application',
  },
  {
    img: '/portfolio/razrtrack-mobile.jpg',
    url: '/portfolio/vehicle-tracking-mobile',
    desc: 'A mobile application for remotely tracking telemetry data for vehicle and drivers',
    title: 'Vehicle Tracking Mobile Application',
  },
  {
    img: '/portfolio/razrlibre.jpg',
    url: '/portfolio/covid-tracker',
    desc: 'A remote health monitoring application for covid patients',
    title: 'COVID Tracking Mobile Application',
  },
  {
    img: '/portfolio/my247.jpg',
    url: '/portfolio/my247-app',
    desc: 'An App for the 4th Larger Boiler Service Company in the UK',
    title: 'My247',
  },
  {
    img: '/portfolio/razrboiler.jpg',
    url: '/portfolio/boiler-mobile',
    desc: 'A mobile application to remotely control your thermostat and boiler from anywhere',
    title: 'Smart Boiler Mobile',
  },
  {
    img: '/portfolio/he.jpg',
    url: '/portfolio/he-app',
    desc: 'A web application dashboard to monitor heavy equipment for construction industry',
    title: 'Heavy Equipment Monitoring',
  },
  {
    img: '/portfolio/tis.jpg',
    url: '/portfolio/tis-landing-page',
    desc: 'A website for the Thermal Insulation solution company in Dubai',
    title: 'TIS',
  },
];

export default portfolio;

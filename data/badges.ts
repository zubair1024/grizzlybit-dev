export interface IBadgeItem {
  url: string;
  imageUrl: string;
  title: string;
  kind: 'certification' | 'award';
}

const badges: IBadgeItem[] = [
  {
    url: 'https://www.credly.com/earner/earned/badge/887af430-e012-4d0e-9dec-9eaa6ac077cf',
    imageUrl: '/badges/nodejs-application-development.png',
    title: 'Node.js Application Development',
    kind: 'certification',
  },
  {
    url: 'https://www.credly.com/badges/f019a853-fd3f-4f95-b9b8-2a7b350ae891',
    imageUrl: '/badges/jslandia-icon.svg',
    title: 'OpenJS Foundation: JavaScriptLandia',
    kind: 'certification',
  },
  {
    url: 'https://mbrif.ae/razrlab-success-story/',
    imageUrl: '/badges/mbrif-icon.png',
    title: 'MBRIF Accelerator Cohort Member',
    kind: 'award',
  },
  {
    url: 'https://www.transportandlogisticsme.com/smart-logistics/razr-lab-haifa-logistics-win-best-logistics-start-up-award',
    imageUrl: '/badges/razrlab-best-logistics-start-up-award.png',
    title: 'Heroes of the Pandemic Award 2021',
    kind: 'award',
  },
  {
    url: 'https://github.com/zubair1024/google-mobile-sites-certification/blob/master/Google%20Partners%20-%20Mobile%20Sites%20Certification.pdf',
    imageUrl: '/badges/google.png',
    title: 'Mobile Sites Certification',
    kind: 'certification',
  },
  {
    url: 'https://www.freecodecamp.org/certification/zubair1024/apis-and-microservices',
    imageUrl: '/badges/free-code-camp.png',
    title: 'APIs and Microservices Certification',
    kind: 'certification',
  },
  {
    url: 'https://www.freecodecamp.org/certification/zubair1024/javascript-algorithms-and-data-structures',
    imageUrl: '/badges/free-code-camp.png',
    title: 'JavaScript Algorithms and Data Structures Certification',
    kind: 'certification',
  },
  {
    url: 'https://www.freecodecamp.org/certification/zubair1024/responsive-web-design',
    imageUrl: '/badges/free-code-camp.png',
    title: 'Responsive Web Design Certification',
    kind: 'certification',
  },
  {
    url: 'https://github.com/zubair1024/dp_certificate_of_appreciation/blob/main/dubai_police_ai_certificate.pdf',
    imageUrl: '/badges/dp.png',
    title: 'Appreciated by Dubai Police',
    kind: 'award',
  },
];

export default badges;

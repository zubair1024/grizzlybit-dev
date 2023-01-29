export interface ISocialLink {
  img: string;
  name: string;
  url: string;
}

const socialLinks: ISocialLink[] = [
  {
    img: '/social/linkedin.svg',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/zubair1024/',
  },
  {
    img: '/social/twitter.svg',
    name: 'Twitter',
    url: 'https://twitter.com/zubair1024',
  },
  {
    img: '/social/github.svg',
    name: 'Github',
    url: 'https://github.com/zubair1024',
  },
  {
    img: '/social/medium.svg',
    name: 'Medium',
    url: 'https://medium.com/@zubair1024',
  },
  {
    img: '/social/stack-overflow.svg',
    name: 'Stack-Overflow',
    url: 'https://stackoverflow.com/users/3779309/zubair1024',
  },
];

export default socialLinks;

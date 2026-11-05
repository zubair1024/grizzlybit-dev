import { Code, type LucideIcon, PenTool, Server, Users } from 'lucide-react';

export interface IServiceItem {
  title: string;
  description: string;
  points: string[];
  tools: string[];
  icon: LucideIcon;
}

const services: IServiceItem[] = [
  {
    title: 'Front-end development',
    description:
      'Fast, accessible web interfaces, from marketing sites to complex applications.',
    points: [
      'SEO-optimised landing pages and web apps',
      'Custom React and Next.js interfaces, built from scratch',
      'End-to-end type safety with TypeScript',
    ],
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    icon: Code,
  },
  {
    title: 'Back-end & APIs',
    description:
      'Reliable back-end systems that power products used every day.',
    points: [
      'Node.js services and well-documented APIs',
      'Data models designed to scale with the product',
      'Maintainable architecture that stays easy to change',
    ],
    tools: ['Node.js', 'Express', 'Mongoose', 'Prisma'],
    icon: Server,
  },
  {
    title: 'Product & UI design',
    description: 'Clear, intuitive interfaces grounded in proven UX patterns.',
    points: [
      "User flows guided by Jakob's Law and familiar conventions",
      'Figma designs backed by tokens and design systems',
      'Clean hand-off from design to production code',
    ],
    tools: ['Figma', 'Tokens', 'Systems'],
    icon: PenTool,
  },
  {
    title: 'Mentoring & technical leadership',
    description: 'Helping engineers and teams do their best work.',
    points: [
      'Mentoring for cross-functional engineering teams',
      'Code reviews that raise the quality bar',
      'Architecture guidance and technical direction',
    ],
    tools: ['Coaching', 'Code review', 'Architecture'],
    icon: Users,
  },
];

export default services;

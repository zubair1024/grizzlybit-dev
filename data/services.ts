import { Code, type LucideIcon, PenTool, Server, Users } from 'lucide-react';

export interface IServiceItem {
  title: string;
  description: string;
  tools: string[];
  icon: LucideIcon;
}

const services: IServiceItem[] = [
  {
    title: 'Front-end development',
    description:
      'I bring ideas to life in the browser, from SEO-optimised landing pages to complex web applications. Interfaces are built from scratch in React and Next.js, typed end to end with TypeScript.',
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    icon: Code,
  },
  {
    title: 'Back-end & APIs',
    description:
      'I turn complex ideas into efficient, reliable back-end systems that power products people rely on every day. Node.js services, APIs and data models designed to stay maintainable as they grow.',
    tools: ['Node.js', 'Express', 'Mongoose', 'Prisma'],
    icon: Server,
  },
  {
    title: 'Product & UI design',
    description:
      "I design clear, user-friendly interfaces guided by Jakob's Law and familiar UX patterns. Work moves from Figma to design tokens and systems that hand off cleanly to code.",
    tools: ['Figma', 'Tokens', 'Systems'],
    icon: PenTool,
  },
  {
    title: 'Mentoring & technical leadership',
    description:
      'I enjoy sharing what I know and helping engineers reach their full potential. In leadership roles I have mentored multiple cross-functional teams through coaching, code review and architecture.',
    tools: ['Coaching', 'Code Review', 'Architecture'],
    icon: Users,
  },
];

export default services;

import toolBelt from 'data/toolbelt';
import Image from 'next/image';
import { Reveal, Section } from './Section';

const Toolbelt = () => (
  <Section
    id="tech-stack"
    eyebrow="Tech stack"
    title="Tech stack: Node.js, React, TypeScript and more"
    intro="The languages, frameworks and tools I reach for every day to build and ship products."
    muted
  >
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {toolBelt.map((tool, i) => (
        <li key={tool.name}>
          <Reveal delay={Math.min(i * 0.025, 0.3)} className="h-full">
            <div className="flex h-full flex-col items-center gap-3 border-2 border-border bg-card p-4 text-card-foreground shadow-sm transition-transform duration-200 hover:-translate-y-1">
              <Image
                src={tool.img}
                width={48}
                height={48}
                alt=""
                className="size-12"
              />
              <span className="text-center text-sm font-bold">{tool.name}</span>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  </Section>
);

export default Toolbelt;

import toolBelt from 'data/toolbelt';
import Image from 'next/image';
import { Reveal, Section } from './Section';

const Toolbelt = () => (
  <Section
    id="tech-stack"
    title="Tech stack: Node.js, React, TypeScript and more"
    intro="The languages, frameworks and tools I reach for every day to build and ship products."
    muted
    compact
  >
    <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:gap-4 lg:grid-cols-6">
      {toolBelt.map((tool, i) => (
        <li key={tool.name}>
          <Reveal delay={Math.min(i * 0.025, 0.3)} className="h-full">
            <div className="flex h-full flex-col items-center gap-2 border-2 border-border bg-card p-3 text-card-foreground md:gap-3 md:p-4 shadow-sm transition-transform duration-200 hover:-translate-y-1">
              <Image
                src={tool.img}
                width={48}
                height={48}
                alt=""
                className="size-9 md:size-12"
              />
              <span className="text-center text-xs font-bold md:text-sm">
                {tool.name}
              </span>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  </Section>
);

export default Toolbelt;

import badges from 'data/badges';
import Image from 'next/image';
import { Reveal } from './Section';

const BadgesSection = () => (
  <div className="mt-16">
    <h3 className="mb-6 text-2xl font-bold tracking-tight">
      Certifications and awards
    </h3>
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {badges.map((item, i) => (
        <li key={item.title}>
          <Reveal delay={Math.min(i * 0.03, 0.3)} className="h-full">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full min-h-11 items-center gap-4 border-2 border-border bg-card p-3 text-card-foreground shadow-sm transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none"
            >
              <span className="flex size-14 shrink-0 items-center justify-center border-2 border-border bg-white p-1">
                <Image
                  src={item.imageUrl}
                  width={48}
                  height={48}
                  alt={`${item.title} ${item.kind === 'award' ? 'award' : 'badge'}`}
                  className="size-12 object-contain"
                />
              </span>
              <span className="text-base leading-snug font-bold">
                {item.title}
              </span>
            </a>
          </Reveal>
        </li>
      ))}
    </ul>
  </div>
);

export default BadgesSection;

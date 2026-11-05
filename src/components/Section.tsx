import { cn } from '@/lib/utils';
import { CSSProperties, ReactNode } from 'react';

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
  muted?: boolean;
};

// Shared homepage section shell: one H2 per section, labelled by its heading.
export const Section = ({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  muted,
}: SectionProps) => (
  <section
    id={id}
    aria-labelledby={`${id}-title`}
    className={cn(
      'scroll-mt-20 border-b-2 border-border py-20 md:py-28',
      muted ? 'bg-muted' : 'bg-background',
      className,
    )}
  >
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <Reveal className="mb-12 max-w-3xl">
        {eyebrow && (
          <p className="mb-3 inline-block border-2 border-border bg-secondary px-2 py-0.5 font-mono text-xs font-bold text-secondary-foreground">
            {eyebrow}
          </p>
        )}
        <h2
          id={`${id}-title`}
          className="text-3xl font-bold tracking-tight text-balance md:text-5xl"
        >
          {title}
        </h2>
        {intro && (
          <p className="mt-4 text-lg text-pretty text-muted-foreground">
            {intro}
          </p>
        )}
      </Reveal>
      {children}
    </div>
  </section>
);

// Fade-up as it scrolls into view. Native CSS scroll-driven animation
// (see .reveal in globals.css): no JS, content is fully visible in the
// server HTML and wherever animation-timeline is unsupported.
// `delay` (0–0.3) shifts the start within the entry range for stagger.
export const Reveal = ({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => (
  <div
    className={cn('reveal', className)}
    style={{ '--reveal-delay': delay } as CSSProperties}
  >
    {children}
  </div>
);

import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'motion/react';
import { ReactNode } from 'react';

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

// Fade-up on first view; skipped entirely for reduced motion.
export const Reveal = ({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

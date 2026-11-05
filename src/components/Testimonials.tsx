import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import testimonials, { ITestimonialItem } from 'data/testimonials';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FaLinkedinIn } from 'react-icons/fa';
import { Reveal, Section } from './Section';

const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Wraps the given phrases in a low highlighter stroke; the text itself is untouched.
const highlight = (text: string, phrases: string[] = []) => {
  if (!phrases.length) return text;
  const pattern = new RegExp(`(${phrases.map(escapeRegExp).join('|')})`);
  return text.split(pattern).map((part, i) =>
    i % 2 ? (
      <mark
        key={i}
        className="bg-transparent bg-linear-to-b from-transparent from-82% to-secondary/80 to-82% text-inherit dark:to-secondary/35"
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
};

// Clamping is CSS only: the full quote is always in the HTML. The toggle
// appears only when the quote actually overflows its clamp.
const TestimonialCard = ({
  item,
  id,
}: {
  item: ITestimonialItem;
  id: string;
}) => {
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const el = quoteRef.current;
    if (!el || expanded) return;
    const measure = () => setOverflows(el.scrollHeight > el.clientHeight + 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [expanded]);

  return (
    <Card className="gap-0 p-6">
      <figure className="flex flex-col gap-6">
        <div>
          <blockquote
            ref={quoteRef}
            id={id}
            className={cn(
              'space-y-3 text-base leading-relaxed text-pretty',
              !expanded && 'line-clamp-[8] md:line-clamp-none',
            )}
          >
            {item.message.split(/\n+/).map((paragraph) => (
              <p key={paragraph}>{highlight(paragraph, item.highlights)}</p>
            ))}
          </blockquote>
          {(overflows || expanded) && (
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={id}
              onClick={() => setExpanded((v) => !v)}
              className="mt-2 inline-flex min-h-11 items-center font-bold underline decoration-primary decoration-2 underline-offset-4 hover:decoration-foreground focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
            >
              {expanded ? 'Show less' : 'Read more'}
              <span className="sr-only"> from {item.name}</span>
            </button>
          )}
        </div>
        <figcaption className="flex items-center gap-3 border-t-2 border-border pt-4">
          <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-muted font-bold">
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={`Photo of ${item.name}`}
                width={48}
                height={48}
                className="size-full object-cover"
              />
            ) : (
              <span aria-hidden="true">{initials(item.name)}</span>
            )}
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-bold">{item.name}</p>
            <p className="text-sm text-muted-foreground">
              {item.designation} at {item.company}
            </p>
            <p className="text-sm text-muted-foreground">{item.place}</p>
          </div>
          <Button asChild variant="outline" size="icon-lg">
            <a
              href={item.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.name} on LinkedIn (opens in a new tab)`}
            >
              <FaLinkedinIn aria-hidden />
            </a>
          </Button>
        </figcaption>
      </figure>
    </Card>
  );
};

// Mobile: horizontal scroll-snap row (keeps the page short). md+: masonry
// columns. Long quotes are clamped on mobile only; desktop shows them in full.
const Testimonials = () => (
  <Section
    id="my-testimonials"
    title="What clients and colleagues say"
    intro="Recommendations from engineers, managers and partners I've worked with, from Dubai and Bangalore to Prague, Melbourne and Toronto."
    muted
  >
    <p
      aria-hidden="true"
      className="-mt-6 mb-4 font-mono text-sm text-muted-foreground md:hidden"
    >
      Swipe for more →
    </p>
    <ul
      tabIndex={0}
      aria-label="Testimonials"
      className="-mx-4 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 outline-none focus-visible:ring-3 focus-visible:ring-ring md:mx-0 md:block md:snap-none md:columns-2 md:gap-6 md:overflow-visible md:p-0 lg:columns-3"
    >
      {testimonials.map((item, i) => (
        <li
          key={item.name}
          className="w-[80vw] shrink-0 snap-start md:mb-6 md:w-auto md:break-inside-avoid"
        >
          <Reveal delay={(i % 3) * 0.08}>
            <TestimonialCard item={item} id={`testimonial-${i}-quote`} />
          </Reveal>
        </li>
      ))}
    </ul>
  </Section>
);

export default Testimonials;

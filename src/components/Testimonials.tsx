import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import testimonials from 'data/testimonials';
import Image from 'next/image';
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

// Mobile: horizontal scroll-snap row (keeps the page short, full text stays
// in the HTML). md+: masonry columns.
const Testimonials = () => (
  <Section
    id="my-testimonials"
    eyebrow="Testimonials"
    title="What clients and colleagues say"
    intro="Recommendations from engineers, managers and partners I've worked with, from Dubai and Bangalore to Prague, Melbourne and Toronto."
    muted
  >
    <ul
      tabIndex={0}
      aria-label="Testimonials, scroll horizontally for more"
      className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 outline-none focus-visible:ring-3 focus-visible:ring-ring md:mx-0 md:block md:snap-none md:columns-2 md:gap-6 md:overflow-visible md:p-0 lg:columns-3"
    >
      {testimonials.map((item, i) => (
        <li
          key={item.name}
          className="w-[85vw] shrink-0 snap-start md:mb-6 md:w-auto md:break-inside-avoid"
        >
          <Reveal delay={(i % 3) * 0.08} className="h-full">
            <Card className="h-full gap-0 p-6">
              <figure className="flex h-full flex-col gap-6">
                <blockquote className="text-base leading-relaxed whitespace-pre-line text-pretty">
                  {item.message}
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 border-t-2 border-border pt-4">
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
                    <p className="text-sm text-muted-foreground">
                      {item.place}
                    </p>
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
          </Reveal>
        </li>
      ))}
    </ul>
  </Section>
);

export default Testimonials;

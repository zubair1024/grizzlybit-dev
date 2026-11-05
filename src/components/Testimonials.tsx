import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import testimonials from 'data/testimonials';
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

const Testimonials = () => (
  <Section
    id="my-testimonials"
    eyebrow="Testimonials"
    title="What clients and colleagues say"
    intro="Recommendations from engineers, managers and partners I've worked with, from Dubai and Bangalore to Prague, Melbourne and Toronto."
    muted
  >
    <ul className="gap-6 md:columns-2 lg:columns-3">
      {testimonials.map((item, i) => (
        <li key={item.name} className="mb-6 break-inside-avoid">
          <Reveal delay={(i % 3) * 0.08}>
            <Card className="gap-0 p-6">
              <figure className="flex flex-col gap-6">
                <blockquote className="text-base leading-relaxed whitespace-pre-line text-pretty">
                  {item.message}
                </blockquote>
                <figcaption className="flex items-center gap-3 border-t-2 border-border pt-4">
                  <Avatar className="size-12 border-2 border-border">
                    <AvatarImage
                      src={item.imageUrl}
                      alt={`Photo of ${item.name}`}
                    />
                    <AvatarFallback className="font-bold">
                      {initials(item.name)}
                    </AvatarFallback>
                  </Avatar>
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
                      aria-label={`${item.name} on LinkedIn`}
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

import { Card } from '@/components/ui/card';
import { trackEvent } from '@/util/ga';
import portfolio from 'data/portfolio';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal, Section } from './Section';

const Portfolio = () => (
  <Section
    id="my-portfolio"
    eyebrow="Portfolio"
    title="Portfolio: web, mobile and IoT case studies"
    intro="Selected products I've designed and engineered, from fleet tracking dashboards to consumer mobile apps."
    muted
  >
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {portfolio.map((item, i) => (
        <li key={item.url}>
          <Reveal delay={Math.min(i * 0.03, 0.3)} className="h-full">
            <article className="h-full">
              <Card className="relative h-full gap-0 py-0 transition-all has-[a:hover]:translate-x-1 has-[a:hover]:translate-y-1 has-[a:hover]:shadow-none has-[a:focus-visible]:ring-3 has-[a:focus-visible]:ring-ring/60">
                <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-border bg-muted">
                  <Image
                    src={item.img}
                    alt={`Screenshot of ${item.title}`}
                    fill
                    sizes="(min-width: 1024px) 352px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="text-xl leading-snug font-bold">
                    <Link
                      href={item.url}
                      className="after:absolute after:inset-0 focus-visible:outline-none"
                      onClick={() =>
                        trackEvent('portfolio_view', {
                          project: item.title,
                          url: item.url,
                          position: i + 1,
                          location: 'portfolio_grid',
                        })
                      }
                    >
                      {item.title}
                    </Link>
                  </h3>
                  <p className="text-base text-pretty text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </Card>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  </Section>
);

export default Portfolio;

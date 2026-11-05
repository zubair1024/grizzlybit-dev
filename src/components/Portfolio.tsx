import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/util/ga';
import portfolio from 'data/portfolio';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal, Section } from './Section';

// 10 items: two featured (wide on lg) + 8 fill a 4-column grid evenly;
// 2 columns from sm to lg; below sm, one compact horizontal card per row.
const FEATURED = 2;

const Portfolio = () => (
  <Section
    id="my-portfolio"
    title="Portfolio: web, mobile and IoT case studies"
    intro="Selected products I've designed and engineered, from fleet tracking dashboards to consumer mobile apps."
    muted
  >
    <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
      {portfolio.map((item, i) => {
        const featured = i < FEATURED;
        return (
          <li key={item.url} className={cn(featured && 'lg:col-span-2')}>
            <Reveal delay={Math.min(i * 0.03, 0.3)} className="h-full">
              <article className="h-full">
                <Card className="relative h-full flex-row gap-0 py-0 transition-all focus-within:ring-3 focus-within:ring-ring hover:shadow-none motion-safe:hover:translate-x-1 motion-safe:hover:translate-y-1 sm:flex-col">
                  <div
                    className={cn(
                      'relative min-h-28 w-28 shrink-0 overflow-hidden border-r-2 border-border bg-muted sm:aspect-[4/3] sm:min-h-0 sm:w-auto sm:border-r-0 sm:border-b-2',
                      featured && 'lg:aspect-[16/8]',
                    )}
                  >
                    <Image
                      src={item.img}
                      alt={`Screenshot of ${item.title}`}
                      fill
                      sizes={
                        featured
                          ? '(min-width: 1024px) 560px, (min-width: 640px) 50vw, 112px'
                          : '(min-width: 1024px) 270px, (min-width: 640px) 50vw, 112px'
                      }
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-4 sm:gap-2 sm:p-5">
                    <h3 className="text-base leading-snug font-bold text-balance sm:text-xl">
                      <Link
                        href={item.url}
                        className="outline-none after:absolute after:inset-0"
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
                    <p className="line-clamp-2 text-base text-pretty text-muted-foreground sm:line-clamp-none">
                      {item.desc}
                    </p>
                    <p
                      aria-hidden="true"
                      className="mt-auto hidden items-center justify-between pt-2 font-mono text-xs text-muted-foreground sm:flex"
                    >
                      Case study
                      <ArrowRight className="size-4" />
                    </p>
                  </div>
                </Card>
              </article>
            </Reveal>
          </li>
        );
      })}
    </ul>
  </Section>
);

export default Portfolio;

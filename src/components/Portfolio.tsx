import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/util/ga';
import portfolio from 'data/portfolio';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal, Section } from './Section';

// 10 items: two featured (wide on lg) + 8 fill a 4-column grid evenly;
// 2 columns everywhere below lg, so every row is full.
const FEATURED = 2;

const Portfolio = () => (
  <Section
    id="my-portfolio"
    eyebrow="Portfolio"
    title="Portfolio: web, mobile and IoT case studies"
    intro="Selected products I've designed and engineered, from fleet tracking dashboards to consumer mobile apps."
    muted
  >
    <ul className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
      {portfolio.map((item, i) => {
        const featured = i < FEATURED;
        return (
          <li key={item.url} className={cn(featured && 'lg:col-span-2')}>
            <Reveal delay={Math.min(i * 0.03, 0.3)} className="h-full">
              <article className="h-full">
                <Card className="relative h-full gap-0 py-0 transition-[translate,box-shadow] focus-within:ring-3 focus-within:ring-ring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-lg">
                  <div
                    className={cn(
                      'relative aspect-[4/3] overflow-hidden border-b-2 border-border bg-muted',
                      featured && 'lg:aspect-[16/8]',
                    )}
                  >
                    <Image
                      src={item.img}
                      alt={`Screenshot of ${item.title}`}
                      fill
                      sizes={
                        featured
                          ? '(min-width: 1024px) 560px, 50vw'
                          : '(min-width: 1024px) 270px, 50vw'
                      }
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5 p-3 sm:gap-2 sm:p-5">
                    <h3 className="text-base leading-snug font-bold text-balance sm:text-xl">
                      <Link
                        href={item.url}
                        className="outline-none after:absolute after:inset-0 hover:underline hover:decoration-primary hover:decoration-2 hover:underline-offset-4"
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
                      className="mt-auto flex items-center justify-between pt-2 font-mono text-xs text-muted-foreground"
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

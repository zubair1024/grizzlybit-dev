import BreadcrumbListSchema from '@/components/schemas/BreadcrumbListSchema';
import CreativeWorkSchema from '@/components/schemas/CreativeWorkSchema';
import CustomHead from '@/components/CustomHead';
import Layout from '@/components/Layout';
import { Reveal } from '@/components/Section';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  getPortfolioCanonicalUrl,
  getPortfolioMetadata,
} from '@/data/portfolioMetadata';
import { cn } from '@/lib/utils';
import portfolio, { IPortfolioItem } from 'data/portfolio';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, createContext, useContext } from 'react';

// Short project name, used to make every section heading project-specific.
const ProjectName = createContext('');

export const PortfolioDetailShell = ({
  slug,
  title,
  badges,
  children,
}: {
  slug: string;
  title: string;
  badges?: string[];
  children: ReactNode;
}) => {
  const metadata = getPortfolioMetadata(slug);
  const canonical = getPortfolioCanonicalUrl(metadata.slug);
  const otherProjects = portfolio.filter((i) => i.url !== `/portfolio/${slug}`);

  return (
    <ProjectName.Provider value={title}>
      <CustomHead
        title={metadata.title}
        description={metadata.description}
        canonical={canonical}
        ogImage={metadata.ogImage}
        keywords={metadata.keywords}
      />
      {/* No crawlable /portfolio index exists (only a homepage fragment), so the
          structured trail is Home > project; the visible trail keeps Portfolio. */}
      <BreadcrumbListSchema
        items={[
          { name: 'Home', url: 'https://www.grizzlybit.dev' },
          { name: title, url: canonical },
        ]}
      />
      <CreativeWorkSchema
        name={title}
        description={metadata.description}
        url={canonical}
        image={metadata.ogImage}
      />
      <Layout>
        <main id="main" className="min-h-screen bg-background">
          <header className="border-b-2 border-border bg-muted pt-28 pb-12 md:pt-32 md:pb-16">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
              <Breadcrumb aria-label="Breadcrumb">
                <BreadcrumbList className="flex-nowrap text-base">
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/" className={crumbLinkClass}>
                        Home
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/#my-portfolio" className={crumbLinkClass}>
                        Portfolio
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className="min-w-0">
                    <BreadcrumbPage className="block max-w-[16ch] truncate font-bold sm:max-w-none">
                      {title}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-balance md:text-6xl">
                {metadata.heading}
              </h1>
              <p className="mt-5 max-w-3xl text-lg text-pretty text-muted-foreground">
                {metadata.description}
              </p>
              {badges && badges.length > 0 && (
                <ul
                  className="mt-6 flex flex-wrap gap-2"
                  aria-label="Project details"
                >
                  {badges.map((b) => (
                    <li key={b}>
                      <Badge variant="outline" className="h-7 px-3 text-sm">
                        {b}
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </header>

          <div className="mx-auto flex max-w-6xl flex-col gap-20 px-4 py-16 md:gap-28 md:px-6 md:py-24">
            {children}
          </div>

          <section
            aria-labelledby="more-case-studies"
            className="border-t-2 border-border bg-muted py-16 md:py-24"
          >
            <div className="mx-auto max-w-6xl px-4 md:px-6">
              <SectionHeading
                id="more-case-studies"
                kicker="Portfolio"
                title="More case studies"
              />
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {otherProjects.map((item, i) => (
                  <li
                    key={item.url}
                    className={cn(i >= 3 && 'hidden md:block')}
                  >
                    <OtherProjectCard item={item} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
      </Layout>
    </ProjectName.Provider>
  );
};

const crumbLinkClass =
  'inline-flex min-h-11 items-center underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none';

const SectionHeading = ({
  id,
  kicker,
  title,
}: {
  id: string;
  kicker?: string;
  title: string;
}) => (
  <div className="mb-8">
    {kicker && (
      <p className="mb-3 inline-block border-2 border-border bg-secondary px-2 py-0.5 font-mono text-xs font-bold text-secondary-foreground">
        {kicker}
      </p>
    )}
    <h2
      id={id}
      className="text-3xl font-bold tracking-tight text-balance md:text-4xl"
    >
      {title}
    </h2>
  </div>
);

const toId = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// A titled <section> (H2) for page-specific blocks such as videos.
export const DetailSection = ({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: string;
  children: ReactNode;
}) => {
  const id = toId(title);
  return (
    <Reveal>
      <section aria-labelledby={id}>
        <SectionHeading id={id} kicker={kicker} title={title} />
        {children}
      </section>
    </Reveal>
  );
};

const SectionSplit = ({
  kicker,
  title,
  copy,
  visual,
  reverse = false,
}: {
  kicker: string;
  title: string;
  copy: ReactNode;
  visual: ReactNode;
  reverse?: boolean;
}) => {
  const id = toId(title);
  return (
    <Reveal>
      <section
        aria-labelledby={id}
        className={cn(
          'flex flex-col gap-10 md:items-center md:gap-12',
          reverse ? 'md:flex-row-reverse' : 'md:flex-row',
        )}
      >
        <div className="w-full min-w-0 flex-1">
          <SectionHeading id={id} kicker={kicker} title={title} />
          <div className="max-w-prose space-y-4 text-base leading-relaxed md:text-lg">
            {copy}
          </div>
        </div>
        <div className="flex w-full min-w-0 flex-1 justify-center">
          {visual}
        </div>
      </section>
    </Reveal>
  );
};

export const AboutSection = ({
  copy,
  visual,
  reverse = false,
}: {
  copy: ReactNode;
  visual: ReactNode;
  reverse?: boolean;
}) => {
  const name = useContext(ProjectName);
  return (
    <SectionSplit
      kicker="Overview"
      title={`About ${name}`}
      copy={copy}
      visual={visual}
      reverse={reverse}
    />
  );
};

export const FeaturesSection = ({
  features,
  visual,
  reverse = false,
}: {
  features: string[];
  visual: ReactNode;
  reverse?: boolean;
}) => {
  const name = useContext(ProjectName);
  return (
    <SectionSplit
      kicker="Features"
      title={`${name} key features`}
      reverse={reverse}
      copy={<FeatureList items={features} />}
      visual={visual}
    />
  );
};

// Role / challenge / outcome summary. Each block renders only when the page has
// sourced facts for it; never pad these with assumptions.
export const CaseStudySummary = ({
  role,
  challenge,
  outcome,
}: {
  role?: ReactNode;
  challenge?: ReactNode;
  outcome?: ReactNode;
}) => {
  const name = useContext(ProjectName);
  // `tall` spans both rows beside the two shorter blocks when all three exist.
  const blocks = [
    { heading: "Zubair's role", body: role, tall: false },
    { heading: 'Challenge and approach', body: challenge, tall: true },
    { heading: 'Outcome', body: outcome, tall: false },
  ].filter((b) => b.body);
  return (
    <DetailSection kicker="Summary" title={`${name} case study summary`}>
      <div
        className={cn(
          'grid grid-cols-1 gap-6',
          blocks.length > 1 && 'md:grid-cols-2',
        )}
      >
        {blocks.map((b) => (
          <div
            key={b.heading}
            className={cn(
              'border-2 border-border bg-card p-6 shadow-md',
              b.tall && blocks.length === 3 && 'md:row-span-2',
            )}
          >
            <h3 className="text-xl font-bold">{b.heading}</h3>
            <div className="mt-3 max-w-prose space-y-3 text-base leading-relaxed">
              {b.body}
            </div>
          </div>
        ))}
      </div>
    </DetailSection>
  );
};

const FeatureList = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((item) => (
      <li key={item} className="flex gap-3">
        <span
          aria-hidden
          className="mt-2 size-2.5 shrink-0 border-2 border-border bg-primary"
        />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export const TechStackSection = ({ tech }: { tech: string[] }) => {
  const name = useContext(ProjectName);
  return (
    <DetailSection kicker="Built with" title={`${name} tech stack`}>
      <ul className="flex flex-wrap gap-3">
        {tech.map((t) => (
          <li key={t}>
            <Badge variant="outline" className="h-8 px-3 text-sm">
              {t}
            </Badge>
          </li>
        ))}
      </ul>
    </DetailSection>
  );
};

export const PortfolioImage = ({
  src,
  alt,
  width = 700,
  height = 700,
  caption,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  width?: number;
  height?: number;
  caption?: string;
}) => (
  <figure className="max-w-full">
    <div className="border-2 border-border bg-card p-2 shadow-md">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto max-w-full"
        priority={priority}
      />
    </div>
    {caption && (
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        {caption}
      </figcaption>
    )}
  </figure>
);

export const ImageRow = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-wrap items-start justify-center gap-6">
    {children}
  </div>
);

export const ExternalLinkButton = ({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon?: ReactNode;
}) => (
  <Button asChild variant="outline" size="lg">
    <a href={href} target="_blank" rel="noopener noreferrer">
      {icon}
      {label}
      <ExternalLink aria-hidden />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  </Button>
);

const OtherProjectCard = ({ item }: { item: IPortfolioItem }) => (
  <Card className="relative h-full gap-0 py-0 transition-transform focus-within:ring-3 focus-within:ring-ring hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
    <article className="flex h-full flex-col">
      <div className="relative aspect-video border-b-2 border-border bg-muted">
        <Image
          src={item.img}
          alt={`${item.title} project preview`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg leading-snug font-bold">
          <Link
            href={item.url}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {item.title}
          </Link>
        </h3>
        <p className="text-base text-muted-foreground">{item.desc}</p>
      </div>
    </article>
  </Card>
);

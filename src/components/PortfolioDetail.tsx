import BreadcrumbListSchema from '@/components/schemas/BreadcrumbListSchema';
import CustomHead from '@/components/CustomHead';
import Layout from '@/components/Layout';
import { MDiv } from '@/components/fx/m';
import {
  getPortfolioCanonicalUrl,
  getPortfolioMetadata,
} from '@/data/portfolioMetadata';
import portfolio, { IPortfolioItem } from 'data/portfolio';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

export const PortfolioDetailShell = ({
  slug,
  title,
  command,
  children,
}: {
  slug: string;
  title: string;
  command?: string;
  children: ReactNode;
}) => {
  const metadata = getPortfolioMetadata(slug);
  const canonical = getPortfolioCanonicalUrl(metadata.slug);
  const otherProjects = portfolio.filter((i) => i.title !== title);

  return (
    <>
      <CustomHead
        title={metadata.title}
        description={metadata.description}
        canonical={canonical}
        ogImage={metadata.ogImage}
        ogType="article"
        keywords={metadata.keywords}
      />
      <BreadcrumbListSchema
        items={[
          { name: 'Home', url: 'https://www.grizzlybit.dev' },
          {
            name: 'Portfolio',
            url: 'https://www.grizzlybit.dev/#my-portfolio',
          },
          { name: title, url: canonical },
        ]}
      />
      <Layout>
        <main id="main" className="min-h-screen pb-20">
          <PortfolioHero
            title={title}
            slug={slug}
            command={command ?? `open ${slug}`}
          />

          <div className="mx-auto max-w-6xl px-5">
            <Breadcrumbs title={title} />

            <div className="mt-8 flex flex-col gap-16">{children}</div>

            <div className="mt-20">
              <SectionHeading kicker="Cross-Pollination" title="Other projects" />
              <OtherProjectsGrid items={otherProjects} />
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

const PortfolioHero = ({
  title,
  slug,
  command,
}: {
  title: string;
  slug: string;
  command: string;
}) => (
  <section className="relative pt-24 pb-12 overflow-hidden">
    <div
      aria-hidden
      className="absolute inset-0 -z-10 opacity-[0.12] pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(rgba(169,145,247,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(169,145,247,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        maskImage:
          'radial-gradient(circle at 50% 30%, black 30%, transparent 80%)',
      }}
    />
    <div className="mx-auto max-w-4xl px-5 text-center">
      <p className="font-mono text-xs tracking-[0.3em] text-brand-glow uppercase">
        Case study
      </p>
      <MDiv
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-3 font-mono text-2xl md:text-4xl tracking-wider uppercase text-white"
      >
        {title}
      </MDiv>
      <MDiv
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/50 px-4 py-2 font-mono text-sm backdrop-blur-sm"
      >
        <span className="text-brand-glow">$</span>
        <span className="text-white/80">{command}</span>
        <span className="ml-1 inline-block w-2 h-4 bg-brand-glow align-middle animate-caret" />
        <span className="ml-3 text-white/30">→</span>
        <span className="text-brand-cool">{slug}</span>
      </MDiv>
    </div>
  </section>
);

const Breadcrumbs = ({ title }: { title: string }) => (
  <nav
    aria-label="Breadcrumb"
    className="font-mono text-xs text-white/40 flex items-center gap-2 flex-wrap"
  >
    <Link href="/" className="hover:text-brand-glow transition-colors">
      /
    </Link>
    <span>›</span>
    <Link
      href="/#my-portfolio"
      className="hover:text-brand-glow transition-colors"
    >
      portfolio
    </Link>
    <span>›</span>
    <span className="text-white/70 truncate">{title}</span>
  </nav>
);

export const SectionHeading = ({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) => (
  <div className="mb-6">
    <p className="font-mono text-[11px] tracking-[0.3em] text-brand-glow uppercase">
      {kicker}
    </p>
    <h2 className="mt-2 font-mono text-2xl md:text-3xl tracking-wider uppercase text-white">
      {title}
    </h2>
  </div>
);

export const PortfolioSection = ({
  kicker,
  title,
  reverse = false,
  children,
}: {
  kicker: string;
  title: string;
  reverse?: boolean;
  children: ReactNode;
}) => (
  <MDiv
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ type: 'spring', stiffness: 110, damping: 18 }}
    className={`flex flex-col-reverse items-center gap-10 md:flex-row md:items-start ${
      reverse ? 'md:flex-row-reverse' : ''
    }`}
  >
    <div className="flex-1 min-w-0 w-full">
      <SectionHeading kicker={kicker} title={title} />
      <div className="font-mono text-sm md:text-base text-white/80 leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  </MDiv>
);

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
}) => (
  <MDiv
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ type: 'spring', stiffness: 110, damping: 18 }}
    className={`flex flex-col-reverse items-center gap-10 md:gap-12 md:flex-row md:items-center ${
      reverse ? 'md:flex-row-reverse' : ''
    }`}
  >
    <div className="flex-1 min-w-0 w-full">
      <SectionHeading kicker={kicker} title={title} />
      <div className="font-mono text-sm md:text-base text-white/80 leading-relaxed space-y-3">
        {copy}
      </div>
    </div>
    <div className="flex-1 min-w-0 w-full flex justify-center">{visual}</div>
  </MDiv>
);

export const AboutSection = ({
  copy,
  visual,
  reverse = false,
}: {
  copy: ReactNode;
  visual: ReactNode;
  reverse?: boolean;
}) => (
  <SectionSplit
    kicker="Overview"
    title="About"
    copy={copy}
    visual={visual}
    reverse={reverse}
  />
);

export const FeaturesSection = ({
  features,
  visual,
  reverse = false,
}: {
  features: string[];
  visual: ReactNode;
  reverse?: boolean;
}) => (
  <SectionSplit
    kicker="Functionality"
    title="Key features"
    reverse={reverse}
    copy={<FeatureList items={features} />}
    visual={visual}
  />
);

export const FeatureList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2 font-mono text-sm text-white/80">
    {items.map((item, i) => (
      <MDiv
        key={i}
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.3, delay: i * 0.04 }}
        className="flex gap-2 leading-relaxed"
      >
        <span className="shrink-0 text-brand-glow">›</span>
        <span>{item}</span>
      </MDiv>
    ))}
  </ul>
);

export const TechStackSection = ({ tech }: { tech: string[] }) => (
  <MDiv
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ type: 'spring', stiffness: 110, damping: 18 }}
  >
    <SectionHeading kicker="Built with" title="Tech stack" />
    <div className="flex flex-wrap gap-2">
      {tech.map((t, i) => (
        <MDiv
          key={t}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.25, delay: i * 0.03 }}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-white/80 hover:border-brand-glow/50 hover:text-brand-glow transition-colors"
        >
          {t}
        </MDiv>
      ))}
    </div>
  </MDiv>
);

export const PortfolioImage = ({
  src,
  alt,
  width = 700,
  height = 700,
  caption,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}) => (
  <MDiv
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ type: 'spring', stiffness: 110, damping: 18 }}
    className="group relative inline-block"
  >
    <div
      aria-hidden
      className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
      style={{
        background:
          'linear-gradient(120deg, #f28c18, #a991f7 40%, #37cdbe 80%)',
      }}
    />
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0d0f14] p-2 shadow-xl">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-lg transition-transform duration-700 group-hover:scale-[1.03]"
        loading="lazy"
      />
      <div
        aria-hidden
        className="crt-scanlines absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
      />
    </div>
    {caption && (
      <p className="mt-2 text-center font-mono text-[11px] text-white/50">
        {caption}
      </p>
    )}
  </MDiv>
);

export const ImageRow = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-wrap items-center justify-center gap-4">
    {children}
  </div>
);

export const ExternalLinkChip = ({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon?: string;
}) => (
  <Link
    href={href}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-mono text-sm text-white/80 hover:border-brand-glow/60 hover:text-brand-glow hover:bg-brand-glow/5 transition-colors"
  >
    {icon && (
      <Image src={icon} alt="" width={18} height={18} className="opacity-80" />
    )}
    <span>{label}</span>
    <span className="text-brand-glow">→</span>
  </Link>
);

const OtherProjectsGrid = ({ items }: { items: IPortfolioItem[] }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    {items.map((item, i) => (
      <OtherProjectCard key={item.title} item={item} index={i} />
    ))}
  </div>
);

const OtherProjectCard = ({
  item,
  index,
}: {
  item: IPortfolioItem;
  index: number;
}) => (
  <MDiv
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ delay: (index % 5) * 0.05, type: 'spring', stiffness: 130 }}
  >
    <Link href={item.url} className="block">
      <div className="group relative aspect-[1/1.2] overflow-hidden rounded-xl border border-white/10 bg-[#0d0f14]">
        <div
          aria-hidden
          className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
          style={{
            background:
              'linear-gradient(120deg, #f28c18, #a991f7 40%, #37cdbe 80%)',
          }}
        />
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          <Image
            src={item.img}
            alt={`${item.title} - ${item.desc}`}
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div
            aria-hidden
            className="crt-scanlines absolute inset-0 opacity-25 mix-blend-overlay"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 p-3">
            <p className="font-mono text-[9px] tracking-[0.25em] text-brand-glow uppercase">
              0{index + 1}
            </p>
            <h3 className="mt-1 font-mono text-xs md:text-sm text-white leading-tight line-clamp-2 group-hover:text-brand-glow transition-colors">
              {item.title}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  </MDiv>
);

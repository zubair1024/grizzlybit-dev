import { PostDate } from '@/components/blog/PostDate';
import { TagLink } from '@/components/blog/TagLink';
import CustomHead from '@/components/CustomHead';
import Layout from '@/components/Layout';
import RelatedPosts from '@/components/RelatedPosts';
import BlogPostingSchema, {
  plainHeadline,
} from '@/components/schemas/BlogPostingSchema';
import BreadcrumbListSchema from '@/components/schemas/BreadcrumbListSchema';
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
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/util/ga';
import { getLinkableTagSlugs } from '@/util/tags';
import { PostData } from '@/util/types';
import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import path from 'path';
import { ComponentProps, useEffect, useMemo } from 'react';
import {
  getAllPostSlugs,
  getBlogPostData,
  getPostData,
  getRelatedPosts,
} from '../../util/posts';
import { calculateReadingTime } from '../../util/readingTime';

type Frontmatter = {
  title: string;
  seoTitle?: string;
  publishedAt: string;
  description?: string;
  summary: string;
  image: string;
  keywords?: string[];
  author?: string;
  lastModified?: string;
};

// The page owns the only H1; demote any H1 written in a post body.
// Code blocks and tables scroll horizontally, so make them keyboard-focusable.
// `relative` keeps sr-only/absolute descendants from widening the page.
const scrollRegion =
  'relative overflow-x-auto outline-hidden focus-visible:ring-3 focus-visible:ring-ring';
const mdxComponents = {
  h1: (props: ComponentProps<'h2'>) => <h2 {...props} />,
  // GFM task-list checkboxes are read-only markers; give them a name.
  input: (props: ComponentProps<'input'>) =>
    props.type === 'checkbox' ? (
      <input {...props} aria-label={props.checked ? 'Done' : 'To do'} />
    ) : (
      <input {...props} />
    ),
  pre: ({ className, ...props }: ComponentProps<'pre'>) => (
    <pre tabIndex={0} className={cn(scrollRegion, className)} {...props} />
  ),
  table: (props: ComponentProps<'table'>) => (
    <div
      role="region"
      aria-label="Table (scrolls horizontally)"
      tabIndex={0}
      className={scrollRegion}
      data-lenis-prevent
    >
      <table {...props} />
    </div>
  ),
};

// Cover rendered in the post header (the LCP element), with intrinsic size.
type Cover = { src: string; width: number; height: number };

type Props = {
  code: string;
  cover: Cover | null;
  frontmatter: Frontmatter;
  slug: string;
  readingTime: string;
  relatedPosts: PostData[];
};

export default function BlogPost({
  code,
  cover,
  frontmatter,
  slug,
  readingTime,
  relatedPosts,
}: Props) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  const author = frontmatter.author || 'Zubair Ahmed';
  const description = frontmatter.description ?? frontmatter.summary;
  const ogImage = `/og-images/blog/${slug}.png`;

  useEffect(() => {
    let fired = false;
    const sessionKey = `blog_read_complete:${slug}`;
    try {
      if (sessionStorage.getItem(sessionKey)) fired = true;
    } catch {
      /* sessionStorage unavailable (private mode, quota) — track anyway */
    }
    const onScroll = () => {
      if (fired) return;
      const doc = document.documentElement;
      const scrolled = window.scrollY + window.innerHeight;
      const total = doc.scrollHeight;
      if (total <= 0) return;
      if (scrolled / total >= 0.9) {
        fired = true;
        try {
          sessionStorage.setItem(sessionKey, '1');
        } catch {
          /* ignore */
        }
        trackEvent('blog_read_complete', {
          slug,
          title: frontmatter.title,
        });
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug, frontmatter.title]);

  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.grizzlybit.dev' },
    { name: 'Blog', url: 'https://www.grizzlybit.dev/blog' },
    {
      name: plainHeadline(frontmatter.title),
      url: `https://www.grizzlybit.dev/blog/${slug}`,
    },
  ];

  return (
    <>
      <CustomHead
        title={frontmatter.seoTitle ?? frontmatter.title}
        description={description}
        canonical={`https://www.grizzlybit.dev/blog/${slug}`}
        ogType="article"
        ogImage={ogImage}
        ogImageWidth={1200}
        ogImageHeight={630}
        ogImageType="image/png"
        ogImageAlt={plainHeadline(frontmatter.title)}
        publishedTime={frontmatter.publishedAt}
        modifiedTime={frontmatter.lastModified}
        author={author}
        keywords={frontmatter.keywords}
      />
      <BlogPostingSchema
        title={frontmatter.title}
        description={description}
        publishedAt={frontmatter.publishedAt}
        modifiedAt={frontmatter.lastModified}
        image={ogImage}
        coverImage={cover?.src}
        slug={slug}
        keywords={frontmatter.keywords}
        author={{ name: author, url: 'https://www.grizzlybit.dev' }}
      />
      <BreadcrumbListSchema items={breadcrumbItems} />
      <Head>
        <link
          rel="alternate"
          type="text/markdown"
          href={`/blog/${slug}.md`}
          title="Markdown version"
        />
      </Head>
      <Layout>
        <main id="main" className="min-h-screen bg-background">
          <article className="mx-auto max-w-6xl px-4 pt-28 pb-12 md:px-6 md:pt-32">
            <header className="mx-auto max-w-[72ch]">
              <Breadcrumb aria-label="Breadcrumb">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/blog">Blog</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className="min-w-0">
                    <BreadcrumbPage className="line-clamp-1">
                      {frontmatter.title}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance md:text-5xl">
                {frontmatter.title}
              </h1>
              <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-base text-muted-foreground">
                <span>
                  By {author} · Published{' '}
                  <PostDate date={frontmatter.publishedAt} />
                </span>
                {frontmatter.lastModified && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>
                      Updated <PostDate date={frontmatter.lastModified} />
                    </span>
                  </>
                )}
                {readingTime && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{readingTime}</span>
                  </>
                )}
              </p>
              {frontmatter.keywords && frontmatter.keywords.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
                  {frontmatter.keywords.map((k) => (
                    <li key={k}>
                      <TagLink tag={k} className="min-h-11 sm:min-h-8" />
                    </li>
                  ))}
                </ul>
              )}
            </header>

            {cover && (
              // text-lg matches the prose-lg column, so 72ch is the same width
              <div className="mx-auto mt-10 max-w-[72ch] text-lg">
                <Image
                  src={cover.src}
                  width={cover.width}
                  height={cover.height}
                  alt={plainHeadline(frontmatter.title)}
                  // LCP: in the SSR HTML, so eager + high priority beats a
                  // preload (`priority` is deprecated in Next 16).
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 920px) calc(100vw - 2rem), 890px"
                  className="h-auto w-full border-2 border-border"
                />
              </div>
            )}

            <div className="mx-auto mt-10 max-w-[72ch] prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:font-semibold prose-a:text-foreground prose-a:underline prose-a:decoration-primary prose-a:decoration-2 prose-a:underline-offset-4 prose-a:hover:decoration-foreground prose-li:marker:text-primary prose-pre:overflow-x-auto prose-pre:rounded-none prose-img:border-2 prose-img:border-border prose-code:before:content-none prose-code:after:content-none [&_:not(pre)>code]:border-2 [&_:not(pre)>code]:border-border [&_:not(pre)>code]:bg-secondary/40 [&_:not(pre)>code]:box-decoration-clone [&_:not(pre)>code]:wrap-break-word [&_:not(pre)>code]:px-1 [&_:not(pre)>code]:font-normal [&_:not(pre)>code]:text-foreground [&_iframe]:aspect-video [&_iframe]:h-auto [&_iframe]:w-full">
              <Component components={mdxComponents} />
            </div>

            <footer className="mx-auto mt-12 max-w-[72ch]">
              <Separator className="h-0.5!" />
              <Card className="mt-10 flex-col gap-6 px-6 sm:flex-row sm:items-start">
                <Image
                  src="/zubair_2.webp"
                  width={96}
                  height={96}
                  alt="Zubair Ahmed, CTO at RAZRLAB"
                  className="size-24 shrink-0 rounded-full border-2 border-border object-cover object-top"
                />
                <div>
                  <h2 className="text-xl font-bold">Written by {author}</h2>
                  <p className="mt-2 text-base text-muted-foreground">
                    I&apos;m a developer, entrepreneur, tinkerer, author and
                    traveller. I work at RAZRLAB as the Chief Technology
                    Officer.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button asChild size="lg">
                      <Link href="/#about-me">About the author</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link href="/#contact-form">Get in touch</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </footer>
          </article>

          <div className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
            <Separator className="mb-12 h-0.5!" />
            <RelatedPosts posts={relatedPosts} />
          </div>
        </main>
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const postData = await getPostData(slug);

  // Calculate reading time from raw MDX body (not compiled JS)
  const readingTime = calculateReadingTime(postData.body);

  const allPosts = await getBlogPostData();
  const relatedPosts = getRelatedPosts(
    allPosts,
    slug,
    postData.frontmatter.keywords,
  );

  // Intrinsic cover size so next/image reserves space (no CLS).
  let cover: Cover | null = null;
  const coverSrc: string | undefined = postData.frontmatter.image;
  if (coverSrc?.startsWith('/')) {
    const { default: sharp } = await import('sharp');
    const { width, height } = await sharp(
      path.join(process.cwd(), 'public', coverSrc),
    ).metadata();
    if (width && height) cover = { src: coverSrc, width, height };
  }

  return {
    props: {
      slug,
      frontmatter: postData.frontmatter,
      code: postData.code,
      cover,
      readingTime,
      relatedPosts,
      linkableTags: getLinkableTagSlugs(allPosts),
    },
  };
};

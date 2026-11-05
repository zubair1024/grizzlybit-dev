import { PostCard } from '@/components/blog/PostCard';
import CustomHead from '@/components/CustomHead';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { getBlogPostData } from '@/util/posts';
import { getLinkableTagSlugs } from '@/util/tags';
import { PostData } from '@/util/types';
import { GetStaticProps } from 'next';
import Link from 'next/link';

type Props = {
  latestPosts: PostData[];
  linkableTags: string[];
};

const LINKS = [
  { href: '/', label: 'Home', primary: true },
  { href: '/blog', label: 'Read the blog' },
  { href: '/#portfolio', label: 'See the portfolio' },
  { href: '/#contact', label: 'Get in touch' },
];

export default function NotFoundPage({ latestPosts }: Props) {
  return (
    <>
      <CustomHead
        title="Page not found"
        description="The page you were looking for doesn't exist. Head back to the Grizzlybit homepage or browse the latest engineering articles by Zubair Ahmed."
        // Without this CustomHead falls back to the homepage canonical
        canonical="https://www.grizzlybit.dev/404"
        noindex
      />
      <Layout>
        <main id="main" className="min-h-screen bg-background">
          <section
            aria-labelledby="not-found-title"
            className="border-b-2 border-border bg-muted pt-28 pb-12 md:pt-32"
          >
            <div className="mx-auto max-w-6xl px-4 md:px-6">
              <p className="mb-3 inline-block border-2 border-border bg-secondary px-2 py-0.5 font-mono text-xs font-bold text-secondary-foreground">
                Error 404
              </p>
              <h1
                id="not-found-title"
                className="max-w-3xl text-4xl font-bold tracking-tight text-balance md:text-6xl"
              >
                Page not found
              </h1>
              <p className="mt-4 max-w-prose text-lg text-pretty text-muted-foreground">
                This link is broken or the page has moved. Try one of these
                instead.
              </p>
              <nav aria-label="Helpful links" className="mt-8">
                <ul className="flex flex-wrap gap-4">
                  {LINKS.map(({ href, label, primary }) => (
                    <li key={href}>
                      <Button
                        asChild
                        size="lg"
                        variant={primary ? 'default' : 'outline'}
                      >
                        <Link href={href}>{label}</Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </section>

          {latestPosts.length > 0 && (
            <section
              aria-labelledby="latest-posts-title"
              className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16"
            >
              <h2
                id="latest-posts-title"
                className="mb-8 text-2xl font-bold tracking-tight md:text-3xl"
              >
                Latest articles
              </h2>
              <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {latestPosts.map((p, i) => (
                  <li key={p.slug}>
                    <PostCard
                      data={p}
                      index={i}
                      location="not_found"
                      headingLevel="h3"
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allPosts = await getBlogPostData();
  return {
    props: {
      latestPosts: allPosts.slice(0, 3),
      linkableTags: getLinkableTagSlugs(allPosts),
    },
  };
};

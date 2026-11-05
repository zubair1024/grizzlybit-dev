import { PostCard } from '@/components/blog/PostCard';
import { TagLink } from '@/components/blog/TagLink';
import CustomHead from '@/components/CustomHead';
import Layout from '@/components/Layout';
import { Reveal } from '@/components/Section';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { buildTagIndex } from '@/util/tags';
import { PostData } from '@/util/types';
import { SearchIcon } from 'lucide-react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { getBlogPostData } from '../../util/posts';

type Props = {
  allPostsData: PostData[];
  popularTags: string[];
};

export default function BlogPage({ allPostsData, popularTags }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  // Wire ?search= URL param so the WebSite SearchAction schema actually works
  useEffect(() => {
    if (!router.isReady) return;
    const raw = router.query.search;
    const initial = Array.isArray(raw) ? raw[0] : raw;
    if (initial && typeof initial === 'string' && initial !== query) {
      setQuery(initial);
    }
  }, [router.isReady, router.query.search]); // eslint-disable-line react-hooks/exhaustive-deps

  const posts = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return allPostsData;
    return allPostsData.filter((p) => {
      const inTitle = (p.title ?? '').toLowerCase().includes(term);
      const inSummary = (p.summary ?? '').toLowerCase().includes(term);
      const inKeywords =
        p.keywords?.some((k) => k.toLowerCase().includes(term)) ?? false;
      return inTitle || inSummary || inKeywords;
    });
  }, [allPostsData, query]);

  return (
    <>
      <CustomHead
        title="Engineering Blog — Node.js, React & TypeScript"
        description="Practical engineering posts by Zubair Ahmed: Node.js, React, TypeScript, DevOps, SSH, Docker, performance, and full-stack patterns."
        canonical="https://www.grizzlybit.dev/blog"
        keywords={[
          'Node.js blog',
          'TypeScript blog',
          'React blog',
          'engineering blog',
          'Zubair Ahmed',
          'Grizzlybit',
          'full-stack tutorials',
        ]}
      />
      <Layout>
        <main id="main" className="min-h-screen bg-background">
          <section
            aria-labelledby="blog-title"
            className="border-b-2 border-border bg-muted pt-28 pb-12 md:pt-32"
          >
            <div className="mx-auto max-w-6xl px-4 md:px-6">
              <p className="mb-3 inline-block border-2 border-border bg-secondary px-2 py-0.5 font-mono text-xs font-bold text-secondary-foreground">
                Blog
              </p>
              <h1
                id="blog-title"
                className="max-w-3xl text-4xl font-bold tracking-tight text-balance md:text-6xl"
              >
                Engineering blog: Node.js, React and TypeScript
              </h1>
              <p className="mt-4 max-w-prose text-lg text-pretty text-muted-foreground">
                Practical write-ups by Zubair Ahmed, full-stack engineer and
                CTO, on Node.js, React, TypeScript, Linux, DevOps and security:
                the fixes, tools and patterns worth keeping from real projects.
              </p>

              <div className="mt-8 max-w-xl">
                <Label htmlFor="blog-search" className="sr-only">
                  Search articles
                </Label>
                <div className="relative">
                  <SearchIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="blog-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by title, summary or tag"
                    className="h-12 pl-11 text-base md:text-base"
                  />
                </div>
                <p
                  className="mt-2 text-sm text-muted-foreground"
                  aria-live="polite"
                >
                  Showing {posts.length} of {allPostsData.length}{' '}
                  {allPostsData.length === 1 ? 'article' : 'articles'}
                </p>
              </div>

              {popularTags.length > 0 && (
                <nav aria-label="Popular topics" className="mt-6">
                  <ul className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <li key={tag}>
                        <TagLink tag={tag} />
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </section>

          <section
            aria-label="Articles"
            className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16"
          >
            {posts.length === 0 ? (
              <div className="max-w-prose border-2 border-border bg-card p-6 shadow">
                <p className="text-lg font-bold">
                  No articles match &ldquo;{query.trim()}&rdquo;
                </p>
                <p className="mt-2 text-base text-muted-foreground">
                  Try a broader term like Node.js, React or Docker, or pick a
                  topic above.
                </p>
              </div>
            ) : (
              <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((p, i) => (
                  <li key={p.slug}>
                    <Reveal className="h-full" delay={(i % 3) * 0.06}>
                      <PostCard data={p} index={i} headingLevel="h2" />
                    </Reveal>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </main>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getBlogPostData();
  // Only tags with 2+ posts: single-post tag pages are noindex.
  const popularTags = Object.values(buildTagIndex(allPostsData))
    .filter((t) => t.count > 1)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
    .map((t) => t.label);
  return {
    props: {
      allPostsData,
      popularTags,
    },
  };
};

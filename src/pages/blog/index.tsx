import { PostCard } from '@/components/blog/PostCard';
import CustomHead from '@/components/CustomHead';
import Layout from '@/components/Layout';
import { PostData } from '@/util/types';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { getBlogPostData } from '../../util/posts';

type Props = {
  allPostsData: PostData[];
};

const EmptyState = ({ term }: { term: string }) => (
  <div className="terminal-window mx-auto max-w-xl rounded-xl p-6 font-mono text-sm">
    <div className="text-white/60">
      <span className="text-brand-glow">$</span>{' '}
      <span className="text-white">grep -r {JSON.stringify(term)} posts/</span>
    </div>
    <div className="mt-3 text-white/70">
      <span className="text-red-400">zsh:</span> no matches found:{' '}
      <span className="text-white">{term}</span>
    </div>
    <div className="mt-2 text-white/60">
      <span className="text-brand-glow">$</span>{' '}
      <span className="inline-block w-2 h-4 bg-brand-glow align-middle animate-caret" />
    </div>
  </div>
);

export default function BlogPage({ allPostsData }: Props) {
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
        <main id="main" className="min-h-screen">
          <section className="relative pt-24 pb-10 overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 opacity-[0.15] pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(169,145,247,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(169,145,247,0.5) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage:
                  'radial-gradient(circle at 50% 30%, black 30%, transparent 80%)',
              }}
            />
            <div className="mx-auto max-w-3xl px-5 text-center">
              <p className="font-mono text-xs tracking-[0.3em] text-brand-glow uppercase">
                Writing
              </p>
              <h1 className="mt-3 font-mono text-3xl md:text-5xl tracking-wider uppercase text-white">
                Blog
              </h1>
              <div
                aria-hidden="true"
                className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/50 px-4 py-2 font-mono text-sm backdrop-blur-sm"
              >
                <span className="text-brand-glow">$</span>
                <span className="text-white/80">ls posts/</span>
                <span className="text-white/40">|</span>
                <span className="text-brand-cool">wc -l</span>
                <span className="text-white/30">→</span>
                <span className="text-brand-haze tabular-nums">
                  {allPostsData.length}
                </span>
              </div>
              <p className="sr-only">{allPostsData.length} posts total</p>
            </div>

            <div className="mx-auto mt-10 max-w-2xl px-5">
              <label htmlFor="blog-search" className="sr-only">
                Search posts
              </label>
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm text-brand-glow pointer-events-none"
                >
                  $ grep
                </div>
                <input
                  id="blog-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='"search posts…"'
                  className="w-full rounded-lg border border-white/10 bg-black/60 pl-20 pr-4 py-3 font-mono text-sm text-white placeholder-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-glow focus:border-brand-glow/60 transition-colors"
                />
              </div>
              <p className="mt-2 text-center font-mono text-[11px] text-white/60">
                {posts.length} of {allPostsData.length}{' '}
                {posts.length === 1 ? 'post' : 'posts'}
              </p>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-5 pb-20">
            {posts.length === 0 ? (
              <EmptyState term={query} />
            ) : (
              <div className="columns-1 md:columns-2 lg:columns-3 gap-5">
                {posts.map((p, i) => (
                  <PostCard key={p.slug} data={p} index={i} />
                ))}
              </div>
            )}
          </section>
        </main>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getBlogPostData();
  return {
    props: {
      allPostsData,
    },
  };
};

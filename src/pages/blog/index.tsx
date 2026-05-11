import CustomHead from '@/components/CustomHead';
import { MDiv } from '@/components/fx/m';
import Layout from '@/components/Layout';
import { trackEvent } from '@/util/ga';
import { PostData } from '@/util/types';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { getBlogPostData } from '../../util/posts';

type Props = {
  allPostsData: PostData[];
};

const slugToCmd = (slug: string) => `cat ${slug}.mdx`;

export const PostCard = ({
  data,
  index = 0,
}: {
  data: PostData;
  index?: number;
}) => {
  return (
    <MDiv
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        delay: (index % 8) * 0.05,
        type: 'spring',
        stiffness: 130,
        damping: 18,
      }}
      className="mb-5 break-inside-avoid"
    >
      <Link
        href={`/blog/${data.slug}`}
        onClick={() =>
          trackEvent('blog_open', {
            slug: data.slug,
            title: data.title,
            position: index + 1,
            location: 'blog_index',
          })
        }
      >
        <article className="terminal-window group relative flex flex-col rounded-xl overflow-hidden hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-2 border-b border-white/10 bg-black/40 px-4 py-2.5">
            <span className="terminal-dot bg-[#ff5f56]" />
            <span className="terminal-dot bg-[#ffbd2e]" />
            <span className="terminal-dot bg-[#27c93f]" />
            <span className="ml-3 font-mono text-[11px] text-white/40 truncate">
              ~/blog/{data.slug}.mdx
            </span>
          </div>

          <div className="flex-1 flex flex-col gap-3 p-5 font-mono text-sm">
            <div className="flex items-center gap-2 text-white/40 text-xs">
              <span className="text-brand-cool">zubair</span>
              <span className="text-white/30">@</span>
              <span className="text-brand-haze">grizzlybit</span>
              <span className="text-white/30">:</span>
              <span className="text-brand-glow">~/blog</span>
              <span className="text-white/30">$</span>
            </div>

            <div className="text-white/90 break-all leading-relaxed">
              <span className="text-brand-glow">$</span>{' '}
              <span className="text-white">{slugToCmd(data.slug)}</span>
              <span className="inline-block w-2 h-4 ml-1 bg-brand-glow align-middle animate-caret" />
            </div>

            <h3 className="mt-1 text-base md:text-lg font-mono text-white leading-snug line-clamp-3 group-hover:text-brand-glow transition-colors">
              {data.title}
            </h3>

            <p className="text-xs text-white/55 line-clamp-4 leading-relaxed">
              {data.summary}
            </p>

            <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/5 text-[11px] text-white/40">
              <span>{data.publishedAt}</span>
              {data.readingTime && <span>{data.readingTime}</span>}
            </div>
          </div>
        </article>
      </Link>
    </MDiv>
  );
};

const EmptyState = ({ term }: { term: string }) => (
  <div className="terminal-window mx-auto max-w-xl rounded-xl p-6 font-mono text-sm">
    <div className="text-white/40">
      <span className="text-brand-glow">$</span>{' '}
      <span className="text-white">grep -r {JSON.stringify(term)} posts/</span>
    </div>
    <div className="mt-3 text-white/60">
      <span className="text-red-400">zsh:</span> no matches found:{' '}
      <span className="text-white">{term}</span>
    </div>
    <div className="mt-2 text-white/40">
      <span className="text-brand-glow">$</span>{' '}
      <span className="inline-block w-2 h-4 bg-brand-glow align-middle animate-caret" />
    </div>
  </div>
);

export default function BlogPage({ allPostsData }: Props) {
  const [query, setQuery] = useState('');

  const posts = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return allPostsData;
    return allPostsData.filter((p) => {
      const inTitle = p.title.toLowerCase().includes(term);
      const inSummary = p.summary.toLowerCase().includes(term);
      const inKeywords =
        p.keywords?.some((k) => k.toLowerCase().includes(term)) ?? false;
      return inTitle || inSummary || inKeywords;
    });
  }, [allPostsData, query]);

  return (
    <>
      <CustomHead
        title="blog"
        description="Selection of blog posts by Grizzlybit.dev"
        canonical="https://www.grizzlybit.dev/blog"
      />
      <Layout>
        <main className="min-h-screen">
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
              <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/50 px-4 py-2 font-mono text-sm backdrop-blur-sm">
                <span className="text-brand-glow">$</span>
                <span className="text-white/80">ls posts/</span>
                <span className="text-white/40">|</span>
                <span className="text-brand-cool">wc -l</span>
                <span className="text-white/30">→</span>
                <span className="text-brand-haze tabular-nums">
                  {allPostsData.length}
                </span>
              </div>
            </div>

            <div className="mx-auto mt-10 max-w-2xl px-5">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm text-brand-glow pointer-events-none">
                  $ grep
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='"search posts…"'
                  className="w-full rounded-lg border border-white/10 bg-black/60 pl-20 pr-4 py-3 font-mono text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-glow/60 transition-colors"
                />
              </div>
              <p className="mt-2 text-center font-mono text-[11px] text-white/40">
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

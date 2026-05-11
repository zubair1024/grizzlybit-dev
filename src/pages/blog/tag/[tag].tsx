import { PostCard } from '@/components/blog/PostCard';
import CustomHead from '@/components/CustomHead';
import Layout from '@/components/Layout';
import BreadcrumbListSchema from '@/components/schemas/BreadcrumbListSchema';
import { getBlogPostData } from '@/util/posts';
import { buildTagIndex, getAllTagSlugs } from '@/util/tags';
import { PostData } from '@/util/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

type Props = {
  tagSlug: string;
  tagLabel: string;
  posts: PostData[];
};

export default function TagPage({ tagSlug, tagLabel, posts }: Props) {
  const title = `${tagLabel} — Posts tagged "${tagLabel}"`;
  const description = `${posts.length} engineering post${
    posts.length === 1 ? '' : 's'
  } tagged ${tagLabel} by Zubair Ahmed (Grizzlybit).`;
  const canonical = `https://www.grizzlybit.dev/blog/tag/${tagSlug}`;
  // Avoid crawl-budget dilution on single-post tag pages
  const isThin = posts.length < 2;

  return (
    <>
      <CustomHead
        title={title}
        description={description}
        canonical={canonical}
        keywords={[tagLabel, 'Grizzlybit', 'Zubair Ahmed', 'blog', 'tag']}
        noindex={isThin}
      />
      <BreadcrumbListSchema
        items={[
          { name: 'Home', url: 'https://www.grizzlybit.dev/' },
          { name: 'Blog', url: 'https://www.grizzlybit.dev/blog' },
          { name: tagLabel, url: canonical },
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
                Tag
              </p>
              <h1 className="mt-3 font-mono text-3xl md:text-5xl tracking-wider uppercase text-white">
                {tagLabel}
              </h1>
              <div
                aria-hidden="true"
                className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/50 px-4 py-2 font-mono text-sm backdrop-blur-sm"
              >
                <span className="text-brand-glow">$</span>
                <span className="text-white/80">
                  grep -l &quot;{tagLabel}&quot; posts/
                </span>
                <span className="text-white/40">|</span>
                <span className="text-brand-cool">wc -l</span>
                <span className="text-white/30">→</span>
                <span className="text-brand-haze tabular-nums">
                  {posts.length}
                </span>
              </div>
              <p className="sr-only">
                {posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged{' '}
                {tagLabel}
              </p>
              <p className="mt-4 font-mono text-sm">
                <Link
                  href="/blog"
                  className="text-white/70 hover:text-brand-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-glow transition-colors"
                >
                  ← back to /blog
                </Link>
              </p>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-5 pb-20">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-5">
              {posts.map((p, i) => (
                <PostCard key={p.slug} data={p} index={i} />
              ))}
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getBlogPostData();
  const slugs = getAllTagSlugs(allPosts);
  return {
    paths: slugs.map((tag) => ({ params: { tag } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const allPosts = await getBlogPostData();
  const index = buildTagIndex(allPosts);
  const tagSlug = params?.tag as string;
  const bucket = index[tagSlug];
  if (!bucket) return { notFound: true };
  return {
    props: {
      tagSlug,
      tagLabel: bucket.label,
      posts: bucket.posts.sort(
        (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
      ),
    },
  };
};

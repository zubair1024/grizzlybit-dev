import { PostCard } from '@/components/blog/PostCard';
import { formatTag } from '@/components/blog/TagLink';
import CustomHead from '@/components/CustomHead';
import Layout from '@/components/Layout';
import BreadcrumbListSchema from '@/components/schemas/BreadcrumbListSchema';
import { Reveal } from '@/components/Section';
import { getBlogPostData } from '@/util/posts';
import {
  buildTagIndex,
  getAllTagSlugs,
  getLinkableTagSlugs,
} from '@/util/tags';
import { PostData } from '@/util/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

type Props = {
  tagSlug: string;
  tagLabel: string;
  posts: PostData[];
  linkableTags: string[];
};

export default function TagPage({ tagSlug, tagLabel, posts }: Props) {
  const label = formatTag(tagLabel);
  const count = `${posts.length} ${posts.length === 1 ? 'article' : 'articles'}`;
  const title = `${label} articles and tutorials`;
  const description = `Browse ${count} on ${label} by Zubair Ahmed, full-stack engineer and CTO, from the Grizzlybit engineering blog.`;
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
          { name: 'Home', url: 'https://www.grizzlybit.dev' },
          { name: 'Blog', url: 'https://www.grizzlybit.dev/blog' },
          { name: title, url: canonical },
        ]}
      />
      <Layout>
        <main id="main" className="min-h-screen bg-background">
          <section
            aria-labelledby="tag-title"
            className="border-b-2 border-border bg-muted pt-28 pb-12 md:pt-32"
          >
            <div className="mx-auto max-w-6xl px-4 md:px-6">
              <Link
                href="/blog"
                className="inline-flex min-h-11 items-center gap-2 font-bold underline decoration-primary decoration-2 underline-offset-4 outline-hidden hover:decoration-foreground focus-visible:ring-3 focus-visible:ring-ring"
              >
                <ArrowLeftIcon aria-hidden="true" className="size-4" />
                All engineering articles
              </Link>
              <h1
                id="tag-title"
                className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-balance md:text-6xl"
              >
                Articles about {label}
              </h1>
              <p className="mt-4 max-w-prose text-lg text-muted-foreground">
                {count} by Zubair Ahmed tagged {label}.
              </p>
            </div>
          </section>

          <section
            aria-label={`Articles about ${label}`}
            className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16"
          >
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p, i) => (
                <li key={p.slug}>
                  <Reveal className="h-full" delay={(i % 3) * 0.06}>
                    <PostCard
                      data={p}
                      index={i}
                      location="tag_page"
                      headingLevel="h2"
                    />
                  </Reveal>
                </li>
              ))}
            </ul>
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
      linkableTags: getLinkableTagSlugs(allPosts),
      posts: bucket.posts.sort(
        (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
      ),
    },
  };
};

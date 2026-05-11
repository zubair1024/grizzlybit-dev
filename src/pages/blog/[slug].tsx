import CustomHead from '@/components/CustomHead';
import Layout from '@/components/Layout';
import RelatedPosts from '@/components/RelatedPosts';
import BlogPostingSchema from '@/components/schemas/BlogPostingSchema';
import BreadcrumbListSchema from '@/components/schemas/BreadcrumbListSchema';
import { trackEvent } from '@/util/ga';
import { PostData } from '@/util/types';
import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { TagLink } from '@/components/blog/TagLink';
import { getAllPostSlugs, getBlogPostData, getPostData } from '../../util/posts';
import { calculateReadingTime } from '../../util/readingTime';

type Frontmatter = {
  title: string;
  publishedAt: string;
  description: string;
  summary: string;
  image: string;
  keywords?: string[];
  author?: string;
  lastModified?: string;
};

type Props = {
  code: string;
  frontmatter: Frontmatter;
  slug: string;
  readingTime: string;
  allPosts: PostData[];
};

export default function BlogPost({
  code,
  frontmatter,
  slug,
  readingTime,
  allPosts,
}: Props) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  const author = frontmatter.author || 'Zubair Ahmed';

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
      name: frontmatter.title,
      url: `https://www.grizzlybit.dev/blog/${slug}`,
    },
  ];

  return (
    <>
      <CustomHead
        title={frontmatter.title}
        description={frontmatter.summary}
        canonical={`https://www.grizzlybit.dev/blog/${slug}`}
        ogType="article"
        ogImage={frontmatter.image}
        publishedTime={frontmatter.publishedAt}
        modifiedTime={frontmatter.lastModified}
        author={author}
        keywords={frontmatter.keywords}
      />
      <BlogPostingSchema
        title={frontmatter.title}
        description={frontmatter.summary}
        publishedAt={frontmatter.publishedAt}
        modifiedAt={frontmatter.lastModified}
        image={frontmatter.image}
        slug={slug}
        keywords={frontmatter.keywords}
        author={{ name: author, url: 'https://www.grizzlybit.dev' }}
      />
      <BreadcrumbListSchema items={breadcrumbItems} />
      <Layout>
        <main id="main" className="max-w-full prose prose-md">
          <div className="bg-fixed bg-toolBelt">
            <div className="py-10 overflow-hidden text-white bg-black bg-opacity-50 shadow-lg toolBelt-content backdrop-filter backdrop-blur-lg">
              <h1 className="p-16 text-center md:grid-cols-4">
                {frontmatter.title}
              </h1>
            </div>
          </div>
          <div className="max-w-[900px] mx-auto py-10 px-10 bg-base-300">
            <nav aria-label="Breadcrumb" className="text-sm breadcrumbs">
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li aria-current="page">{frontmatter.title}</li>
              </ul>
            </nav>
            {frontmatter.keywords && frontmatter.keywords.length > 0 && (
              <div className="not-prose flex flex-wrap gap-2 mb-6">
                {frontmatter.keywords.map((k) => (
                  <TagLink key={k} tag={k} />
                ))}
              </div>
            )}
            <Component />
            <div className="divider"></div>
            <div className="flex items-center justify-center space-x-5">
              <div>
                <Image
                  src="/zubair_2.webp"
                  height={200}
                  width={200}
                  alt="Zubair Ahmed"
                  className="w-96 rounded-xl"
                ></Image>
              </div>
              <div className="text-sm">
                <p>
                  Published on {frontmatter.publishedAt} • {readingTime}
                </p>
                <p className="font-semibold text-lg m-0">{author}</p>
                <p>
                  I&apos;m a developer, an entrepreneur, an ambitious tweaker,
                  author, traveller and over-scrutinizer. I work at RAZRLAB as
                  the Chief Technology Officer.
                </p>
                <Link href={'/'} className="no-underline">
                  <button className="btn-sm btn btn-accent">
                    Visit Homepage
                  </button>
                </Link>
              </div>
            </div>
            <div className="divider"></div>
            <RelatedPosts
              currentSlug={slug}
              currentKeywords={frontmatter.keywords}
              allPosts={allPosts}
            />
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

  // Get all posts for related posts functionality
  const allPosts = await getBlogPostData();

  return {
    props: {
      slug,
      frontmatter: postData.frontmatter,
      code: postData.code,
      readingTime,
      allPosts,
    },
  };
};

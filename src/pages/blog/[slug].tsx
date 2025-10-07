import CustomHead from '@/components/CustomHead';
import Layout from '@/components/Layout';
import RelatedPosts from '@/components/RelatedPosts';
import BlogPostingSchema from '@/components/schemas/BlogPostingSchema';
import BreadcrumbListSchema from '@/components/schemas/BreadcrumbListSchema';
import { PostData } from '@/util/types';
import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
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

  const breadcrumbItems = [
    { name: 'Home', url: 'https://www.grizzlybit.dev/' },
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
        image={frontmatter.image}
        slug={slug}
        author={{ name: author, url: 'https://www.grizzlybit.dev' }}
      />
      <BreadcrumbListSchema items={breadcrumbItems} />
      <Layout>
        <div className="max-w-full prose prose-md">
          <div className="bg-fixed bg-toolBelt">
            <div className="py-10 overflow-hidden text-white bg-black bg-opacity-50 shadow-lg toolBelt-content backdrop-filter backdrop-blur-lg">
              <h2 className="p-16 text-center md:grid-cols-4">
                {frontmatter.title}
              </h2>
            </div>
          </div>
          <div className="max-w-[900px] mx-auto py-10 px-10 bg-base-300">
            <div className="text-sm breadcrumbs">
              <ul>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>{frontmatter.title}</li>
              </ul>
            </div>
            <Component />
            <div className="divider"></div>
            <div className="flex items-center justify-center space-x-5">
              <div>
                <Image
                  src="/zubair_2.jpg"
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
                <h2>{author}</h2>
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
        </div>
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

  // Calculate reading time from the MDX code
  const readingTime = calculateReadingTime(postData.code);

  // Get all posts for related posts functionality
  const allPosts = await getBlogPostData();

  return {
    props: {
      ...postData,
      slug,
      readingTime,
      allPosts,
    },
  };
};

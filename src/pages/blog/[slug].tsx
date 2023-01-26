import Layout from '@/components/Layout';
import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { getAllPostSlugs, getPostData } from '../../util/posts';

type Frontmatter = {
  title: string;
  publishedAt: string;
  description: string;
  summary: string;
  image: string;
};

type Props = {
  code: string;
  frontmatter: Frontmatter;
};

export default function BlogPost({ code, frontmatter }: Props) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <Layout>
        <div className="max-w-full prose prose-lg">
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
                <p>Published on {frontmatter.publishedAt}</p>
                <h2>Zubair Ahmed</h2>
                <p>
                  I&apos;m a developer, an entrepreneur, an ambitious tweaker,
                  author, traveller and over-scrutinizer 😝 . I work at RAZRLAB
                  as the Chief Technology Officer.
                </p>
                <Link href={'/'} className="no-underline">
                  <button className="btn-sm btn btn-accent">Read More</button>
                </Link>
              </div>
            </div>
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
  const postData = await getPostData(params?.slug as string);
  return {
    props: {
      ...postData,
    },
  };
};

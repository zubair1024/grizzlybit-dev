import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useMemo } from 'react';
import { getAllPostSlugs, getPostData } from '../../util/posts';

type Frontmatter = {
  title: string;
  date: string;
  description: string;
};

type Props = {
  code: string;
  frontmatter: Frontmatter;
};

export default function BlogPost({ code, frontmatter }: Props) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <article
      itemScope
      itemType="http://schema.org/Article"
      className="prose prose-xl"
    >
      <header>
        <h1 itemProp="headline">{frontmatter.title}</h1>
        <p>{frontmatter.date}</p>
      </header>
      <section
        itemProp="articleBody"
        className="mx-auto my-4 prose md:prose-lg lg:prose-xl"
      >
        <Component />
      </section>
    </article>
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

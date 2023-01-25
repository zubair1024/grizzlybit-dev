import Layout from '@/components/Layout';
import { GetStaticProps } from 'next';
import { getBlogPostData } from '../../lib/posts';
import type { PostData } from '../../lib/types';

type Props = {
  allPostsData: PostData[];
};

export default function BlogPage({ allPostsData }: Props) {
  return (
    <Layout>
      <section className="max-w-5xl px-4 mx-auto mb-16">
        {JSON.stringify(allPostsData)}
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  console.log(`CAME!!!!`);
  const allPostsData = await getBlogPostData();
  return {
    props: {
      allPostsData,
    },
  };
};

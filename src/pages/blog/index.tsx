import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getBlogPostData } from '../../util/posts';

type PostData = {
  title: string;
  date: string;
  description: string;
  slug: string;
};

type Props = {
  allPostsData: PostData[];
};

export default function BlogPage({ allPostsData }: Props) {
  console.log(allPostsData);
  return (
    <>
      <header>
        <h1>Blog</h1>
      </header>
      <section>
        {allPostsData.map(({ title, slug, date }: PostData) => {
          return (
            <Link key={slug} href={`/blog/${slug}`} itemProp="url">
              <article itemScope itemType="http://schema.org/Article">
                <header>
                  <h2 itemProp="headline">{title}</h2>
                  <p>{date}</p>
                </header>
              </article>
            </Link>
          );
        })}
      </section>
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

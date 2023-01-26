import Layout from '@/components/Layout';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { getBlogPostData } from '../../util/posts';

type PostData = {
  title: string;
  publishedAt: string;
  description: string;
  summary: string;
  image: string;
  slug: string;
};

type Props = {
  allPostsData: PostData[];
};

const PostCard = (props: { data: PostData }) => {
  const { image, title, summary, publishedAt, slug } = props.data;
  return (
    <>
      <div className="flex justify-center sm:mx-5">
        <div className="bg-[#0E0E0E] shadow-xl card card-compact">
          <figure>
            <Link href={`/blog/${slug}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={title} />
            </Link>
          </figure>
          <div className="card-body">
            <p className="text-right text-md">{publishedAt}</p>
            <Link href={`/blog/${slug}`}>
              <h2 className="text-md card-title">{title}</h2>
            </Link>
            <p className="text-justify ">{summary}</p>
            <div className="justify-end card-actions">
              <Link href={`/blog/${slug}`}>
                <button className="mt-5 btn-sm btn btn-primary">
                  Read more
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function BlogPage({ allPostsData }: Props) {
  const allPosts = allPostsData;
  const [posts, setPosts] = useState(allPostsData);

  const handleSearchClick = (text: string) => {
    if (text === '' || text === null) return setPosts(allPosts);

    const filteredPosts = allPosts.filter((i) => i.title.indexOf(text) > -1);
    console.log(filteredPosts);
    setPosts(filteredPosts);
  };

  return (
    <>
      <Layout>
        <div className="max-w-full min-h-screen">
          <div className="bg-fixed bg-toolBelt">
            <div className="py-20 overflow-hidden text-white bg-black bg-opacity-50 shadow-lg toolBelt-content backdrop-filter backdrop-blur-lg">
              <h2 className="text-4xl font-bold text-center md:grid-cols-4">
                Blog
              </h2>
            </div>
          </div>
          <div>
            <div className="max-w-xl px-5 py-10 mx-auto">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search…"
                  className="w-full input input-bordered"
                  onChange={(e) => {
                    handleSearchClick(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="grid content-center justify-center gap-4 my-10 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:mx-16">
              {posts.map((i) => (
                <PostCard key={i.title} data={i} />
              ))}
            </div>
          </div>
        </div>
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

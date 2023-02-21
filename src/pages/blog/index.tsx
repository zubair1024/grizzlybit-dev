import CustomHead from '@/components/CustomHead';
import Layout from '@/components/Layout';
import { PostData } from '@/util/types';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { getBlogPostData } from '../../util/posts';

type Props = {
  allPostsData: PostData[];
};

const gradients = [
  'bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500',
  'bg-gradient-to-r from-rose-700 to-pink-600',
  'bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800',
  'bg-gradient-to-r from-yellow-600 to-red-600',
  'bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900',
  'bg-gradient-to-r from-gray-700 via-gray-900 to-black',
  'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500',
  'bg-gradient-to-br from-green-300 via-blue-500 to-purple-600',
  'bg-gradient-to-r from-red-800 via-yellow-600 to-yellow-500',
  'bg-gradient-to-r from-pink-400 to-pink-600',
];

function randomGradientBg() {
  const num = Math.floor(Math.random() * 10);
  return gradients[num];
}

export const PostCard = (props: { data: PostData }) => {
  const { image, title, summary, publishedAt, slug } = props.data;
  return (
    <>
      <CustomHead title="blog" description="Selection of blog pos" />
      <div className="flex justify-center sm:mx-5">
        <div className="bg-[#0E0E0E] shadow-xl card card-compact">
          <Link href={`/blog/${slug}`}>
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="rounded-t-xl" src={image} alt={title} />
            ) : (
              <div
                className={`${randomGradientBg()} w-full h-[150px] flex items-center justify-center rounded-t-xl`}
              >
                <h3 className="text-2xl px-4 font-bold tracking-tighter leading-tight">
                  {title}
                </h3>
              </div>
            )}
          </Link>

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

    const filteredPosts = allPosts.filter(
      (i) => i.title.toLowerCase().indexOf(text.toLowerCase()) > -1,
    );
    console.log(filteredPosts);
    setPosts(filteredPosts);
  };

  return (
    <>
      <CustomHead />
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

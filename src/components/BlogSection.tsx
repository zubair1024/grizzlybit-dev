import { PostCard } from '@/pages/blog';
import { PostData } from '@/util/types';
import Link from 'next/link';

type Props = {
  allPostsData: PostData[];
};

const BlogSection = ({ allPostsData }: Props) => {
  return (
    <>
      <h2 className="my-10 font-mono text-2xl font-thin tracking-wider text-center capitalize">
        Blog
      </h2>
      <div className="grid grid-cols-2 gap-2 py-10 md:grid-cols-3 lg:grid-cols-4">
        {allPostsData.map((item) => {
          return <PostCard key={item.slug} data={item} />;
        })}
      </div>
      <div className="flex items-center justify-center py-10">
        <Link href={'/blog'}>
          <button className="btn btn-primary">See More Posts</button>
        </Link>
      </div>
    </>
  );
};

export default BlogSection;

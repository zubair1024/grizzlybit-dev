import { PostCard } from '@/components/blog/PostCard';
import { PostData } from '@/util/types';

export default function RelatedPosts({ posts }: { posts: PostData[] }) {
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="related-title">
      <h2
        id="related-title"
        className="mb-6 text-2xl font-bold tracking-tight md:text-3xl"
      >
        Related articles
      </h2>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <li key={post.slug}>
            <PostCard data={post} index={i} location="related_posts" />
          </li>
        ))}
      </ul>
    </section>
  );
}

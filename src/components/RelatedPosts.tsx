import { PostCard } from '@/components/blog/PostCard';
import { PostData } from '@/util/types';

interface RelatedPostsProps {
  currentSlug: string;
  currentKeywords?: string[];
  allPosts: PostData[];
  maxPosts?: number;
}

/**
 * Component to display related blog posts based on shared keywords
 * Falls back to most recent posts if no keyword matches found
 */
export default function RelatedPosts({
  currentSlug,
  currentKeywords = [],
  allPosts,
  maxPosts = 3,
}: RelatedPostsProps) {
  // Filter out current post and calculate relevance scores
  const postsWithScores = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      let score = 0;

      // Calculate score based on shared keywords
      if (currentKeywords.length > 0 && post.keywords) {
        const sharedKeywords = currentKeywords.filter((keyword) =>
          post.keywords?.includes(keyword),
        );
        score = sharedKeywords.length;
      }

      return { ...post, score };
    });

  // Sort by score (descending), then by date (most recent first)
  const sortedPosts = postsWithScores.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });

  // Get top N related posts
  const relatedPosts = sortedPosts.slice(0, maxPosts);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="related-title">
      <h2
        id="related-title"
        className="mb-6 text-2xl font-bold tracking-tight md:text-3xl"
      >
        Related articles
      </h2>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post, i) => (
          <li key={post.slug}>
            <PostCard data={post} index={i} location="related_posts" />
          </li>
        ))}
      </ul>
    </section>
  );
}

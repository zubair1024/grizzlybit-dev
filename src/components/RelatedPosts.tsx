import { PostData } from '@/util/types';
import Link from 'next/link';
import Image from 'next/image';

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
    <div className="my-10">
      <h2 className="mb-6 text-2xl font-bold">Related Posts</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="transition-transform no-underline hover:scale-105"
          >
            <div className="overflow-hidden bg-base-200 rounded-lg shadow-md">
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="object-cover w-full h-32"
                />
              )}
              <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold line-clamp-2">
                  {post.title}
                </h3>
                <p className="mb-2 text-sm text-base-content/70 line-clamp-2">
                  {post.summary}
                </p>
                <div className="flex items-center justify-between text-xs text-base-content/60">
                  <span>{post.publishedAt}</span>
                  {post.readingTime && <span>{post.readingTime}</span>}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

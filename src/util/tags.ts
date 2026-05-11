import { PostData } from './types';

export const tagToSlug = (tag: string) =>
  tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export type TagBucket = {
  slug: string;
  label: string;
  count: number;
  posts: PostData[];
};

export function buildTagIndex(posts: PostData[]): Record<string, TagBucket> {
  const map: Record<string, TagBucket> = {};
  for (const post of posts) {
    const kws = post.keywords ?? [];
    for (const raw of kws) {
      const slug = tagToSlug(raw);
      if (!slug) continue;
      if (!map[slug]) {
        map[slug] = { slug, label: raw, count: 0, posts: [] };
      }
      map[slug].count += 1;
      map[slug].posts.push(post);
    }
  }
  return map;
}

export function getAllTagSlugs(posts: PostData[]): string[] {
  return Object.keys(buildTagIndex(posts));
}

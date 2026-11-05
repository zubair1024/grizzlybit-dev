export type PostData = {
  title: string;
  // Shorter <title>/og:title when the real title is too long for SERPs.
  seoTitle?: string;
  publishedAt: string;
  description?: string;
  summary: string;
  image: string;
  showOnHome?: boolean;
  slug: string;
  keywords?: string[];
  author?: string;
  lastModified?: string;
  readingTime?: string;
};

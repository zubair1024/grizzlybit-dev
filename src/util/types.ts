export type PostData = {
  title: string;
  publishedAt: string;
  summary: string;
  image: string;
  showOnHome?: boolean;
  slug: string;
  keywords?: string[];
  author?: string;
  lastModified?: string;
  readingTime?: string;
};

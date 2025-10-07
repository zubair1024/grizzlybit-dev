import fs from 'fs';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import path from 'path';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import { calculateReadingTime } from './readingTime';
import { PostData } from './types';

type Frontmatter = {
  title: string;
  publishedAt: string;
  description: string;
  summary: string;
  image: string;
  showOnHome: boolean;
  keywords?: string[];
  author?: string;
  lastModified?: string;
};

const postsDirectory = path.join(process.cwd(), 'src/posts');

/**
 * Get the last modified date for a post file
 * Checks frontmatter first, then falls back to file system modification time
 */
export function getPostLastModified(filename: string): string {
  const fullPath = path.join(postsDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  // Check if lastModified is in frontmatter
  if (matterResult.data.lastModified) {
    return new Date(matterResult.data.lastModified).toISOString();
  }

  // Fall back to file modification time
  const stats = fs.statSync(fullPath);
  return stats.mtime.toISOString();
}

/**
 * Get all blog posts with their last modified dates
 * Useful for sitemap generation
 */
export function getAllPostsWithLastModified(): Array<{
  slug: string;
  lastModified: string;
}> {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const lastModified = getPostLastModified(filename);
    return { slug, lastModified };
  });
}

export async function getBlogPostData(): Promise<PostData[]> {
  const filenames = fs.readdirSync(postsDirectory);
  const allPostsData = filenames.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');

    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    // Calculate reading time from content
    const readingTime = calculateReadingTime(fileContents);

    return {
      slug,
      ...(matterResult.data as Frontmatter),
      readingTime,
    };
  });

  return allPostsData.sort((a, b) => {
    if (new Date(a.publishedAt) < new Date(b.publishedAt)) {
      return 1;
    }
    return -1;
  });
}

export async function getBlogPostDataForHome(): Promise<PostData[]> {
  const allPostsData = await getBlogPostData();

  const filteredPostsData = allPostsData.filter((i) => i.showOnHome === true);

  return filteredPostsData;
}

export async function getAllPostSlugs() {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map((filename) => {
    return {
      params: {
        slug: filename.replace(/\.mdx$/, ''),
      },
    };
  });
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const mdxSource = fs.readFileSync(fullPath, 'utf8');

  const { code, frontmatter } = await bundleMDX({
    source: mdxSource,
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypePrism];

      return options;
    },
  });

  return {
    slug,
    frontmatter,
    code,
  };
}

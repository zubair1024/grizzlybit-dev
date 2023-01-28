import fs from 'fs';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import path from 'path';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import { PostData } from './types';

type Frontmatter = {
  title: string;
  publishedAt: string;
  description: string;
  summary: string;
  image: string;
  showOnHome: boolean;
};

const postsDirectory = path.join(process.cwd(), 'src/posts');

export async function getBlogPostData(): Promise<PostData[]> {
  const filenames = fs.readdirSync(postsDirectory);
  const allPostsData = filenames.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');

    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as Frontmatter),
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

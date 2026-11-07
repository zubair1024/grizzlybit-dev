import Head from 'next/head';

import { plainHeadline } from './BlogPostingSchema';

const SITE = 'https://www.grizzlybit.dev';

interface BlogSchemaProps {
  name: string;
  description: string;
  posts: { slug: string; title: string }[];
}

// blogPost refs match the BlogPosting @id (`<post url>#article`).
const BlogSchema = ({ name, description, posts }: BlogSchemaProps) => {
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE}/blog#blog`,
    url: `${SITE}/blog`,
    name,
    description,
    inLanguage: 'en-US',
    // Same entities as the homepage graph; named inline because this page
    // has no WebSite/Person nodes of its own.
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      name: 'Grizzlybit — Zubair Ahmed',
      url: SITE,
    },
    publisher: {
      '@type': 'Person',
      '@id': `${SITE}/#person`,
      name: 'Zubair Ahmed',
      url: SITE,
    },
    author: { '@id': `${SITE}/#person` },
    blogPost: posts.map(({ slug, title }) => ({
      '@type': 'BlogPosting',
      '@id': `${SITE}/blog/${slug}#article`,
      url: `${SITE}/blog/${slug}`,
      headline: plainHeadline(title),
    })),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
    </Head>
  );
};

export default BlogSchema;

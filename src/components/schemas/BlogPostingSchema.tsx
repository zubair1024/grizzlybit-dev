import Head from 'next/head';

interface BlogPostingSchemaProps {
  title: string;
  description: string;
  publishedAt: string;
  modifiedAt?: string;
  image: string;
  slug: string;
  keywords?: string[];
  author?: {
    name: string;
    url?: string;
  };
}

const BlogPostingSchema = ({
  title,
  description,
  publishedAt,
  modifiedAt,
  image,
  slug,
  keywords,
  author = { name: 'Zubair Ahmed', url: 'https://www.grizzlybit.dev' },
}: BlogPostingSchemaProps) => {
  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `https://www.grizzlybit.dev${image}`
    : 'https://www.grizzlybit.dev/grizzlybit-logo-image.png';

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: imageUrl,
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    author: {
      '@type': 'Person',
      '@id': 'https://www.grizzlybit.dev/#person',
      name: author.name,
      url: author.url,
    },
    // Same entity as WebSite.publisher; name inline because this page has no Person node
    publisher: {
      '@type': 'Person',
      '@id': 'https://www.grizzlybit.dev/#person',
      name: 'Zubair Ahmed',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.grizzlybit.dev/blog/${slug}`,
    },
    url: `https://www.grizzlybit.dev/blog/${slug}`,
    ...(keywords && keywords.length > 0 && { keywords: keywords.join(', ') }),
    inLanguage: 'en-US',
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
    </Head>
  );
};

export default BlogPostingSchema;

import Head from 'next/head';

interface BlogPostingSchemaProps {
  title: string;
  description: string;
  publishedAt: string;
  image: string;
  slug: string;
  author?: {
    name: string;
    url?: string;
  };
}

const BlogPostingSchema = ({
  title,
  description,
  publishedAt,
  image,
  slug,
  author = { name: 'Zubair Ahmed', url: 'https://www.grizzlybit.dev' },
}: BlogPostingSchemaProps) => {
  // Handle image URL - check if it exists and format it properly
  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `https://www.grizzlybit.dev${image}`
    : 'https://www.grizzlybit.dev/grizzlybit-logo-image.png'; // Default fallback

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: imageUrl,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: {
      '@type': 'Person',
      name: author.name,
      url: author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'RAZRLAB',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.grizzlybit.dev/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.grizzlybit.dev/blog/${slug}`,
    },
    url: `https://www.grizzlybit.dev/blog/${slug}`,
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

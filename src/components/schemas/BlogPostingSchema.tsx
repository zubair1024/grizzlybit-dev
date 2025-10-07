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
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: image.startsWith('http')
      ? image
      : `https://www.grizzlybit.dev${image}`,
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

import Head from 'next/head';

interface BlogPostingSchemaProps {
  title: string;
  description: string;
  publishedAt: string;
  modifiedAt?: string;
  // 1200x630 Open Graph card
  image: string;
  coverImage?: string;
  slug: string;
  keywords?: string[];
  author?: {
    name: string;
    url?: string;
  };
}

// Emoji in titles are decoration; keep them out of structured-data headlines.
export const plainHeadline = (title: string) =>
  title
    .replace(
      /[\p{Extended_Pictographic}\p{Emoji_Modifier}\p{Regional_Indicator}\u{FE0F}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/gu,
      '',
    )
    .replace(/\s+/g, ' ')
    .trim();

const BlogPostingSchema = ({
  title,
  description,
  publishedAt,
  modifiedAt,
  image,
  coverImage,
  slug,
  keywords,
  author = { name: 'Zubair Ahmed', url: 'https://www.grizzlybit.dev' },
}: BlogPostingSchemaProps) => {
  const site = 'https://www.grizzlybit.dev';
  const toAbsolute = (u: string) => (u.startsWith('http') ? u : `${site}${u}`);
  const url = `${site}/blog/${slug}`;
  // Date-only frontmatter gets midnight Dubai time so it's a full ISO 8601 datetime.
  const toDateTime = (d: string) =>
    /^\d{4}-\d{2}-\d{2}$/.test(d) ? `${d}T00:00:00+04:00` : d;

  const images: Array<Record<string, unknown>> = [
    {
      '@type': 'ImageObject',
      url: toAbsolute(image),
      width: 1200,
      height: 630,
    },
  ];
  if (coverImage)
    images.push({ '@type': 'ImageObject', url: toAbsolute(coverImage) });

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    isPartOf: { '@id': `${site}/#website` },
    headline: plainHeadline(title),
    description,
    image: images,
    datePublished: toDateTime(publishedAt),
    dateModified: toDateTime(modifiedAt || publishedAt),
    author: {
      '@type': 'Person',
      '@id': `${site}/#person`,
      name: author.name,
      url: author.url ?? site,
    },
    // Same entity as WebSite.publisher; name inline because this page has no Person node
    publisher: {
      '@type': 'Person',
      '@id': 'https://www.grizzlybit.dev/#person',
      name: 'Zubair Ahmed',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
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

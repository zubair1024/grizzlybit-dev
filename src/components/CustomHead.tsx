import defaultTags from 'data/defaultTags';
import { NextSeo } from 'next-seo';

interface CustomHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  cardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
}

const CustomHead = (props: CustomHeadProps) => {
  const {
    title,
    description,
    canonical,
    ogType = 'website',
    ogImage,
    cardType = 'summary_large_image',
    publishedTime,
    modifiedTime,
    author,
    keywords,
  } = props;

  const imageUrl = ogImage ?? defaultTags.image;
  const canonicalUrl = canonical ?? defaultTags.websiteUrl;

  // Build additional meta tags for articles
  const additionalMetaTags = [
    {
      name: 'msapplication-TileColor',
      content: defaultTags.themeColor,
    },
    {
      name: 'theme-color',
      content: defaultTags.themeColor,
    },
    {
      name: 'author',
      content: author ?? defaultTags.author,
    },
  ];

  // Add keywords meta tag if provided
  if (keywords && keywords.length > 0) {
    additionalMetaTags.push({
      name: 'keywords',
      content: keywords.join(', '),
    });
  }

  // Add article-specific meta tags when ogType is 'article'
  if (ogType === 'article') {
    if (publishedTime) {
      additionalMetaTags.push({
        name: 'article:published_time',
        content: publishedTime,
      });
    }
    if (modifiedTime) {
      additionalMetaTags.push({
        name: 'article:modified_time',
        content: modifiedTime,
      });
    }
    if (author) {
      additionalMetaTags.push({
        name: 'article:author',
        content: author,
      });
    }
  }

  return (
    <>
      <NextSeo
        title={title ?? defaultTags.title}
        description={description ?? defaultTags.description}
        canonical={canonicalUrl}
        openGraph={{
          type: ogType,
          url: canonicalUrl,
          title: title ?? defaultTags.title,
          description: description ?? defaultTags.description,
          images: [
            {
              url: imageUrl,
              width: defaultTags.imageWidth,
              height: defaultTags.imageHeight,
              alt: defaultTags.imageAlt,
              type: defaultTags.imageType,
            },
          ],
          siteName: defaultTags.siteName,
          locale: defaultTags.locale,
          ...(ogType === 'article' &&
            publishedTime && {
              article: {
                publishedTime: publishedTime,
                ...(modifiedTime && { modifiedTime: modifiedTime }),
                ...(author && { authors: [author] }),
              },
            }),
        }}
        twitter={{
          handle: defaultTags.twitterHandle,
          site: defaultTags.twitterHandle,
          cardType: cardType,
        }}
        additionalMetaTags={additionalMetaTags}
        additionalLinkTags={[
          {
            rel: 'apple-touch-icon',
            href: '/apple-touch-icon.png',
            sizes: '180x180',
          },
          {
            rel: 'icon',
            type: 'image/png',
            href: '/favicon-32x32.png',
            sizes: '32x32',
          },
          {
            rel: 'icon',
            type: 'image/png',
            href: '/favicon-16x16.png',
            sizes: '16x16',
          },
          {
            rel: 'mask-icon',
            href: '/safari-pinned-tab.svg',
            color: '#5bbad5',
          },
          {
            rel: 'manifest',
            href: '/site.webmanifest',
          },
        ]}
      />
      {/* <GoogleAnalytics /> */}
    </>
  );
};

export default CustomHead;

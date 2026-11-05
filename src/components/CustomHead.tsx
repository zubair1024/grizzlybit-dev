import defaultTags from 'data/defaultTags';
import { generateNextSeo, type NextSeoProps } from 'next-seo/pages';
import Head from 'next/head';

// next-seo 7 dropped the <NextSeo> component for the Pages Router
const NextSeo = (props: NextSeoProps) => <Head>{generateNextSeo(props)}</Head>;

interface CustomHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  // Only pass dimensions/type you know; they're omitted for custom images otherwise.
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogImageType?: string;
  ogImageAlt?: string;
  cardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
  noindex?: boolean;
}

const CustomHead = (props: CustomHeadProps) => {
  const {
    title,
    description,
    canonical,
    ogType = 'website',
    ogImage,
    ogImageWidth,
    ogImageHeight,
    ogImageType,
    ogImageAlt,
    cardType = 'summary_large_image',
    publishedTime,
    modifiedTime,
    author,
    keywords,
    noindex,
  } = props;

  const toAbsolute = (u: string) =>
    u.startsWith('http') ? u : `${defaultTags.websiteUrl}${u}`;
  const imageUrl = ogImage ? toAbsolute(ogImage) : defaultTags.image;
  const ogImageMeta = ogImage
    ? {
        width: ogImageWidth,
        height: ogImageHeight,
        type: ogImageType,
        alt: ogImageAlt ?? title ?? defaultTags.imageAlt,
      }
    : {
        width: defaultTags.imageWidth,
        height: defaultTags.imageHeight,
        type: defaultTags.imageType,
        alt: defaultTags.imageAlt,
      };
  const canonicalUrl = canonical ?? defaultTags.websiteUrl;

  const additionalMetaTags = [
    {
      name: 'msapplication-TileColor',
      content: defaultTags.themeColorLight,
    },
    {
      name: 'author',
      content: author ?? defaultTags.author,
    },
  ];

  if (keywords && keywords.length > 0) {
    additionalMetaTags.push({
      name: 'keywords',
      content: keywords.join(', '),
    });
  }

  // Apply brand suffix on every child page; leave homepage title untouched.
  // Strip trailing slash so '/grizzlybit.dev' and '/grizzlybit.dev/' both match.
  const normalize = (u: string) => u.replace(/\/$/, '');
  const isHomepage =
    !title || normalize(canonicalUrl) === normalize(defaultTags.websiteUrl);
  const resolvedTitle = title ?? defaultTags.title;
  // Drop the brand suffix when it would push the title past ~60 chars (SERP truncation).
  const fitsSuffix =
    defaultTags.titleTemplate.replace('%s', resolvedTitle).length <= 60;
  // '%s' (not undefined): next-seo keeps the last titleTemplate module-wide
  const titleTemplate =
    isHomepage || !fitsSuffix ? '%s' : defaultTags.titleTemplate;

  return (
    <>
      <NextSeo
        title={resolvedTitle}
        titleTemplate={titleTemplate}
        defaultTitle={defaultTags.title}
        description={description ?? defaultTags.description}
        canonical={canonicalUrl}
        noindex={noindex}
        openGraph={{
          type: ogType,
          url: canonicalUrl,
          title: resolvedTitle,
          description: description ?? defaultTags.description,
          images: [{ url: imageUrl, ...ogImageMeta }],
          siteName: defaultTags.siteName,
          locale: defaultTags.locale,
          // next-seo emits these as <meta property="article:*">
          ...(ogType === 'article' && {
            article: {
              ...(publishedTime && { publishedTime }),
              ...(modifiedTime && { modifiedTime }),
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
      {/* next-seo's MetaTag type has no `media`, so theme-color lives here */}
      <Head>
        <meta
          key="theme-color-light"
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content={defaultTags.themeColorLight}
        />
        <meta
          key="theme-color-dark"
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content={defaultTags.themeColorDark}
        />
      </Head>
    </>
  );
};

export default CustomHead;

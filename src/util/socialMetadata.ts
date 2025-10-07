import defaultTags from 'data/defaultTags';

/**
 * Social Media Metadata Helper Utilities
 * Provides helper functions for generating social media meta tags
 */

export interface SocialMetadata {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
}

/**
 * Calculate Open Graph image dimensions based on recommended sizes
 * OG images should be at least 1200x630 pixels for best display
 */
export const getOGImageDimensions = (
  aspectRatio: '1.91:1' | '1:1' | '16:9' = '1.91:1'
): { width: number; height: number } => {
  const dimensions = {
    '1.91:1': { width: 1200, height: 630 }, // Facebook/LinkedIn recommended
    '1:1': { width: 1200, height: 1200 }, // Square format
    '16:9': { width: 1200, height: 675 }, // YouTube thumbnail format
  };

  return dimensions[aspectRatio];
};

/**
 * Generate metadata for website pages (homepage, about, etc.)
 */
export const generateWebsiteMetadata = (
  overrides?: Partial<SocialMetadata>
): SocialMetadata => {
  return {
    title: overrides?.title ?? defaultTags.title,
    description: overrides?.description ?? defaultTags.description,
    image: overrides?.image ?? defaultTags.image,
    imageAlt: overrides?.imageAlt ?? defaultTags.imageAlt,
    url: overrides?.url ?? defaultTags.websiteUrl,
    type: 'website',
    keywords: overrides?.keywords ?? defaultTags.keywords,
  };
};

/**
 * Generate metadata for blog posts/articles
 */
export const generateArticleMetadata = (
  article: {
    title: string;
    description: string;
    slug: string;
    publishedDate?: string;
    modifiedDate?: string;
    author?: string;
    image?: string;
    imageAlt?: string;
    keywords?: string[];
  }
): SocialMetadata => {
  return {
    title: article.title,
    description: article.description,
    image: article.image ?? defaultTags.image,
    imageAlt: article.imageAlt ?? article.title,
    url: `${defaultTags.websiteUrl}/posts/${article.slug}`,
    type: 'article',
    publishedTime: article.publishedDate,
    modifiedTime: article.modifiedDate,
    author: article.author ?? defaultTags.author,
    keywords: article.keywords,
  };
};

/**
 * Generate Twitter card metadata
 */
export const generateTwitterMetadata = (
  metadata: SocialMetadata,
  cardType: 'summary' | 'summary_large_image' = 'summary_large_image'
) => {
  return {
    card: cardType,
    site: defaultTags.twitterHandle,
    creator: defaultTags.twitterCreator,
    title: metadata.title,
    description: metadata.description,
    image: metadata.image ?? defaultTags.image,
    imageAlt: metadata.imageAlt ?? metadata.title,
  };
};

/**
 * Generate LinkedIn-specific metadata
 * LinkedIn uses Open Graph tags but has some specific recommendations
 */
export const generateLinkedInMetadata = (metadata: SocialMetadata) => {
  return {
    'og:title': metadata.title,
    'og:description': metadata.description,
    'og:image': metadata.image ?? defaultTags.image,
    'og:url': metadata.url ?? defaultTags.websiteUrl,
    'og:type': metadata.type ?? 'website',
    'og:site_name': defaultTags.siteName,
    'og:locale': defaultTags.locale,
  };
};

/**
 * Generate comprehensive Open Graph metadata
 */
export const generateOpenGraphMetadata = (
  metadata: SocialMetadata,
  imageWidth?: number,
  imageHeight?: number
) => {
  const dims = imageWidth && imageHeight
    ? { width: imageWidth, height: imageHeight }
    : { width: defaultTags.imageWidth, height: defaultTags.imageHeight };

  const ogMetadata: Record<string, string> = {
    'og:title': metadata.title,
    'og:description': metadata.description,
    'og:image': metadata.image ?? defaultTags.image,
    'og:image:width': dims.width.toString(),
    'og:image:height': dims.height.toString(),
    'og:image:alt': metadata.imageAlt ?? metadata.title,
    'og:url': metadata.url ?? defaultTags.websiteUrl,
    'og:type': metadata.type ?? 'website',
    'og:site_name': defaultTags.siteName,
    'og:locale': defaultTags.locale,
  };

  // Add article-specific metadata
  if (metadata.type === 'article') {
    if (metadata.publishedTime) {
      ogMetadata['article:published_time'] = metadata.publishedTime;
    }
    if (metadata.modifiedTime) {
      ogMetadata['article:modified_time'] = metadata.modifiedTime;
    }
    if (metadata.author) {
      ogMetadata['article:author'] = metadata.author;
    }
  }

  return ogMetadata;
};

/**
 * Validate OG image URL and dimensions
 */
export const validateOGImage = (
  imageUrl: string,
  width: number,
  height: number
): { valid: boolean; warnings: string[] } => {
  const warnings: string[] = [];

  // Check if URL is absolute
  if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
    warnings.push('OG image URL should be absolute (include https://)');
  }

  // Check minimum dimensions
  if (width < 200) {
    warnings.push('Image width should be at least 200px');
  }
  if (height < 200) {
    warnings.push('Image height should be at least 200px');
  }

  // Check recommended dimensions
  if (width < 1200 || height < 630) {
    warnings.push(
      'For best results, use at least 1200x630px (recommended by Facebook/LinkedIn)'
    );
  }

  // Check aspect ratio
  const aspectRatio = width / height;
  if (aspectRatio < 1.5 || aspectRatio > 2.5) {
    warnings.push(
      'Image aspect ratio should be close to 1.91:1 for optimal display'
    );
  }

  return {
    valid: warnings.length === 0,
    warnings,
  };
};

/**
 * Generate OG image path for a blog post
 * This assumes images are stored in /public/og-images/
 */
export const getOGImagePath = (slug: string, useDefault = true): string => {
  const customImagePath = `/og-images/${slug}.png`;
  const defaultImagePath = defaultTags.image;

  // In a real implementation, you'd check if the file exists
  // For now, return the custom path or default
  return useDefault ? defaultImagePath : customImagePath;
};

/**
 * Format ISO date for article metadata
 */
export const formatArticleDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString();
};

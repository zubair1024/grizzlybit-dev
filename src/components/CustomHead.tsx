import defaultTags from 'data/defaultTags';
import { NextSeo } from 'next-seo';

const CustomHead = () => {
  return (
    <NextSeo
      title={defaultTags.title}
      description={defaultTags.description}
      canonical={defaultTags.websiteUrl}
      openGraph={{
        url: defaultTags.websiteUrl,
        title: defaultTags.title,
        description: defaultTags.description,
        images: [
          {
            url: defaultTags.image,
            width: 477,
            height: 91,
            alt: defaultTags.title,
            type: defaultTags.imageType,
          },
        ],
        siteName: defaultTags.title,
      }}
      twitter={{
        handle: defaultTags.twitterHandle,
      }}
    />
  );
};

export default CustomHead;

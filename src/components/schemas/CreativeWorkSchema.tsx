import Head from 'next/head';

interface CreativeWorkSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
}

// Case-study pages: the project as a work authored by the site's Person entity.
const CreativeWorkSchema = ({
  name,
  description,
  url,
  image,
}: CreativeWorkSchemaProps) => {
  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${url}#work`,
    name,
    description,
    url,
    ...(image && { image }),
    author: {
      '@type': 'Person',
      '@id': 'https://www.grizzlybit.dev/#person',
      name: 'Zubair Ahmed',
    },
    inLanguage: 'en-US',
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
    </Head>
  );
};

export default CreativeWorkSchema;

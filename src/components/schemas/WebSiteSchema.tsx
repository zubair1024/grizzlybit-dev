import Head from 'next/head';

const WebSiteSchema = () => {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Zubair Ahmed - grizzlybit.dev',
    url: 'https://www.grizzlybit.dev',
    description:
      'Personal portfolio and blog of Zubair Ahmed, Chief Technology Officer at RAZRLAB. Showcasing software development projects, blog posts, and technical expertise.',
    author: {
      '@type': 'Person',
      name: 'Zubair Ahmed',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.grizzlybit.dev/blog?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-US',
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </Head>
  );
};

export default WebSiteSchema;

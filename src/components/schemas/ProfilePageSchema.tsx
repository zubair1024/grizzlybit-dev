import Head from 'next/head';

// Homepage is Zubair's profile; mainEntity points at the Person node.
const ProfilePageSchema = () => {
  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': 'https://www.grizzlybit.dev/#profilepage',
    url: 'https://www.grizzlybit.dev',
    mainEntity: { '@id': 'https://www.grizzlybit.dev/#person' },
    isPartOf: { '@id': 'https://www.grizzlybit.dev/#website' },
    inLanguage: 'en-US',
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </Head>
  );
};

export default ProfilePageSchema;

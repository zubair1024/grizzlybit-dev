import Head from 'next/head';

const OrganizationSchema = () => {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.grizzlybit.dev/#organization',
    name: 'Grizzlybit',
    alternateName: 'Grizzlybit — Zubair Ahmed',
    url: 'https://www.grizzlybit.dev',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.grizzlybit.dev/grizzlybit-logo-square.png',
      width: 512,
      height: 512,
    },
    description:
      'Grizzlybit is the personal practice of Zubair Ahmed — full-stack software engineering, Node.js, React, TypeScript, and IoT product builds in Dubai.',
    founder: {
      '@type': 'Person',
      '@id': 'https://www.grizzlybit.dev/#person',
      name: 'Zubair Ahmed',
    },
    foundingDate: '2017-03-01',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
    areaServed: 'AE',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: 'https://www.grizzlybit.dev/#contact',
    },
    sameAs: [
      'https://www.linkedin.com/in/zubair1024/',
      'https://twitter.com/zubair1024',
      'https://github.com/zubair1024',
    ],
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </Head>
  );
};

export default OrganizationSchema;

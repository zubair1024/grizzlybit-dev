import Head from 'next/head';

const OrganizationSchema = () => {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RAZRLAB',
    url: 'https://www.grizzlybit.dev',
    logo: 'https://www.grizzlybit.dev/logo.png',
    description:
      'RAZRLAB is a technology company specializing in software development, web applications, mobile applications, and cloud solutions.',
    founder: {
      '@type': 'Person',
      name: 'Zubair Ahmed',
    },
    foundingDate: '2017-03-01',
    employee: {
      '@type': 'Person',
      name: 'Zubair Ahmed',
      jobTitle: 'Chief Technology Officer',
    },
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

import Head from 'next/head';
import socialLinks from 'data/socialLinks';

const PersonSchema = () => {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://www.grizzlybit.dev/#person',
    name: 'Zubair Ahmed',
    alternateName: 'Grizzlybit',
    jobTitle: 'Chief Technology Officer',
    worksFor: {
      '@type': 'Organization',
      '@id': 'https://www.grizzlybit.dev/#organization',
      name: 'RAZRLAB',
    },
    url: 'https://www.grizzlybit.dev',
    sameAs: socialLinks.map((link) => link.url),
    description:
      'Full-stack software engineer and CTO at RAZRLAB. Builds Node.js, React, TypeScript, and IoT products. Based in Dubai, working across web, mobile, and cloud.',
    image: 'https://www.grizzlybit.dev/zubair_2.jpg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
    knowsAbout: [
      'Software Engineering',
      'Full-stack Development',
      'Web Development',
      'Mobile Development',
      'Cloud Architecture',
      'IoT',
      'JavaScript',
      'TypeScript',
      'React',
      'Node.js',
      'Next.js',
    ],
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </Head>
  );
};

export default PersonSchema;

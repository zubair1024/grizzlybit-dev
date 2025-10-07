import Head from 'next/head';
import socialLinks from 'data/socialLinks';

const PersonSchema = () => {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Zubair Ahmed',
    jobTitle: 'Chief Technology Officer',
    worksFor: {
      '@type': 'Organization',
      name: 'RAZRLAB',
    },
    url: 'https://www.grizzlybit.dev',
    sameAs: socialLinks.map((link) => link.url),
    description:
      "I'm a developer, an entrepreneur, an ambitious tweaker, author, traveller and over-scrutinizer. I work at RAZRLAB as the Chief Technology Officer. Since beginning my journey as a software engineer, I've done remote work for agencies, consulted for startups, and collaborated with talented people to create digital products for both business and consumer use. I'm quietly confident, naturally curious, and perpetually working on improving my chops one coding problem at a time.",
    image: 'https://www.grizzlybit.dev/zubair_2.jpg',
    alumniOf: {
      '@type': 'Organization',
      name: 'University',
    },
    knowsAbout: [
      'Software Engineering',
      'Web Development',
      'Mobile Development',
      'Cloud Architecture',
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

import Head from 'next/head';

export interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  items: FAQItem[];
}

const FAQPageSchema = ({ items }: Props) => {
  if (!items || items.length === 0) return null;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: it.answer,
      },
    })),
  };
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
};

export default FAQPageSchema;

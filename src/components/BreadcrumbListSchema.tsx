import Head from 'next/head';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbListSchemaProps {
  items: BreadcrumbItem[];
}

/**
 * BreadcrumbListSchema Component
 * Adds structured data for breadcrumb navigation to improve SEO
 * Learn more: https://schema.org/BreadcrumbList
 */
const BreadcrumbListSchema = ({ items }: BreadcrumbListSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
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

export default BreadcrumbListSchema;

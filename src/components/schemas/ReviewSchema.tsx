import Head from 'next/head';

interface Review {
  name: string;
  company: string;
  designation: string;
  message: string;
  imageUrl: string;
}

interface ReviewSchemaProps {
  reviews: Review[];
}

const ReviewSchema = ({ reviews }: ReviewSchemaProps) => {
  // Calculate aggregate rating based on number of reviews
  // Assuming all reviews are positive (5 stars)
  const aggregateRatingSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Zubair Ahmed',
    url: 'https://www.grizzlybit.dev',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1',
      ratingCount: reviews.length,
      reviewCount: reviews.length,
    },
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.name,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: review.message,
      publisher: {
        '@type': 'Organization',
        name: review.company,
      },
    })),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aggregateRatingSchema),
        }}
      />
    </Head>
  );
};

export default ReviewSchema;

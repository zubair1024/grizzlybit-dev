import Banner from '@/components/Banner';
import BlogSection from '@/components/BlogSection';
import Contact from '@/components/Contact';
import CustomHead from '@/components/CustomHead';
import LazyMount from '@/components/fx/LazyMount';
import Layout from '@/components/Layout';
import PersonSchema from '@/components/schemas/PersonSchema';
import ReviewSchema from '@/components/schemas/ReviewSchema';
import WebSiteSchema from '@/components/schemas/WebSiteSchema';
import Services from '@/components/Services';
import { getBlogPostDataForHome } from '@/util/posts';
import { PostData } from '@/util/types';
import defaultTags from 'data/defaultTags';
import testimonials from 'data/testimonials';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';

const ScrollSignal = dynamic(
  () => import('@/components/fx/ScrollSignal'),
  { ssr: false },
);

const Toolbelt = dynamic(() => import('@/components/Toolbelt'), {
  ssr: false,
  loading: () => <div style={{ minHeight: 600 }} />,
});

const AboutMe = dynamic(() => import('@/components/AboutMe'), {
  ssr: false,
  loading: () => <div style={{ minHeight: 500 }} />,
});

const Portfolio = dynamic(() => import('@/components/Portfolio'), {
  ssr: false,
  loading: () => <div style={{ minHeight: 600 }} />,
});

const Companies = dynamic(() => import('@/components/Companies'), {
  ssr: false,
  loading: () => <div style={{ minHeight: 600 }} />,
});

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  ssr: false,
  loading: () => <div style={{ minHeight: 600 }} />,
});

function Home({ allPostsData }: { allPostsData: PostData[] }) {
  return (
    <>
      <CustomHead
        title={defaultTags.title}
        description={defaultTags.description}
        canonical="https://www.grizzlybit.dev/"
      />
      <PersonSchema />
      <WebSiteSchema />
      <ReviewSchema reviews={testimonials} />
      <Layout>
        <ScrollSignal />
        <main>
          <Banner />
          <Services />
          <LazyMount minHeight="600px">
            <Toolbelt />
          </LazyMount>
          <div className="mx-auto max-w-[1200px] px-4">
            <LazyMount minHeight="500px">
              <AboutMe />
            </LazyMount>
          </div>
          <LazyMount minHeight="600px">
            <Portfolio />
          </LazyMount>
          <LazyMount minHeight="600px">
            <Companies />
          </LazyMount>
          <LazyMount minHeight="600px">
            <Testimonials />
          </LazyMount>
          <BlogSection allPostsData={allPostsData} />
          <Contact />
        </main>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getBlogPostDataForHome();
  return {
    props: {
      allPostsData,
    },
  };
};

export default Home;

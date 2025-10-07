import AboutMe from '@/components/AboutMe';
import Banner from '@/components/Banner';
import BlogSection from '@/components/BlogSection';
import Companies from '@/components/Companies';
import Contact from '@/components/Contact';
import CustomHead from '@/components/CustomHead';
import Layout from '@/components/Layout';
import Portfolio from '@/components/Portfolio';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Toolbelt from '@/components/Toolbelt';
import PersonSchema from '@/components/schemas/PersonSchema';
import WebSiteSchema from '@/components/schemas/WebSiteSchema';
import ReviewSchema from '@/components/schemas/ReviewSchema';
import { getBlogPostDataForHome } from '@/util/posts';
import { PostData } from '@/util/types';
import defaultTags from 'data/defaultTags';
import testimonials from 'data/testimonials';
import { GetStaticProps } from 'next';

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
        <main>
          <Banner></Banner>
          <Services></Services>
          <div className="mx-auto max-w-[1200px] min-h-[100vh]">
            <AboutMe></AboutMe>
          </div>
          <BlogSection allPostsData={allPostsData}></BlogSection>
          <Toolbelt></Toolbelt>
          <Portfolio></Portfolio>
          <Companies></Companies>
          <Testimonials></Testimonials>
          <Contact></Contact>
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

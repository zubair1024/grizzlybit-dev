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
import { getBlogPostDataForHome } from '@/util/posts';
import { PostData } from '@/util/types';
import defaultTags from 'data/defaultTags';
import { GetStaticProps } from 'next';

export default function Home({ allPostsData }: { allPostsData: PostData[] }) {
  return (
    <>
      <CustomHead
        title={defaultTags.title}
        description={defaultTags.description}
      />
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

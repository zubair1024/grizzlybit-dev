import AboutMe from '@/components/AboutMe';
import BadgesSection from '@/components/BadgesSection';
import Banner from '@/components/Banner';
import BlogSection from '@/components/BlogSection';
import Companies from '@/components/Companies';
import Contact from '@/components/Contact';
import CustomHead from '@/components/CustomHead';
import Layout from '@/components/Layout';
import Portfolio from '@/components/Portfolio';
import Services from '@/components/Services';
import Toolbelt from '@/components/Toolbelt';
import { getBlogPostDataForHome } from '@/util/posts';
import { PostData } from '@/util/types';
import { GetStaticProps } from 'next';

export default function Home({ allPostsData }: { allPostsData: PostData[] }) {
  return (
    <>
      <CustomHead />
      <Layout>
        <main>
          <Banner></Banner>
          <Services></Services>
          <div className="mx-auto max-w-[1200px]">
            <AboutMe></AboutMe>
          </div>
          <BlogSection allPostsData={allPostsData}></BlogSection>
          <Toolbelt></Toolbelt>
          <Portfolio></Portfolio>
          <BadgesSection></BadgesSection>
          <Companies></Companies>
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

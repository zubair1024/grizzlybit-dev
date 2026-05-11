import AboutMe from '@/components/AboutMe';
import Banner from '@/components/Banner';
import BlogSection from '@/components/BlogSection';
import Companies from '@/components/Companies';
import Contact from '@/components/Contact';
import CustomHead from '@/components/CustomHead';
import Layout from '@/components/Layout';
import Portfolio from '@/components/Portfolio';
import OrganizationSchema from '@/components/schemas/OrganizationSchema';
import PersonSchema from '@/components/schemas/PersonSchema';
import WebSiteSchema from '@/components/schemas/WebSiteSchema';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Toolbelt from '@/components/Toolbelt';
import { getBlogPostDataForHome } from '@/util/posts';
import { PostData } from '@/util/types';
import defaultTags from 'data/defaultTags';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';

// ScrollSignal is purely visual + uses window APIs; safe to keep client-only.
const ScrollSignal = dynamic(
  () => import('@/components/fx/ScrollSignal'),
  { ssr: false },
);

function Home({ allPostsData }: { allPostsData: PostData[] }) {
  return (
    <>
      <CustomHead
        title={defaultTags.title}
        description={defaultTags.description}
        canonical="https://www.grizzlybit.dev"
      />
      <OrganizationSchema />
      <PersonSchema />
      <WebSiteSchema />
      <Layout>
        <ScrollSignal />
        <main id="main">
          <Banner />
          <Services />
          <Toolbelt />
          <div className="mx-auto max-w-[1200px] px-4">
            <AboutMe />
          </div>
          <Portfolio />
          <Companies />
          <Testimonials />
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

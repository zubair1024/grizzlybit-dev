import AboutMe from '@/components/AboutMe';
import Banner from '@/components/Banner';
import BlogSection from '@/components/BlogSection';
import Companies from '@/components/Companies';
import Contact from '@/components/Contact';
import CustomHead from '@/components/CustomHead';
import GithubActivity from '@/components/GithubActivity';
import Layout from '@/components/Layout';
import Portfolio from '@/components/Portfolio';
import OrganizationSchema from '@/components/schemas/OrganizationSchema';
import PersonSchema from '@/components/schemas/PersonSchema';
import ProfilePageSchema from '@/components/schemas/ProfilePageSchema';
import WebSiteSchema from '@/components/schemas/WebSiteSchema';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Toolbelt from '@/components/Toolbelt';
import { getGithubContributions } from '@/util/github';
import { getBlogPostData } from '@/util/posts';
import { getLinkableTagSlugs } from '@/util/tags';
import { PostData } from '@/util/types';
import type { ContributionDay } from '@/components/ui/contribution-skyline';
import defaultTags from 'data/defaultTags';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';

// ScrollSignal is purely visual + uses window APIs; safe to keep client-only.
const ScrollSignal = dynamic(
  () => import('@/components/fx/ScrollSignal'),
  { ssr: false },
);

function Home({
  allPostsData,
  githubContributions,
}: {
  allPostsData: PostData[];
  githubContributions: ContributionDay[] | null;
}) {
  return (
    <>
      <CustomHead
        title={defaultTags.title}
        description={defaultTags.description}
        canonical="https://www.grizzlybit.dev"
        keywords={defaultTags.keywords}
      />
      <OrganizationSchema />
      <PersonSchema />
      <WebSiteSchema />
      <ProfilePageSchema />
      <Layout>
        <ScrollSignal />
        <main id="main">
          <Banner />
          <Services />
          <Toolbelt />
          <AboutMe />
          {githubContributions && (
            <GithubActivity data={githubContributions} />
          )}
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
  const [posts, githubContributions] = await Promise.all([
    getBlogPostData(),
    getGithubContributions(),
  ]);
  return {
    // Refresh the GitHub graph daily without a redeploy.
    revalidate: 86400,
    props: {
      allPostsData: posts.filter((p) => p.showOnHome === true),
      linkableTags: getLinkableTagSlugs(posts),
      githubContributions,
    },
  };
};

export default Home;

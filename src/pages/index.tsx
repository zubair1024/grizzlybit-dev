import AboutMe from '@/components/AboutMe';
import Banner from '@/components/Banner';
import Companies from '@/components/Companies';
import Contact from '@/components/Contact';
import CustomHead from '@/components/CustomHead';
import Layout from '@/components/Layout';
import Portfolio from '@/components/Portfolio';
import Services from '@/components/Services';
import Toolbelt from '@/components/Toolbelt';

export default function Home() {
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
          <Toolbelt></Toolbelt>
          <Portfolio></Portfolio>
          <Companies></Companies>
          <Contact></Contact>
        </main>
      </Layout>
    </>
  );
}

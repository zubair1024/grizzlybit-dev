import Layout from './Layout';

const BlogPostContainer = ({ content }: { content: JSX.Element }) => {
  return (
    <Layout>
      <div className="max-w-4xl px-5 py-10 mx-auto leading-2 text-lg bg-[#181A1B] prose prose-xl">
        <article>
          <section>{content}</section>
        </article>
      </div>
    </Layout>
  );
};

export default BlogPostContainer;

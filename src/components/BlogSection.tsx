import { trackEvent } from '@/util/ga';
import { PostData } from '@/util/types';
import Link from 'next/link';
import { MButton, MDiv } from './fx/m';

type Props = {
  allPostsData: PostData[];
};

const slugToCmd = (slug: string) => `cat ${slug}.mdx`;

const TerminalCard = ({ post, index }: { post: PostData; index: number }) => {
  return (
    <MDiv
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 130 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        onClick={() =>
          trackEvent('blog_open', {
            slug: post.slug,
            title: post.title,
            position: index + 1,
            location: 'home_blog_section',
          })
        }
      >
        <article className="terminal-window group relative flex h-full flex-col rounded-xl overflow-hidden hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-2 border-b border-white/10 bg-black/40 px-4 py-2.5">
            <span className="terminal-dot bg-[#ff5f56]" />
            <span className="terminal-dot bg-[#ffbd2e]" />
            <span className="terminal-dot bg-[#27c93f]" />
            <span className="ml-3 font-mono text-[11px] text-white/40">
              ~/blog
            </span>
          </div>

          <div className="flex-1 flex flex-col gap-3 p-5 font-mono text-sm">
            <div className="flex items-center gap-2 text-white/40 text-xs">
              <span className="text-brand-cool">zubair</span>
              <span className="text-white/30">@</span>
              <span className="text-brand-haze">grizzlybit</span>
              <span className="text-white/30">:</span>
              <span className="text-brand-glow">~/blog</span>
              <span className="text-white/30">$</span>
            </div>

            <div className="text-white/90 break-all">
              <span className="text-brand-glow">$</span>{' '}
              <span className="text-white">{slugToCmd(post.slug)}</span>
              <span className="inline-block w-2 h-4 ml-1 bg-brand-glow align-middle animate-caret" />
            </div>

            <h3 className="mt-2 text-base md:text-lg font-mono text-white leading-snug line-clamp-3 group-hover:text-brand-glow transition-colors">
              {post.title}
            </h3>

            <p className="text-xs text-white/55 line-clamp-3 leading-relaxed">
              {post.summary}
            </p>

            <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/5 text-[11px] text-white/40">
              <span>{post.publishedAt}</span>
              {post.readingTime && <span>{post.readingTime}</span>}
            </div>
          </div>
        </article>
      </Link>
    </MDiv>
  );
};

const BlogSection = ({ allPostsData }: Props) => {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center mb-12">
          <p className="font-mono text-xs tracking-[0.3em] text-brand-glow uppercase">
            Writing
          </p>
          <h2 className="mt-2 font-mono text-2xl md:text-3xl tracking-wider uppercase text-white">
            Blog
          </h2>
          <p className="mt-3 font-mono text-sm text-white/50">
            Notes from the terminal.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {allPostsData.map((item, i) => (
            <TerminalCard key={item.slug} post={item} index={i} />
          ))}
        </div>
        <div className="mt-12 flex items-center justify-center">
          <Link
            href="/blog"
            onClick={() =>
              trackEvent('cta_click', {
                cta: 'view_all_posts',
                location: 'home_blog_section',
              })
            }
          >
            <MButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group relative rounded-lg border border-white/15 bg-black/40 px-6 py-3 font-mono text-sm text-white backdrop-blur-sm overflow-hidden"
            >
              <span className="relative flex items-center gap-2">
                <span className="text-brand-glow">$</span>
                <span>ls posts/</span>
                <span className="text-white/40 group-hover:text-brand-glow transition-colors">
                  →
                </span>
              </span>
              <span
                aria-hidden
                className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    'radial-gradient(120px circle at 50% 50%, rgba(242,140,24,0.25), transparent 70%)',
                }}
              />
            </MButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

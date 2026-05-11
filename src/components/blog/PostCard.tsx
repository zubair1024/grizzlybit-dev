import { MDiv } from '@/components/fx/m';
import { trackEvent } from '@/util/ga';
import { PostData } from '@/util/types';
import Link from 'next/link';

const slugToCmd = (slug: string) => `cat ${slug}.mdx`;

export const PostCard = ({
  data,
  index = 0,
  location = 'blog_index',
}: {
  data: PostData;
  index?: number;
  location?: string;
}) => {
  return (
    <MDiv
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        delay: (index % 8) * 0.05,
        type: 'spring',
        stiffness: 130,
        damping: 18,
      }}
      className="mb-5 break-inside-avoid"
    >
      <Link
        href={`/blog/${data.slug}`}
        onClick={() =>
          trackEvent('blog_open', {
            slug: data.slug,
            title: data.title,
            position: index + 1,
            location,
          })
        }
      >
        <article className="terminal-window group relative flex flex-col rounded-xl overflow-hidden hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-2 border-b border-white/10 bg-black/40 px-4 py-2.5">
            <span className="terminal-dot bg-[#ff5f56]" />
            <span className="terminal-dot bg-[#ffbd2e]" />
            <span className="terminal-dot bg-[#27c93f]" />
            <span className="ml-3 font-mono text-[11px] text-white/40 truncate">
              ~/blog/{data.slug}.mdx
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

            <div className="text-white/90 break-all leading-relaxed">
              <span className="text-brand-glow">$</span>{' '}
              <span className="text-white">{slugToCmd(data.slug)}</span>
              <span className="inline-block w-2 h-4 ml-1 bg-brand-glow align-middle animate-caret" />
            </div>

            <h3 className="mt-1 text-base md:text-lg font-mono text-white leading-snug line-clamp-3 group-hover:text-brand-glow transition-colors">
              {data.title}
            </h3>

            <p className="text-xs text-white/70 line-clamp-4 leading-relaxed">
              {data.summary}
            </p>

            {data.keywords && data.keywords.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1" aria-hidden="true">
                {data.keywords.slice(0, 3).map((k) => (
                  <span
                    key={k}
                    className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/75"
                  >
                    #{k}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/5 text-[11px] text-white/60">
              <span>{data.publishedAt}</span>
              {data.readingTime && <span>{data.readingTime}</span>}
            </div>
          </div>
        </article>
      </Link>
    </MDiv>
  );
};

export default PostCard;

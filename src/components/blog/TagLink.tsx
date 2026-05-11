import { tagToSlug } from '@/util/tags';
import Link from 'next/link';

export const TagLink = ({ tag }: { tag: string }) => (
  <Link
    href={`/blog/tag/${tagToSlug(tag)}`}
    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-[12px] text-white/80 hover:border-brand-glow/60 hover:text-brand-glow hover:bg-brand-glow/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-glow transition-colors"
  >
    #{tag}
  </Link>
);

export default TagLink;

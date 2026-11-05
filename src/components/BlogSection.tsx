import { PostCard } from '@/components/blog/PostCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/util/ga';
import { PostData } from '@/util/types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Reveal, Section } from './Section';

type Props = {
  allPostsData: PostData[];
};

// 6 posts max; only the first 3 are shown on mobile (rest stay in the HTML).
const MAX_POSTS = 6;
const MOBILE_POSTS = 3;

const BlogSection = ({ allPostsData }: Props) => (
  <Section
    id="blog"
    title="Engineering blog: Node.js, React and TypeScript"
    intro="Notes on building software, leading teams and shipping IoT products."
  >
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {allPostsData.slice(0, MAX_POSTS).map((post, i) => (
        <li
          key={post.slug}
          className={cn(i >= MOBILE_POSTS && 'hidden md:block')}
        >
          <Reveal delay={Math.min(i * 0.04, 0.3)} className="h-full">
            <PostCard
              data={post}
              index={i}
              location="home_blog_section"
              headingLevel="h3"
            />
          </Reveal>
        </li>
      ))}
    </ul>
    <div className="mt-12 flex justify-center">
      <Button asChild size="lg">
        <Link
          href="/blog"
          onClick={() =>
            trackEvent('cta_click', {
              cta: 'view_all_posts',
              location: 'home_blog_section',
            })
          }
        >
          Read all articles
          <ArrowRight aria-hidden data-icon="inline-end" />
        </Link>
      </Button>
    </div>
  </Section>
);

export default BlogSection;

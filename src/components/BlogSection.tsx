import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { trackEvent } from '@/util/ga';
import { PostData } from '@/util/types';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal, Section } from './Section';

type Props = {
  allPostsData: PostData[];
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });

const BlogSection = ({ allPostsData }: Props) => (
  <Section
    id="blog"
    eyebrow="Blog"
    title="Engineering blog: Node.js, React and TypeScript"
    intro="Notes on building software, leading teams and shipping IoT products."
  >
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {allPostsData.map((post, i) => (
        <li key={post.slug}>
          <Reveal delay={Math.min(i * 0.04, 0.3)} className="h-full">
            <article className="h-full">
              <Card className="relative h-full gap-0 py-0 transition-all has-[a:hover]:translate-x-1 has-[a:hover]:translate-y-1 has-[a:hover]:shadow-none has-[a:focus-visible]:ring-3 has-[a:focus-visible]:ring-ring/60">
                <div className="relative aspect-video overflow-hidden border-b-2 border-border bg-muted">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 264px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <p className="font-mono text-xs text-muted-foreground">
                    <time dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
                    {post.readingTime && <> · {post.readingTime}</>}
                  </p>
                  <h3 className="text-lg leading-snug font-bold">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="after:absolute after:inset-0 focus-visible:outline-none"
                      onClick={() =>
                        trackEvent('blog_open', {
                          slug: post.slug,
                          title: post.title,
                          position: i + 1,
                          location: 'home_blog_section',
                        })
                      }
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="line-clamp-3 text-base text-muted-foreground">
                    {post.summary}
                  </p>
                  {post.keywords && post.keywords.length > 0 && (
                    <ul
                      aria-label="Tags"
                      className="mt-auto flex flex-wrap gap-2 pt-2"
                    >
                      {post.keywords.slice(0, 3).map((tag) => (
                        <li key={tag}>
                          <Badge variant="outline">{tag}</Badge>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Card>
            </article>
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

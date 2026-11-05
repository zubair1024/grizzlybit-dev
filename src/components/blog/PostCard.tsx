import { PostDate } from '@/components/blog/PostDate';
import { TagLink } from '@/components/blog/TagLink';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/util/ga';
import { PostData } from '@/util/types';
import { FileTextIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  data: PostData;
  index?: number;
  location?: string;
  headingLevel?: 'h2' | 'h3';
  className?: string;
};

// Stretched title link covers the card; tag links sit above it (z-10) so
// there are no nested anchors.
export const PostCard = ({
  data,
  index = 0,
  location = 'blog_index',
  headingLevel: Heading = 'h3',
  className,
}: Props) => (
  <article className={cn('h-full', className)}>
    <Card
      className={cn(
        'relative h-full gap-4 transition-all focus-within:ring-3 focus-within:ring-ring hover:shadow-none motion-safe:hover:translate-x-1 motion-safe:hover:translate-y-1',
        !data.image && 'pt-0',
      )}
    >
      {data.image ? (
        <Image
          src={data.image}
          alt=""
          width={800}
          height={350}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="aspect-[16/7] w-full border-b-2 border-border object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex aspect-[16/7] w-full items-center justify-center border-b-2 border-border bg-muted text-muted-foreground"
        >
          <FileTextIcon className="size-12" strokeWidth={1.5} />
        </div>
      )}
      <CardContent className="flex flex-1 flex-col gap-3">
        <p className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
          <PostDate date={data.publishedAt} />
          {data.readingTime && (
            <>
              <span aria-hidden="true">·</span>
              <span>{data.readingTime}</span>
            </>
          )}
        </p>
        <Heading className="text-xl leading-snug font-bold text-balance">
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
            className="outline-none after:absolute after:inset-0"
          >
            {data.title}
          </Link>
        </Heading>
        <p className="line-clamp-3 text-base text-muted-foreground">
          {data.summary}
        </p>
      </CardContent>
      {data.keywords && data.keywords.length > 0 && (
        <CardFooter className="mt-auto border-border">
          <ul className="flex flex-wrap gap-2" aria-label="Tags">
            {data.keywords.slice(0, 3).map((k) => (
              <li key={k}>
                <TagLink tag={k} className="relative z-10" />
              </li>
            ))}
          </ul>
        </CardFooter>
      )}
    </Card>
  </article>
);

export default PostCard;

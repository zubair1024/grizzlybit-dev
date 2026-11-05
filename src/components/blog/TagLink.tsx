import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { tagToSlug } from '@/util/tags';
import Link from 'next/link';
import { createContext, useContext } from 'react';

// Proper casing for tech words that sentence case alone gets wrong.
const WORDS: Record<string, string> = {
  aws: 'AWS',
  devops: 'DevOps',
  lts: 'LTS',
  docker: 'Docker',
  es6: 'ES6',
  iot: 'IoT',
  javascript: 'JavaScript',
  linux: 'Linux',
  nextjs: 'Next.js',
  nodejs: 'Node.js',
  openvpn: 'OpenVPN',
  osm: 'OSM',
  pgp: 'PGP',
  pki: 'PKI',
  pm2: 'PM2',
  react: 'React',
  seo: 'SEO',
  smtp: 'SMTP',
  ssh: 'SSH',
  ssr: 'SSR',
  tls: 'TLS',
  typescript: 'TypeScript',
  ubuntu: 'Ubuntu',
  v8: 'V8',
  vpn: 'VPN',
  vscode: 'VS Code',
};

export const formatTag = (tag: string) => {
  const label = tag
    .trim()
    .split(/\s+/)
    .map((w) => WORDS[w.toLowerCase()] ?? w)
    .join(' ');
  return label.charAt(0).toUpperCase() + label.slice(1);
};

// Slugs of tags whose pages are indexable (2+ posts). Provided from
// `pageProps.linkableTags` in _app; when a page doesn't supply it (null),
// every tag stays a link.
export const LinkableTagsContext = createContext<ReadonlySet<string> | null>(
  null,
);

export const TagLink = ({
  tag,
  className,
}: {
  tag: string;
  className?: string;
}) => {
  const linkable = useContext(LinkableTagsContext);
  const slug = tagToSlug(tag);
  const classes = cn('h-auto min-h-8 px-3 text-sm', className);

  if (linkable && !linkable.has(slug)) {
    return (
      <Badge variant="outline" className={classes}>
        {formatTag(tag)}
      </Badge>
    );
  }

  return (
    <Badge asChild variant="outline" className={classes}>
      <Link href={`/blog/tag/${slug}`}>{formatTag(tag)}</Link>
    </Badge>
  );
};

export default TagLink;

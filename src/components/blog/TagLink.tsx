import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { tagToSlug } from '@/util/tags';
import Link from 'next/link';

// Proper casing for tech words that sentence case alone gets wrong.
const WORDS: Record<string, string> = {
  aws: 'AWS',
  devops: 'DevOps',
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

export const TagLink = ({
  tag,
  className,
}: {
  tag: string;
  className?: string;
}) => (
  <Badge
    asChild
    variant="outline"
    className={cn('h-auto min-h-8 px-3 text-sm', className)}
  >
    <Link href={`/blog/tag/${tagToSlug(tag)}`}>{formatTag(tag)}</Link>
  </Badge>
);

export default TagLink;

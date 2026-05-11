#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SITE = 'https://www.grizzlybit.dev';
const postsDir = path.join(__dirname, '..', 'src', 'posts');
const publicDir = path.join(__dirname, '..', 'public');

const esc = (s = '') =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

// CDATA can't contain `]]>` — split and rejoin if present
const cdataSafe = (s = '') => s.split(']]>').join(']]]]><![CDATA[>');

const mimeFromExt = (p = '') => {
  const ext = p.split('.').pop().toLowerCase();
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
  if (ext === 'webp') return 'image/webp';
  if (ext === 'gif') return 'image/gif';
  if (ext === 'svg') return 'image/svg+xml';
  return 'image/png';
};

const posts = fs
  .readdirSync(postsDir)
  .filter((f) => f.endsWith('.mdx'))
  .map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const { data } = matter(fs.readFileSync(path.join(postsDir, file), 'utf8'));
    return {
      slug,
      title: data.title || slug,
      summary: data.summary || data.description || '',
      publishedAt: data.publishedAt,
      lastModified: data.lastModified,
      author: data.author || 'Zubair Ahmed',
      image: data.image,
      keywords: data.keywords || [],
    };
  })
  .filter((p) => {
    if (!p.publishedAt) {
      console.warn(`SKIP ${p.slug} — missing publishedAt`);
      return false;
    }
    const d = new Date(p.publishedAt);
    if (Number.isNaN(d.getTime())) {
      console.warn(`SKIP ${p.slug} — invalid publishedAt: ${p.publishedAt}`);
      return false;
    }
    return true;
  })
  .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

const items = posts
  .map((p) => {
    const url = `${SITE}/blog/${p.slug}`;
    const img = p.image
      ? p.image.startsWith('http')
        ? p.image
        : `${SITE}${p.image}`
      : null;
    const pubDate = new Date(p.publishedAt).toUTCString();
    return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>noreply@grizzlybit.dev (${esc(p.author)})</author>
      <description><![CDATA[${cdataSafe(p.summary)}]]></description>${
      img
        ? `\n      <enclosure url="${esc(img)}" type="${mimeFromExt(img)}" />`
        : ''
    }${p.keywords.map((k) => `\n      <category>${esc(k)}</category>`).join('')}
    </item>`;
  })
  .join('\n');

const lastBuild = new Date().toUTCString();
const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Grizzlybit — Zubair Ahmed</title>
    <link>${SITE}</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Engineering blog of Zubair Ahmed (Grizzlybit) — Node.js, React, TypeScript, IoT, and full-stack engineering.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>
`;

fs.writeFileSync(path.join(publicDir, 'rss.xml'), rss);
console.log(`Wrote rss.xml with ${posts.length} items.`);

// Strip deprecated `Host:` directive that next-sitemap hardcodes.
const robotsPath = path.join(publicDir, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const before = fs.readFileSync(robotsPath, 'utf8');
  const after = before.replace(/\n# Host\nHost: [^\n]+\n/, '\n');
  if (before !== after) {
    fs.writeFileSync(robotsPath, after);
    console.log('Stripped deprecated Host: directive from robots.txt');
  }
}


#!/usr/bin/env node
/**
 * Pings IndexNow (Bing, Yandex, Seznam, Naver...) with recently changed URLs.
 *
 *   node scripts/indexnow.js              submit
 *   node scripts/indexnow.js --dry-run    print URLs only
 *   node scripts/indexnow.js --self-test  check the sitemap filter
 *
 * Run by .github/workflows/indexnow.yml after a successful Vercel production
 * deploy, so every submitted URL is already live. Reads the live sitemap and
 * submits entries whose <lastmod> is within the last DAYS days. <lastmod>
 * comes from frontmatter, so bump `lastModified` when editing a post.
 *
 * ponytail: resubmits the same URLs on every deploy inside the window; diff
 * against the previous deploy's sitemap if that ever gets rate limited.
 */
const assert = require('assert');

const SITE = 'https://www.grizzlybit.dev';
const KEY = 'ae4eeb39423ddff4632786a5cd80abf4'; // public/<KEY>.txt
const DAYS = 7;

const recentUrls = (xml, now = Date.now(), days = DAYS) =>
  [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)]
    .map(([, entry]) => ({
      loc: entry.match(/<loc>([^<]+)<\/loc>/)?.[1],
      lastmod: Date.parse(entry.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]),
    }))
    .filter(({ loc, lastmod }) => loc && now - lastmod <= days * 864e5)
    .map(({ loc }) => loc);

const selfTest = () => {
  const now = Date.parse('2026-11-10T00:00:00Z');
  const xml = `
    <url><loc>${SITE}/new</loc><lastmod>2026-11-07T00:00:00+04:00</lastmod></url>
    <url><loc>${SITE}/old</loc><lastmod>2025-01-01</lastmod></url>
    <url><loc>${SITE}/no-date</loc></url>`;
  assert.deepStrictEqual(recentUrls(xml, now), [`${SITE}/new`]);
  console.log('[indexnow] self-test ok');
};

const main = async () => {
  if (process.argv.includes('--self-test')) return selfTest();

  const res = await fetch(`${SITE}/sitemap-0.xml`);
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
  const urlList = recentUrls(await res.text());
  console.log(`[indexnow] ${urlList.length} recent URL(s)`, urlList);
  if (!urlList.length || process.argv.includes('--dry-run')) return;

  const ping = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(SITE).host,
      key: KEY,
      keyLocation: `${SITE}/${KEY}.txt`,
      urlList,
    }),
  });
  // 200 = accepted, 202 = accepted, key validation pending.
  // 429 = same URLs sent too often (redeploys inside the window); not fatal.
  if (ping.status === 429) return console.warn('[indexnow] rate limited (429)');
  if (!ping.ok)
    throw new Error(`indexnow ${ping.status}: ${await ping.text()}`);
  console.log(`[indexnow] submitted (${ping.status})`);
};

main().catch((e) => {
  console.error('[indexnow]', e.message);
  process.exit(1);
});

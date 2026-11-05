#!/usr/bin/env node
/**
 * One-off Open Graph / cover image generator (not part of the build).
 *
 *   node scripts/generate-og.js
 *
 * Renders neo-brutalist SVG cards to PNG with sharp and writes:
 *   public/og-images/default.png                 site-wide fallback
 *   public/og-images/blog/<slug>.png             one per src/posts/*.mdx
 *   public/og-images/portfolio/<slug>.png        one per src/data/portfolioMetadata.ts entry
 *   public/blog/whats-new-in-nodejs-24/cover.png in-post cover for the Node 24 post
 *
 * Re-run after adding a post or project and commit the PNGs.
 */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const OUT = path.join(PUBLIC, 'og-images');

const W = 1200;
const H = 630;

// Theme tokens from src/styles/globals.css (oklch converted to sRGB).
const C = {
  bg: '#f4f1de', // --muted
  card: '#ffffff',
  ink: '#000000',
  red: '#ff3333', // --primary
  yellow: '#ffff00', // --secondary
  blue: '#0066ff', // --accent
};

const SANS = 'DM Sans, Helvetica Neue, Helvetica, Arial, sans-serif';
const MONO = 'Space Mono, Menlo, Courier New, monospace';
const LABEL = 'grizzlybit.dev · Zubair Ahmed';

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const stripEmoji = (s) =>
  s
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/[‍️\u{1f3fb}-\u{1f3ff}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();

// Measure rendered text width with Pango (the same engine librsvg uses for SVG
// text), so wrapping is based on real glyph widths, not a char-count guess.
const widthCache = new Map();
async function textWidth(text, size, weight = 'Bold') {
  const key = `${size}|${weight}|${text}`;
  if (widthCache.has(key)) return widthCache.get(key);
  const { info } = await sharp({
    text: {
      text: esc(text),
      font: `${SANS.replace(/, sans-serif$/, '')} ${weight} ${size}`,
      dpi: 72,
    },
  })
    .png()
    .toBuffer({ resolveWithObject: true });
  widthCache.set(key, info.width);
  return info.width;
}

async function wrap(text, size, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (!line || (await textWidth(next, size)) <= maxWidth) {
      line = next;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  const widest = Math.max(
    ...(await Promise.all(lines.map((l) => textWidth(l, size)))),
  );
  return { lines, fits: widest <= maxWidth };
}

// Largest size (from `sizes`) at which the title wraps into <= maxLines.
async function fitTitle(text, maxWidth, sizes, maxLines = 3) {
  for (const size of sizes) {
    const { lines, fits } = await wrap(text, size, maxWidth);
    if (fits && lines.length <= maxLines) return { lines, size };
  }
  throw new Error(`Title does not fit in ${maxLines} lines: "${text}"`);
}

const titleTspans = (lines, x, y, size, lh = 1.12) =>
  lines
    .map(
      (l, i) =>
        `<text x="${x}" y="${y + i * size * lh}" font-family="${SANS}" font-weight="700" font-size="${size}" fill="${C.ink}">${esc(l)}</text>`,
    )
    .join('');

// Black box with a hard offset shadow (the site's Card).
const box = (x, y, w, h, fill, { border = 6, shadow = 16 } = {}) =>
  `<rect x="${x + shadow}" y="${y + shadow}" width="${w}" height="${h}" fill="${C.ink}"/>` +
  `<rect x="${x + border / 2}" y="${y + border / 2}" width="${w - border}" height="${h - border}" fill="${fill}" stroke="${C.ink}" stroke-width="${border}"/>`;

const kicker = (x, y, text, fill = C.yellow) => {
  const w = Math.round(text.length * 15.6 + 36);
  return (
    `<rect x="${x}" y="${y}" width="${w}" height="46" fill="${fill}" stroke="${C.ink}" stroke-width="4"/>` +
    `<text x="${x + 18}" y="${y + 31}" font-family="${MONO}" font-weight="700" font-size="24" fill="${C.ink}">${esc(text)}</text>`
  );
};

const footer = (x, y) =>
  `<text x="${x}" y="${y}" font-family="${MONO}" font-weight="700" font-size="26" fill="${C.ink}">${esc(LABEL)}</text>`;

const svgDoc = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="${C.bg}"/>${body}</svg>`;

async function writePng(file, svg, overlays = []) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  await sharp(Buffer.from(svg))
    .composite(overlays)
    .png({ compressionLevel: 9, palette: overlays.length === 0 })
    .toFile(file);
  console.log('wrote', path.relative(ROOT, file));
}

// Card layout shared by default / blog / portfolio: card at (CX, CY).
const CX = 48;
const CY = 48;
const CH = H - CY * 2 - 16;

async function textCard({ title, tag, contentWidth, sizes }) {
  const cw = contentWidth + 120;
  const { lines, size } = await fitTitle(title, contentWidth, sizes);
  const blockH = size * 1.12 * (lines.length - 1) + size;
  // Vertically centre the title between kicker and footer.
  const top = CY + 130;
  const bottom = CY + CH - 90;
  const y = Math.round(top + (bottom - top - blockH) / 2 + size * 0.8);
  return (
    box(CX, CY, cw, CH, C.card) +
    kicker(CX + 60, CY + 52, tag) +
    titleTspans(lines, CX + 60, y, size) +
    footer(CX + 60, CY + CH - 50)
  );
}

async function blogCard(title) {
  const body =
    (await textCard({
      title,
      tag: 'BLOG',
      contentWidth: W - CX * 2 - 16 - 120,
      sizes: [72, 66, 60, 54, 48],
    })) +
    // Accent blocks, top-right corner of the card.
    `<rect x="${W - CX - 16 - 150}" y="${CY + 52}" width="46" height="46" fill="${C.red}" stroke="${C.ink}" stroke-width="4"/>` +
    `<rect x="${W - CX - 16 - 96}" y="${CY + 52}" width="46" height="46" fill="${C.blue}" stroke="${C.ink}" stroke-width="4"/>`;
  return svgDoc(W, H, body);
}

async function defaultCard() {
  const avatar = path.join(PUBLIC, 'zubair_avatar.png');
  const aw = 320;
  const ah = 410;
  const ax = W - CX - 16 - aw;
  const ay = (H - ah) / 2 - 8;
  const body =
    (await textCard({
      title: 'Zubair Ahmed — full-stack engineer & CTO in Dubai',
      tag: 'GRIZZLYBIT.DEV',
      contentWidth: ax - CX - 120 - 40,
      sizes: [64, 58, 52],
    })) + box(ax, ay, aw, ah, C.yellow, { border: 6, shadow: 14 });
  const img = await sharp(avatar)
    .resize(aw - 40, ah - 30, {
      fit: 'contain',
      position: 'bottom',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();
  return [svgDoc(W, H, body), [{ input: img, left: ax + 20, top: ay + 24 }]];
}

async function portfolioCard(title, screenshot) {
  const sh = 520; // screenshot frame height incl. border
  const meta = await sharp(screenshot).metadata();
  const inner = sh - 12;
  const sw = Math.round((meta.width / meta.height) * inner) + 12;
  const sx = W - CX - 16 - sw + 24;
  const sy = (H - sh) / 2 - 8;
  const cardW = sx - CX + 40; // card runs under the screenshot
  const body =
    box(CX, CY, cardW, CH, C.card) +
    kicker(CX + 60, CY + 52, 'CASE STUDY') +
    (await (async () => {
      const contentWidth = sx - CX - 60 - 48;
      const { lines, size } = await fitTitle(
        title,
        contentWidth,
        [64, 58, 52, 46, 42],
      );
      const blockH = size * 1.12 * (lines.length - 1) + size;
      const top = CY + 130;
      const bottom = CY + CH - 90;
      const y = Math.round(top + (bottom - top - blockH) / 2 + size * 0.8);
      return titleTspans(lines, CX + 60, y, size);
    })()) +
    footer(CX + 60, CY + CH - 50) +
    box(sx, sy, sw, sh, C.card, { border: 6, shadow: 14 });
  const img = await sharp(screenshot)
    .resize(sw - 12, inner, { fit: 'fill' })
    .toBuffer();
  return [svgDoc(W, H, body), [{ input: img, left: sx + 6, top: sy + 6 }]];
}

async function node24Cover() {
  // Same 1012x362 ratio as the other post covers, rendered at 2x.
  const w = 2024;
  const h = 724;
  const body =
    box(56, 56, w - 140, h - 140, C.card, { border: 10, shadow: 28 }) +
    `<rect x="${w - 84 - 360}" y="56" width="360" height="${h - 140}" fill="${C.yellow}" stroke="${C.ink}" stroke-width="10"/>` +
    `<text x="${w - 84 - 180}" y="${h / 2 + 52}" text-anchor="middle" font-family="${SANS}" font-weight="700" font-size="200" fill="${C.ink}">24</text>` +
    `<rect x="136" y="136" width="230" height="76" fill="${C.red}" stroke="${C.ink}" stroke-width="6"/>` +
    `<text x="164" y="188" font-family="${MONO}" font-weight="700" font-size="40" fill="${C.ink}">NODE.JS</text>` +
    `<text x="136" y="${h / 2 + 70}" font-family="${SANS}" font-weight="700" font-size="112" fill="${C.ink}">What’s new in Node.js</text>` +
    `<text x="136" y="${h - 150}" font-family="${MONO}" font-weight="700" font-size="44" fill="${C.ink}">features · breaking changes · upgrade guide</text>`;
  return svgDoc(w, h, body);
}

async function main() {
  const only = process.argv[2]; // optional: default | blog | portfolio | cover

  if (!only || only === 'default') {
    const [svg, overlays] = await defaultCard();
    await writePng(path.join(OUT, 'default.png'), svg, overlays);
  }

  if (!only || only === 'blog') {
    const postsDir = path.join(ROOT, 'src/posts');
    for (const file of fs
      .readdirSync(postsDir)
      .filter((f) => f.endsWith('.mdx'))) {
      const slug = file.replace(/\.mdx$/, '');
      const { data } = matter(
        fs.readFileSync(path.join(postsDir, file), 'utf8'),
      );
      const title = stripEmoji(data.seoTitle ?? data.title);
      await writePng(
        path.join(OUT, 'blog', `${slug}.png`),
        await blogCard(title),
      );
    }
  }

  if (!only || only === 'portfolio') {
    // Titles from portfolioMetadata.ts, screenshots from data/portfolio.ts.
    const metaSrc = fs.readFileSync(
      path.join(ROOT, 'src/data/portfolioMetadata.ts'),
      'utf8',
    );
    const listSrc = fs.readFileSync(
      path.join(ROOT, 'data/portfolio.ts'),
      'utf8',
    );
    const shots = {};
    for (const m of listSrc.matchAll(
      /img:\s*'([^']+)',\s*url:\s*'\/portfolio\/([^']+)'/g,
    )) {
      shots[m[2]] = m[1];
    }
    for (const m of metaSrc.matchAll(
      /slug:\s*'([^']+)',\s*title:\s*'((?:[^'\\]|\\.)+)'/g,
    )) {
      const [, slug, rawTitle] = m;
      if (!shots[slug])
        throw new Error(`No screenshot in data/portfolio.ts for ${slug}`);
      const [svg, overlays] = await portfolioCard(
        rawTitle.replace(/\\'/g, "'"),
        path.join(PUBLIC, shots[slug]),
      );
      await writePng(path.join(OUT, 'portfolio', `${slug}.png`), svg, overlays);
    }
  }

  if (!only || only === 'cover') {
    await writePng(
      path.join(PUBLIC, 'blog/whats-new-in-nodejs-24/cover.png'),
      await node24Cover(),
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

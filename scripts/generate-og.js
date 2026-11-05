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
 *   public/blog/<slug>/cover.png                 in-post cover + card thumbnail per post
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

// In-post covers (also the blog card thumbnails): 1012x362 ratio at 2x.
// kicker = topic chip, title = short headline (≤2 lines), glyph = big side
// panel text, sub = mono tagline. Panel colour groups topics.
const COVERS = {
  'whats-new-in-nodejs-24': [
    'NODE.JS',
    'What’s new in Node.js',
    '24',
    'features · breaking changes · upgrade guide',
  ],
  'nodejs-util-promisify': [
    'NODE.JS',
    'util.promisify()',
    '8',
    'callbacks · promises · async/await',
  ],
  'increase-nodejs-memory-limit': [
    'NODE.JS',
    'Increase the Node.js memory limit',
    'RAM',
    'max-old-space-size · v8 · pm2',
  ],
  'how-to-ssh-using-nodejs': [
    'NODE.JS',
    'SSH using Node.js',
    'SSH',
    'node-ssh · remote commands · automation',
  ],
  'how-send-csv-files-with-nodemailer': [
    'NODE.JS',
    'Send CSV files with Nodemailer',
    'CSV',
    'nodemailer · attachments · smtp',
  ],
  'easy-pgp-encryption-using-nodejs': [
    'NODE.JS',
    'Easy PGP encryption',
    'PGP',
    'openpgp · keys · encrypt & decrypt',
  ],
  'easy-remote-debugging-nodejs-using-vscode': [
    'NODE.JS',
    'Remote debugging with VS Code',
    'VS',
    'inspector · ssh tunnel · breakpoints',
  ],
  'javascript-promises-promise-all-promise-allsettled-promise-race-promise-any':
    [
      'JAVASCRIPT',
      'Promise all, allSettled, race & any',
      'JS',
      'promises · async · combinators',
    ],
  'get-query-string-parameters': [
    'JAVASCRIPT',
    'GET query string parameters',
    '?=',
    'urls · parsing · utility function',
  ],
  'yarn-on-the-rise': [
    'JAVASCRIPT',
    'Yarn on the rise',
    'yarn',
    'package managers · npm · dependencies',
  ],
  'how-to-create-an-ssh-tarpit': [
    'SECURITY',
    'Create an SSH tarpit',
    '22',
    'endlessh · linux · slow down bots',
  ],
  'how-to-generate-keys-for-mutual-tls-authentication': [
    'SECURITY',
    'Keys for mutual TLS authentication',
    'mTLS',
    'openssl · certificates · client auth',
  ],
  'how-to-install-openvpn-using-docker': [
    'DEVOPS',
    'Install OpenVPN using Docker',
    'VPN',
    'openvpn · docker · self-hosted',
  ],
  'install-docker-on-ubuntu-18': [
    'DEVOPS',
    'Install Docker on Ubuntu',
    '18.04',
    'docker · ubuntu · containers',
  ],
  'setup-openstreemaps-tile-server-on-ubuntu': [
    'MAPS',
    'OpenStreetMap tile server',
    'OSM',
    'ubuntu · tiles · self-hosted maps',
  ],
  'how-to-use-screen-on-linux-to-detach-and-reattach-your-terminal': [
    'LINUX',
    'Detach and reattach with screen',
    '^A',
    'screen · sessions · terminal',
  ],
  'how-to-use-tee-on-linux': [
    'LINUX',
    'How to use tee on Linux',
    'tee',
    'stdout · files · pipelines',
  ],
  'my-terminal-setup': [
    'TOOLS',
    'My terminal setup',
    '~$',
    'iterm2 · zsh · powerlevel10k',
  ],
  'optimal-seo-performance-for-nextjs': [
    'NEXT.JS',
    'Optimal SEO performance for Next.js',
    'SEO',
    'meta tags · ssr · core web vitals',
  ],
  'use-hook-in-react': [
    'REACT',
    'The use hook in React',
    'use',
    'hooks · promises · suspense',
  ],
  'addressing-business-with-the-right-innovation-iot': [
    'IOT',
    'The right innovation for business',
    'IoT',
    'sensors · data · business value',
  ],
  'truth-about-being-a-full-stack-developer': [
    'CAREER',
    'The truth about being full-stack',
    'FS',
    'front end · back end · trade-offs',
  ],
  'importance-of-teaching-children-to-code': [
    'CAREER',
    'Teaching children to code',
    '</>',
    'education · stem · problem solving',
  ],
  'rick-and-morty-if-you-havent-watched-it': [
    'OFF TOPIC',
    'Rick and Morty',
    'C-137',
    'animation · sci-fi · watch it',
  ],
};
const PANEL = {
  'NODE.JS': C.yellow,
  JAVASCRIPT: C.yellow,
  SECURITY: C.blue,
  DEVOPS: C.blue,
  MAPS: C.blue,
  LINUX: C.blue,
};

// Full-bleed (no frame/shadow): the site's Card and the post header supply
// the border, so the image doesn't render as a card inside a card.
async function postCover([tag, title, glyph, sub]) {
  const w = 2024;
  const h = 724;
  const pad = 112;
  const panelW = 440;
  const panelX = w - panelW;
  const panel = PANEL[tag] ?? C.red;
  const chip = panel === C.red ? C.yellow : C.red;
  const maxW = panelX - pad * 2;
  // One big line if it fits, else two smaller lines so chip/tagline breathe.
  const { lines, size } = await fitTitle(title, maxW, [120, 108], 1).catch(() =>
    fitTitle(title, maxW, [92, 84, 78], 2),
  );
  const chipBottom = pad + 84;
  const subTop = h - pad - 48;
  const blockH = size * 1.12 * (lines.length - 1) + size;
  const ty = Math.round(
    chipBottom + (subTop - chipBottom - blockH) / 2 + size * 0.8,
  );
  let gs = 220;
  while (gs > 90 && (await textWidth(glyph, gs)) > panelW - 120) gs -= 10;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
    `<rect width="${w}" height="${h}" fill="${C.card}"/>` +
    `<rect x="${panelX}" y="0" width="${panelW}" height="${h}" fill="${panel}"/>` +
    `<rect x="${panelX - 6}" y="0" width="12" height="${h}" fill="${C.ink}"/>` +
    `<text x="${panelX + panelW / 2}" y="${Math.round(h / 2 + gs * 0.36)}" text-anchor="middle" font-family="${SANS}" font-weight="700" font-size="${gs}" fill="${C.ink}">${esc(glyph)}</text>` +
    `<rect x="${pad}" y="${pad}" width="${Math.round(tag.length * 26.5 + 60)}" height="84" fill="${chip}" stroke="${C.ink}" stroke-width="6"/>` +
    `<text x="${pad + 30}" y="${pad + 57}" font-family="${MONO}" font-weight="700" font-size="44" fill="${C.ink}">${esc(tag)}</text>` +
    titleTspans(lines, pad, ty, size) +
    `<text x="${pad}" y="${h - pad}" font-family="${MONO}" font-weight="700" font-size="46" fill="${C.ink}">${esc(sub)}</text>` +
    `</svg>`
  );
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
    // Writes to the post's frontmatter `image` (or /blog/<slug>/cover.png).
    const postsDir = path.join(ROOT, 'src/posts');
    for (const file of fs
      .readdirSync(postsDir)
      .filter((f) => f.endsWith('.mdx'))) {
      const slug = file.replace(/\.mdx$/, '');
      if (!COVERS[slug]) throw new Error(`No cover spec in COVERS for ${slug}`);
      const { data } = matter(
        fs.readFileSync(path.join(postsDir, file), 'utf8'),
      );
      const out = data.image ?? `/blog/${slug}/cover.png`;
      await writePng(path.join(PUBLIC, out), await postCover(COVERS[slug]));
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

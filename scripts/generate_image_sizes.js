// Records the width and height of every image in public/archive/*.md, so IssueReader can
// give each <img> its size and the page doesn't shift as images load. Sizes already in
// src/data/image_sizes.json are kept, so a build only downloads images it hasn't seen.
// An image that can't be read is skipped with a warning; it just renders without a size.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { imageSize } from 'image-size';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const archiveDir = path.join(__dirname, '../public/archive');
const publicDir = path.join(__dirname, '../public');
const sizesPath = path.join(__dirname, '../src/data/image_sizes.json');
const overrides = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/image_overrides.json'), 'utf-8'));

const SITE = 'https://theterminalthursday.com';
const IMAGE = /!\[[^\]]*\]\((\S+?)\)/g;

const known = fs.existsSync(sizesPath) ? JSON.parse(fs.readFileSync(sizesPath, 'utf-8')) : {};

// The src IssueReader renders: the site's own copy when there is one
const sources = new Set();
for (const file of fs.readdirSync(archiveDir).filter(f => f.endsWith('.md'))) {
  const markdown = fs.readFileSync(path.join(archiveDir, file), 'utf-8');
  for (const [, url] of markdown.matchAll(IMAGE)) sources.add(overrides[url] ?? url);
}

const readImage = async (src) => {
  const sitePath = src.startsWith(SITE + '/') ? src.slice(SITE.length) : src.startsWith('/') ? src : null;
  if (sitePath) return fs.readFileSync(path.join(publicDir, sitePath));
  const res = await fetch(src, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return new Uint8Array(await res.arrayBuffer());
};

const sizes = {};
for (const src of [...sources].sort()) {
  if (known[src]) {
    sizes[src] = known[src];
    continue;
  }
  try {
    const { width, height } = imageSize(await readImage(src));
    sizes[src] = { width, height };
  } catch (err) {
    console.warn(`Image size skipped for ${src}: ${err.message}`);
  }
}

fs.writeFileSync(sizesPath, JSON.stringify(sizes, null, 2) + '\n');
console.log(`Image sizes recorded for ${Object.keys(sizes).length} of ${sources.size} images in src/data/image_sizes.json`);

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsPath = path.join(__dirname, '../src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8')).filter(p => !p.publishDate || new Date(p.publishDate) <= new Date());

// Format date to YYYY-MM-DD
const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toISOString().split('T')[0];
};

const rootUrl = `
  <url>
    <loc>https://theterminalthursday.com/</loc>
    <lastmod>${formatDate(posts[0]?.date || new Date().toISOString())}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`;

const issueUrls = posts.map(post => `
  <url>
    <loc>https://theterminalthursday.com/archive/${post.id}</loc>
    <lastmod>${formatDate(post.date)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rootUrl}
${issueUrls}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap.trim());
console.log('Sitemap successfully generated in public/sitemap.xml');

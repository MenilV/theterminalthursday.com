import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsPath = path.join(__dirname, '../src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8')).filter(p => !p.publishDate || new Date(p.publishDate) <= new Date());

const formatPubDate = (dateStr) => {
  const parts = dateStr.split('-');
  if (parts.length === 3 && parts[2].length === 4) {
    return new Date(`${parts[2]}-${parts[0]}-${parts[1]}T12:00:00Z`).toUTCString();
  }
  return new Date(dateStr).toUTCString();
};

// Titles and descriptions are free text; a bare & or < would make the feed invalid XML
const escapeXml = (str) => String(str)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

const rssItems = posts.map(post => `
    <item>
      <title>VOL_${post.id}: ${escapeXml(post.title)}</title>
      <link>https://theterminalthursday.com/archive/${post.id}</link>
      <guid>https://theterminalthursday.com/archive/${post.id}</guid>
      <pubDate>${formatPubDate(post.date)}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`).join('');

const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Terminal Thursday</title>
    <link>https://theterminalthursday.com</link>
    <description>A serial homage to the open-source projects, tools, and maintainers that form the bedrock of the modern web.</description>
    <language>en-us</language>
    <atom:link href="https://theterminalthursday.com/rss.xml" rel="self" type="application/rss+xml" />${rssItems}
  </channel>
</rss>`;

fs.writeFileSync(path.join(__dirname, '../public/rss.xml'), rssFeed);
console.log('RSS feed successfully generated in public/rss.xml');

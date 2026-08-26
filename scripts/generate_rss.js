import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsPath = path.join(__dirname, '../src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));

const rssItems = posts.map(post => `
    <item>
      <title>VOL_${post.id}: ${post.title}</title>
      <link>https://theterminalthursday.com/#archive/${post.id}</link>
      <guid>https://theterminalthursday.com/#archive/${post.id}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${post.description}</description>
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

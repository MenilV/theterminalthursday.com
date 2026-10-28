import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Markdown from 'react-markdown';

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

const markdownComponents = {
  // Lazy, otherwise React 19 adds <link rel="preload"> tags for each image to the HTML
  img: ({ node, ...props }) => createElement('img', { ...props, loading: 'lazy' })
};

// The whole issue as HTML, so feed readers can show it without a click-through.
// Rendered with react-markdown, the same library the site uses.
const fullText = (post) => {
  const markdownPath = path.join(__dirname, '../public/archive', `${post.id}.md`);
  if (!fs.existsSync(markdownPath)) {
    console.warn(`archive/${post.id}.md not found; its feed item has only the description.`);
    return '';
  }
  const html = renderToStaticMarkup(
    createElement(Markdown, { components: markdownComponents }, fs.readFileSync(markdownPath, 'utf-8'))
  );
  return `\n      <content:encoded>${escapeXml(html)}</content:encoded>`;
};

const rssItems = posts.map(post => `
    <item>
      <title>VOL_${post.id}: ${escapeXml(post.title)}</title>
      <link>https://theterminalthursday.com/archive/${post.id}</link>
      <guid>https://theterminalthursday.com/archive/${post.id}</guid>
      <pubDate>${formatPubDate(post.date)}</pubDate>
      <description>${escapeXml(post.description)}</description>${fullText(post)}
    </item>`).join('');

const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
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

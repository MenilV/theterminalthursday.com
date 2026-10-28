import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsPath = path.join(__dirname, '../src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8')).filter(p => !p.publishDate || new Date(p.publishDate) <= new Date());

// MM-DD-YYYY -> YYYY-MM-DD
const formatDate = (dateStr) => {
  const parts = dateStr.split('-');
  return parts.length === 3 && parts[2].length === 4 ? `${parts[2]}-${parts[0]}-${parts[1]}` : dateStr;
};

// Format from https://llmstxt.org: a title, a one-line summary, then lists of links.
// Each issue links to its markdown, which the site already serves as text/markdown.
const issueLinks = posts.map(post =>
  `- [Issue #${post.id}: ${post.title.replace(/_/g, ' ')}](https://theterminalthursday.com/archive/${post.id}.md): ${post.description} (${formatDate(post.date)})`
).join('\n');

const llmsTxt = `# The Terminal Thursday

> A weekly serial homage to the open-source projects, tools, and maintainers forming the bedrock of the modern web.

A newsletter by Menil Vukovic, published every Thursday. Each issue below links to its full text as Markdown; the web page for an issue is the same URL without \`.md\` (for example \`https://theterminalthursday.com/archive/${posts[0]?.id ?? '001'}\`).

## Issues

${issueLinks}

## Optional

- [RSS feed](https://theterminalthursday.com/rss.xml): every issue, newest first
- [Sitemap](https://theterminalthursday.com/sitemap.xml)
`;

fs.writeFileSync(path.join(__dirname, '../public/llms.txt'), llmsTxt);
console.log('llms.txt successfully generated in public/llms.txt');

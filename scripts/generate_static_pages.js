import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Markdown from 'react-markdown';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');
const postsPath = path.join(__dirname, '../src/data/posts.json');

if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8')).filter(
  p => !p.publishDate || new Date(p.publishDate) <= new Date()
);

const formatDate = (dateStr) => {
  if (!dateStr) return new Date().toISOString().split('T')[0];
  const parts = dateStr.split('-');
  if (parts.length === 3 && parts[2].length === 4) {
    return `${parts[2]}-${parts[0]}-${parts[1]}`;
  }
  return new Date(dateStr).toISOString().split('T')[0];
};

const escapeHtml = (str) => String(str)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

// Most AI crawlers don't run JavaScript, so without this they'd find an empty #root.
// index.html hides #static-content in browsers that run JavaScript, and React
// replaces it on mount.
const withStaticContent = (html, content) => html.replace(
  '<div id="root"></div>',
  () => `<div id="root"><main id="static-content">${content}</main></div>`
);

const markdownComponents = {
  // Lazy, so browsers skip images in the hidden copy and React adds no preload hints
  img: ({ node, ...props }) => createElement('img', { ...props, loading: 'lazy' })
};

for (const post of posts) {
  const cleanTitle = post.title.replace(/_/g, ' ');
  const pageTitle = escapeHtml(`Issue #${post.id}: ${cleanTitle} | The Terminal Thursday`);
  const url = `https://theterminalthursday.com/archive/${post.id}`;
  const description = escapeHtml(post.description);
  const isoDate = formatDate(post.date);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `Issue #${post.id}: ${cleanTitle}`,
    description: post.description,
    url,
    datePublished: isoDate,
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      name: 'Menil Vukovic',
      url: 'https://linkedin.com/in/menilv'
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Terminal Thursday',
      url: 'https://theterminalthursday.com/',
      logo: 'https://theterminalthursday.com/og-image-v2.jpg'
    }
  };

  let pageHtml = template;

  // Replacements below use functions so a `$` in a title or description
  // isn't treated as a String.replace pattern like `$&`

  // Title
  pageHtml = pageHtml.replace(/<title>.*?<\/title>/, () => `<title>${pageTitle}</title>`);

  // Canonical, plus a script that starts downloading the issue's markdown alongside the
  // JS bundle instead of after it; IssueReader picks up the response. A preload link
  // would be simpler, but Safari doesn't reuse as="fetch" preloads and downloads twice.
  const markdownRequest = `{ id: ${JSON.stringify(post.id)}, response: fetch(${JSON.stringify(`/archive/${post.id}.md`)}) }`;
  pageHtml = pageHtml.replace(
    /<link rel="canonical" href=".*?" \/>/,
    () => [
      `<link rel="canonical" href="${url}" />`,
      `<script>window.__issueMarkdown = ${markdownRequest}; window.__issueMarkdown.response.catch(() => {});</script>`
    ].join('\n    ')
  );

  // Description
  pageHtml = pageHtml.replace(
    /<meta name="description" content=".*?" \/>/,
    () => `<meta name="description" content="${description}" />`
  );

  // Open Graph
  pageHtml = pageHtml.replace(
    /<meta property="og:url" content=".*?" \/>/,
    () => `<meta property="og:url" content="${url}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta property="og:title" content=".*?" \/>/,
    () => `<meta property="og:title" content="${pageTitle}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta property="og:description" content=".*?" \/>/,
    () => `<meta property="og:description" content="${description}" />`
  );

  // Twitter Cards
  pageHtml = pageHtml.replace(
    /<meta name="twitter:url" content=".*?" \/>/,
    () => `<meta name="twitter:url" content="${url}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta name="twitter:title" content=".*?" \/>/,
    () => `<meta name="twitter:title" content="${pageTitle}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta name="twitter:description" content=".*?" \/>/,
    () => `<meta name="twitter:description" content="${description}" />`
  );

  // Issue pages are articles, not the website itself
  pageHtml = pageHtml.replace(
    /<meta property="og:type" content=".*?" \/>/,
    () => [
      '<meta property="og:type" content="article" />',
      `<meta property="article:published_time" content="${isoDate}" />`,
      '<meta property="article:author" content="Menil Vukovic" />'
    ].join('\n    ')
  );

  // Point agents and crawlers at the issue's markdown, next to the RSS link
  pageHtml = pageHtml.replace(
    /<link rel="alternate" type="application\/rss\+xml".*? \/>/,
    match => `${match}\n    <link rel="alternate" type="text/markdown" title="${escapeHtml(`Issue #${post.id} as Markdown`)}" href="${url}.md" />`
  );

  // Replace default Website JSON-LD with TechArticle schema
  pageHtml = pageHtml.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    // Escape < so a "</script>" in the text can't close the JSON-LD block early
    () => `<script type="application/ld+json">\n    ${JSON.stringify(articleSchema, null, 2).replace(/</g, '\\u003c')}\n    </script>`
  );

  // The issue text itself, rendered by the same markdown library the app uses
  const markdownPath = path.join(distDir, 'archive', `${post.id}.md`);
  if (fs.existsSync(markdownPath)) {
    const article = renderToStaticMarkup(
      createElement(Markdown, { components: markdownComponents }, fs.readFileSync(markdownPath, 'utf-8'))
    );
    pageHtml = withStaticContent(
      pageHtml,
      `<p><a href="/">The Terminal Thursday</a> · <time datetime="${isoDate}">${isoDate}</time></p><article>${article}</article>`
    );
  } else {
    console.warn(`archive/${post.id}.md not found; its page has no static text.`);
  }

  // Output directories
  const issueDir = path.join(distDir, 'archive', post.id);
  if (!fs.existsSync(issueDir)) {
    fs.mkdirSync(issueDir, { recursive: true });
  }

  fs.writeFileSync(path.join(issueDir, 'index.html'), pageHtml);
  fs.writeFileSync(path.join(distDir, 'archive', `${post.id}.html`), pageHtml);
}

// Cloudflare Pages serves a top-level 404.html, with a real 404 status, for any URL
// that matches no file. It's the same SPA shell, so the app still renders its 404 screen.
fs.writeFileSync(path.join(distDir, '404.html'), template);

// Homepage: the site description and a link to every published issue
const siteDescription = template.match(/<meta name="description" content="(.*?)" \/>/)[1];
const issueList = posts.map(post => {
  const isoDate = formatDate(post.date);
  const cleanTitle = escapeHtml(post.title.replace(/_/g, ' '));
  return `<li><a href="/archive/${post.id}">Issue #${post.id}: ${cleanTitle}</a> <time datetime="${isoDate}">${isoDate}</time><br />${escapeHtml(post.description)}</li>`;
}).join('');
fs.writeFileSync(templatePath, withStaticContent(
  template,
  `<h1>The Terminal Thursday</h1><p>${siteDescription}</p><h2>Issues</h2><ul>${issueList}</ul><p><a href="/rss.xml">RSS feed</a></p>`
));

console.log(`Pre-rendered ${posts.length} static archive issue pages with custom SEO tags, JSON-LD & readable text!`);

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

  // Canonical
  pageHtml = pageHtml.replace(
    /<link rel="canonical" href=".*?" \/>/,
    () => `<link rel="canonical" href="${url}" />`
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

  // Replace default Website JSON-LD with TechArticle schema
  pageHtml = pageHtml.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    // Escape < so a "</script>" in the text can't close the JSON-LD block early
    () => `<script type="application/ld+json">\n    ${JSON.stringify(articleSchema, null, 2).replace(/</g, '\\u003c')}\n    </script>`
  );

  // Output directories
  const issueDir = path.join(distDir, 'archive', post.id);
  if (!fs.existsSync(issueDir)) {
    fs.mkdirSync(issueDir, { recursive: true });
  }

  fs.writeFileSync(path.join(issueDir, 'index.html'), pageHtml);
  fs.writeFileSync(path.join(distDir, 'archive', `${post.id}.html`), pageHtml);
}

console.log(`Pre-rendered ${posts.length} static archive issue pages with custom SEO tags & JSON-LD!`);

import fs from 'fs';
import path from 'path';

const postsPath = path.resolve('src/data/posts.json');
const archiveDir = path.resolve('public/archive');
const outputPath = path.resolve('src/data/search_index.json');

const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
const searchIndex = [];

for (const post of posts) {
  const mdPath = path.join(archiveDir, `${post.id}.md`);
  let text = '';
  if (fs.existsSync(mdPath)) {
    text = fs.readFileSync(mdPath, 'utf8');
    // Strip images
    text = text.replace(/!\[.*?\]\(.*?\)/g, ''); 
    // Strip URLs but keep link text
    text = text.replace(/\[(.*?)\]\(.*?\)/g, '$1'); 
    // Strip some common markdown characters
    text = text.replace(/[#*`>]/g, ''); 
    // Replace newlines with spaces
    text = text.replace(/\s+/g, ' '); 
  }
  
  searchIndex.push({
    id: post.id,
    title: post.title,
    date: post.date,
    description: post.description,
    category: post.category,
    content: text.toLowerCase() // lowercase for easier searching
  });
}

fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));
console.log('Search index successfully generated in src/data/search_index.json');

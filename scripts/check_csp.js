// Fails the build if an inline <script> or <style> in dist/ isn't allowed by a hash in the
// Content-Security-Policy in public/_headers. Without this, editing an inline snippet (the
// Clarity tag, the theme bootstrap) would silently get it blocked once the CSP is enforced.
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist');

// The policy that lists script-src, in either the enforcing or the Report-Only header
const headers = fs.readFileSync(path.join(distDir, '_headers'), 'utf-8');
const policy = headers.split('\n').find(line => /^\s*Content-Security-Policy(-Report-Only)?:.*script-src/.test(line));
if (!policy) {
  console.error('check_csp: no Content-Security-Policy with script-src found in public/_headers');
  process.exit(1);
}
const allowed = (directive) => policy.match(new RegExp(`${directive} ([^;]*)`))?.[1].split(/\s+/) ?? [];
const allowedScripts = allowed('script-src');
const allowedStyles = allowed('style-src');

const htmlFiles = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
  const full = path.join(dir, entry.name);
  if (entry.isDirectory()) return htmlFiles(full);
  return entry.name.endsWith('.html') ? [full] : [];
});

const hash = (text) => `'sha256-${crypto.createHash('sha256').update(text, 'utf8').digest('base64')}'`;
// JSON-LD and other data blocks never run, so the CSP doesn't apply to them
const isDataBlock = (attrs) => /type="application\/(ld\+)?json"/.test(attrs);

const missing = new Map();
const note = (kind, source, file) => {
  const key = `${kind} ${source}`;
  if (!missing.has(key)) missing.set(key, new Set());
  missing.get(key).add(path.relative(distDir, file));
};

const files = htmlFiles(distDir);
for (const file of files) {
  const html = fs.readFileSync(file, 'utf-8');
  for (const [, attrs, body] of html.matchAll(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
    if (/\ssrc=/.test(attrs ?? '') || isDataBlock(attrs ?? '')) continue;
    if (!allowedScripts.includes(hash(body))) note('script-src', hash(body), file);
  }
  for (const [, , body] of html.matchAll(/<style(\s[^>]*)?>([\s\S]*?)<\/style>/g)) {
    if (!allowedStyles.includes(hash(body))) note('style-src', hash(body), file);
  }
}

if (missing.size) {
  console.error('check_csp: inline code the CSP in public/_headers would block. Add these hashes:');
  for (const [key, where] of missing) console.error(`  ${key}  (${where.size} page(s), e.g. ${[...where][0]})`);
  process.exit(1);
}
console.log(`CSP check passed: every inline script and style in ${files.length} pages is allowed by hash.`);

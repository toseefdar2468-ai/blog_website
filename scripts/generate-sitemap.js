const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const raw = fs.readFileSync(filePath, 'utf8');
  raw.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const idx = trimmed.indexOf('=');
    if (idx === -1) return;
    const key = trimmed.slice(0, idx).trim();
    let val = trimmed.slice(idx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  });
}

loadDotEnv(path.join(process.cwd(), '.env.local'));

const envUrl = process.env.SITEMAP_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';
const domain = (envUrl && envUrl.length > 0 ? envUrl : vercelUrl || 'http://localhost:3000')
  .replace(/\/$/, '');
const postsDir = path.join(process.cwd(), 'content', 'posts');
const outFile = path.join(process.cwd(), 'public', 'sitemap.xml');

function getPostSlugs() {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(postsDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      const slugFromFrontmatter = data && data.slug ? String(data.slug) : '';
      return slugFromFrontmatter.length > 0 ? slugFromFrontmatter : fileName.replace(/\.md$/, '');
    });
}

function buildSitemap(urls) {
  const header = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  const footer = `</urlset>`;
  const body = urls
    .map((u) => `  <url>\n    <loc>${domain}${u}</loc>\n  </url>`) 
    .join('\n');

  return header + body + '\n' + footer;
}

function main() {
  const slugs = getPostSlugs();
  const urls = ['/', '/blog', '/about', '/contact', '/privacy-policy', '/terms', ...slugs.map((s) => `/blog/${s}`)];
  const xml = buildSitemap(urls);
  fs.writeFileSync(outFile, xml, 'utf8');
  console.log('Wrote sitemap to', outFile);
}

main();

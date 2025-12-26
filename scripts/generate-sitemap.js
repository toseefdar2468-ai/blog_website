const fs = require('fs');
const path = require('path');

const domain = process.env.SITEMAP_BASE_URL || 'https://osama-portfolio-jarh.vercel.app';
const postsDir = path.join(process.cwd(), 'content', 'posts');
const outFile = path.join(process.cwd(), 'public', 'sitemap.xml');

function getPostSlugs() {
  if (!fs.existsSync(postsDir)) return [];
  return fs.readdirSync(postsDir).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
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
  const urls = ['/', '/blog', '/about', '/contact', '/privacy-policy', ...slugs.map((s) => `/blog/${s}`)];
  const xml = buildSitemap(urls);
  fs.writeFileSync(outFile, xml, 'utf8');
  console.log('Wrote sitemap to', outFile);
}

main();

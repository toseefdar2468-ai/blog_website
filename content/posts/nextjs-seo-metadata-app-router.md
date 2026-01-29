---
title: "Next.js SEO and Metadata in the App Router"
date: "2026-01-07"
description: "A practical checklist for metadata, Open Graph, robots, and structured data in the Next.js App Router."
slug: "nextjs-seo-metadata-app-router"
image: "/images/nextjs-metadata.png"
---

# Next.js SEO and Metadata in the App Router

If your content is good but search traffic is flat, metadata is often the missing piece. In the App Router, the right metadata setup gives every route a clean preview, a canonical URL, and consistent titles.

This guide shows the patterns I use for blogs and content sites.

## Static metadata for stable pages

```ts
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Frontend articles and guides",
  alternates: { canonical: "https://your-domain.com/blog" },
};
```

## Dynamic metadata for blog posts

```ts
import type { Metadata } from "next";
import { getPostBySlug } from "@/lib/posts";
import { getSiteUrl } from "@/lib/site";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      images: post.image ? [{ url: `${siteUrl}${post.image}` }] : undefined,
      type: "article",
    },
  };
}
```

## Open Graph and Twitter cards

Social previews are part of SEO because they affect click through rates.

Key fields:

- `openGraph.title`
- `openGraph.description`
- `openGraph.images`
- `twitter.card`

Use consistent image sizes so previews look clean across platforms.

## Canonical URLs and duplicates

If the same content can appear at multiple URLs, you need a canonical URL to prevent duplicate content signals.

```ts
alternates: { canonical: url }
```

For example, if you allow `/blog/post?ref=twitter`, the canonical should still be `/blog/post`.

## Robots rules for low value pages

Do not index pages that add no value for search users. Common examples:

- Internal search results
- Account pages
- Staging or preview routes

In the App Router you can set robots metadata per route.

## Sitemap and robots.txt

Keep your sitemap accurate and always reference it in `robots.txt`.

If you add new posts, regenerate the sitemap so search engines can discover them quickly.

## Robots metadata examples

For pages you do not want indexed, set `noindex`.

```ts
export const metadata = {
  robots: { index: false, follow: false },
};
```

For public content, keep indexing enabled.

## Open Graph image sizing

Use a consistent size across pages (for example 1200x630). Small images can look blurry in social previews, and mismatched sizes look unprofessional.

## Consistency checklist

- Every page has a unique title
- Description matches the content
- Canonical URL is correct
- Open Graph image is present for shareable pages

## Metadata inheritance

Metadata can be defined at the layout level and overridden in nested routes. This prevents missing titles and descriptions when you add new pages.

Example:

- Root layout defines the site title template
- Page level metadata overrides the title for specific routes

This keeps the site consistent while still allowing unique pages.

## Duplicate content examples

Common duplicates include:

- Tracking parameters in URLs
- Multiple filters pointing to the same content
- Both `/blog/post` and `/blog/post/` indexing

Use canonical URLs and consistent routing rules to avoid these issues.

## Schema types beyond Article

Depending on the page, other schema types may be more accurate:

- `Organization` for home pages
- `FAQPage` for FAQ content
- `BreadcrumbList` for hierarchical navigation

Use the schema that best matches the content to improve rich results.

## Social preview checklist

- Use a 1200x630 Open Graph image
- Keep text large and minimal
- Make sure the image URL is absolute

These small details increase share click through rates.

## Pagination and tag pages

Paginated or tag filtered pages often repeat content. Consider noindexing these if they do not add unique value, and keep the canonical pointed to the main category page.

## Monitor in Search Console

After changes, watch Google Search Console for coverage and enhancement reports. It helps you spot indexing issues early and confirms that metadata and structured data are recognized.

## Internal linking

Metadata helps discovery, but internal links help crawlers understand your site. Link related posts together and include a clear site navigation so important pages are not buried.

## Default Open Graph settings

Define default Open Graph settings in the root layout, then override per page. This prevents missing previews when new pages are added.
Keep defaults simple and accurate so they do not conflict with page specific metadata.
This approach also reduces duplicated tags across the app.
Consistency in metadata improves trust in search previews.

## Titles and descriptions that work

I aim for this pattern:

- Primary keyword or topic
- Short benefit or outcome
- Optional site name at the end

Example:

`React State Management: Practical Patterns | DevCraft`

## Testing and debugging previews

Use these tools to confirm previews:

- Facebook Sharing Debugger for Open Graph
- Twitter Card Validator for Twitter cards
- Google Rich Results Test for structured data

If the preview is wrong, check for cached data and try again after a few minutes.

## JSON-LD for articles

Structured data helps search engines understand your content.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Next.js SEO and Metadata in the App Router",
  "author": { "@type": "Person", "name": "Toseef" }
}
</script>
```

## Common mistakes

- Reusing the same title and description everywhere
- Missing canonical URLs on dynamic routes
- Forgetting Open Graph images
- Using relative URLs in metadata

## Related reading

- [Core Web Vitals Playbook](/blog/core-web-vitals-playbook)
- [Next.js App Router Fundamentals](/blog/nextjs-app-router-fundamentals)
- [Next.js Data Fetching Strategies](/blog/nextjs-data-fetching-strategies)

## Last updated

2026-01-22

## Sources

- https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- https://schema.org/Article

## Author

I am Toseef, a frontend engineer who builds Angular, React, and Next.js apps for real products. I write practical guides based on work experience and common team pitfalls. If you want to collaborate, visit [About](/about) or [Contact](/contact).

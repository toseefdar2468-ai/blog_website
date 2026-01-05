import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes = [
    "/",
    "/blog",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];

  const staticEntries = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
  }));

  const postEntries = getAllPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticEntries, ...postEntries];
}

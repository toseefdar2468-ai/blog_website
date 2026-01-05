// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdownToHtml";
import BackToTop from "@/app/components/BackToTop";
import { getSiteUrl } from "@/lib/site";
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      images: post.image ? [{ url: `${siteUrl}${post.image}` }] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const htmlContent = await markdownToHtml(post.content);

  return (
    <>
      <article className="mx-auto space-y-4">
        <header className="space-y-2 border-b border-slate-800 pb-4">
          <p className="text-xs uppercase tracking-wide text-indigo-300">
            Frontend Development
          </p>
          <h1 className="text-2xl font-bold text-slate-50">{post.title}</h1>
          <p className="text-xs text-slate-400">
            Published on {new Date(post.date).toLocaleDateString()}
          </p>
          <p className="text-sm text-slate-300">{post.description}</p>
        </header>

        {post.image ? (
          <div className="mt-4 mb-4 sm:mt-6 sm:mb-6">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover object-center rounded-md"
            />
          </div>
        ) : null}

        <section
          className="prose prose-invert prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
      <BackToTop />
    </>
  );
}

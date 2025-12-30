// app/blog/[slug]/page.tsx
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdownToHtml";
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: any) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const htmlContent = await markdownToHtml(post.content);

  return (
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
        <div className="mt-6">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[360px] sm:h-[420px] object-cover rounded-md"
          />
        </div>
      ) : null}

      <section
        className="prose prose-invert prose-slate max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}

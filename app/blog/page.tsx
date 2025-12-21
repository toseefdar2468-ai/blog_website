// app/blog/page.tsx
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "Frontend dev articles",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <header className="space-y-2 border-b border-slate-800 pb-4">
        <p className="text-xs uppercase tracking-wide text-indigo-300">
          Frontend Development
        </p>
        <h1 className="text-3xl font-bold text-slate-50">Blog</h1>
        <p className="text-sm text-slate-300">
          Articles on Angular, Next.js, and modern frontend.
        </p>
      </header>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="border-b border-slate-800 pb-4 last:border-b-0"
          >
            <Link 
              href={`/blog/${post.slug}`}
              className="text-lg font-semibold text-indigo-300 hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-xs text-slate-400">
              {new Date(post.date).toLocaleDateString()}
            </p>
            <p className="text-sm text-slate-300">{post.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

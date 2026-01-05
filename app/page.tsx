// app/page.tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3); // latest 3 posts

  return (
    <div className="space-y-12">
      {/* HERO */}
      <section className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <p className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-indigo-300">
            Daily Frontend Insights
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">
            Sharpen your frontend skills with{" "}
            <span className="text-indigo-400">practical tutorials</span> and
            real-world examples.
          </h1>
          <p className="text-sm text-slate-300 md:text-base">
            DevCraft Blog is a focused resource for developers who want to grow
            in Angular, React, Next.js, TypeScript, and modern UI development.
            No fluff--just clear, actionable content.
          </p>
          <div className="flex gap-3">
            <Link
              href="/blog"
              className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600"
            >
              Read the Blog
            </Link>
            <Link
              href="/about"
              className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:border-slate-500"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
            What you&apos;ll learn
          </h2>
          <ul className="space-y-2 text-sm text-slate-200">
            <li>- Modern Angular patterns and best practices</li>
            <li>- Building production-ready apps with Next.js</li>
            <li>- UI/UX tips to make your interfaces stand out</li>
            <li>- Real-world examples of API integration</li>
            <li>- Practical guides to improve your frontend workflow</li>
          </ul>
        </div>
      </section>

      {/* LATEST POSTS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-50">
            Latest articles
          </h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((post:any) => (
            <article
              key={post.slug}
              className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-4"
            >
              <p className="text-xs uppercase tracking-wide text-slate-400">
                {new Date(post.date).toLocaleDateString()}
              </p>
              <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-slate-50">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="mt-2 line-clamp-3 text-xs text-slate-300">
                {post.description}
              </p>
              <div className="mt-auto pt-3">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-medium text-indigo-400 hover:text-indigo-300"
                >
                  Read article {"->"}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

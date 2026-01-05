// app/about/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about DevCraft Blog and the mission behind sharing practical frontend knowledge.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-slate-50">About DevCraft Blog</h1>
      <p className="text-sm text-slate-300">
        DevCraft Blog is a focused learning resource for frontend developers who
        want to build high-quality, modern web applications. The goal is simple:
        provide clear, practical guidance that you can apply directly in real
        projects.
      </p>
      <p className="text-sm text-slate-300">
        My background is in frontend engineering, with experience in Angular,
        React, and Next.js. I&apos;ve faced the same challenges you have--
        confusing documentation, scattered tutorials, and outdated examples.
        This blog is my way of sharing the lessons, patterns, and workflows
        that actually work.
      </p>
      <p className="text-sm text-slate-300">
        Whether you&apos;re just starting with frameworks or refining your
        production skills, you&apos;ll find step-by-step guides, code samples,
        and explanations that respect your time and help you move faster as a
        developer.
      </p>
    </div>
  );
}

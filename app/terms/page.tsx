import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Review the terms that govern the use of DevCraft Blog content and services.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto space-y-4 text-sm text-slate-300">
      <h1 className="text-2xl font-bold text-slate-50">Terms of Service</h1>
      <p>
        By accessing and using DevCraft Blog, you agree to the terms described
        on this page. If you do not agree, please do not use the site.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-slate-50">
        Use of Content
      </h2>
      <p>
        All content is provided for educational purposes. You may read, share,
        and link to articles, but you may not republish full articles without
        permission.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-slate-50">
        No Professional Advice
      </h2>
      <p>
        The information on this site is provided as-is and does not constitute
        professional advice. Use the content at your own risk.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-slate-50">
        External Links
      </h2>
      <p>
        Articles may include links to third-party websites. We are not
        responsible for the content or practices of those sites.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-slate-50">
        Changes to These Terms
      </h2>
      <p>
        We may update these terms from time to time. Updates will be posted on
        this page with a revised date.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-slate-50">Contact</h2>
      <p>If you have questions about these terms, please contact us.</p>
    </div>
  );
}

// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "DevCraft Blog",
    template: "%s | DevCraft Blog",
  },
  description:
    "DevCraft Blog - daily articles on frontend development, Angular, React, JavaScript, and modern web practices.",
  metadataBase: new URL("https://your-domain.com"), // change after deployment
  openGraph: {
    title: "DevCraft Blog",
    description:
      "Level up your frontend skills with practical guides, tips, and tutorials for Angular, React, and modern web development.",
    type: "website",
    url: "https://your-domain.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body suppressHydrationWarning className="min-h-full bg-slate-950 text-slate-100">
        <div className="flex min-h-screen flex-col">
          {/* HEADER */}
          <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
              <Link href="/" className="flex items-center gap-2">
                <span className="rounded bg-indigo-500 px-2 py-1 text-xs font-semibold uppercase tracking-wider">
                  DevCraft
                </span>
                <span className="text-lg font-semibold text-slate-100">
                  Blog
                </span>
              </Link>
              <nav className="flex gap-6 text-sm text-slate-300">
                <Link href="/blog" className="hover:text-white">
                  Blog
                </Link>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
                <Link href="/privacy-policy" className="hover:text-white">
                  Privacy
                </Link>
              </nav>
            </div>
          </header>

          {/* MAIN CONTENT */}
          <main className="flex-1">
            <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
          </main>

          {/* FOOTER */}
          <footer className="border-t border-slate-800 bg-slate-950/80">
            <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
              <p>© {new Date().getFullYear()} DevCraft Blog. All rights reserved.</p>
              <div className="flex gap-4">
                <Link href="/privacy-policy" className="hover:text-slate-200">
                  Privacy Policy
                </Link>
                <Link href="/contact" className="hover:text-slate-200">
                  Contact
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

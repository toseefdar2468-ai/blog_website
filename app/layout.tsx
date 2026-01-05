// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Toaster from "./components/Toaster";
import Footer from "./components/Footer";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: {
    default: "DevCraft Blog",
    template: "%s | DevCraft Blog",
  },
  description:
    "DevCraft Blog - daily articles on frontend development, Angular, React, JavaScript, and modern web practices.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "DevCraft Blog",
    description:
      "Level up your frontend skills with practical guides, tips, and tutorials for Angular, React, and modern web development.",
    type: "website",
    url: siteUrl,
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
          <Header />

          {/* MAIN CONTENT */}
          <main className="flex-1">
            <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
          </main>

          {/* FOOTER (client component for active-route highlighting) */}
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  );
}

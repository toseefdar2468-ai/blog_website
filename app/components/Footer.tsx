"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

export default function Footer() {
  const pathname = usePathname() || "/";
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const linkClass = (href: string) =>
    isActive(href) ? "text-white font-semibold" : "text-slate-400 hover:text-slate-200";

  return (
    <footer className="border-t border-slate-800 bg-slate-950/80">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p className="text-slate-300">Ac {new Date().getFullYear()} DevCraft Blog. All rights reserved.</p>
        <div className="grid grid-cols-2 justify-items-start gap-x-6 gap-y-3 sm:grid-cols-3 md:flex md:flex-row md:gap-4">
          <Link href="/blog" className={linkClass("/blog")} aria-current={isActive("/blog") ? "page" : undefined}>
            Blog
          </Link>
          <Link href="/about" className={linkClass("/about")} aria-current={isActive("/about") ? "page" : undefined}>
            About
          </Link>
          <Link href="/contact" className={linkClass("/contact")} aria-current={isActive("/contact") ? "page" : undefined}>
            Contact
          </Link>
          <Link href="/privacy-policy" className={linkClass("/privacy-policy")} aria-current={isActive("/privacy-policy") ? "page" : undefined}>
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}




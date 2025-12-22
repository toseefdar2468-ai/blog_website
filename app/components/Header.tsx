"use client";

import Link from "next/link";
import * as React from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname() || "/";

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const firstLinkRef = React.useRef<HTMLAnchorElement | null>(null);
  const prevActive = React.useRef<HTMLElement | null>(null);

  // close on route change
  React.useEffect(() => setOpen(false), [pathname]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) {
      prevActive.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      setTimeout(() => firstLinkRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = prev || "";
      prevActive.current?.focus?.();
    }
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [open]);

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="rounded bg-indigo-500 px-2 py-1 text-xs font-semibold uppercase tracking-wider">DevCraft</span>
          <span className="text-lg font-semibold text-slate-100">Blog</span>
        </Link>

        <nav className="hidden md:flex gap-6 text-sm text-slate-300">
          <Link href="/blog" className={isActive("/blog") ? "text-white font-semibold" : "hover:text-white"}>
            Blog
          </Link>
          <Link href="/about" className={isActive("/about") ? "text-white font-semibold" : "hover:text-white"}>
            About
          </Link>
          <Link href="/contact" className={isActive("/contact") ? "text-white font-semibold" : "hover:text-white"}>
            Contact
          </Link>
          <Link href="/privacy-policy" className={isActive("/privacy-policy") ? "text-white font-semibold" : "hover:text-white"}>
            Privacy
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          className="inline-flex items-center justify-center rounded-md bg-slate-900/40 p-2 text-slate-200 hover:bg-slate-900/60 md:hidden"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {open ? (
              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
        {/* backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 transition-opacity bg-black/60 ${open ? "opacity-100" : "opacity-0"}`}
        />

        {/* sliding panel (at least half screen, full height) */}
        <aside
          className={`fixed left-0 top-0 z-50 h-full transform transition-transform duration-300 ease-in-out`}
          style={{
            width: "min(70vw, 720px)",
            transform: open ? "translateX(0)" : "translateX(-100%)",
            background: "linear-gradient(180deg,#0b1220,#0b1b2b)",
          }}
          aria-label="Mobile menu"
        >
          <div className="flex items-center justify-between px-6 py-5 "  style={{
            background: "linear-gradient(180deg,#0b1220,#0b1b2b)",
          }}>
            <div className="flex items-center gap-3">
              <span className="rounded bg-indigo-500 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-white">DevCraft</span>
              <span className="text-lg font-semibold text-white">Blog</span>
            </div>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/6 text-white hover:bg-white/10"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="px-6 py-4 flex flex-col gap-3" style={{
            background: "linear-gradient(180deg,#0b1220,#0b1b2b)",
          }}>
            <Link
              href="/blog"
              ref={firstLinkRef}
              className={`block rounded-md px-3 py-3 text-base transition-colors ${isActive("/blog") ? "bg-white/8 text-white font-semibold" : "text-white/90 hover:bg-white/6"}`}
              onClick={() => setOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={`block rounded-md px-3 py-3 text-base transition-colors ${isActive("/about") ? "bg-white/8 text-white font-semibold" : "text-white/90 hover:bg-white/6"}`}
              onClick={() => setOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`block rounded-md px-3 py-3 text-base transition-colors ${isActive("/contact") ? "bg-white/8 text-white font-semibold" : "text-white/90 hover:bg-white/6"}`}
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/privacy-policy"
              className={`block rounded-md px-3 py-3 text-base transition-colors ${isActive("/privacy-policy") ? "bg-white/8 text-white font-semibold" : "text-white/90 hover:bg-white/6"}`}
              onClick={() => setOpen(false)}
            >
              Privacy
            </Link>
          </nav>
        </aside>
      </div>
    </header>
  );
}

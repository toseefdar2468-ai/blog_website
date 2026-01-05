"use client";

import { useEffect, useState } from "react";

const MIN_SCROLLABLE_PX = 600;
const REVEAL_AFTER_PX = 300;

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const shouldShow =
        scrollable > MIN_SCROLLABLE_PX && window.scrollY > REVEAL_AFTER_PX;

      setIsVisible(shouldShow);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  const handleClick = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-100 shadow-lg shadow-slate-950/40 transition hover:-translate-y-1 hover:border-slate-500 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70"
    >
      <span aria-hidden="true" className="text-lg font-semibold leading-none">
        ^
      </span>
    </button>
  );
}

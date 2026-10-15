"use client";

import { useEffect, useState } from "react";

const SHOW_AFTER_PX = 400;

// Floating button that fades in once the page has been scrolled a little.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-5 right-4 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-accent text-white shadow-[0_4px_14px_rgba(0,0,0,0.3)] transition duration-300 hover:opacity-85 sm:bottom-8 sm:right-8 xl:h-[3.6rem] xl:w-[3.6rem] ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7 14l5-5 5 5" />
      </svg>
    </button>
  );
}

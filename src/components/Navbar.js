"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const flag = (file) => `/images/country_icon/${file}.png`;

// Each link opens a dropdown: on hover on desktop, on tap in the mobile menu.
// `icon` (optional) is the round flag shown beside a line.
const navLinks = [
  {
    label: "Study Destinations",
    items: [
      { label: "Australia", icon: flag("australia") },
      { label: "UK", icon: flag("united kingdom") },
      { label: "USA", icon: flag("united states") },
      { label: "Canada", icon: flag("canada") },
      { label: "Ireland", icon: flag("ireland") },
      { label: "New Zealand", icon: flag("new zealand") },
      { label: "Germany", icon: flag("germany") },
      { label: "Europe", icon: flag("european union") },
      { label: "Dubai", icon: flag("dubai") },
      { label: "Malaysia", icon: flag("malaysia") },
      { label: "Japan", icon: flag("japan") },
    ],
  },
  {
    label: "Scholarships",
    items: [
      { label: "Scholarships in Australia" },
      { label: "Scholarships in the UK" },
    ],
  },
  {
    label: "Universities",
    items: [
      { label: "Universities in Australia" },
      { label: "Universities in the UK" },
      { label: "Universities in the USA" },
      { label: "Universities in Canada" },
    ],
  },
  {
    label: "Our Services",
    items: [
      { label: "Admission Support" },
      { label: "Visa Services" },
      { label: "Health Insurance" },
      { label: "Student Accommodation" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Blogs" },
      { label: "Upcoming Events" },
      { label: "Careers" },
    ],
  },
];

const chevron = (className) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

function MenuItem({ item, onClick }) {
  return (
    <a
      href="#"
      onClick={onClick}
      className="flex items-center gap-2.5 rounded-lg px-3 py-2 transition-colors hover:bg-accent/10 hover:text-accent"
    >
      {item.icon && (
        <Image
          src={item.icon}
          alt=""
          width={88}
          height={88}
          className="h-5 w-5 shrink-0 rounded-full"
        />
      )}
      {item.label}
    </a>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  // Label of the link whose dropdown is showing.
  const [dropdown, setDropdown] = useState(null);
  const toggle = (label) => setDropdown(dropdown === label ? null : label);
  const progressBar = useRef(null);

  // Scroll progress bar: stretched from 0 to the full width as the page is scrolled.
  // Set straight on the element so scrolling does not re-render the navbar.
  useEffect(() => {
    let frame;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      progressBar.current.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_4px_20px_rgba(16,6,148,0.08)]">
      <div className="mx-auto flex max-w-[105rem] items-center justify-between gap-4 px-4 py-3 sm:px-8 lg:px-12 xl:py-4">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/pfec_ indo_logo.webp"
            alt="PFEC Global - Study Abroad | Visa"
            width={500}
            height={201}
            priority
            className="h-11 w-auto xl:h-14"
          />
        </Link>

        {/* Desktop links */}
        <nav className="hidden flex-1 items-center gap-[3.6rem] pl-[3.6rem] xl:flex">
          {navLinks.map(({ label, items }) => (
            <div
              key={label}
              className="relative"
              onMouseEnter={() => setDropdown(label)}
              onMouseLeave={() => setDropdown(null)}
              onBlur={(event) =>
                !event.currentTarget.contains(event.relatedTarget) &&
                setDropdown(null)
              }
            >
              <button
                type="button"
                aria-expanded={dropdown === label}
                onClick={() => toggle(label)}
                className={`flex cursor-pointer items-center gap-1.5 whitespace-nowrap py-2 transition-colors hover:text-accent ${
                  dropdown === label ? "text-accent" : "text-neutral-800"
                }`}
              >
                {label}
                {chevron(
                  `h-5 w-5 text-accent transition-transform duration-300 ${
                    dropdown === label ? "rotate-180" : ""
                  }`,
                )}
              </button>

              {/* Kept in the page so it can fade; only clickable while open.
                  The top padding keeps the mouse "inside" on its way to the panel. */}
              <div
                className={`absolute left-0 top-full pt-2 transition duration-200 ${
                  dropdown === label
                    ? "opacity-100"
                    : "pointer-events-none translate-y-2 opacity-0"
                }`}
              >
                <ul
                  className={`grid gap-x-2 rounded-xl bg-white p-3 text-neutral-800 shadow-xl ring-1 ring-black/5 ${
                    items.length > 6 ? "w-[30rem] grid-cols-2" : "w-[19rem]"
                  }`}
                >
                  {items.map((item) => (
                    <li key={item.label}>
                      <MenuItem item={item} onClick={() => setDropdown(null)} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-5 xl:gap-[2.6rem]">
          <a
            href="#consultation"
            className="hidden whitespace-nowrap rounded-xl bg-accent px-4 py-2.5 text-[15px] font-bold text-white hover:opacity-90 sm:block xl:text-base"
          >
            Book a Free Consultation
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-brand xl:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-neutral-200 bg-white px-4 pb-5 shadow-lg sm:px-8 xl:hidden">
          {navLinks.map(({ label, items }) => (
            <div key={label} className="border-b border-neutral-100">
              <button
                type="button"
                aria-expanded={dropdown === label}
                onClick={() => toggle(label)}
                className={`flex w-full cursor-pointer items-center justify-between py-3.5 font-medium ${
                  dropdown === label ? "text-accent" : "text-neutral-800"
                }`}
              >
                {label}
                {chevron(
                  `h-5 w-5 text-accent transition-transform duration-300 ${
                    dropdown === label ? "rotate-180" : ""
                  }`,
                )}
              </button>
              {dropdown === label && (
                <ul className="grid pb-3 text-neutral-700 sm:grid-cols-2">
                  {items.map((item) => (
                    <li key={item.label}>
                      <MenuItem item={item} onClick={() => setMenuOpen(false)} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <a
            href="#consultation"
            onClick={() => setMenuOpen(false)}
            className="mt-4 block rounded-xl bg-accent px-4 py-3 text-center font-bold text-white sm:hidden"
          >
            Book a Free Consultation
          </a>
        </nav>
      )}

      {/* Scroll progress bar along the bottom edge of the navbar */}
      <div
        ref={progressBar}
        aria-hidden="true"
        style={{ transform: "scaleX(0)" }}
        className="absolute inset-x-0 bottom-0 h-1 origin-left bg-accent"
      />
    </header>
  );
}

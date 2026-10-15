"use client";

import Image from "next/image";
import useLoopSlider from "./useLoopSlider";

const AUTOPLAY_MS = 3500;

// Placeholder events: replace with the real ones.
// image is a path in public/ (e.g. "/images/events/ielts.webp"); null shows a placeholder.
const events = [
  {
    title: "IELTS Grammar Workshop",
    date: "31 Jan 2029 | 11 AM - 12 PM",
    venue: "PFEC Global Office - Ahmedabad",
    image: null,
  },
  {
    title: "UK University Admission Day",
    date: "07 Feb 2029 | 10 AM - 4 PM",
    venue: "PFEC Global Office - Ahmedabad",
    image: null,
  },
  {
    title: "Study in Australia Info Session",
    date: "14 Feb 2029 | 3 PM - 5 PM",
    venue: "PFEC Global Office - Ahmedabad",
    image: null,
  },
  {
    title: "Canada Student Visa Seminar",
    date: "21 Feb 2029 | 11 AM - 1 PM",
    venue: "PFEC Global Office - Ahmedabad",
    image: null,
  },
  {
    title: "PTE Speaking Masterclass",
    date: "28 Feb 2029 | 2 PM - 3 PM",
    venue: "PFEC Global Office - Ahmedabad",
    image: null,
  },
  {
    title: "Scholarships Guidance Session",
    date: "07 Mar 2029 | 11 AM - 12 PM",
    venue: "PFEC Global Office - Ahmedabad",
    image: null,
  },
];

const calendarIcon = (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5 shrink-0 text-accent xl:h-[1.4rem] xl:w-[1.4rem]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
);

function Arrow({ label, onClick, flip }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-brand text-white transition-opacity hover:opacity-80 xl:h-[2.05rem] xl:w-[2.05rem]"
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-5 w-5 ${flip ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14.5 6l-6 6 6 6" />
      </svg>
    </button>
  );
}

export default function Events() {
  const count = events.length;
  // The list is rendered twice so the track can loop without a visible jump.
  const {
    animate,
    trackStyle,
    dragProps,
    next,
    prev,
    handleTransitionEnd,
    setPaused,
  } = useLoopSlider(count, AUTOPLAY_MS);

  return (
    <section id="events" className="overflow-hidden bg-[#f8f8f8]">
      <div className="mx-auto grid max-w-[105rem] gap-8 px-4 py-12 sm:px-8 lg:grid-cols-[19rem_1fr] lg:items-center lg:gap-0 lg:px-12 xl:grid-cols-[25.3rem_1fr] xl:py-[5.4rem] xl:pb-[6.5rem]">
        <div className="xl:pl-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#d9dcf3] bg-[#f1f2fc] text-brand shadow-[0_2px_8px_rgba(16,6,148,0.08)] xl:h-[3.9rem] xl:w-[3.9rem] xl:rounded-[0.6rem]">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 xl:h-[1.9rem] xl:w-[1.9rem]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M11 20.5H6a2.5 2.5 0 0 1-2.5-2.5V7.5A2.5 2.5 0 0 1 6 5h12a2.5 2.5 0 0 1 2.5 2.5V11" />
              <path d="M3.5 10h17M8 3v4M16 3v4" />
              <path d="M17 21s-3.5-2.1-3.5-4.3a1.8 1.8 0 0 1 3.5-.6 1.8 1.8 0 0 1 3.5.6C20.5 18.9 17 21 17 21z" />
            </svg>
          </span>

          <h2 className="mt-4 text-3xl font-bold text-[#1d297c] xl:mt-[1.2rem] xl:text-[2.05rem]">
            Upcoming Events
          </h2>
          <p className="mt-4 max-w-[18rem] text-sm text-neutral-800 xl:mt-[1.9rem] xl:max-w-[17.5rem] xl:text-[1rem] xl:leading-[1.25rem]">
            Specifically curated to help study abroad aspirants turn their
            dreams into reality.
          </p>

          <div className="mt-6 flex gap-2 xl:mt-[2.6rem]">
            <Arrow label="Previous event" onClick={prev} />
            <Arrow label="Next event" onClick={next} flip />
          </div>
        </div>

        {/* Clips cards at the left edge so they never slide over the text column;
            on the right they run off the edge of the screen. */}
        <div className="min-w-0 [clip-path:inset(-2rem_-100vw_-2rem_0)]">
          <ul
            onTransitionEnd={handleTransitionEnd}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            {...dragProps}
            style={trackStyle}
            className={`flex cursor-grab touch-pan-y select-none gap-4 active:cursor-grabbing [--step:18rem] sm:[--step:21rem] xl:gap-[1.45rem] xl:[--step:25.05rem] ${
              animate ? "transition-transform duration-700 ease-out" : ""
            }`}
          >
            {[...events, ...events].map(({ title, date, venue, image }, i) => (
              <li
                key={i}
                aria-hidden={i >= count}
                className="group w-[17rem] shrink-0 overflow-hidden rounded-xl bg-white shadow-[0_4px_18px_rgba(0,0,0,0.07)] sm:w-[20rem] xl:w-[23.6rem]"
              >
                <div className="relative h-40 overflow-hidden xl:h-[11.7rem]">
                  {image ? (
                    <Image
                      src={image}
                      alt={title}
                      fill
                      sizes="(min-width: 1280px) 24rem, 20rem"
                      draggable={false}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  ) : (
                    // Placeholder until the event has a photo
                    <div className="flex h-full items-center justify-center bg-linear-to-br from-[#011642] to-[#0338A8] text-white/60 transition-transform duration-700 ease-out group-hover:scale-110">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-12 w-12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
                        <path d="M3.5 10h17M8 3v4M16 3v4" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="px-5 pb-6 pt-4 xl:px-[1.4rem] xl:pb-[1.6rem] xl:pt-[0.9rem]">
                  <h3 className="line-clamp-2 min-h-[2lh] text-lg font-bold leading-snug text-accent xl:text-[1.5rem] xl:leading-[1.8rem]">
                    {title}
                  </h3>
                  <p className="mt-4 flex items-center gap-2.5 text-sm text-neutral-800 xl:mt-[1.3rem] xl:text-[1rem]">
                    {calendarIcon}
                    {date}
                  </p>
                  <p className="mt-3 flex items-center gap-2.5 text-sm text-neutral-800 xl:mt-[1.2rem] xl:text-[1rem]">
                    {calendarIcon}
                    {venue}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

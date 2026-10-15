"use client";

import Image from "next/image";
import useLoopSlider from "./useLoopSlider";

const AUTOPLAY_MS = 3500;

// Award cards in public/images/why_trust: each picture is a complete card.
const awards = [
  {
    src: "1.png",
    width: 650,
    alt: "Best Newcomer Gold (2024), recognised by The University of Western Australia",
  },
  {
    src: "2.png",
    width: 650,
    alt: "Double Platinum Eagle (2023) and Most Engaged Agency (2024), recognised by La Trobe University",
  },
  {
    src: "3.png",
    width: 650,
    alt: "Outstanding Partnership & Support for Sarawak Campus (2024), recognised by Swinburne University of Technology",
  },
  {
    src: "4.png",
    width: 632,
    alt: "Outstanding Achievement (2024) and Rising Star Agent Award (2022), recognised by Western Sydney University",
  },
];

// Logos in public/images/affiliations, in the order of the design; className sizes each one.
const affiliations = [
  { src: "affiliations_4.png", width: 250, height: 250, alt: "AIRC - American International Recruitment Council certified", className: "h-20 xl:h-[8.1rem]" },
  { src: "affiliations_3.png", width: 650, height: 762, alt: "ICEF accredited agency", className: "h-20 xl:h-[8rem]" },
  { src: "affiliations_5.png", width: 420, height: 650, alt: "QEAC #12934", className: "h-[4.75rem] xl:h-[7.75rem]" },
  { src: "affiliations_2.png", width: 772, height: 731, alt: "Member of Migration Institute of Australia", className: "h-[4.75rem] xl:h-[7.6rem]" },
  { src: "affiliations_1.png", width: 281, height: 101, alt: "IEAA - International Education Association of Australia", className: "h-7 xl:h-[2.75rem]" },
];

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

export default function WhyTrust() {
  const count = awards.length;
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
    <section id="why-trust" className="overflow-hidden bg-white">
      <div className="mx-auto max-w-[105rem] px-4 py-14 sm:px-8 lg:px-12 xl:pb-[5.5rem] xl:pt-[5.5rem]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-[#290098] xl:text-[0.77rem]">
              Why Trust PFEC
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-[#1d297c] sm:text-3xl xl:mt-[1.1rem] xl:text-[1.95rem] xl:leading-[2.2rem]">
              Recognised by universities.
              <br />
              Accredited by the industry.
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:items-end xl:gap-[0.9rem]">
            <p className="max-w-[26rem] text-sm text-neutral-600 sm:text-right xl:text-[0.95rem] xl:leading-[1.45rem]">
              Founded in Melbourne in 2006, now with offices in Australia,
              Bangladesh, India, Sri Lanka and Indonesia.
            </p>
            <div className="flex gap-2">
              <Arrow label="Previous award" onClick={prev} />
              <Arrow label="Next award" onClick={next} flip />
            </div>
          </div>
        </div>

        {/* Clips cards at the left edge of the content; on the right they run off the screen. */}
        <div className="mt-8 [clip-path:inset(-2rem_-100vw_-2rem_0)] xl:mt-[2.7rem]">
          <ul
            onTransitionEnd={handleTransitionEnd}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            {...dragProps}
            style={trackStyle}
            className={`flex cursor-grab touch-pan-y select-none gap-4 active:cursor-grabbing [--step:19rem] sm:[--step:23rem] xl:gap-[2rem] xl:[--step:28.4rem] ${
              animate ? "transition-transform duration-700 ease-out" : ""
            }`}
          >
            {[...awards, ...awards].map(({ src, width, alt }, i) => (
              <li
                key={i}
                aria-hidden={i >= count}
                className="w-[18rem] shrink-0 sm:w-[22rem] xl:w-[26.4rem]"
              >
                <Image
                  src={`/images/why_trust/${src}`}
                  alt={alt}
                  width={width}
                  height={372}
                  sizes="(min-width: 1280px) 27rem, 22rem"
                  draggable={false}
                  className="aspect-[650/372] w-full object-contain"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Affiliations */}
        <div className="mt-8 flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-6 lg:flex-row lg:items-center lg:justify-between xl:mt-[2.6rem] xl:min-h-[11rem] xl:rounded-[1.15rem] xl:px-[1.9rem] xl:py-[1rem]">
          <div>
            <h3 className="text-xl font-bold text-neutral-900 xl:text-[1.45rem]">
              <span className="text-[#290098]">Our Affiliations</span> &amp;
              Recognition
            </h3>
            <p className="mt-1 max-w-[21rem] text-sm text-neutral-700 xl:text-[0.95rem] xl:leading-[1.3rem]">
              Prestigious recognitions that speak volumes about the quality of
              our service.
            </p>
          </div>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-4 xl:gap-x-[1.4rem]">
            {affiliations.map(({ src, width, height, alt, className }) => (
              <li key={src}>
                <Image
                  src={`/images/affiliations/${src}`}
                  alt={alt}
                  width={width}
                  height={height}
                  className={`w-auto ${className}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import useLoopSlider from "./useLoopSlider";

const AUTOPLAY_MS = 3000;

// photo is in public/images/county, flag in public/images/country_icon.
const destinations = [
  { name: "Australia", link: "Study in Australia", photo: "au.jpg", flag: "australia.png" },
  { name: "United Kingdom", link: "Study in the UK", photo: "uk.jpg", flag: "united kingdom.png" },
  { name: "Canada", link: "Study in Canada", photo: "ca.jpg", flag: "canada.png" },
  { name: "New Zealand", link: "Study in New Zealand", photo: "nz.jpg", flag: "new zealand.png" },
  { name: "USA", link: "Study in the USA", photo: "usa.jpg", flag: "united states.png" },
  { name: "Ireland", link: "Study in Ireland", photo: "airland.jpg", flag: "ireland.png" },
  { name: "Germany", link: "Study in Germany", photo: "germany.jpg", flag: "germany.png" },
  { name: "Europe", link: "Study in Europe", photo: "europ.jpg", flag: "european union.png" },
  { name: "Dubai", link: "Study in Dubai", photo: "dubai.jpg", flag: "dubai.png" },
  { name: "Malaysia", link: "Study in Malaysia", photo: "malaysia.jpg", flag: "malaysia.png" },
  { name: "Japan", link: "Study in Japan", photo: "japan.jpg", flag: "japan.png" },
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

export default function Destinations() {
  const count = destinations.length;
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
    <section id="destinations" className="overflow-hidden bg-[#f8f8f8]">
      <div className="mx-auto max-w-[105rem] px-4 py-12 sm:px-8 lg:px-12 xl:pb-[4.3rem] xl:pt-[3.5rem]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-brand xl:text-[0.8rem]">
              Countries
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-[#1d297c] sm:text-3xl xl:mt-[1.1rem] xl:text-[1.95rem] xl:leading-[2.25rem]">
              Explore &amp; Apply to 11
              <br />
              Global Study Destinations
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:items-end xl:gap-[0.9rem]">
            <p className="max-w-[24rem] text-sm text-neutral-600 sm:text-right xl:text-[1rem] xl:leading-[1.45rem]">
              Pick a country to see universities, courses and visa steps, or
              let a counsellor help you compare.
            </p>
            <div className="flex gap-2">
              <Arrow label="Previous destination" onClick={prev} />
              <Arrow label="Next destination" onClick={next} flip />
            </div>
          </div>
        </div>

        {/* Clips cards at the left edge of the content; on the right they run off the screen. */}
        <div className="mt-8 [clip-path:inset(-2rem_-100vw_-2rem_0)] xl:mt-[2.4rem]">
          <ul
            onTransitionEnd={handleTransitionEnd}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            {...dragProps}
            style={trackStyle}
            className={`flex cursor-grab touch-pan-y select-none gap-4 active:cursor-grabbing [--step:16rem] sm:[--step:18rem] xl:gap-[1.3rem] xl:[--step:18.7rem] ${
              animate ? "transition-transform duration-700 ease-out" : ""
            }`}
          >
            {[...destinations, ...destinations].map(
              ({ name, link, photo, flag }, i) => (
                <li key={i} aria-hidden={i >= count} className="shrink-0">
                  <a
                    href="#"
                    draggable={false}
                    tabIndex={i >= count ? -1 : undefined}
                    className="group relative block h-[20rem] w-[15rem] overflow-hidden rounded-2xl sm:w-[17rem] xl:h-[21.6rem] xl:w-[17.4rem] xl:rounded-[1.15rem]"
                  >
                    <Image
                      src={`/images/county/${photo}`}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 18rem, 17rem"
                      draggable={false}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Dark fade at the bottom so the name stays readable */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-b from-transparent via-[#1b1446]/75 to-[#120d3d]" />

                    <div className="absolute inset-x-0 bottom-0 px-[1.15rem] pb-5 text-white xl:pb-[1.4rem]">
                      <p className="flex items-center gap-2 whitespace-nowrap text-lg font-bold sm:text-xl xl:gap-[0.55rem] xl:text-[1.35rem]">
                        <Image
                          src={`/images/country_icon/${flag}`}
                          alt=""
                          width={85}
                          height={85}
                          draggable={false}
                          className="h-6 w-6 shrink-0 rounded-full ring-2 ring-white/80 xl:h-[1.6rem] xl:w-[1.6rem]"
                        />
                        {name}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-white/90 xl:mt-[0.3rem] xl:text-[0.8rem]">
                        {link}
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </p>
                    </div>
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import useLoopSlider from "./useLoopSlider";

const AUTOPLAY_MS = 3500;

// Photos are in public/images/team, named after the person.
const team = [
  { name: "Kapil Kamar", role: ["Principal Migration Agent", "MARN 241861"] },
  { name: "Tushar Chopra", role: ["Registered Migration Agent", "MARN 2418420"] },
  { name: "Nic Soltani", role: ["Senior Registered Migration", "Agent - MARN 1387104"] },
  { name: "Apurva Golani", role: ["Registered Migration Agent", "MARN 2518793"] },
];

function Arrow({ label, onClick, flip }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-accent shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-transform hover:scale-105 xl:h-[3rem] xl:w-[3rem]"
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-6 w-6 ${flip ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14.5 5l-7 7 7 7" />
      </svg>
    </button>
  );
}

export default function Team() {
  const count = team.length;
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
    <section id="team" className="overflow-hidden bg-accent text-white">
      <div className="mx-auto grid max-w-[105rem] items-center gap-10 px-4 py-14 sm:px-8 lg:px-12 xl:grid-cols-[25rem_1fr] xl:gap-0 xl:py-[5rem]">
        <div>
          <p className="text-xs font-bold uppercase xl:text-[0.8rem]">
            Meet Our Team
          </p>
          <h2 className="mt-1 text-3xl font-bold leading-tight xl:text-[1.85rem] xl:leading-[2.3rem]">
            Your counsellors at
            <br />
            PFEC Ahmedabad
          </h2>
          <p className="mt-2 max-w-[24.5rem] text-sm text-white/95 xl:mt-[0.5rem] xl:text-[1rem] xl:leading-[1.25rem]">
            Talk to a real person who knows your destination – in English, Hindi
            or Gujarati.
          </p>

          <a
            href="#consultation"
            className="mt-7 inline-flex items-center gap-3 rounded-lg bg-[#290098] px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 xl:mt-[3.8rem] xl:px-[1rem] xl:py-[0.95rem] xl:text-[1rem]"
          >
            Book FREE Appointment
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          <div className="mt-7 flex gap-4 xl:mt-[3.9rem] xl:gap-[1.5rem]">
            <Arrow label="Previous counsellor" onClick={prev} />
            <Arrow label="Next counsellor" onClick={next} flip />
          </div>
        </div>

        <div className="min-w-0 overflow-hidden">
          <ul
            onTransitionEnd={handleTransitionEnd}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            {...dragProps}
            style={trackStyle}
            className={`flex cursor-grab touch-pan-y select-none gap-4 active:cursor-grabbing [--step:16rem] sm:[--step:18rem] xl:gap-[1.55rem] xl:[--step:18.85rem] ${
              animate ? "transition-transform duration-700 ease-out" : ""
            }`}
          >
            {[...team, ...team].map(({ name, role }, i) => (
              <li
                key={i}
                aria-hidden={i >= count}
                className="group w-[15rem] shrink-0 overflow-hidden rounded-lg bg-white text-neutral-900 sm:w-[17rem] xl:w-[17.3rem] xl:rounded-[0.6rem]"
              >
                <div className="relative h-[18rem] overflow-hidden bg-neutral-100 xl:h-[19.9rem]">
                  <Image
                    src={`/images/team/${name}.png`}
                    alt={name}
                    fill
                    sizes="(min-width: 1280px) 18rem, 17rem"
                    draggable={false}
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="px-3 pb-3 pt-2 xl:px-[0.8rem] xl:pb-[0.75rem] xl:pt-[0.45rem]">
                  <p className="text-lg font-bold text-accent xl:text-[1.35rem]">
                    {name}
                  </p>
                  <div className="mt-1 h-px w-32 bg-accent/70 xl:w-[9.5rem]" />
                  <p className="mt-2 text-sm leading-snug xl:mt-[0.6rem] xl:text-[1rem] xl:leading-[1.25rem]">
                    {role[0]}
                    <br />
                    {role[1]}
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

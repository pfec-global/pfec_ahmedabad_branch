"use client";

import Image from "next/image";
import useLoopSlider from "./useLoopSlider";

const AUTOPLAY_MS = 4000;

// Photos are in public/images/ahmedbad.
const photos = ["1.png", "2.png", "3.png", "4.png", "5.png"];

function Arrow({ label, onClick, flip }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#290098] text-white transition-opacity hover:opacity-80 xl:h-[3rem] xl:w-[3rem]"
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-6 w-6 ${flip ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14.5 5l-7 7 7 7" />
      </svg>
    </button>
  );
}

export default function OfficeGallery() {
  const count = photos.length;
  const {
    active,
    animate,
    trackStyle,
    dragProps,
    next,
    prev,
    goTo,
    handleTransitionEnd,
    setPaused,
  } = useLoopSlider(count, AUTOPLAY_MS);

  return (
    <section id="office" className="overflow-hidden bg-white">
      <div className="py-14 xl:pb-[4.5rem] xl:pt-[4.3rem]">
        <h2 className="px-4 text-center text-2xl font-bold text-[#1d297c] sm:text-3xl xl:text-[1.95rem]">
          Inside PFEC Global Ahmedabad
        </h2>

        {/* The photos are rendered three times: the middle copy is the one being shown, centred on
            the screen, and the copies either side fill the edges so a photo always peeks out on both sides. */}
        <div className="mt-8 xl:mt-[2.1rem]">
          <ul
            onTransitionEnd={handleTransitionEnd}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            {...dragProps}
            style={{
              ...trackStyle,
              marginLeft: `calc(50% - var(--slide) / 2 - var(--step) * ${count})`,
            }}
            className={`flex cursor-grab touch-pan-y select-none gap-4 active:cursor-grabbing [--slide:17rem] [--step:18rem] sm:gap-8 sm:[--slide:26rem] sm:[--step:28rem] xl:gap-[4.4rem] xl:[--slide:37.9rem] xl:[--step:42.3rem] ${
              animate ? "transition-transform duration-700 ease-out" : ""
            }`}
          >
            {[...photos, ...photos, ...photos].map((photo, i) => (
              <li
                key={i}
                aria-hidden={i < count || i >= count * 2}
                className="relative aspect-[916/763] w-[var(--slide)] shrink-0 overflow-hidden"
              >
                <Image
                  src={`/images/ahmedbad/${photo}`}
                  alt={`Inside the PFEC Global Ahmedabad office, photo ${(i % count) + 1}`}
                  fill
                  sizes="(min-width: 1280px) 38rem, (min-width: 640px) 26rem, 17rem"
                  draggable={false}
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 flex justify-center gap-3 xl:mt-[1.5rem] xl:gap-[1rem]">
          <Arrow label="Previous photo" onClick={prev} />
          <Arrow label="Next photo" onClick={next} flip />
        </div>

        <div className="mt-5 flex justify-center gap-1.5 xl:mt-[1.6rem]">
          {photos.map((photo, i) => (
            <button
              key={photo}
              type="button"
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
              className={`h-2 w-2 cursor-pointer rounded-full transition-colors xl:h-[0.55rem] xl:w-[0.55rem] ${
                i === active ? "bg-accent" : "bg-accent/15"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

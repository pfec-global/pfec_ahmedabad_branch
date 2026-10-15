"use client";

import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import * as motion from "motion/react-client";
import {
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

// Icons are in public/images/how_it_work; each title is split into its two lines, as in the design.
const steps = [
  { icon: "1.png", title: ["Request a callback", "through the form"] },
  { icon: "2.png", title: ["Our team contacts you to", "understand your needs"] },
  { icon: "3.png", title: ["We recommend the", "right IELTS option"] },
  { icon: "4.png", title: ["Availability Check", "and Registration"] },
];

// Desktop timeline, in "units" of scroll while the section is held on screen: each step takes
// 1 unit to appear, then its line fills for 2.5 units until the next step; the button follows the last step.
const STEP_UNITS = 3.5;
const TOTAL_UNITS = steps.length * STEP_UNITS + 0.5;
const at = (units) => units / TOTAL_UNITS;

// The section is held on screen (and the steps play with the scroll) only on desktop, where the steps sit in a row.
const DESKTOP = "(min-width: 1024px)";
const subscribe = (callback) => {
  const query = matchMedia(DESKTOP);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};
const useDesktop = () =>
  useSyncExternalStore(subscribe, () => matchMedia(DESKTOP).matches, () => false);

function StepContent({ icon, title, i, fill }) {
  return (
    <>
      <p className="text-center text-5xl font-bold leading-none text-[#d9d9d9] lg:text-left xl:text-[3.2rem]">
        {String(i + 1).padStart(2, "0")}
      </p>

      {/* Centred on phones and tablets; on desktop it lines up on the left with the line after it */}
      <div className="mt-2 flex items-center justify-center lg:justify-start xl:mt-[0.6rem]">
        {/* The picture includes its own soft shadow, so on desktop it is pulled left to line up with the text */}
        <Image
          src={`/images/how_it_work/${icon}`}
          alt=""
          width={126}
          height={126}
          className="-my-2 h-[4.5rem] w-[4.5rem] shrink-0 lg:-ml-2 xl:-ml-[0.55rem] xl:h-[5.3rem] xl:w-[5.3rem]"
        />
        {/* Line to the next step - desktop only, not after the last step. It fills from the left as you scroll. */}
        {i < steps.length - 1 && (
          <span className="relative ml-2 mr-5 hidden h-[0.55rem] flex-1 overflow-hidden rounded-full bg-[#ececf8] lg:block xl:ml-[0.4rem] xl:mr-[1.2rem]">
            <motion.span
              style={{ scaleX: fill }}
              className="absolute inset-0 origin-left rounded-full bg-linear-to-r from-[#1d0b8f] to-[#e6e6f7]"
            />
          </span>
        )}
      </div>

      <h3 className="mt-3 text-center text-lg font-bold leading-snug text-[#290098] lg:text-left xl:mt-[0.9rem] xl:text-[1.2rem] xl:leading-[1.5rem]">
        {title[0]}
        <br />
        {title[1]}
      </h3>
    </>
  );
}

// Desktop: the step appears, then its line fills, as the section is scrolled.
function ScrollStep({ step, i, progress, still }) {
  const start = at(i * STEP_UNITS);
  const shown = at(i * STEP_UNITS + 1);
  const next = at((i + 1) * STEP_UNITS);
  const opacity = useTransform(progress, [start, shown], [0, 1]);
  const y = useTransform(progress, [start, shown], [still ? 0 : 40, 0]);
  const fill = useTransform(progress, [shown, next], [0, 1]);

  return (
    <motion.li style={{ opacity, y }}>
      <StepContent {...step} i={i} fill={fill} />
    </motion.li>
  );
}

const ctaContent = (
  <>
    <p className="text-sm text-neutral-800 xl:text-[1rem]">
      Interested in Australia? We can check your eligibility and guide you on
      the next steps for FREE!
    </p>
    <a
      href="#consultation"
      className="mt-5 inline-flex items-center gap-3 rounded-lg bg-accent px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 xl:mt-[1.4rem] xl:px-[1.15rem] xl:py-[0.95rem] xl:text-[1rem]"
    >
      Check Eligibility
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  </>
);

const listClass =
  "mx-auto mt-10 grid max-w-[97.5rem] gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0 xl:mt-[3.6rem]";

export default function HowItWorks() {
  const ref = useRef(null);
  const desktop = useDesktop();
  const still = useReducedMotion();
  // 0 when the section reaches the top of the screen, 1 when it is about to scroll away
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // The furthest point reached: scrolling back up never undoes a step that has already played.
  // It starts from 0 again on every page load, so the animation plays once per visit.
  const progress = useMotionValue(0);
  // Once every step has played the section stops being held on screen, so scrolling back up
  // passes it normally instead of through a long still stretch.
  const [done, setDone] = useState(false);
  const heading = useRef(null);
  const headingTop = useRef(null);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value > progress.get()) progress.set(value);
    if (value >= 1 && !done) {
      headingTop.current = heading.current.getBoundingClientRect().top;
      setDone(true);
    }
  });

  // Releasing the hold removes the extra height above, which would make the page jump:
  // scroll by the same amount so the section stays exactly where it was on screen.
  useLayoutEffect(() => {
    if (!done || headingTop.current === null) return;
    const shift = heading.current.getBoundingClientRect().top - headingTop.current;
    window.scrollBy({ top: shift, behavior: "instant" });
    headingTop.current = null;
  }, [done]);

  const ctaOpacity = useTransform(progress, [at(TOTAL_UNITS - 1), at(TOTAL_UNITS)], [0, 1]);
  const ctaY = useTransform(progress, [at(TOTAL_UNITS - 1), at(TOTAL_UNITS)], [still ? 0 : 24, 0]);
  const pinned = desktop && !done;

  return (
    // On desktop the section is 260% of the screen tall; its content stays pinned on screen
    // for the extra 160% of scrolling, which drives the steps.
    <section id="how-it-works" ref={ref} className={`bg-white ${pinned ? "h-[260vh]" : ""}`}>
      <div
        className={
          pinned
            ? "sticky top-0 flex h-screen flex-col justify-center pt-[4.25rem] xl:pt-[5.5rem]"
            : ""
        }
      >
        <div className="mx-auto w-full max-w-[105rem] px-4 py-14 sm:px-8 lg:px-12 xl:pb-[3.8rem] xl:pt-[4.3rem]">
          <h2 ref={heading} className="text-center text-3xl font-bold text-[#290098] xl:text-[1.95rem]">
            How Does it Work?
          </h2>

          {desktop ? (
            <>
              <ol className={listClass}>
                {steps.map((step, i) => (
                  <ScrollStep key={step.icon} step={step} i={i} progress={progress} still={still} />
                ))}
              </ol>
              <motion.div style={{ opacity: ctaOpacity, y: ctaY }} className="mt-12 text-center xl:mt-[3.6rem]">
                {ctaContent}
              </motion.div>
            </>
          ) : (
            // Phones and tablets: each step fades in, one after another, as it scrolls into view
            <>
              <ol className={listClass}>
                {steps.map((step, i) => (
                  <motion.li
                    key={step.icon}
                    initial={{ opacity: 0, y: still ? 0 : 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                    transition={{ duration: 0.6, delay: (i % 2) * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <StepContent {...step} i={i} fill={1} />
                  </motion.li>
                ))}
              </ol>
              <div className="mt-12 text-center">{ctaContent}</div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import useLoopSlider from "./useLoopSlider";

const AUTOPLAY_MS = 4500;

// photoClass crops each cut-out photo so the faces sit well in the yellow box.
const testimonials = [
  {
    photo: "testimonial_1.png",
    photoClass: "object-center",
    quote:
      "My name is Abdul Deriya, and I recently received my Dubai student visa. I would like to give special thanks to PFEC Global for supporting me throughout the entire process, from counselling to visa approval. I visited many local consultancies, but I did not receive the proper guidance I was looking for. am very satisfied with the support and professionalism of the PFEC counsellor team.",
    name: "Abdul Deriya",
    course: "Manipal Academy of Higher Education - Dubai Campus",
  },
  {
    photo: "testimonial_3.png",
    photoClass: "object-top origin-top scale-[1.35]",
    quote:
      "I had a great experience with Azman Salid from PFEC Global during my Australian student visa process. They carefully guided me through every step, ensured all documents were accurate, and handled the process with great attention to detail. Their patience, dedication, and consistent support made everything much easier and stress-free. I highly recommend PFEC Global.",
    name: "Giash Uddin",
    course: "RMIT University - Bachelor of Engineering (Mechanical)",
  },
  {
    photo: "testimonial_2.png",
    photoClass: "object-[30%_center]",
    quote: "Lorem ipsum is standard dummy or placeholder text used in graphic design, publishing, and web development to preview layouts without real content distracting the reader.",
    name: "Lorem ipsum",
    course: "Adelade University - Bachelor of Engineering (Computer Science)",
  },
];

export default function Testimonials() {
  const count = testimonials.length;
  // The list is rendered twice so the track can loop without a visible jump.
  const { animate, trackStyle, dragProps, handleTransitionEnd, setPaused } =
    useLoopSlider(count, AUTOPLAY_MS);

  return (
    <section id="testimonials" className="overflow-hidden bg-[#f8f8f8]">
      <div className="mx-auto max-w-[105rem] px-4 py-12 sm:px-8 lg:px-12 xl:pb-[3.5rem] xl:pt-[3.5rem]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-accent xl:text-[0.75rem]">
              Student Stories
            </p>
            <h2 className="mt-1 text-3xl font-bold text-[#1d297c] xl:text-[2.05rem]">
              Honest advice. Real outcomes.
            </h2>
          </div>
          <p className="text-sm text-neutral-800 xl:pb-1 xl:text-[1rem]">
            Personal guidance based on your goals, virtual or in person.
          </p>
        </div>

        {/* Clips cards at the left edge of the content; on the right they run off the screen. */}
        <div className="mt-8 [clip-path:inset(-2rem_-100vw_-2rem_0)] xl:mt-[2.6rem]">
          <ul
            onTransitionEnd={handleTransitionEnd}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            {...dragProps}
            style={trackStyle}
            className={`flex cursor-grab touch-pan-y select-none gap-4 active:cursor-grabbing [--step:20rem] sm:[--step:25rem] md:[--step:43rem] xl:gap-[2.5rem] xl:[--step:48.5rem] ${
              animate ? "transition-transform duration-700 ease-out" : ""
            }`}
          >
            {[...testimonials, ...testimonials].map(
              ({ photo, photoClass, quote, name, course }, i) => (
                <li
                  key={i}
                  aria-hidden={i >= count}
                  className="flex w-[19rem] shrink-0 flex-col gap-5 rounded-xl bg-[#212a80] p-4 text-white sm:w-[24rem] md:w-[42rem] md:flex-row md:items-center xl:w-[46rem] xl:gap-[1.4rem] xl:rounded-[0.9rem] xl:p-[1.5rem]"
                >
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg bg-[#fdd63a] md:aspect-auto md:h-[17rem] md:w-[15rem] xl:h-[19.2rem] xl:w-[17.7rem] xl:rounded-[0.75rem]">
                    <Image
                      src={`/images/testimonial/${photo}`}
                      alt={name}
                      fill
                      sizes="(min-width: 768px) 18rem, 24rem"
                      draggable={false}
                      className={`object-cover ${photoClass}`}
                    />
                  </div>

                  <div className="pb-1 md:pr-3 xl:pr-[0.5rem]">
                    <p className="text-sm leading-relaxed text-white/90 xl:text-[1rem] xl:leading-[1.43rem]">
                      {quote}
                    </p>
                    <p className="mt-4 text-sm font-bold uppercase xl:mt-[1.4rem] xl:text-[0.98rem]">
                      {name}
                    </p>
                    <p className="mt-1.5 text-xs text-white/70 xl:mt-[0.5rem] xl:text-[0.85rem]">
                      {course}
                    </p>
                  </div>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

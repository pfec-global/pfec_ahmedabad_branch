"use client";

import { useId, useState } from "react";

const faqs = [
  {
    question: "How can PFEC help me with IELTS registration?",
    answer:
      "PFEC Global will guide you through the entire IELTS registration process, from selecting the right test type and date to completing your booking smoothly and on time.",
  },
  {
    question: "Why should I register for IELTS through PFEC?",
    answer:
      "By registering through PFEC, you receive personalized support, expert guidance, and assistance with your study abroad plans, all in one place.",
  },
  {
    question: "What support does PFEC provide after IELTS registration?",
    answer:
      "PFEC offers end-to-end support, including university selection, application assistance, and visa guidance based on your IELTS results.",
  },
  {
    question: "Can PFEC help me choose the right IELTS test?",
    answer:
      "Yes, our experienced counsellors will help you choose the correct IELTS test (Academic, General, or UKVI) based on your study, work, or migration goals.",
  },
  {
    question: "How do I get started with PFEC for IELTS registration?",
    answer:
      "Simply contact PFEC Global or visit our office, and our team will assist you with the registration process and guide you on your study abroad journey.",
  },
];

export default function Faq() {
  const id = useId();
  // All answers start open, as in the design; each question opens or closes its own answer.
  const [open, setOpen] = useState(() => faqs.map(() => true));
  const toggle = (i) => setOpen(open.map((value, j) => (j === i ? !value : value)));

  return (
    <section id="faq" className="bg-[#FDF6EC]">
      <div className="mx-auto max-w-[105rem] px-4 py-14 sm:px-8 lg:px-12 xl:pb-[4.4rem] xl:pt-[4.3rem]">
        <h2 className="text-center text-2xl font-bold text-[#290098] sm:text-3xl xl:text-[1.95rem]">
          Frequently Asked Questions
        </h2>

        <ul className="mx-auto mt-8 max-w-[55rem] space-y-4 xl:mt-[2.1rem] xl:space-y-[1.05rem]">
          {faqs.map(({ question, answer }, i) => (
            <li
              key={question}
              className="rounded-xl border border-neutral-200/70 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] xl:rounded-[0.75rem]"
            >
              <h3>
                <button
                  type="button"
                  aria-expanded={open[i]}
                  aria-controls={`${id}-${i}`}
                  onClick={() => toggle(i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 pt-5 text-left text-base font-bold text-accent xl:px-[1.55rem] xl:pt-[1.4rem] xl:text-[1.25rem]"
                >
                  {question}
                  {/* Minus when open; the vertical stroke appears to make a plus when closed */}
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 shrink-0 text-neutral-900"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M6 12h12" />
                    <path
                      d="M12 6v12"
                      className={`origin-center transition-transform duration-300 ${open[i] ? "scale-y-0" : ""}`}
                    />
                  </svg>
                </button>
              </h3>

              {/* Grid rows animate the height between 0 and the answer's own height */}
              <div
                id={`${id}-${i}`}
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  open[i] ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pt-2 text-sm text-neutral-700 xl:px-[1.55rem] xl:pt-[0.55rem] xl:text-[0.92rem] xl:leading-[1.25rem]">
                    {answer}
                  </p>
                </div>
              </div>
              <div className="h-5 xl:h-[1.4rem]" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

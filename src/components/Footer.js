import Image from "next/image";

// Link groups flow left to right, three per row on wider screens.
const linkGroups = [
  {
    title: "Student Services",
    links: [
      "Admission Support",
      "Visa Services",
      "Health Insurance",
      "Student Accommodation",
    ],
  },
  {
    title: "Study Destinations",
    links: ["Australia", "UK", "Canada", "Germany"],
  },
  {
    title: "Scholarships",
    links: ["Scholarships in Australia", "Scholarships in the UK"],
  },
  {
    title: "Resources",
    links: ["Blogs", "Upcoming Events", "Careers"],
  },
  {
    title: "About PFEC Global",
    links: [
      "About PFEC Sri Lanka",
      "Our Leadership",
      "Awards & Achievements",
      "Director’s Message",
      "Testimonials",
      "Contact Us",
    ],
  },
];

const legalLinks = ["Terms & Conditions", "Privacy Policy", "Cookie Policy"];

const socials = [
  {
    name: "LinkedIn",
    color: "bg-[#1d9bd1]",
    icon: (
      <path d="M6.94 8.5H4V20h2.94V8.5zM5.47 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4zM20 13.2c0-3-1.6-4.9-4.2-4.9-1.3 0-2.3.6-2.9 1.5V8.5H10V20h2.9v-6c0-1.6.8-2.6 2.1-2.6s2 .9 2 2.6v6H20v-6.8z" />
    ),
  },
  {
    name: "YouTube",
    color: "bg-[#e8402a]",
    icon: (
      <path
        fillRule="evenodd"
        d="M7 5.5h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3zm3.2 3.7v5.6l5-2.8-5-2.8z"
      />
    ),
  },
  {
    name: "Facebook",
    color: "bg-[#1f3f8f]",
    icon: (
      <path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8.1v3h2.5V21h2.9z" />
    ),
  },
  {
    name: "Instagram",
    color: "bg-[linear-gradient(45deg,#f9ce34,#ee2a7b_50%,#6228d7)]",
    icon: (
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        d="M8 4.5h8A3.5 3.5 0 0 1 19.5 8v8a3.5 3.5 0 0 1-3.5 3.5H8A3.5 3.5 0 0 1 4.5 16V8A3.5 3.5 0 0 1 8 4.5zm4 4a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm4.6-1.3v.01"
      />
    ),
  },
  {
    name: "Twitter",
    color: "bg-[#1da1f2]",
    icon: (
      <path d="M20 7.2c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8a3.3 3.3 0 0 0-5.6 3A9.3 9.3 0 0 1 5 6.3a3.3 3.3 0 0 0 1 4.4c-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.5.1-1 .2-1.5.1.4 1.3 1.7 2.3 3.1 2.3A6.6 6.6 0 0 1 4 17.3 9.3 9.3 0 0 0 9 18.8c6 0 9.4-5 9.4-9.4v-.4c.6-.5 1.2-1 1.6-1.8z" />
    ),
  },
];

function Contact({ address, phone }) {
  const icon = "mt-0.5 h-5 w-5 shrink-0 text-accent";
  return (
    <address className="space-y-3 not-italic">
      <p className="flex gap-2.5">
        <svg
          viewBox="0 0 24 24"
          className={icon}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
        {address}
      </p>
      <p className="flex gap-2.5">
        <svg
          viewBox="0 0 24 24"
          className={icon}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 4h3.5l1.5 4.5-2 1.5a11 11 0 0 0 6 6l1.5-2 4.5 1.5V19a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
        <a
          href={`tel:+${phone.replace(/\D/g, "")}`}
          className="hover:underline"
        >
          {phone}
        </a>
      </p>
    </address>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#1c1c1c] text-sm text-white xl:text-[1.05rem]">
      <div className="mx-auto max-w-[110.625rem] px-4 pb-8 pt-12 sm:px-8 lg:px-12 xl:pb-[3.75rem] xl:pt-[3.75rem]">
        <div className="grid gap-12 lg:grid-cols-[18rem_1fr] xl:grid-cols-[28rem_1fr] xl:gap-0">
          {/* Logo, about, contact and socials */}
          <div className="xl:pr-12">
            <Image
              src="/images/pfec_footer_logo.webp"
              alt="PFEC Global - Study Abroad | Visa"
              width={304}
              height={106}
              className="h-auto w-[9.5rem]"
            />
            <p className="mt-6 max-w-[21.5rem] leading-snug text-neutral-400">
              Since the establishment of PFEC Global in 2006, we have been
              offering higher education consultancy services to students who
              are dreaming of a quality life abroad.
            </p>
            <div className="mt-7 max-w-[21.5rem] text-neutral-200">
              <Contact
                address="05 Col TG Jayawardena Mawatha, Colombo 00300, Sri Lanka"
                phone="+94 77 734 3234"
              />
            </div>

            <h3 className="mt-7 text-lg font-bold text-accent xl:text-[1.25rem]">
              Follow Us
            </h3>
            <ul className="mt-3 flex gap-3 xl:gap-[0.95rem]">
              {socials.map(({ name, color, icon }) => (
                <li key={name}>
                  <a
                    href="#"
                    aria-label={name}
                    className={`flex h-8 w-8 items-center justify-center rounded-md text-white transition-opacity hover:opacity-80 xl:h-[2.1rem] xl:w-[2.1rem] ${color}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[85%] w-[85%]"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      {icon}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link groups */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-[23rem_23rem_1fr] xl:gap-x-0 xl:gap-y-[3.5rem]">
            {linkGroups.map(({ title, links }) => (
              <div key={title}>
                <h3 className="text-base font-bold text-accent xl:text-[1.3rem]">
                  {title}
                </h3>
                <ul className="mt-4 space-y-3 xl:mt-5 xl:space-y-[1.15rem]">
                  {links.map((label) => (
                    <li key={label}>
                      <a
                        href="#"
                        className="transition-colors hover:text-accent"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-neutral-500 pt-6 sm:flex-row sm:items-center sm:justify-between sm:px-3 xl:mt-4">
          <p>© 2025 PFEC Global | All Rights Reserved</p>
          <ul className="flex flex-wrap gap-x-10 gap-y-2 xl:gap-x-[3.3rem]">
            {legalLinks.map((link) => (
              <li key={link}>
                <a href="#" className="transition-colors hover:text-accent">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

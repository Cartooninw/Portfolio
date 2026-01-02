import { useArrive, revealUp } from "@/app/functions/reveal";
import React from "react";



function IconBase({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}


function IconGitHub() {
  // simple “cat” silhouette-ish outline (minimal)
  return (
    <IconBase>
      <path d="M9 19c-4 1.2-4-2-5-2" />
      <path d="M15 19v-3.3c0-1 .1-1.7-.5-2.4 1.7-.2 3.5-.8 3.5-3.8 0-.9-.3-1.7-.9-2.3.1-.3.4-1.2-.1-2.3 0 0-.7-.2-2.4.9-.7-.2-1.5-.3-2.2-.3s-1.5.1-2.2.3C8.5 3.2 7.8 3.4 7.8 3.4c-.5 1.1-.2 2-.1 2.3-.6.6-.9 1.4-.9 2.3 0 3 1.8 3.6 3.5 3.8-.4.5-.5 1.1-.5 2.1V19" />
    </IconBase>
  );
}

function IconInstagram() {
  return (
    <IconBase>
      <rect x="6" y="6" width="12" height="12" rx="3" />
      <path d="M12 11a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
      <path d="M16.5 7.5h.01" />
    </IconBase>
  );
}



export default function ExpRightSide() {
  const width = typeof window === "undefined" ? 0 : window.innerWidth;
  const ismobile = width < 768;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const { ref, arrived } = useArrive<HTMLElement>({ threshold: 0.3, once: false });
  const { ref: ref2, arrived: arrived2 } = useArrive<HTMLElement>({ threshold: 0.3, once: false });
  const { ref: ref3, arrived: arrived3 } = useArrive<HTMLElement>({ threshold: 0.3, once: false });
  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/Cartooninw",
      icon: <IconGitHub />,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/radthapoom1/",
      icon: <IconInstagram />,
    },
  ]
  const infos = [
    {
      link: "https://truecodingschool.com/",
      dates: ["May 2024 - March 2025"],
      companys: ["True Coding School"],
      positions: ["Intern"],
      explainations: [
        "During my internship, I had the opportunity to contribute to real projects in several areas, such as improving my presentation skills by teaching children, developing teamwork skills, learning FlutterFlow and Flutter, and building a LINE bot.",
      ],
      stacks: [
        "Google Script",
        "Flutter",
        "FlutterFlow",
        "Lua",
        "Firebase",
        "Git",
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-4">

      <h1
        className={revealUp(
          arrived,
          "md:hidden text-3xl text-center md:text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-100"
        )}
        ref={ref as React.RefObject<HTMLHeadingElement> | undefined}
      >
        Experience & Projects
      </h1>

      {/* <h2 className="mt-4 text-xl font-semibold text-slate-100">{role}</h2> */}

      <p
        className={revealUp(
          arrived2,
          "px-5 md:hidden mt-5 max-w-sm text-center text-sm md:text-base leading-relaxed text-slate-300/80"
        )}
        ref={ref2 as React.RefObject<HTMLParagraphElement> | undefined}
      >
        "I build accessible, pixel-perfect digital experiences for the web."
      </p>

      <div className="pb-10">
        <div
          className={revealUp(arrived3, "md:hidden flex justify-center items-center gap-5")}
          ref={ref3 as React.RefObject<HTMLDivElement> | undefined}
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-slate-100 transition-colors"
              aria-label={s.label}
              title={s.label}
            >
              <span className="sr-only">{s.label}</span>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/5 hover:bg-white/10 transition">
                {s.icon}
              </span>
            </a>
          ))}
        </div>
      </div>
      <br />
      {infos.map((info, index) => {

        console.log("ismobile", ismobile);
        const isActive = index + 1 === activeIndex && !ismobile;
        const isOtherActive = activeIndex !== 0 && !isActive && !ismobile;
        return (
          <article
            key={index}
            onMouseEnter={() => setActiveIndex(index + 1)}
            onFocus={() => setActiveIndex(index + 1)}
            onMouseLeave={() => setActiveIndex(0)}
            tabIndex={0}
            className={[
              "w-full max-w-3xl rounded-xl p-6 transition duration-200 outline-none",
              // NOT selected
              !isActive &&
              "border border-transparent bg-transparent  hover:opacity-100 hover:border-white/10 hover:bg-white/5 hover:backdrop-blur",
              // SELECTED
              isActive &&
              "border border-white/10 bg-white/5 shadow-sm backdrop-blur",
              // SOME OTHER selected
              isOtherActive && "opacity-50",
            ].join(" ")}
          >
            <div className="grid grid-cols-12 gap-6">
              {/* Left date */}
              <div className="col-span-12 md:col-span-3">
                <p className="text-xs font-semibold tracking-[0.18em] text-slate-300/60">
                  {info.dates}
                </p>
              </div>

              {/* Right content */}
              <div className="col-span-12 md:col-span-9">
                <div className="flex items-center md:justify-stretch justify-center gap-2">
                  <a
                    href={info.link}
                    target="_blank"
                    className={[
                      "text-base font-semibold transition-colors",
                      isActive
                        ? "text-cyan-300 hover:text-cyan-200"
                        : "text-slate-200 hover:text-cyan-200",
                    ].join(" ")}
                  >
                    {info.positions} · {info.companys}
                  </a>
                  <span
                    className={[
                      "transition-colors",
                      isActive ? "text-cyan-300/80" : "text-slate-400/70",
                    ].join(" ")}
                  >
                    ↗
                  </span>
                </div>

                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300/80">
                  {info.explainations}
                </p>

                <ul className="mt-5 flex md:justify-stretch justify-center flex-wrap gap-2">
                  {info.stacks.map((tech: string, i: number) => (
                    <li key={i}>
                      <span
                        className={[
                          "inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                          isActive
                            ? "bg-cyan-400/10 text-cyan-200"
                            : "bg-white/5 text-slate-300/80",
                        ].join(" ")}
                      >
                        {tech}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

"use client";

import React, { act, useEffect } from "react";
import Link from "next/link";
import { useScrollSpy } from "@/app/functions/scrollSpy";
import { useArrive, revealUp } from "../../functions/reveal";
type NavItem = {
  id: string;
  label: string; // e.g. "About"
  href: string; // e.g. "#about"
};

type SocialItem = {
  label: string; // e.g. "GitHub"
  href: string; // e.g. "https://github.com/..."
  icon: React.ReactNode;
};

type LeftSideProps = {
  name?: string;
  role?: string;
  tagline?: string;
  nav?: NavItem[];
  activeId?: string; // highlight current section
  socials?: SocialItem[];
  className?: string;
  intersectingChange?: string;
};

export function ExpLeftSide({
  name = "Experience & Projects",
  role = "Front End Engineer",
  tagline = "I build accessible, pixel-perfect digital experiences for the web.",
  nav = [
    { id: "0ex", label: "Experience", href: "experience" },
    { id: "1ex", label: "Projects", href: "projects" },
  ],

  socials = [
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
  ],
  className = "",
  intersectingChange,
}: LeftSideProps) {
  const { ref, arrived } = useArrive<HTMLElement>({
    threshold: 0.3,
    once: false,
  });

  const { ref: ref2, arrived: arrived2 } = useArrive<HTMLElement>({
    threshold: 0.3,
    once: false,
  });

  const { ref: ref3, arrived: arrived3 } = useArrive<HTMLElement>({
    threshold: 0.3,
    once: false,
  });
  const { ref: ref4, arrived: arrived4 } = useArrive<HTMLElement>({
    threshold: 0.3,
    once: false,
  });
  const [activeId, setActiveId] = React.useState("0ex");

  function scrollToSection(herf: string, index: string) {
    document.getElementById(herf)?.scrollIntoView({ behavior: "smooth" });
    setActiveId(index.toString() + "ex");
  }
  const idSet = nav.map((item) => item.href);
  useScrollSpy(idSet, setActiveId);

  useEffect(() => {
    if (intersectingChange) {
      console.log("ExpLeftSide intersectingChange:", intersectingChange);
      setActiveId(intersectingChange);
    }
  }, [intersectingChange]);
  return (
    <aside
      className={[
        "flex h-full flex-col justify-between pt-15",
        // good defaults for your dark background (#19192C)
        "text-slate-200",
        className,
      ].join(" ")}
    >
      {/* Top */}
      <div className="pt-10">
        <div className="mt-8 font-mono text-xs tracking-[0.3em] text-[#C16E67]">
          03 // Experience & Projects
        </div>
        <br />
        <br />
        <h1
          className={revealUp(
            arrived,
            "text-5xl font-extrabold tracking-tight text-slate-100"
          )}
          ref={ref}
        >
          {name}
        </h1>

        {/* <h2 className="mt-4 text-xl font-semibold text-slate-100">{role}</h2> */}

        <p
          className={revealUp(
            arrived2,
            "mt-5 max-w-sm text-base leading-relaxed text-slate-300/80"
          )}
          ref={ref2}
        >
          {tagline}
        </p>
        <br />
        {/* Nav */}
        <nav className="mt-14">
          <ul className={revealUp(arrived3, "space-y-3")} ref={ref3}>
            {nav.map((item, index) => {
              const isActive = index.toString() + "ex" === activeId;

              return (
                <li key={index}>
                  <div
                    onClick={() => scrollToSection(item.href, index.toString())}
                    aria-current={isActive ? "page" : undefined}
                    className={[
                      "group inline-flex items-center gap-4",
                      "uppercase tracking-[0.18em] text-xs font-semibold  scroll-smooth cursor-pointer  ",
                      "",
                      isActive ? "text-slate-100" : "text-slate-400",
                      "transition-colors",
                      "hover:text-slate-100 [&:hover>span:first-child]:w-20 [&:hover>span:first-child]:bg-slate-100",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        " w-8  h-px  transition-all duration-300 ",
                        isActive ? "w-20 bg-slate-100" : "w-8 bg-slate-500/60",
                      ].join(" ")}
                    />
                    <span>{item.label}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Bottom socials */}
      <div className="pb-10">
        <div
          className={revealUp(arrived4, "flex items-center gap-5")}
          ref={ref4}
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
    </aside>
  );
}

/* ---------- Minimal inline icons (no extra deps) ---------- */

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

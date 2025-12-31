"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

// --- Types ---
type NavItem = {
  id: string;
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: "About me", label: "About me", href: "#about" },
  { id: "Skills", label: "Skills", href: "#skills" },
  { id: "Experience", label: "Exp&Project", href: "#experience" },

];

export default function VerticalNavbar() {
  const [activeId, setActiveId] = useState<string>("details");


  function scrollToSection(herf: string, id: string) {
    document.getElementById(herf)?.scrollIntoView({ behavior: "smooth" });
    setActiveId(id)
  }


  return (
    <nav className="fixed left-0 top-0 flex h-screen w-20 flex-col items-center justify-center bg-transparent py-10 z-50">
      <ul className="flex flex-col gap-12">
        {NAV_ITEMS.map((item) => (
          <li
            key={item.id}
            className="relative flex items-center justify-center"
          >
            <button
              onClick={() => scrollToSection(item.href.replace("#", ""), item.id)}

              className={clsx(
                "group relative flex h-full items-center justify-center py-4 px-2 transition-colors duration-300  focus:outline-none",
                activeId === item.id
                  ? "text-cyan-400"
                  : "text-slate-400 hover:text-cyan-400"
              )}
            >

              {/* Vertical Text Logic:
                 rotate-[-90deg] makes the text read bottom-to-top.
                 whitespace-nowrap ensures it doesn't break.
              */}
              <span className="block rotate-[-90deg] whitespace-nowrap text-sm font-medium tracking-widest uppercase">
                {item.label}
              </span>

              {/* Active Indicator Line (The Cyan Line) */}
              <div className={["absolute border-l-3 border-solid  border-cyan-400 inset-0 z-0  w-0.5 mx-auto scale-y-0 group-hover:scale-y-150  transition-all duration-200 ease-in",

                activeId === item.id
                  ? "scale-y-150"
                  : ""
              ].join(" ")}>

              </div>
              {/* <motion.div
                layoutId="active-nav-line"
                className={clsx(
                  "absolute inset-0 z-0 h-full w-0.5 mx-auto",
                  activeId === item.id
                    ? "bg-cyan-400"
                    : "bg-transparent group-hover:bg-slate-400"
                )}
                style={{ borderRadius: 9999 }}
                initial={{ opacity: 0, height: "0%" }}
                animate={{ opacity: 1, height: "100%" }}
                exit={{ opacity: 0, height: "0%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              /> */}
            </button>
          </li>
        ))}
      </ul>
    </nav >
  );
}

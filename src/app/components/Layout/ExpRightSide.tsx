import React from "react";

export default function ExpRightSide() {
  const [activeIndex, setActiveIndex] = React.useState(0);
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
      {infos.map((info, index) => {
        const isActive = index + 1 === activeIndex;
        const isOtherActive = activeIndex !== 0 && !isActive;
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
                <div className="flex items-center gap-2">
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

                <ul className="mt-5 flex flex-wrap gap-2">
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

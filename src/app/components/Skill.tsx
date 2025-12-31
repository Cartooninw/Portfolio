// app/skills/page.tsx
import React from "react";
import DotsField from "./dotAvoid";

type Chip = {
  label: string;
  short?: string; // placeholder "logo" text
  wide?: boolean;
};

const capabilities = [
  "Shopify E-Commerce",
  "Next.js Custom Websites",
  "Full-Stack Applications",
  "Web Design",
];

const languages = [
  "HTML",
  "CSS",
  "JavaScript",
  "Shopify Liquid",
  "GraphQL",
  "GLSL (Shaders)",
];

const librariesApps = [
  "Next.js / React",
  "Three.js / React Three Fiber",
  "Shopify GraphQL API",
];

const chipRows: Chip[][] = [
  [
    { label: "React", short: "⚛" },
    { label: "HTML", short: "5" },
    { label: "CSS", short: "3" },
  ],
  [
    { label: "Prisma", short: "△" },
    { label: "Prismic", short: "P" },
    { label: "Vercel", short: "V" },
  ],
  [
    { label: "GLSL", short: "GL" },
    { label: "Shopify", short: "S" },
    { label: "Three.js", short: "3D" },
  ],
  [
    { label: "Next.js", short: "N" },
    { label: "JavaScript", short: "JS", wide: true },
    { label: "CSS", short: "3" },
  ],
  [
    { label: "GraphQL", short: "GQ", wide: true },
    { label: "PostgreSQL", short: "PG", wide: true },
  ],
  [{ label: "React Three Fiber", short: "R3F", wide: true }],
];

function ChipPill({ label, short = "•", wide }: Chip) {
  return (
    <div
      className={[
        "group flex items-center justify-between gap-3 rounded-full",
        "border border-white/15 bg-white/[0.03] px-5 py-3",
        "hover:bg-white/[0.06] hover:border-white/25 transition",
        wide ? "min-w-[280px]" : "min-w-[210px]",
      ].join(" ")}
    >
      <div className="text-white/90 text-[15px] tracking-wide">{label}</div>

      {/* Placeholder icon (swap for real logos later) */}
      <div className="h-9 w-9 rounded-full border border-white/15 bg-black/20 grid place-items-center">
        <span className="text-[11px] font-semibold text-white/80">{short}</span>
      </div>
    </div>
  );
}

/**
 * Continuous conveyor (marquee) row:
 * - Duplicates the content once
 * - Animates translateX from 0 to -50% (exactly one copy width)
 */
function MarqueeRow({
  children,
  duration = 18, // seconds
  reverse = false,
}: {
  children: React.ReactNode;
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <div className="relative overflow-hidden">
      {/* edge fade like the reference */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0B0E1A] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0B0E1A] to-transparent z-10" />

      <div
        className={[
          "rr-marquee-track flex w-max gap-4 will-change-transform",
          reverse ? "rr-marquee-rev" : "rr-marquee",
        ].join(" ")}
        style={{ animationDuration: `${duration}s` }}
      >
        {/* Copy A */}
        <div className="flex gap-4">{children}</div>
        {/* Copy B (duplicate for seamless loop) */}
        <div className="flex gap-4" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function SkillsPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden  text-white">
      {/* dotted grid background */}

      {/* Global CSS for marquee (kept in-file) */}
      <style jsx global>{`
        .rr-marquee,
        .rr-marquee-rev {
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .rr-marquee {
          animation-name: rr-marquee;
        }
        .rr-marquee-rev {
          animation-name: rr-marquee-rev;
        }

        /* Hover pause (no Tailwind plugin needed) */
        .rr-marquee-track:hover {
          animation-play-state: paused;
        }

        /* Two copies => -50% shifts exactly one copy width */
        @keyframes rr-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes rr-marquee-rev {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .rr-marquee,
          .rr-marquee-rev {
            animation: none !important;
            transform: translateX(0) !important;
          }
        }
      `}</style>

      <div className="relative mx-auto w-full  px-26 py-40">
        {/* header */}
        <div className="mt-12">
          <div className="font-mono text-xs tracking-[0.35em] text-[#C16E67]">
            02 // SKILLS
          </div>

          <h1 className="mt-4 leading-none">
            <span
              className={[
                "block font-extrabold",
                "text-[clamp(3.2rem,8vw,6.5rem)] tracking-tight",
                "text-transparent",
                "[-webkit-text-stroke:1px_rgba(255,255,255,0.70)]",
              ].join(" ")}
            >
              SKILLS
            </span>
          </h1>

          {/* <div className="mt-6 h-px w-full bg-white/10" /> */}
        </div>

        {/* content grid */}
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          {/* left column */}
          <section className="lg:col-span-5">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <h2 className="text-sm font-semibold text-white/90">
                  Capabilities
                </h2>
                <ul className="mt-4 space-y-3 text-white/70">
                  {capabilities.map((x) => (
                    <li key={x} className="leading-relaxed">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-white/90">
                  Languages
                </h2>
                <ul className="mt-4 space-y-3 text-white/70">
                  {languages.map((x) => (
                    <li key={x} className="leading-relaxed">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-semibold text-white/90">
                Libraries + Apps
              </h2>
              <ul className="mt-4 space-y-3 text-white/70">
                {librariesApps.map((x) => (
                  <li key={x} className="leading-relaxed">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* right column (moving cards) */}
          {/* <section className="col-span-7">
            <div className="rounded-3xl border border-white/12 bg-white/[0.02] p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-white/90">
                  Toolbox
                </div>
                <div className="text-xs text-white/55">Hover to pause</div>
              </div>

              <div className="mt-6 space-y-6">
                {chipRows.map((row, idx) => (
                  <div key={idx} className="space-y-4">
                    <MarqueeRow
                      duration={16 + idx * 2} // different speeds per row
                      reverse={idx % 2 === 1} // alternate direction (set false for all same direction)
                    >
                      {row.map((chip) => (
                        <ChipPill key={`${idx}-${chip.label}`} {...chip} />
                      ))}
                    </MarqueeRow>

                    {idx !== chipRows.length - 1 && (
                      <div className="h-px w-full bg-white/10" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section> */}
        </div>
      </div>
    </main>
  );
}

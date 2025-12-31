import { useArrive, revealUp } from "../../functions/reveal";

const capabilities = [
  "Next.js Custom Websites",
  "Three.js 3D Visuals",
  "Nuxt.js Websites",
  "Full-Stack Applications",
  "Ai Fine-Tuning & Integration",
];

const languages = [
  "JavaScript / TypeScript",
  "Python",
  "HTML / CSS",
  "PHP",
  "Lua",
  "SQL",
  "Flutter",
];

const librariesApps = [
  "Next.js / React",
  "Three.js / React Three Fiber",
  "Tailwind CSS",
  "Nuxt.js / Vue",
  "Elysia ",
  "Vercel ",
  "FlutterFlow",
];

const tools = ["Git / GitHub", "Docker", "Figma", "linux", "Prisma ORM"];
export default function SkillLeftSide() {
  const { ref: ref1, arrived: arrived1 } = useArrive<HTMLElement>({
    threshold: 0.3,
    once: true,
  });

  const { ref: ref2, arrived: arrived2 } = useArrive<HTMLElement>({
    threshold: 0.3,
    once: true,
  });

  const { ref: ref3, arrived: arrived3 } = useArrive<HTMLElement>({
    threshold: 0.3,
    once: true,
  });

  const { ref: ref4, arrived: arrived4 } = useArrive<HTMLElement>({
    threshold: 0.3,
    once: true,
  });

  const { ref: ref5, arrived: arrived5 } = useArrive<HTMLElement>({
    threshold: 0.3,
    once: true,
  });
  return (
    <main className="relative min-h-screen w-full overflow-hidden  text-white">
      {/* dotted grid background */}
      <div className="relative mx-auto w-full  px-26 py-40">
        {/* header */}
        <div className="mt-12">
          <div className="font-mono text-xs tracking-[0.35em] text-[#C16E67]">
            02 // SKILLS
          </div>

          <h1 className={revealUp(arrived1, "mt-4 leading-none")} ref={ref1 as React.RefObject<HTMLHeadingElement> | undefined}>
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

          <div className="mt-6 h-px w-full bg-white/10" />
        </div>

        {/* content grid */}

        {/* left column */}
        <section className="grid grid-flow-col grid-rows-2 gap-14 pt-15">
          {/* grid gap-10  */}
          <div className={revealUp(arrived2, "delay-100")} ref={ref2 as React.RefObject<HTMLDivElement> | undefined}>
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
          </div>

          <div className={revealUp(arrived3, "delay-200")} ref={ref3 as React.RefObject<HTMLDivElement> | undefined}>
            <h2 className="text-sm font-semibold text-white/90">Languages</h2>
            <ul className="mt-4 space-y-3 text-white/70">
              {languages.map((x) => (
                <li key={x} className="leading-relaxed">
                  {x}
                </li>
              ))}
            </ul>
          </div>

          <div className={revealUp(arrived4, "delay-300")} ref={ref4 as React.RefObject<HTMLDivElement> | undefined}>
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

          <div className={revealUp(arrived5, "delay-300")} ref={ref5 as React.RefObject<HTMLDivElement> | undefined}>
            <h2 className="text-sm font-semibold text-white/90">Tools </h2>
            <ul className="mt-4 space-y-3 text-white/70">
              {tools.map((x) => (
                <li key={x} className="leading-relaxed">
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

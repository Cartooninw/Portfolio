import { Plus, Grip } from "lucide-react";
import TypingAnimation from "@/app/functions/typingAnimation";
import { useArrive, revealUp } from "../../functions/reveal";

export default function ARightSide() {
  const { ref: ref1, arrived: arrived1 } = useArrive<HTMLHeadingElement>({
    threshold: 0.3,
    once: true,
  });

  const { ref: ref2, arrived: arrived2 } = useArrive<HTMLHeadingElement>({
    threshold: 0.3,
    once: true,
  });

  const { ref: ref3, arrived: arrived3 } = useArrive<HTMLParagraphElement>({
    threshold: 0.3,
    once: true,
  });

  const { ref: ref4, arrived: arrived4 } = useArrive<HTMLSpanElement>({
    threshold: 0.3,
    once: true,
  });
  return (
    <div className="relative overflow-hidden flex h-full w-full flex-col justify-center items-center p-8 md:p-12 text-white">
      {/* --- DECORATIVE: Signature (Top Right) --- */}
      <div className="absolute right-12 top-12 opacity-80">
        <svg
          width="120"
          height="60"
          viewBox="0 0 200 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-white"
        >
          <path d="M10,80 C30,70 50,10 80,40 C100,60 80,90 60,80 C40,70 100,20 150,20 C180,20 190,40 160,50" />
        </svg>
      </div>

      {/* --- DECORATIVE: Plus Sign (Right Middle) --- */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
        <Plus size={32} strokeWidth={1} />
      </div>

      {/* --- MAIN HEADLINES --- */}
      <div className="relative  z-10 flex flex-col gap-2  uppercase leading-none tracking-tighter">
        <h2
          className={revealUp(
            arrived1,
            "font-display text-5xl md:text-7xl font-bold transition-all  delay-[0ms] md:delay-[0ms]"
          )}
          ref={ref1}
        >
          <div className="block h-10 ">
            <TypingAnimation
              words={["Full Stack", "Frontend", "Backend", "Software"]}
            />
          </div>
        </h2>
        <h2
          className={revealUp(
            arrived2,
            "font-display text-5xl md:text-7xl font-bold text-transparent transition-all  delay-[100ms] md:delay-[150ms]"
          )}
          style={{ WebkitTextStroke: "1px white" }}
          ref={ref2}
        >
          Developer
        </h2>
      </div>

      {/* --- BODY TEXT --- */}
      <div className="mt-8 max-w-md">
        <p
          className={revealUp(
            arrived3,
            "font-mono text-sm  leading-relaxed text-gray-300 md:text-base transition-all  delay-[200ms] md:delay-[300ms]"
          )}
          ref={ref3}
        >
          I am a Computing student with a strong interest in application
          development, particularly in the field of software engineering. I have
          worked on several projects such as a Point-of-Sale system and a Web
          Chat application, which helped me develop my skills in the software
          development lifecycle and collaborative problem-solving. I am
          currently focusing on improving my knowledge in software development
          and applying it to real-world projects. My goal is to build solutions
          that create meaningful impact and continue growing professionally in
          the technology field.
        </p>
      </div>

      {/* --- FOOTER: Location --- */}
      <div
        className={revealUp(
          arrived4,
          "mt-12 flex items-center gap-3 delay-[300ms] md:delay-[450ms]"
        )}
        ref={ref4 as React.RefObject<HTMLDivElement> | undefined}
      >
        <Grip size={24} className="opacity-80" />
        <span
          className={revealUp(
            arrived4,
            "font-display text-lg font-bold uppercase tracking-widest transition-all  delay-[300ms] md:delay-[450ms]"
          )}
        >
          PRINCE OF SONGKLA UNIVERSITY, PHUKET CAMPUS
        </span>
      </div>

      {/* --- OPTIONAL: Subtle Container Border --- */}
      {/* Remove this div if you want it completely borderless */}
      <div className="pointer-events-none absolute inset-4 border border-white/10 rounded-3xl" />
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

type ArriveOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean; // default true
};

export function useArrive<T extends HTMLElement = HTMLElement>(
  opts: ArriveOptions = {}
) {
  const { threshold = 0.25, rootMargin = "0px", once = true } = opts;

  const ref = useRef<T | null>(null);
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion: show immediately
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReduced) {
      setArrived(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArrived(true);
          if (once) io.disconnect();
        } else if (!once) {
          setArrived(false);
        }
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, arrived };
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Tailwind classes for "from bottom -> final position"
 * Use like: className={revealUp(arrived, 'delay-300 text-6xl font-bold')}
 */
export function revealUp(
  arrived: boolean,
  extra: string = "",
  delay: string = ""
) {
  return cn(
    `transition-all duration-[2000ms] ease-out will-change-transform`,
    arrived ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
    extra
  );
}

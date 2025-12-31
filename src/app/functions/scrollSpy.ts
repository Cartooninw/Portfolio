import { useEffect, useState } from "react";

export function useScrollSpy(
  sectionIds: string[],
  setActiveId: React.Dispatch<React.SetStateAction<string>>
) {
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    console.log("sections:", sections);
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // pick the most “dominant” visible section
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;

        const best = visible.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio
        )[0];
        console.log("best:", (best.target as HTMLElement).id);
        setActiveId((best.target as HTMLElement).id);
      },
      {
        // triggers when section crosses the middle-ish of screen
        root: null,
        rootMargin: "-45% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    sections.forEach((s) => io.observe(s));
    // return () => io.disconnect();
  }, [setActiveId]);

  //   return activeId;
}

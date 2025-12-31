"use client";

import React, { forwardRef, useImperativeHandle, useRef } from "react";

export type CapturePointerMove = {
  onPointerMove: (e: React.PointerEvent) => void;
};
type GlowBackgroundProps = {
  children: React.ReactNode;
  className?: string;
  baseColor?: string; // default "#19192C"
  parentRef?: React.RefObject<HTMLElement>;
};

const GlowBackground = React.forwardRef<
  CapturePointerMove,
  GlowBackgroundProps
>(function GlowBackground(
  {
    children,
    className = "",
    baseColor = "#19192C",
    parentRef,
  }: GlowBackgroundProps,
  ref
) {
  const divRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);

  const onPointerMove = (e: React.PointerEvent) => {
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => update(e.clientX, e.clientY));
  };

  const update = (clientX: number, clientY: number) => {
    const el = divRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    el.style.setProperty("--mouse-x", `${x}px`);
    el.style.setProperty("--mouse-y", `${y}px`);
  };
  useImperativeHandle(ref, () => ({ onPointerMove }), []);
  return (
    <div
      ref={divRef}
      className={`group relative  `}
      style={
        {
          backgroundColor: baseColor,
          // default position (so it doesn't flash at 0,0)
          ["--mouse-x" as any]: "50%",
          ["--mouse-y" as any]: "40%",
        } as React.CSSProperties
      }
      // Capture phase = keeps working even when you're hovering text/UI on top
      onPointerMoveCapture={(e) => {
        if (raf.current) cancelAnimationFrame(raf.current);
        raf.current = requestAnimationFrame(() => update(e.clientX, e.clientY));
      }}
    >
      {/* Glow overlay */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 z-0
          opacity-0 transition-opacity duration-500
          group-hover:opacity-7 overflow-hidden blur-3xl
        "
        style={{
          backgroundImage: `
            radial-gradient(600px circle at var(--mouse-x) var(--mouse-y),
             rgb(48, 83, 144,0.85),
              transparent 80%
            )
          `,
          // makes it feel more “glowy” on dark backgrounds
          mixBlendMode: "screen",
          // filter: "blur(10px)",
          transform: "translateZ(0)",
        }}
      />

      {/* Content */}
      <div className={`relative z-10 ${className}`}>{children}</div>
    </div>
  );
});

export default GlowBackground;

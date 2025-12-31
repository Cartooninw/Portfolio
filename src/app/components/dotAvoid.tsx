"use client";

import React, { useEffect, useRef } from "react";

type DotsFieldProps = {
  className?: string;

  // Matchable to the pen defaults :contentReference[oaicite:1]{index=1}
  dotSize?: number; // px
  spacing?: number; // px
  attractionDistanceMultiplier?: number; // attractionDistance = spacing * multiplier :contentReference[oaicite:2]{index=2}
  attractionSmoothness?: number; // 0..1 :contentReference[oaicite:3]{index=3}

  dotColor?: string; // fillStyle :contentReference[oaicite:4]{index=4}
  backgroundColor?: string;
  parentRef?: React.RefObject<HTMLDivElement>;
};

export default function DotsField({
  className = "",
  dotSize = 2,
  spacing = 40,
  attractionDistanceMultiplier = 4,
  attractionSmoothness = 0.5,
  dotColor = "rgba(255, 255, 255, 0.3)",
  backgroundColor = "black",
  parentRef,
}: DotsFieldProps) {
  const wrapperRef = parentRef || useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number; inside: boolean }>({
    x: 0,
    y: 0,
    inside: false,
  });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));

      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Draw in CSS pixels, not device pixels
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.inside = true;
    };

    const onPointerLeave = () => {
      mouseRef.current.inside = false;
    };

    const getRepelledPoint = (x: number, y: number) => {
      const attractionDistance = spacing * attractionDistanceMultiplier; // :contentReference[oaicite:5]{index=5}
      const m = mouseRef.current;

      if (!m.inside) return { x, y };

      const dx = x - m.x;
      const dy = y - m.y;
      const da = Math.sqrt(dx * dx + dy * dy);

      // Same logic as the pen: push dot so it's ~attractionDistance away :contentReference[oaicite:6]{index=6}
      if (da > 0 && da < attractionDistance) {
        const ox = (dx / da) * attractionDistance - dx; // :contentReference[oaicite:7]{index=7}
        const oy = (dy / da) * attractionDistance - dy; // :contentReference[oaicite:8]{index=8}
        return {
          x: x + ox * attractionSmoothness, // :contentReference[oaicite:9]{index=9}
          y: y + oy * attractionSmoothness, // :contentReference[oaicite:10]{index=10}
        };
      }

      return { x, y };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = dotColor; // :contentReference[oaicite:11]{index=11}

      // Same grid stepping idea as the pen :contentReference[oaicite:12]{index=12}
      for (let w = 1; w < width / spacing; w++) {
        for (let h = 1; h < height / spacing; h++) {
          const baseX = w * spacing;
          const baseY = h * spacing;

          const p = getRepelledPoint(baseX, baseY);
          ctx.fillRect(p.x, p.y, dotSize, dotSize); // :contentReference[oaicite:13]{index=13}
        }
      }

      rafRef.current = window.requestAnimationFrame(draw); // :contentReference[oaicite:14]{index=14}
    };

    const ro = new ResizeObserver(() => resize());

    // init
    resize(); // :contentReference[oaicite:15]{index=15}
    ro.observe(wrapper);
    wrapper.addEventListener("pointermove", onPointerMove, { passive: true });
    wrapper.addEventListener("pointerleave", onPointerLeave, { passive: true });

    rafRef.current = window.requestAnimationFrame(draw); // :contentReference[oaicite:16]{index=16}

    return () => {
      ro.disconnect();
      wrapper.removeEventListener("pointermove", onPointerMove);
      wrapper.removeEventListener("pointerleave", onPointerLeave);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [
    dotSize,
    spacing,
    attractionDistanceMultiplier,
    attractionSmoothness,
    dotColor,
  ]);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}

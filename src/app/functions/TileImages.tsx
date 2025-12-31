"use client";

import Image, { type ImageProps } from "next/image";
import React, { useRef, useImperativeHandle } from "react";
import { useArrive, revealUp } from "./reveal";

export type ImagesHandle = {
  onEnter: () => void;
  onLeave: () => void;
  onMove: (clientX: number, clientY: number) => void;
};

type ImagesProps = Omit<ImageProps, "ref"> & {
  /** Max tilt (degrees) for each axis */
  maxTiltX?: number; // up/down
  maxTiltY?: number; // left/right
  /** Slight zoom on hover */
  scale?: number;
  /** Perspective depth (px) */
  perspective?: number;
  /** Extra class on the wrapper */
  wrapperClassName?: string;

};

const Images = React.forwardRef<ImagesHandle, ImagesProps>(function Images(
  {
    maxTiltX = 10,
    maxTiltY = 14,
    scale = 1.03,
    perspective = 900,
    wrapperClassName,

    className,

    ...imgProps
  }: ImagesProps,
  refa
) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const { ref, arrived } = useArrive<HTMLElement>({
    threshold: 0.3,
    once: true,
  });
  const rafRef = useRef<number | null>(null);

  const applyTransform = (rx: number, ry: number, leaving = false) => {
    const el = wrapRef.current;
    if (!el) return;

    el.style.transition = leaving
      ? "transform 220ms ease"
      : "transform 60ms ease-out";

    el.style.transform = `perspective(${perspective}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${leaving ? 1 : scale
      })`;
  };

  const onMove = (clientX: number, clientY: number) => {
    const el = wrapRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (clientX - rect.left) / rect.width;
    const py = (clientY - rect.top) / rect.height;

    const cx = px - 0.5;
    const cy = py - 0.5;

    const rotateY = cx * (maxTiltY * 2);
    const rotateX = -cy * (maxTiltX * 2);

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() =>
      applyTransform(rotateX, rotateY, false)
    );
  };

  const onLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    applyTransform(0, 0, true);
  };

  const onEnter = () => {
    applyTransform(0, 0, false);
  };
  useImperativeHandle(refa, () => ({ onEnter, onLeave, onMove }), []);

  return (
    <div
      ref={wrapRef}
      className={wrapperClassName}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
        display: "inline-block",
      }}
    >
      <Image
        ref={ref as React.RefObject<HTMLImageElement> | undefined}
        {...imgProps}
        className={revealUp(arrived, className ?? "")}
        style={{
          display: "block",
          backfaceVisibility: "hidden",
          ...(imgProps.style ?? {}),
        }}
      />
    </div>
  );
});
export default Images;

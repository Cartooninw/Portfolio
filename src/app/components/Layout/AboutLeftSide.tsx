import Images, { type ImagesHandle } from "../../functions/TileImages";
import { useArrive, revealUp } from "../../functions/reveal";
import React, { useState, useEffect, useRef } from "react";
import {
  Volume2,
  ArrowRight,
  Asterisk,
  ArrowUpRight,
  Plus,
  Minus,
} from "lucide-react";

export default function ALeftSide() {
  const { ref, arrived } = useArrive<HTMLElement>({
    threshold: 0.3,
    once: false,
  });
  const mainRef = useRef<HTMLDivElement | null>(null);

  const imgRef = React.useRef<ImagesHandle>(null);
  return (
    <div
      ref={mainRef}
      className="flex flex-col items-center justify-between h-full w-full z-10 "
      onPointerEnter={() => imgRef.current?.onEnter()}
      onPointerLeave={() => imgRef.current?.onLeave()}
      onPointerMove={(e) => imgRef.current?.onMove(e.clientX, e.clientY)}
    >
      {/* Decorative Corner */}
      <div className="relative flex  flex-col  text-[#DDD1C5] justify-between  border-white/10 p-3 md:w-1/2 ">
        <div className="absolute left-0 top-0 p-4 opacity-50">
          <Plus size={16} />
        </div>

        {/* Top Label */}
        <div className="mt-8 font-mono text-xs tracking-[0.3em] text-[#C16E67]">
          01 // ABOUT ME
        </div>
      </div>
      <Images
        ref={imgRef}
        className={"rounded-full"}
        src="/images/my.png"
        width={380}
        height={380}
        alt="Picture of the author"
      />

      <div></div>
      <div></div>
    </div>
  );
}

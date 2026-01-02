"use client";
import React, { useState, useEffect } from "react";
import DotsField from "../dotAvoid";
import {
  Volume2,
  ArrowRight,
  Asterisk,
  ArrowUpRight,
  Plus,
  Minus,
} from "lucide-react";
import { Syncopate, Rajdhani } from "next/font/google";

export default function LeftSide() {
  return (
    <div className="w-full h-full flex items-center justify-center ">
      <div className="relative flex  flex-col  text-[#DDD1C5] justify-between border-b border-white/10 p-3 md:w-1/2 z-11 ">
        {/* Decorative Corner */}
        <div className="absolute left-0 top-0 p-4 opacity-50">
          <Plus size={16} />
        </div>

        {/* Top Label */}
        <div className="mt-8 font-mono text-xs text-start tracking-[0.3em] text-[#C16E67]">
          00 // INTRODUCTION
        </div>

        {/* Main Content */}
        <div
          className="my-12 "
          onPointerDown={(e) => e.stopPropagation()}
          onPointerMove={(e) => e.stopPropagation()}
        >
          <main className="pointer-events-auto relative mt-10 w-full max-w-4xl">
            {/* Decorative Grid Line */}

            {/* Name Title */}
            <h1
              className="font-display text-5xl lg:text-8xl text-center lg:text-left font-bold uppercase leading-[0.85] tracking-tighter text-transparent"
              style={{ WebkitTextStroke: "2px white" }}
            >
              RADTHAPOOM <br />
              <span className="text-white">RODNIL</span>
            </h1>

            {/* Subtitles */}
            <div className="mt-8 flex flex-col gap-4 items-center lg:items-start">
              <h2 className="font-mono text-3xl font-bold uppercase tracking-widest text-white/90">
                Portfolio ©2025
              </h2>
              <div className="flex items-center gap-4 text-sm font-semibold tracking-[0.2em] text-cyan-300">
                <span>AI</span>
                <Asterisk size={12} className="animate-spin-slow" />
                <span>WEBSITE</span>
                <Asterisk size={12} className="animate-spin-slow" />
                <span>APPLICATION</span>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* <div
        className="pointer-events-none absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div> */}
    </div>
  );
}

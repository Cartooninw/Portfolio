"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility for cleaner tailwind classes ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface TechItem {
  name: string;
  icon?: string; // URL to icon or component
  color?: string; // Optional accent color
}

interface MarqueeRowProps {
  items: TechItem[];
  direction: "left" | "right";
  speed?: number; // Duration in seconds
  className?: string;
}

// --- Data (Mocking the items from your image) ---
const ROW_1: TechItem[] = [
  { name: "NextJS", color: "bg-black text-white" },
  {
    name: "React",
    color: "text-blue-500",
    icon: "/images/React.png",
  },
  {
    name: "JavaScript",
    color: "bg-yellow-400",
    icon: "/images/JS.png",
  },
  {
    name: "TypeScript",
    color: "text-blue-600",
    icon: "/images/TS.png",
  },
  {
    name: "NuxtJS",
    color: "text-green-600",
    icon: "/images/Nuxt.png",
  },
  { name: "NextJS", color: "bg-black text-white" },
  {
    name: "React",
    color: "text-blue-500",
    icon: "/images/React.png",
  },
  {
    name: "JavaScript",
    color: "bg-yellow-400",
    icon: "/images/JS.png",
  },
  {
    name: "TypeScript",
    color: "text-blue-600",
    icon: "/images/TS.png",
  },
  {
    name: "NuxtJS",
    color: "text-green-600",
    icon: "/images/Nuxt.png",
  },
];

const ROW_2: TechItem[] = [
  {
    name: "PostgreSQL",
    color: "text-slate-700",
    icon: "/images/postgresql.png",
  },
  {
    name: "Python",
    color: "text-pink-600",
    icon: "/images/Python.png",
  },
  {
    name: "Prisma ORM",
    color: "text-slate-800",
    icon: "/images/Prisma.png",
  },
  {
    name: "MySQL",
    color: "text-green-500",
    icon: "/images/MySQL.png",
  },
  {
    name: "Docker",
    color: "text-blue-400",
    icon: "/images/Docker.png",
  },
  {
    name: "PostgreSQL",
    color: "text-slate-700",
    icon: "/images/postgresql.png",
  },
  {
    name: "Python",
    color: "text-pink-600",
    icon: "/images/Python.png",
  },
  {
    name: "Prisma ORM",
    color: "text-slate-800",
    icon: "/images/Prisma.png",
  },
  {
    name: "MySQL",
    color: "text-green-500",
    icon: "/images/MySQL.png",
  },
  {
    name: "Docker",
    color: "text-blue-400",
    icon: "/images/Docker.png",
  },
];

const ROW_3: TechItem[] = [
  {
    name: "ThreeJS",
    color: "text-black",
    icon: "/images/threejs.png",
  },
  {
    name: "Figma",
    color: "text-purple-500",
    icon: "/images/figma.png",
  },
  {
    name: "Elysia",
    color: "text-green-600",
    icon: "/images/elysia.png",
  },
  {
    name: "Tailwind",
    color: "text-cyan-500",
    icon: "/images/tailwind.png",
  },
  {
    name: "ThreeJS",
    color: "text-black",
    icon: "/images/threejs.png",
  },
  {
    name: "Figma",
    color: "text-purple-500",
    icon: "/images/figma.png",
  },
  {
    name: "Elysia",
    color: "text-green-600",
    icon: "/images/elysia.png",
  },
  {
    name: "Tailwind",
    color: "text-cyan-500",
    icon: "/images/tailwind.png",
  },
];
const ROW_4: TechItem[] = [
  {
    name: "Linux",
    color: "text-black",
    icon: "/images/Linux.png",
  },
  {
    name: "Vercel",
    color: "text-black",
    icon: "/images/Vercel.png",
  },
  {
    name: "Lua",
    color: "text-purple-500",
    icon: "/images/Lua.png",
  },
  {
    name: "SQL",
    color: "text-green-600",
    icon: "/images/Sql.png",
  },
  {
    name: "GitHub",
    color: "text-cyan-500",
    icon: "/images/github-mark.svg",
  },
  {
    name: "Linux",
    color: "text-black",
    icon: "/images/Linux.png",
  },
  {
    name: "Vercel",
    color: "text-black",
    icon: "/images/Vercel.png",
  },
  {
    name: "Lua",
    color: "text-purple-500",
    icon: "/images/Lua.png",
  },
  {
    name: "SQL",
    color: "text-green-600",
    icon: "/images/Sql.png",
  },
  {
    name: "GitHub",
    color: "text-cyan-500",
    icon: "/images/github-mark.svg",
  },
];

const ALL_ROWS = [ROW_1, ROW_2, ROW_4, ROW_3];

// --- Sub-Component: Single Infinite Row ---
const MarqueeRow = ({
  items,
  direction,
  speed = 200,
  className,
}: MarqueeRowProps) => {
  // We duplicate the items to ensure the loop is seamless.
  // [Items] + [Items] creates the infinite buffer.
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div
      className={cn(
        "flex overflow-hidden select-none w-full mask-gradient",
        className
      )}
    >
      <motion.div
        className="flex flex-shrink-0 gap-4 py-2"
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{
          x: direction === "left" ? "-50%" : 0,
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {duplicatedItems.map((item, idx) => {
          if (!item) return null;
          const hasIcon = Boolean(item.icon);

          return (
            <div
              key={`${item.name}-${idx}`}
              className="
              relative flex items-center gap-2 px-16 py-6 
             bg-white border-1 border-black rounded-full 
               whitespace-nowrap 
            "
            >
              {/* Placeholder for Icon - using a simple circle or the color prop */}
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs",
                  item.color
                )}
              >
                {/* In real app, render <Image /> here */}
                {hasIcon ? (
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={24}
                    height={24}
                  />
                ) : (
                  item.name[0]
                )}
              </div>
              <span className="text-lg font-medium text-[#19192C] font-sans">
                {item.name}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

// --- Main Component ---
export default function TechStackSection() {
  return (
    <section className="w-200 h-full flex flex-col justify-center gap-16 py-50  overflow-hidden">
      {ALL_ROWS.map((rowItems, index) => {
        // Alternating logic: Even rows go Left, Odd rows go Right
        const isEven = index % 2 === 0;
        const direction = isEven ? "left" : "right";

        // Varying speed slightly creates a more natural, organic feel
        const speed = 60;

        return (
          <MarqueeRow
            key={index}
            items={rowItems}
            direction={direction}
            speed={speed}
          />
        );
      })}
    </section>
  );
}

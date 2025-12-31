import { Volume2, ArrowRight, Asterisk, Plus } from "lucide-react";
import { Syncopate, Rajdhani } from "next/font/google";

// 1. Font Setup (Add these to your font config or layout)
const syncopate = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-syncopate",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-rajdhani",
});

export default function Header() {
  return (
    <div
      className={` absolute inset-0 flex flex-col justify-between p-8 text-white ${syncopate.variable} ${rajdhani.variable} font-sans`}
    >
      {/* --- TOP BAR --- */}
      <header className="pointer-events-auto flex w-full items-start justify-between">
        {/* Logo */}
        <div className="text-3xl font-bold tracking-tighter">R.R</div>

        {/* Right Actions */}
        <div className="flex items-center gap-6 pointer-events-auto z-20 ">
          <button className="group flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-6 py-2 backdrop-blur-md transition hover:bg-white hover:text-black">
            <span className="font-mono text-sm tracking-widest uppercase">
              Say Hello
            </span>
            <div className="h-2 w-2 rounded-full bg-green-400 group-hover:bg-black"></div>
          </button>
        </div>
      </header>

      {/* --- MAIN HERO TEXT --- */}
    </div>
  );
}

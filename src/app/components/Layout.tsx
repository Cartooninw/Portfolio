"use client";

import LeftSide from "./Layout/IntroduceLeftSide";
import ALeftSide from "./Layout/AboutLeftSide";
import ARightSide from "./Layout/AboutRightSide";
import RightSide from "./Layout/IntroduceRightSide";
import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { InteractiveModel } from "../models/interactiveModel";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Cozy_room } from "../models/Cozy_room";
import Image from "next/image";
import Room from "./Room";
import DotsField from "./dotAvoid";
import SkillsPage from "./Skill";
import SkillLeftSide from "./Layout/SkillLeftSide";
import SkillRightSide from "./Layout/SkillRightSide";
import GlowBackground, {
  type CapturePointerMove,
} from "../functions/flashlight";
import { ExpLeftSide } from "./Layout/ExpLeftSide";
import ExpRightSide from "./Layout/ExpRightSide";
import VerticalNavbar from "./Navigator";
import ProRightSide from "./Layout/ProRightSide";
export default function Layout() {
  const mainRef = useRef<HTMLDivElement>(null);
  const mainSkillRef = useRef<HTMLDivElement>(null);
  const flashlightRef = useRef<CapturePointerMove>(null);

  const [expActiveId, setExpActiveId] = React.useState("0ex");
  const scrollingRef = [useRef(null), useRef(null)];

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;

        const best = visible.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio
        )[0];
        const id = best.target.getAttribute("data-targetnav");
        console.log("best:", id);
        setExpActiveId((id as string) || "0ex");
        // if (entry.isIntersecting) {
        //   console.log("entry:", entry);
        //   const id = entry.target.getAttribute("data-targetnav");
        //   if (id) setExpActiveId(id);
        // }
      },
      { threshold: 0.02 }
    );

    scrollingRef.forEach((ref) => {
      if (ref.current) {
        io.observe(ref.current);
      }
    });
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={mainRef}
      className=" relative flex flex-col w-full h-full selection:bg-[#DDD1C5] selection:text-[#19192C] "
    >
      {/* introduce */} {/* Background Grid Decoration (Subtle) */}
      <div className="absolute h-200 w-full inset-0 z-0 ">
        <DotsField parentRef={mainRef} />
      </div>
      {/* <VerticalNavbar /> */}
      <div className="relative flex flex-row w-full h-full ">
        <div className="h-200 w-1/2 z-20">
          <LeftSide />
        </div>
        <div className=" absolute text-white top-0 left-0 w-full h-full ">
          <Canvas
            eventPrefix="client"
            eventSource={mainRef}
            id="canvas"
            camera={{ position: [0, 3.5, 8.5], fov: 50 }}
            // style={{ width: "100%", height: "90vh" }}
            style={{ zIndex: 20 }}
          >
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <Environment preset="sunset" blur={0.5} />
            <Suspense fallback={null}>
              <Cozy_room position={[4, -1.5, 0]} />
            </Suspense>
            {/* <OrbitControls enableDamping enableZoom={false} /> */}
          </Canvas>
        </div>
      </div>
      <div>
        <div id="about" className="relative flex flex-row w-full h-full z-10 ">
          <div className="h-175 w-1/2 ">
            <ALeftSide />
          </div>
          <div className=" h-175 w-1/2 bg-[#212239] ">
            <ARightSide />
          </div>
        </div>
      </div>
      <div id="skills" ref={mainSkillRef} className="relative flex flex-row w-full h-full ">
        <div className="absolute h-full w-full inset-0 z-0 ">
          <DotsField parentRef={mainSkillRef} />
        </div>
        <div className="h-full w-1/2 ">
          <SkillLeftSide />
        </div>
        <div className=" h-full w-1/2  ">
          <SkillRightSide />
        </div>
      </div>
      {/* <div
        // onPointerMoveCapture={(e) => flashlightRef.current?.onPointerMove(e)}
        className="relative flex flex-row w-full min-h-screen"
      > */}
      <GlowBackground

        ref={flashlightRef}
        className="h-600 w-full flex flex-row pl-10"
      >
        <div className="sticky top-0 items-start flex justify-center h-screen w-1/2  ">
          <br />
          <br />
          <ExpLeftSide intersectingChange={expActiveId} />
        </div>
        <div className=" w-1/2 ">
          <div
            ref={scrollingRef[0]}
            id="experience"
            data-targetnav="0ex"
            className="min-h-screen flex flex-col justify-center "
          >
            <ExpRightSide />
          </div>
          <div
            ref={scrollingRef[1]}
            id="projects"
            data-targetnav="1ex"
            className="h-screen"
          >
            <ProRightSide />
          </div>
        </div>
      </GlowBackground>
    </div>
    // </div>
  );
}

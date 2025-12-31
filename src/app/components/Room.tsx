"use client";
import Image from "next/image";
import { Cozy_room } from "../models/Cozy_room";
import { SpinningModel } from "../models/SpinningModel";
import { Box } from "@react-three/drei/core/shapes";
import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { InteractiveModel } from "../models/interactiveModel";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

export default function Room(ref: any) {
  return (
    <div className="absolute text-white top-0 left-0 w-full h-full z-10">
      <Canvas
        eventPrefix="client"
        id="canvas"
        camera={{ position: [0, 3.5, 8.5], fov: 50 }}
        style={{ width: "100%", height: "90vh" }}
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
  );
}

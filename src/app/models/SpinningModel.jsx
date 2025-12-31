import React, { Suspense, useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import * as THREE from "three"


export function SpinningModel({ url = "/models/cozy_room-transformed.glb", speed = 0.8 }) {
  const groupRef = useRef()
  const { scene } = useGLTF(url)

  // Optional: center the model so it spins around its middle
  useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    scene.position.sub(center)
  }, [scene])

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * speed
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload("/models/cozy_room-transformed.glb")


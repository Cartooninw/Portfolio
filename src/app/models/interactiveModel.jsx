
'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Center, Environment } from '@react-three/drei'
import * as THREE from 'three'

export function InteractiveModel() {
  const groupRef = useRef()
  // Load your GLTF/GLB file here
  const { scene } = useGLTF("/models/cozy_room-transformed.glb") 

  useFrame((state) => {
    if (!groupRef.current) return

    // --- LOGIC EXPLANATION ---
    // state.pointer.x: horizontal mouse position (-1 to 1)
    // state.pointer.y: vertical mouse position (-1 to 1)
    
    // Calculate target rotation (adjust 0.5 to make it turn more or less)
    const targetY = state.pointer.x * 0.5 
    const targetX = -state.pointer.y * 0.2 // Invert Y so up is up
    const softX = state.pointer.y * 0.1
    // Smoothly animate current rotation to target rotation
    // 0.1 is the "smoothing" factor (lower = slower/smoother)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.1) 
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.1)
  })

  return (
    <primitive 
      ref={groupRef} 
      object={scene} 
      // Adjust scale/rotation if your raw model is huge or flipped
      scale={1} 
    />
  )
}
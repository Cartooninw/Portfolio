'use client'

import React, { useRef,useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'


export function Cozy_room(props) {
  const { nodes, materials } = useGLTF('/models/cozy_room-transformed.glb')
  
  // 1. Create Refs for the two layers of animation
  const outerGroupRef = useRef() // Controls Spinning
  const innerGroupRef = useRef() // Controls Looking

  useFrame((state, delta) => {
    if (!outerGroupRef.current || !innerGroupRef.current) return

    // --- LOGIC 1: SPINNING (Outer Group) ---
    // Auto-spin + Mouse Up/Down control
    // const spinSpeed = 0.5 + (state.pointer.y * 3) // Up = Fast, Down = Slow/Reverse
    // outerGroupRef.current.rotation.y += spinSpeed * delta
    const targetX = -state.pointer.y * 0.3 // Invert Y so up is up
    outerGroupRef.current.rotation.x = THREE.MathUtils.lerp(outerGroupRef.current.rotation.x, targetX, 0.1)
 
    // --- LOGIC 2: LOOKING (Inner Group) ---
    // Mouse Left/Right control (Glance effect)
    // Left movement rotates more than right
    const leftMultiplier = 0.7  // More rotation when moving left
    const rightMultiplier = 0.3 // Less rotation when moving right
    const multiplier = state.pointer.x < 0 ? leftMultiplier : rightMultiplier
    const targetLookY = state.pointer.x * multiplier
    innerGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      innerGroupRef.current.rotation.y,
      targetLookY,
      0.1 
    )
  })




  const { viewport } = useThree();

  const { scale, position } = useMemo(() => {
    const isNarrow = viewport.width < 1024;
    return {
      scale: isNarrow ? 0.75 : 1,
      position: (isNarrow ? [2.8, -1.2, 0] : [4, -1.5, 0])
    };
  }, [viewport.width]);


  return (
    // OUTER GROUP: Position + Spinning
    <group ref={outerGroupRef} {...props} dispose={null}>
      
      {/* INNER GROUP: Looking Direction */}
      <group ref={innerGroupRef}>
        
        {/* YOUR ORIGINAL MESHES */}
        <mesh geometry={nodes.Bed_Bed1_0.geometry} material={materials.Bed1} position={[0, 0.116, 0]} rotation={[0, -Math.PI / 4, 0]} scale={0.175} />
        <mesh geometry={nodes.Leafs_Leafs1_0.geometry} material={materials.Leafs1} position={[0, 0.116, 0]} rotation={[0, -Math.PI / 4, 0]} scale={0.175} />
        <mesh geometry={nodes.Cupboard_Cupboard1_0.geometry} material={materials.Cupboard1} position={[0, 0.116, 0]} rotation={[0, -Math.PI / 4, 0]} scale={0.175} />
        <mesh geometry={nodes.Accesories_Accesor_0.geometry} material={materials.Accesor} position={[0, 0.116, 0]} rotation={[0, -Math.PI / 4, 0]} scale={0.175} />
        <mesh geometry={nodes.Fireplace_Fireplace1_0.geometry} material={materials.Fireplace1} position={[0, 0.116, 0]} rotation={[0, -Math.PI / 4, 0]} scale={0.175} />
        <mesh geometry={nodes.Walls_phong1_0.geometry} material={materials.phong1} position={[0, 0.116, 0]} rotation={[0, -Math.PI / 4, 0]} scale={0.175} />
      
      </group>
    </group>
  )
}

useGLTF.preload('/models/cozy_room-transformed.glb')
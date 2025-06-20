/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 Asteroid.gltf 
Author: exabyte (https://sketchfab.com/Oziry)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/asteroid-01-df95d3da67aa4c769ec81394e0b0ffef
Title: Asteroid 01
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/Asteroid.gltf')
  materials.Asteroid_01.color.set('#8a754e')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.591}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.Asteroid_Mob_01_Asteroid_01_0.geometry} material={materials.Asteroid_01} rotation={[-Math.PI / 2, 0, 0]} scale={1} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/Asteroid.gltf')

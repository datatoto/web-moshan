/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 public/road.glb
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function Ground(props) {
  const { nodes, materials } = useGLTF("/road.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.way.geometry}
        material={materials["材质.003"]}
        position={[-0.8, -0.06, -3]}
        rotation={[0, -0.07, 0]}
      />

      <mesh
        geometry={nodes.road.geometry}
        material={materials["材质.004"]}
        position={[-814.51, 1792.37, 424.09]}
        rotation={[0, -0.07, 0]}
        scale={137.98}
      />
    </group>
  );
}

useGLTF.preload("/road.glb");

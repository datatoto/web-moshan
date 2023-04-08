/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 public/character.glb
*/

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
// import {
//   useBox,
//   useCompoundBody,
//   useCylinder,
//   usePlane,
//   useSphere,
// } from "@react-three/cannon";

// import * as THREE from "three";

// const SPEED = 5;
// const direction = new THREE.Vector3();
// const frontVector = new THREE.Vector3();
// const sideVector = new THREE.Vector3();
// const rotation = new THREE.Vector3();

export function Player(props) {
  const ref = useRef();
  // const [ref, api] = useSphere(
  //   () => ({
  //     args: [1, 2, 2],
  //     position: [0, 5, 3],
  //     mass: 40,
  //     ...props,
  //   }),
  //   useRef(null)
  // );

  const { nodes, materials, animations } = useGLTF("/character.glb");
  const { actions } = useAnimations(animations, ref);

  // TODO: Keyboard
  // const [sub, get] = useKeyboardControls();

  // useEffect(() => {
  //   return sub(
  //     (state) => state.forward,
  //     (pressed) => {
  //       console.log("forward", pressed);
  //     }
  //   );
  // }, []);

  // useFrame((state) => {
  //   // const { forward, backward, left, right, jump } = get();
  //   const pressed = get().back;
  // });

  return (
    <group {...props} dispose={null}>
      <group name="Armature" scale={0.01} rotation={[Math.PI / 2, 0, 0]}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          name="Ch46"
          geometry={nodes.Ch46.geometry}
          material={materials.Ch46_body}
          skeleton={nodes.Ch46.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/character.glb");

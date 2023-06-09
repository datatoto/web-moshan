/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 public/arrow.glb
*/

import React, { forwardRef, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Button, Tag, Tooltip } from "antd";

export const Arrow = forwardRef((props, mref) => {
  const a = useRef();
  const { nodes, materials } = useGLTF('/arrow.glb');
  const { player } = props;
  const [hovered, setHovered] = useState(false);
  
  function handleOver(e, tag) {
    // console.log(e.eventObject.material);
    setHovered(true);
    setTag(tag);
    setTagX(e.pointer.x);
    setTagY(e.pointer.y);
  }

  
  useFrame((state, delta) => {
    mref.current.position.set(
      player.current.position.x,
      player.current.position.y + 1.2,
      player.current.position.z - 5)
  });
  // {mref.current.position.set(
  //   player.current.position.x,
  //   player.current.position.y + 2,
  //   player.current.position.z
  // );}

  return (
    <group {...props} dispose={null} ref={mref}>
      <mesh geometry={nodes['north-true'].geometry} material={materials.Arrows} position={[-0.01, 0.18, -0.7]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={[4.33, 1, 1]} />
      <mesh geometry={nodes['north-map'].geometry} material={materials.材质} position={[0.13, 0.18, -0.7]} rotation={[Math.PI / 2, 0, -1.51]}
        scale={[4.33, 1, 1]}
        // onPointerOver={(e) => (
        //   e.stopPropagation(), handleOver(e, "坐标北")
        // )}
        // onPointerOut={(e) => setHovered(false)}
      >
        {/* {hovered && tag === "坐标北" && (
          <meshBasicMaterial transparent opacity={0.6} color="blue" />
        )} */}
      </mesh>
      <mesh geometry={nodes['north-magnetism'].geometry} material={materials['材质.001']} position={[-0.17, 0.18, -0.7]} rotation={[Math.PI / 2, 0, -1.74]} scale={[4.33, 1, 1]} />
      {/* position={[-0.01, 0.18, -0.7]}
      position={[0.13, 0.18, -0.7]}
      position={[-0.17, 0.18, -0.7]}  */}
    </group>
  );
});




useGLTF.preload('/arrow.glb')





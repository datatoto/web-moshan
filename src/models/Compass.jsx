/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 public/compass.glb
*/

import React, { useEffect, useRef, useState } from "react";
import { Html, TransformControls, useGLTF } from "@react-three/drei";
import { Space, Typography } from "antd";
// import * as THREE from "three";

const { Text } = Typography;

export function Compass(props) {
  const { nodes, materials } = useGLTF("/compass.glb");
  const decl = useRef();

  const [declRot, setDeclRot] = useState(8);

  useEffect(() => {
    // let v1 = new THREE.Vector3([0, 0, 0]);
    // decl.current.getWorldDirection(v1);
    // let q1 = new THREE.Quaternion(-1, -1, 0, 0);
    // console.log(decl.current.quaternion);
    console.log(decl.current.rotation);

    // 当 declRot = 10 时，磁偏角为 5 度，校正成功
    console.log(declRot);
  }, [declRot]);

  return (
    <group {...props} dispose={null}>
      <group rotation={[1.55, -0.01, -3.14]}>
        {/* DONE: Magnetic Declination */}
        <mesh
          geometry={nodes.compass_circle_steklo.geometry}
          material={materials.steklo}
          position={[0, 0, -1.31]}
          scale={[1.73, 1.73, 0.01]}
          rotation={[0, 0, (Math.PI / 360) * declRot]}
        />
        <mesh
          geometry={nodes.compass_needle_met_gl2.geometry}
          material={materials.met_gl2}
          position={[0, -0.02, -1.17]}
          rotation={[-0.02, -0.03, -1.58]}
        />
        <mesh
          geometry={nodes.compass_north_hrom.geometry}
          material={materials.hrom}
          rotation={[0, 0, -0.01]}
        />
        <group position={[0, -5.79, -1.34]} rotation={[1.3, 0, 0.01]}>
          <mesh geometry={nodes.Mesh017.geometry} material={materials.hrom} />
          <mesh
            geometry={nodes.Mesh017_1.geometry}
            material={materials.blek_mat}
          />
        </group>
        <mesh
          geometry={nodes.level_circular_steklo.geometry}
          material={materials.trans}
          position={[0.84, -0.46, -1.02]}
          scale={[0.14, 0.14, 0.12]}
        />
        <mesh
          geometry={nodes.level_tubular_steklo.geometry}
          material={materials.trans}
          position={[0.23, -0.94, -0.97]}
          scale={[0.16, 0.14, 0.12]}
        />
        {/* DONE: Magnetic Declination*/}
        <mesh
          ref={decl}
          onClick={(e) => setDeclRot((rot) => rot + 0.5)}
          onContextMenu={(e) => setDeclRot((rot) => rot - 0.5)}
          geometry={nodes.magnetic_declination_blekc_gl.geometry}
          material={materials.blekc_gl}
          position={[1.62, 1.65, -1.03]}
          rotation={[-Math.PI / declRot, -Math.PI / declRot, 0]}
        >
          {/* TODO: Alert */}
          <Html center distanceFactor={3}>
            <Typography style={{ minWidth: "60px" }}>
              <Text style={{ color: "ActiveCaption" }}>
                左键逆转 <br /> 右键正转
              </Text>
            </Typography>
          </Html>
        </mesh>
        <group
          position={[0, 2.24, -1.53]}
          rotation={[1.46, 1.56, -2.27]}
          scale={[0.05, 0.05, 1.02]}
        >
          <mesh geometry={nodes.Mesh020.geometry} material={materials.hrom} />
          <mesh
            geometry={nodes.Mesh020_1.geometry}
            material={materials.blekc_gl}
          />
          <mesh
            geometry={nodes.Mesh020_2.geometry}
            material={materials.zerkalo}
          />
          <mesh
            geometry={nodes.Mesh020_3.geometry}
            material={materials.blek_mat}
          />
          <mesh geometry={nodes.Mesh020_4.geometry} material={materials.haki} />
        </group>
        <mesh
          geometry={nodes.pCylinder37_hrom_0.geometry}
          material={materials.hrom}
          position={[0, -2.31, -1.51]}
          rotation={[0.01, Math.PI / 2, 0]}
          scale={[0.05, 0.05, 0.96]}
        />
        <mesh
          geometry={nodes.pCylinder55_hrom_0.geometry}
          material={materials.hrom}
          position={[1.61, 1.27, -1.39]}
          scale={[0.11, 0.11, 0.21]}
        />
        <mesh
          geometry={nodes.pCylinder57_hrom_0.geometry}
          material={materials.hrom}
          position={[0, 0, 0.08]}
        />
        <mesh
          geometry={nodes.pCylinder61_hrom_0.geometry}
          material={materials.hrom}
        />
        <mesh
          geometry={nodes.polySurface217_blek_mat_0.geometry}
          material={materials.blek_mat}
        />
        <mesh
          geometry={nodes.polySurface253_lambert1_0.geometry}
          material={materials.lambert1}
          position={[0, -0.17, 0]}
        />
        <mesh
          geometry={nodes.polySurface253_met_gl2_0.geometry}
          material={materials.met_gl2}
          position={[0, -0.17, 0]}
        />
        <mesh
          geometry={nodes.polySurface267_blek_mat_0.geometry}
          material={materials.blek_mat}
        />
        <mesh
          geometry={nodes.polySurface267_haki_0.geometry}
          material={materials.haki}
        />
        <mesh
          geometry={nodes.polySurface267_met_gl2_0.geometry}
          material={materials.met_gl2}
        />
        <mesh
          geometry={nodes.polySurface267_salatov_0.geometry}
          material={materials.salatov}
        />
        <mesh
          geometry={nodes.polySurface267_steklo_0.geometry}
          material={materials.steklo}
        />
        <mesh
          geometry={nodes.polySurface64_blek_mat_0.geometry}
          material={materials.blek_mat}
          position={[0, -0.02, 0.03]}
          rotation={[0.01, 0, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/compass.glb");

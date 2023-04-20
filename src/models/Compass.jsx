/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 public/compass.glb
*/

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Edges, Html, TransformControls, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Button, Tag, Tooltip } from "antd";
import { useCurrent, useCurrentCh } from "../stores";

export const Compass = forwardRef((props, cref) => {
  const c = useRef();
  const { nodes, materials } = useGLTF("/compass.glb");
  const { isMap, isCompass, player } = props;

  const [hovered, setHovered] = useState(false);

  // 观察盘面,0代表修改刻度，1代表观察盘面，2观察地物中
  const [compassState, setCompassState] = useState(3);
  const [cirlPos, setCirlPos] = useState(-0.45);
  const [declRot, setDeclRot] = useState(8);

  const current = useCurrent((state) => state.current);
  const currentCh = useCurrentCh((state) => state.currentCh);

  const [tag, setTag] = useState("");
  const [tagX, setTagX] = useState(0);
  const [tagY, setTagY] = useState(0);

  const [deltaY, setDeltaY] = useState(0);

  // const currentCh = useCurrentCh((state) => state.currentCh);
  // const [cirlPos, setCirlPos] = useStore((state) => [
  //   state.currentCirlPos,
  //   state.updateCurrentCirlPos,
  // ]);

  function handleOver(e, tag) {
    // console.log(e.eventObject.material);
    setHovered(true);
    setTag(tag);
    setTagX(e.pointer.x);
    setTagY(e.pointer.y);
  }

  const { controls } = useThree();

  // useEffect(() => {
  //   if (controls) {
  //     if (currentCh === 0 && current === 0) {
  //       controls.setTarget(
  //         c.current.position.x + 0.3,
  //         c.current.position.y + 0.2,
  //         c.current.position.z + 0.3,
  //         // ...c.current.position,
  //         true
  //       );
  //     }
  //     // if ((currentCh === 0 && current === 1) || current === 3) {
  //     //   controls.setTarget(
  //     //     c.current.position.x,
  //     //     c.current.position.y + 0.5,
  //     //     c.current.position.z - 0.2,
  //     //     // ...c.current.position,
  //     //     true
  //     //   );
  //     // }
  //     if (currentCh === 0 && current === 2) {
  //       controls.setLookAt(
  //         c.current.position.x,
  //         c.current.position.y + 0.14,
  //         c.current.position.z - 0.8,
  //         ...c.current.position,
  //         true
  //       );
  //     }
  //   }
  // }, [currentCh, current]);

  useFrame((state, delta) => {
    // if (currentCh > 1 && isCompass) {
    if (isCompass) {
      c.current.position.set(
        player.current.position.x + 0.5,
        player.current.position.y + 2 + deltaY,
        player.current.position.z + 0.5
      );

      if (!isMap) {
        if (compassState == 2) {
          controls.setLookAt(
            c.current.position.x,
            c.current.position.y + 0.14,
            c.current.position.z - 0.8,
            ...c.current.position,
            true
          );
        } else if (compassState == 1) {
          controls.setLookAt(
            c.current.position.x,
            c.current.position.y + 0.5,
            c.current.position.z - 0.2,
            ...c.current.position,
            true
          );
        } else {
          controls.setLookAt(
            c.current.position.x + 0.5,
            c.current.position.y + 0.5,
            c.current.position.z + 0.2,
            ...c.current.position,
            true
          );
        }

        if (Math.abs(cref.current.rotation.z) < Math.PI) {
          controls.rotate(-cref.current.rotation.z, 0, true);
        }
      }
    }
  });

  return (
    <group {...props} dispose={null} ref={c}>
      {isCompass && !isMap && (
        <>
          <Html
            // distanceFactor={0.5}
            position={[0, 0, 0]}
          >
            <Button type="primary" onClick={() => setCompassState((compassState + 1) % 3)}>
              {compassState == 1 ? "观察盘面中" : compassState == 2 ? "观测地物中" : "观察刻度中"}
            </Button>
            <Button type="dashed" onClick={() => setDeltaY(deltaY + 0.5)}>
                {"罗盘向上"}
            </Button>
            <Button type="dashed" onClick={() => setDeltaY(deltaY - 0.5)}>
                {"罗盘向下"}
            </Button>
          </Html>
          {hovered && (
            <Html
              // transform
              // sprite
              distanceFactor={0.4}
              position={[tagX, 0, tagY]}
            >
              <Tag color="blue">{tag}</Tag>
            </Html>
          )}
        </>
      )}
      <group rotation={[1.55, 0, 0]}>
        <mesh
          geometry={nodes.compass_needle_met_gl2.geometry}
          material={materials.met_gl2}
          position={[0, -0.02, -1.17]}
          rotation={[-0.02, -0.03, -1.58]}
          onPointerOver={(e) => (e.stopPropagation(), handleOver(e, "北针"))}
          onPointerOut={(e) => setHovered(false)}
        >
          {hovered && tag === "北针" && (
            <meshBasicMaterial transparent opacity={0.6} color="blue" />
          )}
        </mesh>
        <group ref={cref}>
          <mesh
            geometry={nodes.compass_circle_steklo.geometry}
            material={materials.steklo}
            position={[0, 0, -1.31]}
            scale={[1.73, 1.73, 0.01]}
            rotation={[0, 0, (Math.PI / 360) * declRot]}
          ></mesh>
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
            onClick={() => setCirlPos(cirlPos - 0.05)}
            geometry={nodes.level_circular_steklo.geometry}
            material={materials.trans}
            position={[0.84, cirlPos, -1.02]}
            scale={[0.14, 0.14, 0.12]}
            onPointerOver={(e) => (
              e.stopPropagation(), handleOver(e, "方位水准器")
            )}
            onPointerOut={(e) => setHovered(false)}
          >
            {hovered && tag === "方位水准器" && (
              <meshBasicMaterial transparent opacity={0.6} color="blue" />
            )}
            {/* <Edges scale={1.1}>
              <meshBasicMaterial transparent color="#f33" depthTest={false} />
            </Edges> */}
          </mesh>
          {/* {currentCh === 0 && (
              <Html distanceFactor={0.5}>
                <Tag bordered={false} className="compass-tag">
                  方位水准器
                </Tag>
              </Html>
            )}
          </mesh> */}
          <mesh
            geometry={nodes.level_tubular_steklo.geometry}
            material={materials.trans}
            position={[0.56 + cirlPos, -0.94, -0.97]}
            scale={[0.16, 0.14, 0.12]}
            onPointerOver={(e) => (
              e.stopPropagation(), handleOver(e, "倾角水准器")
            )}
            onPointerOut={(e) => setHovered(false)}
          >
            {hovered && tag === "倾角水准器" && (
              <meshBasicMaterial transparent opacity={0.6} color="blue" />
            )}
          </mesh>
          {/* {currentCh === 0 && (
              <Html distanceFactor={0.5}>
                <Tag bordered={false} className="compass-tag">
                  倾角水准器
                </Tag>
              </Html>
            )}
          </mesh> */}
          {/* DONE: Magnetic Declination*/}
          <mesh
            onClick={() => setDeclRot(declRot + 0.5)}
            geometry={nodes.magnetic_declination_blekc_gl.geometry}
            material={materials.blekc_gl}
            position={[1.62, 1.65, -1.03]}
            rotation={[-Math.PI / declRot, -Math.PI / declRot, 0]}
            onPointerOver={(e) => (
              e.stopPropagation(), handleOver(e, "刻度螺旋")
            )}
            onPointerOut={(e) => setHovered(false)}
          >
            {hovered && tag === "刻度螺旋" && (
              <meshBasicMaterial transparent opacity={0.6} color="blue" />
            )}
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
            <mesh
              geometry={nodes.Mesh020_4.geometry}
              material={materials.haki}
            />
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
    </group>
  );
});

useGLTF.preload("/compass.glb");

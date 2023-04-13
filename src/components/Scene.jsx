import {
  Bvh,
  CameraControls,
  Environment,
  KeyboardControls,
  PerspectiveCamera,
  TransformControls,
} from "@react-three/drei";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";

import useStore, { useExploreStore } from "../stores";

import { Ground } from "../models/Ground";
import { Player } from "../models/Player";
import { Compass } from "../models/Compass";
import { Map } from "../models/Map";

import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

const ori = new THREE.Vector3(0, 2, 0);
const dir = new THREE.Vector3(0, -1, 0);
const raycaster = new THREE.Raycaster(ori, dir);

const playerPosition = new THREE.Vector3();
const compassPosition = new THREE.Vector3();
const compassDirection = new THREE.Vector3();
const playerRotation = new THREE.Vector3();
const cameraRotation = new THREE.Vector2();

export const Scene = ({ ground }) => {
  const keymap = useMemo(() => [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "left", keys: ["ArrowLeft", "KeyA"] },
    { name: "right", keys: ["ArrowRight", "KeyD"] },
    // { name: "jump", keys: ["Space"] },
  ]);
  const player = useRef();
  const compass = useRef();
  const map = useRef();

  const [isExplore, toggleIsExplore] = useState(true);

  // const isExplore = useExploreStore((state) => state.isExplore);

  const { camera, controls } = useThree();

  useFrame((state, delta) => {
    if (compass.current && player.current && ground.current) {
      player.current.getWorldDirection(playerRotation);
      cameraRotation.set(playerRotation.x, playerRotation.z);
      compass.current.rotation.set(0, 0, cameraRotation.angle() - Math.PI / 2);

      raycaster.set(player.current.position.addScaledVector(dir, -1.5), dir);
      const inters = raycaster.intersectObject(ground.current, true);
      if (inters) {
        // const ds = inters.map(i => i.distance)
        // console.log(Math.min(...ds));
        const inter = inters[0].point;
        // console.log(inter);
        player.current.position.y = inter.y + 0.2;
      }

      // player.current.getWorldPosition(playerPosition);
      // console.log(playerPosition);

      // Not EQUAL
      // console.log(compass.current.position);
      // console.log(compass.current.getWorldPosition(compassPosition));

      // compass.current.position.set(
      //   playerPosition.x,
      //   playerPosition.y - 1,
      //   playerPosition.z
      // );
    }
  });

  return (
    <KeyboardControls map={keymap}>
      <PerspectiveCamera makeDefault near={0.01} position={[1, 4, 2]} />
      <CameraControls
        makeDefault
        maxDistance={20}
        maxPolarAngle={Math.PI / 2}
      />

      <Player ref={player} visible={isExplore} />

      <Compass
        position={[2, 0, 2]}
        ref={compass}
        visible={!isExplore}
        scale={[0.1, 0.1, 0.1]}
        // position={[1, -3, 2]}
      />
      <Map visible={!isExplore} />
    </KeyboardControls>
  );
};

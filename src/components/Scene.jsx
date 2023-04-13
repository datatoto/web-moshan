import {
  Bvh,
  CameraControls,
  Environment,
  PerspectiveCamera,
  TransformControls,
} from "@react-three/drei";

import { Suspense, useEffect, useRef, useState } from "react";

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
const playerRotation = new THREE.Vector3();
const cameraRotation = new THREE.Vector2();

export const Scene = (props) => {
  const player = useRef();
  const ground = useRef();
  const compass = useRef();

  //   const cameraControlsRef = useRef();

  const isExplore = useExploreStore((state) => state.isExplore);

  // const { camera, controls } = useThree();

  useFrame(() => {
    if (compass.current && player.current && ground.current) {
      player.current.getWorldDirection(playerRotation);
      cameraRotation.set(playerRotation.x, playerRotation.z);
      // console.log(cameraRotation);
      // compass.current.rotation = Math.PI / 2 - cameraRotation.angle();
      // console.log(Math.PI / 2 - cameraRotation.angle());
      compass.current.rotation.set(0, 0, cameraRotation.angle() - Math.PI / 2);

      raycaster.set(player.current.position.addScaledVector(dir, -1.5), dir);
      const inters = raycaster.intersectObject(ground.current, true);
      if (inters) {
        // const ds = inters.map(i => i.distance)
        // console.log(Math.min(...ds));
        const inter = inters[0].point;
        // console.log(inter);
        player.current.position.y = inter.y + 0.1;
      }

      // player.current.getWorldPosition(playerPosition);
      // compass.current.position.set(
      //   playerPosition.x,
      //   playerPosition.y - 1,
      //   playerPosition.z
      // );
      // controls.moveTo(playerPosition, true);
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[1, 6, 1]} near={0.01} />
      <CameraControls
        makeDefault
        maxDistance={15}
        maxPolarAngle={Math.PI / 2}
      />

      <Compass
        ref={compass}
        scale={[0.1, 0.1, 0.1]}
        // position={[1, -3, 2]}
      />
      <Map visible={false} />

      <Player ref={player} />

      <Bvh firstHitOnly>
        <Ground ref={ground} />
      </Bvh>

      <Environment files="background.hdr" background />
    </>
  );
};

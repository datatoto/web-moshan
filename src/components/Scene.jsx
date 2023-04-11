import {
  Bvh,
  CameraControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";

import { Suspense, useEffect, useRef, useState } from "react";

import { useExploreStore } from "../stores";

import { Ground } from "../models/Ground";
import { Player } from "../models/Player";
import { Compass } from "../models/Compass";
import { Map } from "../models/Map";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export const Scene = (props) => {
  const player = useRef(null);
  const ground = useRef(null);

  //   const cameraControlsRef = useRef();

  const isExplore = useExploreStore((state) => state.isExplore);
  // const [cameraPos, setCameraPos] = useState([0, 4, 1]);

  const ori = new THREE.Vector3(0, 2, 0);
  const dir = new THREE.Vector3(0, -1, 0);
  const raycaster = new THREE.Raycaster(ori, dir);

  useFrame(() => {
    if (player.current && ground.current) {
      raycaster.set(player.current.position.addScaledVector(dir, -1.5), dir);
      const inters = raycaster.intersectObject(ground.current, false);
      if (inters.length > 0) {
        const inter = inters[0].point;
        // console.log(inter);
        player.current.position.y = inter.y + 0.05;
      }
      // const inter = inters[0].point;
      // console.log(player.current.position);
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[1, 3, 1]} near={0.01} />
      <CameraControls makeDefault minDistance={2} maxDistance={6} maxPolarAngle={Math.PI / 2} />

      <Compass
        scale={[0.1, 0.1, 0.1]}
        position={[0, 1.5, 0]}
        visible={!isExplore}
      />
      <Map position={[2, 1.5, 0]} visible={!isExplore} />

      <Player ref={player} visible={isExplore} />

      <Bvh firstHitOnly>
        <Ground ref={ground} position={[0, -2, 0]} />
      </Bvh>

      <Environment files="background.hdr" background />
    </>
  );
};

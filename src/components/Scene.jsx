import {
  Bvh,
  CameraControls,
  Environment,
  Html,
  KeyboardControls,
  OrbitControls,
  PerspectiveCamera,
  TransformControls,
} from "@react-three/drei";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";

// import useStore, { useExploreStore } from "../stores";

import { Ground } from "../models/Ground";
import { Player } from "../models/Player";
import { Compass } from "../models/Compass";
import { Map } from "../models/Map";

import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Button } from "antd";
import {
  useIsCompass,
  useIsDome,
  useIsEagle,
  useIsMap,
  useIsPlayer,
} from "../stores";
import { Dome } from "./Dome";

const ori = new THREE.Vector3(0, 2, 0);
const dir = new THREE.Vector3(0, -1, 0);
const raycaster = new THREE.Raycaster(ori, dir);

// const playerPosition = new THREE.Vector3();
// const compassDirection = new THREE.Vector3();
const playerDirection = new THREE.Vector3();
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

  // const [isPlayer, togglePlayer] = useState(true);
  const isPlayer = useIsPlayer((state) => state.isPlayer);
  const isCompass = useIsCompass((state) => state.isCompass);
  const isMap = useIsMap((state) => state.isMap);

  const isEagle = useIsEagle((state) => state.isEagle);
  const isDome = useIsDome((state) => state.isDome);

  const { controls } = useThree();
  useEffect(() => {
    ground.current.visible = !isDome;

    if (controls) {
      if (isEagle) {
        controls.setLookAt(100, 300, 600, -500, 40, -200, true);
      }

      if (isPlayer && player) {
        controls.moveTo(
          player.current.position.x,
          player.current.position.y + 8,
          player.current.position.z + 1,
          true
        );

        controls.dollyTo(20, true);
      }
    }
  }, [isDome, isEagle, isPlayer]);

  // useEffect(() => {
  //   if (isMap || isCompass) {
  //     togglePlayer(false);
  //   } else {
  //     togglePlayer(true);
  //   }
  // }, [isMap, isCompass]);

  useFrame((state, delta) => {
    if (map.current && compass.current && player.current && ground.current) {
      player.current.getWorldDirection(playerDirection);
      cameraRotation.set(playerDirection.x, playerDirection.z);
      compass.current.rotation.set(0, 0, cameraRotation.angle() - Math.PI / 2);
      // if (isCompass) {
      // state.controls.rotate(cameraRotation.angle() / 2, 0, true);
      // console.log(cameraRotation.angle());
      // }

      raycaster.set(player.current.position.addScaledVector(dir, -1.5), dir);
      const inters = raycaster.intersectObject(ground.current, true);
      if (inters) {
        // const ds = inters.map(i => i.distance)
        // console.log(Math.min(...ds));
        const inter = inters[0].point;
        // console.log(inter);
        player.current.position.y = inter.y + 0.2;
      }

      if (isMap) {
        map.current.position.set(
          player.current.position.x + 1,
          player.current.position.y + 4,
          player.current.position.z + 1
        );

        state.controls.setLookAt(
          map.current.position.x,
          map.current.position.y + 2,
          map.current.position.z,
          ...map.current.position,
          true
        );
      }

      // if (isPlayer) {
      //   state.controls.moveTo(
      //     player.current.position.x,
      //     player.current.position.y + 8,
      //     player.current.position.z + 1,
      //     true
      //   );
      // }

      // player.current.getWorldPosition(playerPosition);
      // console.log(playerPosition);

      // Not EQUAL
      // console.log(compass.current.position);
      // console.log(compass.current.getWorldPosition(compassPosition));

      // console.log(compass.current.position);
    }
  });

  return isDome ? (
    <Dome />
  ) : (
    <>
      <KeyboardControls map={keymap}>
        <PerspectiveCamera makeDefault near={0.01} position={[1, 4, 2]} />
        <CameraControls
          makeDefault
          maxDistance={25}
          maxPolarAngle={Math.PI / 2}
        />

        <Player ref={player} visible={isPlayer} />

        <Compass
          // position={compassPosition}
          ref={compass}
          visible={isCompass}
          scale={[0.1, 0.1, 0.1]}
          isCompass={isCompass}
          player={player}
          // position={[1, -3, 2]}
        />
        <Map visible={isMap} isMap={isMap} ref={map} />
      </KeyboardControls>
      <Environment files="background.hdr" background />
    </>
  );
};

import {
  Bvh,
  CameraControls,
  Center,
  Environment,
  Html,
  KeyboardControls,
  OrbitControls,
  PerspectiveCamera,
  Text3D,
  TransformControls,
} from "@react-three/drei";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";

import { Player } from "../models/Player";
import { Compass } from "../models/Compass";
import { Map } from "../models/Map";
import {Arrow} from "../models/Arrow";

import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import {
  useIsCompass,
  useDome,
  useIsEagle,
  useIsMap,
  useIsPlayer,
  useCurrentCh,
} from "../stores";
import { Dome } from "./Dome";

const ori = new THREE.Vector3(0, 2, 0);
const dir = new THREE.Vector3(0, -1, 0);
const raycaster = new THREE.Raycaster(ori, dir);

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
  const arrow = useRef();

  const [isPlayer, togglePlayer] = useIsPlayer((state) => [
    state.isPlayer,
    state.togglePlayer,
  ]);
  const [isCompass, toggleCompass] = useIsCompass((state) => [
    state.isCompass,
    state.toggleCompass,
  ]);
  const [isMap, toggleMap] = useIsMap((state) => [
    state.isMap,
    state.toggleMap,
  ]);

  const isEagle = useIsEagle((state) => state.isEagle);
  const [isDome, domeName] = useDome((state) => [state.isDome, state.domeName]);

  const currentCh = useCurrentCh((state) => state.currentCh);

  const { controls } = useThree();
  useEffect(() => {
    if (isMap || isCompass) {
      togglePlayer(false);
    } else {
      togglePlayer(true);
    }

    if (controls) {
      if (isEagle) {
        controls.setLookAt(200, 300, 650, -500, 40, -250, true);
      }
    }
  }, [isDome, isEagle, isPlayer, isMap, isCompass, currentCh]);

  useFrame((state, delta) => {
    if (map.current && compass.current && player.current && ground.current) {
      player.current.getWorldDirection(playerDirection);
      cameraRotation.set(playerDirection.x, playerDirection.z);
      compass.current.rotation.set(0, 0, cameraRotation.angle() - Math.PI / 2);

      // 碰撞检测
      raycaster.set(player.current.position.addScaledVector(dir, -1.5), dir);
      const inters = raycaster.intersectObject(ground.current, true);
      if (inters) {
        const inter = inters[0].point;
        player.current.position.y = inter.y + 0.2;
      }

      if (isMap && isCompass) {
        state.controls.setPosition(
          player.current.position.x - 0.3,
          player.current.position.y + 6,
          player.current.position.z + 0.5,
          // ...map.current.position,
          true
        );
      }
      // console.log(player.current.position);人物位置
      if (isPlayer) {
        state.controls.moveTo(
          player.current.position.x,
          player.current.position.y + 4,
          player.current.position.z + 1,
          true
        );
      }
    }
  });

  return isDome ? (
    <Dome url={"/domes/" + domeName + ".jpg"} />
  ) : (
    <>
      <Html position={[-1838.5581538401154, 59.00115107733737, 2766.717220007931]}>
        <h1 className="tag" style={{ color: "red" }}>南望山</h1>
      </Html>
      <Html position={[283.41265307833675,62.362494317857,3271.180927358178]}>
        <h1 className="tag" style={{ color: "red" }}>喻家山</h1>
      </Html>

      <KeyboardControls map={keymap}>
        <PerspectiveCamera makeDefault position={[1, 4, 2]} far={5000} />
        <CameraControls
          makeDefault
          maxDistance={25}
          maxPolarAngle={Math.PI / 2}
        />

        <Player ref={player} visible={isPlayer} />

        <Compass
          ref={compass}
          visible={isCompass}
          scale={0.1}
          isMap={isMap}
          isCompass={isCompass}
          player={player}
        />

        <Map
          visible={isMap}
          ref={map}
          scale={1}
          isMap={isMap}
          isCompass={isCompass}
          player={player}
        />
        <Arrow 
        ref={arrow}
        scale = {2}
        player={player}
        />
      </KeyboardControls>
      <Environment files="background.hdr" background />
    </>
  );
};

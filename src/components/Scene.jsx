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
import { useIsCompass, useIsMap } from "../stores";

const ori = new THREE.Vector3(0, 2, 0);
const dir = new THREE.Vector3(0, -1, 0);
const raycaster = new THREE.Raycaster(ori, dir);

// const playerPosition = new THREE.Vector3();
// const compassDirection = new THREE.Vector3();
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

  const [isPlayer, togglePlayer] = useState(true);
  // const [isCompass, toggleCompass] = useState(false);
  // const [isMap, toggleMap] = useState(false);
  const isCompass = useIsCompass((state) => state.isCompass);
  const isMap = useIsMap((state) => state.isMap);

  // const [compassPosition, setCompassPosition] = useState(
  //   new THREE.Vector3(2, 0, 2)
  // );

  // const isExplore = useExploreStore((state) => state.isExplore);
  // const { camera, controls } = useThree();

  // function handleCompass() {
  //   toggleMap(false);
  //   toggleIsPlayer(!isPlayer);
  //   setCompassPosition([
  //     player.current.position.x,
  //     player.current.position.y + 4,
  //     player.current.position.z,
  //   ]);
  //   toggleCompass(!isCompass);
  // }

  // function handleMap() {
  //   toggleIsCompass(false);
  //   toggleIsPlayer(!isPlayer);
  //   toggleMap(!isMap);
  // }

  useEffect(() => {
    if (isMap || isCompass) {
      togglePlayer(false);
    } else {
      togglePlayer(true);
    }
  }, [isMap, isCompass]);

  useFrame((state, delta) => {
    if (map.current && compass.current && player.current && ground.current) {
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

      if (isMap) {
        map.current.position.set(
          player.current.position.x,
          player.current.position.y + 4,
          player.current.position.z
        );

        state.controls.setLookAt(
          map.current.position.x,
          map.current.position.y + 2,
          map.current.position.z,
          ...map.current.position,
          true
        );
      }

      if (isPlayer) {
        state.controls.moveTo(
          player.current.position.x + 1,
          player.current.position.y + 6,
          player.current.position.z + 1,
          true
        );
      }

      // player.current.getWorldPosition(playerPosition);
      // console.log(playerPosition);

      // Not EQUAL
      // console.log(compass.current.position);
      // console.log(compass.current.getWorldPosition(compassPosition));

      // console.log(compass.current.position);
    }
    // console.log(map.current.position);
    // console.log(player.current.position);

    // console.log(map.current.position);
  });

  return (
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
      {/* <Html>
        <Button type="primary" onClick={handleCompass} disabled={isCompass}>
          使用罗盘
        </Button>
        <Button type="primary" onClick={handleMap} disabled={isMap}>
          使用地图
        </Button>
      </Html> */}
    </>
  );
};

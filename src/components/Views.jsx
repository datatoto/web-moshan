import { Canvas, useThree } from "@react-three/fiber";

import {
  Environment,
  Hud,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  TransformControls,
  Stats,
  CameraControls,
  MapControls,
  KeyboardControls,
  Box,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Compass } from "../models/Compass";
import { Ground } from "../models/Ground";
import { Player } from "../models/Player";
import useStore from "../stores";
import { CuboidCollider, Debug, Physics, RigidBody } from "@react-three/rapier";
import { Way } from "../models/Way";
// import { Debug, useBox, usePlane, useSphere } from "@react-three/cannon";
// import { steps } from "../stores/constants";

// function Foo() {
//   const camera = useThree((state) => state.camera);
//   const set = useThree((state) => state.set);

//   useEffect(() => {
//     console.log(camera.position);
//     // camera.lookAt([1.62, 1.65, -1.03]);
//   }, [camera]);
// }

function ChapterOneView() {
  return (
    <>
      <Compass />
      <Ground />
    </>
  );
}

function ChapterTwoView() {
  // Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
  const { nodes, materials } = useGLTF("/way.glb");

  return (
    <Suspense>
      <Physics>
        <Debug />

        <RigidBody colliders={false} position={[0, 4, 0]}>
          <Player />
          <CuboidCollider args={[1, 1, 1]} position={[0, 1, 0]} />
        </RigidBody>

        <RigidBody type="fixed" colliders="trimesh">
          <mesh
            geometry={nodes.way.geometry}
            material={materials.wayMaterial}
            position={[-0.8, -0.06, -3]}
            rotation={[0, -0.07, 0]}
          />
        </RigidBody>
      </Physics>
    </Suspense>
  );
}

function MainView({ steps }) {
  // const map = useMemo(() => [
  //   { name: "forward", keys: ["ArrowUp", "KeyW"] },
  //   { name: "backward", keys: ["ArrowDown", "KeyS"] },
  //   { name: "left", keys: ["ArrowLeft", "KeyA"] },
  //   { name: "right", keys: ["ArrowRight", "KeyD"] },
  //   { name: "jump", keys: ["Space"] },
  // ]);

  const cameraControlsRef = useRef();
  const currentStep = useStore((state) => state.currentStep);
  const currentCh = useStore((state) => state.currentCh);

  const cameraInfo = steps.map((step) => ({
    pos: step.cameraPosition,
    look: step.cameraLookAt,
  }));

  // const [cameraPosition, setCameraPosition] = useState([0, 4, 0]);
  // const [cameraLookAt, setCameraLookAt] = useState([0, 0, 0]);
  // const { camera } = useThree();

  useEffect(() => {
    // console.log(cameraInfo[currentStep]);
    // updateCameraPosition(cameraInfo[currentStep].pos);
    // updateCameraLookAt(cameraInfo[currentStep].look);

    // console.log(cameraPosition);
    // console.log(cameraLookAt);

    // cameraControlsRef.current.moveTo(3, 5, 3, true);
    cameraControlsRef.current.setLookAt(
      ...cameraInfo[currentStep].pos,
      ...cameraInfo[currentStep].look,
      true
    );
  }, [currentStep]);

  return (
    <>
      {currentCh === 0 && <ChapterOneView />}
      {currentCh === 1 && <ChapterTwoView />}
      <CameraControls ref={cameraControlsRef} makeDefault />
      <Environment files="background.hdr" background />
    </>
  );
}

function MiniMapView() {
  return (
    <>
      <OrthographicCamera
        makeDefault
        position={[0, 200, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        left={-1000}
        right={1000}
        top={1000}
        bottom={-1000}
        near={100}
        far={1000}
      />
      <Ground />
      <MapControls makeDefault screenSpacePanning enableRotate={false} />
      <Environment files="background.hdr" background />
    </>
  );
}

function CompassView() {
  // const [current, setCurrent] = useStore((state) => [
  //   state.currentStep,
  //   state.updateCurrentStep,
  // ]);

  // useEffect(() => {
  //   // 当 declRot = 10 时，磁偏角为 5 度，校正成功
  //   console.log(declRot);
  //   current === 0 && declRot === 10 && setCurrent(current + 1);

  //   console.log(cirlPos);
  //   current === 1 && cirlPos <= -0.6 && setCurrent(current + 1);
  // }, [declRot, cirlPos]);

  return (
    <>
      <color attach="background" args={["black"]} />
      <OrthographicCamera
        makeDefault
        position={[0, 2.7, 0]}
        rotation={[0, -Math / 2, 0]}
        zoom={80}
      />
      <Compass />
      <MapControls
        makeDefault
        screenSpacePanning
        enableRotate={false}
        minZoom={65}
      />
      <ambientLight intensity={1} />
    </>
  );
}

export { MainView, CompassView, MiniMapView };

// function CompassView() {
//   return (
//     <>
//       <color attach="background" args={["black"]} />
//       <PanelCamera />
//       <Scene />
//       <MapControls
//         makeDefault
//         screenSpacePanning
//         enableRotate={false}
//         minZoom={65}
//       />
//       <ambientLight intensity={1} />
//     </>
//   );
// }

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
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { Compass } from "../models/Compass";
import { Ground } from "../models/Ground";
import useStore from "../stores";
import { steps } from "../stores/constants";

// function Foo() {
//   const camera = useThree((state) => state.camera);
//   const set = useThree((state) => state.set);

//   useEffect(() => {
//     console.log(camera.position);
//     // camera.lookAt([1.62, 1.65, -1.03]);
//   }, [camera]);
// }

function PanelCamera() {
  return (
    <OrthographicCamera
      makeDefault
      position={[0, 2.7, 0]}
      rotation={[0, -Math / 2, 0]}
      zoom={80}
    />
  );
}

function View1() {
  const cameraControlsRef = useRef();
  const currentStep = useStore((state) => state.currentStep);

  const cameraInfo = steps.map((step) => ({
    pos: step.cameraPosition,
    look: step.cameraLookAt,
  }));

  // const [cameraPosition, setCameraPosition] = useState([0, 4, 0]);
  // const [cameraLookAt, setCameraLookAt] = useState([0, 0, 0]);
  // const { camera } = useThree();

  useEffect(() => {
    console.log(cameraInfo[currentStep]);
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
      <Scene />
      <CameraControls ref={cameraControlsRef} makeDefault />
      <Environment files="background.hdr" background />
    </>
  );
}

function CompassView() {
  return (
    <>
      <PanelCamera />
      <Scene />
      <MapControls makeDefault screenSpacePanning enableRotate={false} />
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

function Scene() {
  const [current, setCurrent] = useStore((state) => [
    state.currentStep,
    state.updateCurrentStep,
  ]);

  const [cirlPos, setCirlPos] = useStore((state) => [
    state.currentCirlPos,
    state.updateCurrentCirlPos,
  ]);

  // const decl = useRef();
  const [declRot, setDeclRot] = useStore((state) => [
    state.currentDeclRot,
    state.updateCurrentDeclRot,
  ]);

  useEffect(() => {
    // 当 declRot = 10 时，磁偏角为 5 度，校正成功
    console.log(declRot);
    current === 0 && declRot === 10 && setCurrent(current + 1);

    console.log(cirlPos);
    current === 1 && cirlPos <= -0.6 && setCurrent(current + 1);
  }, [declRot, cirlPos]);

  return (
    <Suspense fallback={null}>
      <Compass
        declRot={declRot}
        cirlPos={cirlPos}
        setDeclRot={setDeclRot}
        setCirlPos={setCirlPos}
      />
      {/* {children} */}
      <Ground />
    </Suspense>
  );
}

export { View1, CompassView, MiniMapView };

// export default function Scene() {
//   return (
//     <>
//       <Foo />
//       <Suspense fallback={null}>
//         <Compass isDecl />
//         <Ground />
//       </Suspense>
//       <Environment files="background.hdr" background />
//       {/* <spotLight intensity={1.2} position={[0, 30, 40]} /> */}
//       <PerspectiveCamera makeDefault position={[0, 10, 10]} />
//       <OrbitControls makeDefault />
//     </>
//   );
// }

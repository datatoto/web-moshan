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
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { Compass } from "./models/Compass";
import { Ground } from "./models/Ground";
import useStore from "./stores";
import { steps } from "./stores/steps";

// function Foo() {
//   const camera = useThree((state) => state.camera);
//   const set = useThree((state) => state.set);

//   useEffect(() => {
//     console.log(camera.position);
//     // camera.lookAt([1.62, 1.65, -1.03]);
//   }, [camera]);
// }

function Target() {
  const cameraControlsRef = useRef();
  const currentStep = useStore((state) => state.currentStep);
  // const [cameraPosition, updateCameraPosition] = useStore((state) => [
  //   state.cameraPosition,
  //   state.updateCameraPosition,
  // ]);
  // const [cameraLookAt, updateCameraLookAt] = useStore((state) => [
  //   state.cameraLookAt,
  //   state.updateCameraLookAt,
  // ]);

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
      <Suspense fallback={null}>
        <Compass isDecl={true} />
        <Ground />
      </Suspense>
      <CameraControls ref={cameraControlsRef} />
      <Environment files="background.hdr" background />
    </>
  );
}

export default function Scene() {
  return (
    <Canvas>
      {/* <PerspectiveCamera makeDefault position={[0, 20, 0]} /> */}
      <Target />
      {/* <OrbitControls makeDefault /> */}
      <Stats showPanel={0} className="stats" />
    </Canvas>
  );
}

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

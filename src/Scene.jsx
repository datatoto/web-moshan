import {
  Environment,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  TransformControls,
} from "@react-three/drei";
import { Suspense, useEffect } from "react";
import { Compass } from "./models/Compass";
import { Ground } from "./models/Ground";
import { useThree } from "@react-three/fiber";

function Foo() {
  const camera = useThree((state) => state.camera);
  const set = useThree((state) => state.set);

  useEffect(() => {
    console.log(camera.position);
    // camera.lookAt([1.62, 1.65, -1.03]);
  }, [camera]);
}

export default function Scene() {
  return (
    <>
      <Foo />
      <Suspense fallback={null}>
        <Compass />
        <Ground />
      </Suspense>
      <Environment files="background.hdr" background />
      {/* <spotLight intensity={1.2} position={[0, 30, 40]} /> */}
      <PerspectiveCamera makeDefault position={[-2, 1.2, -3]} rotation={[0, Math.PI, 0]} fov={40}/>
      {/* <OrbitControls makeDefault /> */}
    </>
  );
}

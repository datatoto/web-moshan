import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  TransformControls,
} from "@react-three/drei";
import { Suspense } from "react";
import { Compass } from "./models/Compass";
import { Ground } from "./models/Ground";

export default function Scene() {
  return (
    <>
      <Suspense fallback={null}>
        <Compass />
        <Ground />
      </Suspense>
      <Environment files="background.hdr" background />
      {/* <spotLight intensity={1.2} position={[0, 30, 40]} /> */}
      <PerspectiveCamera makeDefault position={[0, 10, 10]} />
      <OrbitControls makeDefault />
    </>
  );
}
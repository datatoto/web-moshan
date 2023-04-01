import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import { Compass } from "./models/Compass";
import { Ground } from "./models/Ground";

export default function Moshan() {
  return (
    <>
      <Suspense fallback={null}>
        <Compass />
        <Ground />
      </Suspense>
      <PerspectiveCamera position={[0, 50, 0]} makeDefault />
      <OrbitControls makeDefault />
    </>
  );
}

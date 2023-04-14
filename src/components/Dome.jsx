import {
  OrbitControls,
  PerspectiveCamera,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

export function Dome({ position }) {
  const texture = useTexture("/doom1.jpg");

  return (
    <>
      <PerspectiveCamera position={[0, 0, 0.1]} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.2}
        autoRotate={false}
        rotateSpeed={-0.5}
      />
      <group>
        <mesh>
          <sphereBufferGeometry args={[500, 60, 40]} />
          <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
      </group>
    </>
  );
}

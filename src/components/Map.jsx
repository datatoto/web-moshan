import {
  Html,
  useAspect,
  useTexture,
  Sphere,
  Line,
  Points,
  Point,
} from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
// import { create } from "zustand";

// const usePointStore = create(() => ({ x: 0, y: 0, z: 0 }));

const calAngle = (p1, p2) => {
  // console.log(p1, "p1");
  // console.log(p2, "p2");
  const dy = p1.z - p2.z;
  const dx = p1.x - p2.x;
  const theta = Math.atan2(dy, dx);
  const degs = (theta * 180) / Math.PI;
  return Math.ceil(degs);
};

const moveSp = (point) => {
  // console.log(point);
  sp.current.position.x = point.x;
  sp.current.position.y = point.y;
  sp.current.position.z = point.z;
};

export default function Map({ position, rotation }) {
  const plane = useRef();

  const scale = useAspect(8266, 5849, 0.2);
  const image = useTexture("/topo.jpg");

  const [points, setPoints] = useState([]);
  const [movePoint, setMovePoint] = useState();

  const handleClick = (point) => {
    console.log(point);
    setPoints([...points, point]);
  };

  return (
    <group dispose={null}>
      <mesh
        position={position}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={scale}
        ref={plane}
        onClick={(e) => handleClick(e.point)}
        onContextMenu={() => setPoints(points.slice(0, -1))}
        onPointerMove={(e) => setMovePoint(e.point)}
      >
        <planeGeometry />
        <meshBasicMaterial map={image} />
      </mesh>
      {points.map((p, i) => (
        <Line points={[p, movePoint]} color="red" lineWidth={2} key={i}>
          <Html center position={p}>
            <span>{calAngle(p, movePoint)} 度</span>
          </Html>
        </Line>
      ))}
    </group>
  );
}

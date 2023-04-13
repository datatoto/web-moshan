import {
  Html,
  useAspect,
  useTexture,
  Sphere,
  Line,
  Points,
  Point,
} from "@react-three/drei";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import useStore from "../stores";
import { useFrame } from "@react-three/fiber";
import { Button } from "antd";

const calAngle = (p1, p2) => {
  // console.log(p1, "p1");
  // console.log(p2, "p2");
  const dy = p1.z - p2.z;
  const dx = p1.x - p2.x;
  const theta = Math.atan2(dy, dx);
  const degs = (theta * 180) / Math.PI;
  return Math.ceil(degs);
};

export const Map = forwardRef((props, mref) => {
  const scale = useAspect(1111, 662, 0.2);
  const image = useTexture("/topo.jpg");

  const [points, setPoints] = useState([]);
  const [movePoint, setMovePoint] = useState();
  const [mapRot, setRot] = useState(0);

  const { isMap } = props;
  const [isRot, toggleIsRot] = useState(true);

  // useFrame((state, delta) => {
  //   if (isMap) {
  //     state.controls.setPosition(
  //       mref.current.position.x,
  //       mref.current.position.y + 2,
  //       mref.current.position.z,
  //       true
  //     );

  //     console.log(mref.current.position);

  //     state.controls.lookInDirectionOf(0, -1, 0);
  //   }
  // });

  return (
    <group dispose={null} {...props} ref={mref}>
      {isMap && (
        <Html distanceFactor={2}>
          <Button type="primary" onClick={() => toggleIsRot(!isRot)}>
            {isRot ? "标记地图" : "旋转地图"}
          </Button>
        </Html>
      )}

      <mesh
        rotation={[-Math.PI / 2, 0, (Math.PI / 360) * mapRot]}
        scale={scale}
        onClick={(e) => {
          isMap && isRot ? setRot(mapRot + 5) : setPoints([...points, e.point]);
        }}
        onContextMenu={() =>
          isMap && isRot ? setRot(mapRot - 5) : setPoints(points.slice(0, -1))
        }
        onPointerMove={(e) => setMovePoint(e.point)}
      >
        <planeGeometry />
        <meshBasicMaterial map={image} />
      </mesh>

      {isMap &&
        !isRot &&
        points.map((p, i) => (
          <Line points={[p, movePoint]} color="red" lineWidth={2} key={i}>
            <Html center position={p}>
              <span>{calAngle(p, movePoint)} 度</span>
            </Html>
          </Line>
        ))}
    </group>
  );
});

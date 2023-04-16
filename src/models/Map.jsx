import {
  Html,
  useAspect,
  useTexture,
  Sphere,
  Line,
  Points,
  Point,
  Text,
} from "@react-three/drei";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Button } from "antd";
import { useIsMap } from "../stores";

const Circle = ({
  children,
  opacity = 1,
  radius = 0.03,
  segments = 16,
  color = "#0000aa",
  ...props
}) => (
  <mesh {...props} rotation={[-Math.PI / 2, 0, 0]}>
    <circleGeometry args={[radius, segments]} />
    <meshBasicMaterial
      transparent={opacity < 1}
      opacity={opacity}
      color={color}
    />
    {children}
  </mesh>
);

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
  const scale = useAspect(1111, 662, 0.3);
  const image = useTexture("/topo.jpg");

  const [points, setPoints] = useState([]);
  const [movePoint, setMovePoint] = useState();
  const [mapRot, setRot] = useState(0);

  const { isMap, player } = props;

  const [isRot, toggleRot] = useState(true);

  useFrame((state, delta) => {
    if (isMap) {
      mref.current.position.set(
        player.current.position.x + 1,
        player.current.position.y + 4,
        player.current.position.z + 1
      );

      state.controls.setLookAt(
        mref.current.position.x,
        mref.current.position.y + 2,
        mref.current.position.z,
        ...mref.current.position,
        true
      );

      // console.log(mref.current.position);
      // console.log(gref.current.position);
    }
  });

  return (
    <group dispose={null} {...props}>
      {isMap &&
        !isRot &&
        points.map((p, i) => (
          <>
            <Circle position={p}>
              <Text fontSize={0.025}>{calAngle(p, movePoint)} ° </Text>
            </Circle>
            <Line points={[p, movePoint]} color="blue" lineWidth={2} key={i}>
              {/* <Html center position={p}>
              <span>{calAngle(p, movePoint)} 度</span>
            </Html> */}
            </Line>
          </>
        ))}
      {/*
      <group>
        {isMap &&
          !isRot &&
          points.map((p, i) => (
            <Circle>
              <Html center position={p}>
                <span>{calAngle(p, movePoint)} 度</span>
              </Html>
            </Circle>
          ))}
      </group> */}

      <mesh
        ref={mref}
        // position={[0, 1, 1]}
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
        {isMap && (
          <Html distanceFactor={2} position={[0.3, 0.3, 0]}>
            <Button type="primary" onClick={() => toggleRot(!isRot)}>
              {isRot ? "标记地图" : "旋转地图"}
            </Button>
          </Html>
        )}
      </mesh>
    </group>
  );
});

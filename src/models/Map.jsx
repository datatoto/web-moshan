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
import { Button, Tag } from "antd";
import { useIsMap } from "../stores";
import { StarOutlined, UpCircleFilled } from "@ant-design/icons";

const Circle = ({
  children,
  opacity = 1,
  radius = 0.03,
  segments = 16,
  color = "#85a5ff",
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


export const Map = forwardRef((props, mref) => {
  const scale = useAspect(1111, 662, 0.2);
  const image = useTexture("/topo.jpg");

  const [points, setPoints] = useState([]);

  // const [movePoint, setMovePoint] = useState();
  const [mapRot, setRot] = useState(0);

  const { isMap, isCompass, player } = props;

  const [isRot, toggleRot] = useState(true);

  useFrame((state, delta) => {
    if (isMap) {
      mref.current.position.set(
        player.current.position.x,
        player.current.position.y + 2,
        player.current.position.z
      );

      if (!isCompass) {
        state.controls.setLookAt(
          mref.current.position.x,
          mref.current.position.y + 2,
          mref.current.position.z,
          ...mref.current.position,
          true
        );
      }
    }
  });

  const lastPoint = points.at(-1);
  function calAngle(x, y) {
    const dy = lastPoint[1] - y;
    const dx = lastPoint[0] - x;
    const theta = Math.atan2(dy, dx);
    const degs = (theta * 180) / Math.PI;
    return Math.ceil(degs);
  }

  return (
    <group dispose={null} {...props} ref={mref}>
      {/* <Circle position={[0.1, 0, 0.1]} /> */}
      <mesh
        rotation={[-Math.PI / 2, 0, (Math.PI / 360) * mapRot]}
        scale={scale}
        onClick={(e) => {
          isMap && isRot
            ? setRot(mapRot + 5)
            : setPoints([...points, [e.pointer.x, e.pointer.y]]);
        }}
        onContextMenu={() =>
          isMap && isRot ? setRot(mapRot - 5) : setPoints(points.slice(0, -1))
        }
        // onPointerMove={(e) => handleMove(e.pointer)}
      >
        <planeGeometry />
        <meshBasicMaterial map={image} />

        {isMap && (
          <>
            <Html position={[0.4, 0.4, 0]}>
              <Button type="primary" onClick={() => toggleRot(!isRot)}>
                {isRot ? "旋转地图中" : "标记地图中"}
              </Button>
            </Html>
            <Html position={[-0.2, -0.3, 0]}>
              <UpCircleFilled />
              <Tag>南望山</Tag>
            </Html>
            <Html position={[0.1, -0.4, 0]}>
              <UpCircleFilled />
              <Tag>珞珈山</Tag>
            </Html>
          </>
        )}

        {isMap &&
          !isRot &&
          points.map((p, i) => (
            <Html position={[...p, 0]} key={i}>
              <StarOutlined />
              <Tag bordered={false} color="blue">
                {calAngle(p[0], p[1])} 度
              </Tag>
            </Html>
          ))}
      </mesh>
    </group>
  );
});

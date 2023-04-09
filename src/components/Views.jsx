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
  KeyboardControls,
  Box,
  useGLTF,
  useKeyboardControls,
  Html,
  Image,
  useAspect,
  useTexture,
  Point,
  Points,
  Sphere,
  Line,
} from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Compass } from "../models/Compass";
import { Ground } from "../models/Ground";
import { Player } from "../models/Player";
import useStore from "../stores";
import { CuboidCollider, Debug, Physics, RigidBody } from "@react-three/rapier";
import { Way } from "../models/Way";
// import { Debug, useBox, usePlane, useSphere } from "@react-three/cannon";
// import { steps } from "../stores/constants";

import * as THREE from "three";
import ChapterOne from "./ChapterOne";

// function Foo() {
//   const camera = useThree((state) => state.camera);
//   const set = useThree((state) => state.set);

//   useEffect(() => {
//     console.log(camera.position);
//     // camera.lookAt([1.62, 1.65, -1.03]);
//   }, [camera]);
// }

function Map() {
  const plane = useRef(null);
  const sp = useRef();
  const [points, setPoints] = useState([]);

  const scale = useAspect(8266, 5849, 0.1);
  const image = useTexture("/topo.jpg");

  // const { scene } = useThree();

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

  const clickPlane = (point) => {
    // console.log(ray);
    // const raycaster = new THREE.Raycaster(ray.origin, ray.direction);
    // const intersects = raycaster.intersectObject(plane.current, false);

    // const newPoint = [
    //   intersects[0].point.x,
    //   intersects[0].point.y,
    //   intersects[0].point.z,
    // ];

    // console.log(intersects[0].point);

    setPoints([...points, point]);

    // console.log(points);
    // const rollOverGeo = new THREE.BoxGeometry(0.05, 0.05, 0.05);
    // const rollOverMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    // const rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);

    // rollOverMesh.position.copy(intersects[0].point);
    // .add(intersects[0].face.normal);

    // scene.add(rollOverMesh);
  };

  return (
    <group>
      <mesh
        ref={plane}
        scale={scale}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[1.5, 1.5, 0]}
        onClick={(e) => clickPlane(e.point)}
        onContextMenu={setPoints(points.slice(0, -1))}
        onPointerMove={(e) => moveSp(e.point)}
      >
        <planeGeometry />
        <meshBasicMaterial map={image} />
      </mesh>
      {points.map((p, i) => (
        <Sphere position={p} key={i} args={[0.01]}>
          <meshStandardMaterial color="hotpink" />
        </Sphere>
      ))}
      <Sphere ref={sp} args={[0.01]} position={[1.5, 1.5, 0]}>
        <meshStandardMaterial color="black" />
      </Sphere>
      {/* <Points limit={5}>
        <pointsMaterial vertexColors />
        <Point position={[1.5, 1.5, 1]} color="red" size={0.1} />
      </Points> */}
      {points.map((p, i) => (
        <Line
          points={[p, sp.current.position]}
          color="red"
          lineWidth={2}
          key={i}
        >
          <Html center position={p}>
            <span>{calAngle(p, sp.current.position)} 度</span>
          </Html>
        </Line>
      ))}
    </group>
  );
}

// function ChapterOneView() {
//   return (
//     <>
//       <Compass scale={[0.1, 0.1, 0.1]} position={[0, 1.5, 0]} />
//       <Ground />
//     </>
//   );
// }

function ChapterTwoView() {
  return (
    <>
      <Map scale={[0.1, 0.1, 0.1]} />
      <Ground />
    </>
  );
}

function ChapterThreeView() {
  // Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
  const { nodes, materials } = useGLTF("/way.glb");
  const ref = useRef();

  const forwardPressed = useKeyboardControls((state) => state.forward);

  useEffect(() => {
    console.log(forwardPressed, "forward");

    if (forwardPressed && ref.current) {
      ref.current.applyImpulse({ x: 5, y: 0, z: 0 }, true);
    }
  }, [forwardPressed]);

  return (
    <Suspense>
      <Physics>
        <Debug />

        <RigidBody colliders={false} position={[0, 2, 0]} ref={ref}>
          <Player />
          <CuboidCollider args={[1, 1, 1]} position={[0, 1, 0]} />
        </RigidBody>

        <RigidBody type="fixed" colliders="trimesh">
          <mesh
            geometry={nodes.way.geometry}
            material={materials.wayMaterial}
            position={[-0.8, -0.06, -3]}
            rotation={[0, -0.07, 0]}
          />
        </RigidBody>
      </Physics>
    </Suspense>
  );
}

function MainView({ steps }) {
  const cameraControlsRef = useRef();
  const currentStep = useStore((state) => state.currentStep);
  const currentCh = useStore((state) => state.currentCh);

  const cameraInfo = steps.map((step) => ({
    pos: step.cameraPosition,
    look: step.cameraLookAt,
  }));

  // const [cameraPosition, setCameraPosition] = useState([0, 4, 0]);
  // const [cameraLookAt, setCameraLookAt] = useState([0, 0, 0]);

  useEffect(() => {
    // cameraControlsRef.current.moveTo(3, 5, 3, true);
    cameraControlsRef.current.setLookAt(
      ...cameraInfo[currentStep].pos,
      ...cameraInfo[currentStep].look,
      true
    );

    cameraControlsRef.current.zoomTo(8);
  }, [currentStep]);

  return (
    <>
      {currentCh === 0 && <ChapterOne />}
      {currentCh === 1 && <ChapterTwoView />}
      {/* {currentCh === 2 && <ChapterThreeView />}
      {currentCh === 4 && <ChapterFourView />} */}
      <CameraControls ref={cameraControlsRef} makeDefault />
      <Environment files="background.hdr" background />
    </>
  );
}

function MiniMapView() {
  return (
    <>
      <Image url="/topo.jpg" />
      <MapControls screenSpacePanning enableRotate={false} minZoom={65} />
    </>
  );
}

function CompassView() {
  // const [current, setCurrent] = useStore((state) => [
  //   state.currentStep,
  //   state.updateCurrentStep,
  // ]);

  // useEffect(() => {
  //   // 当 declRot = 10 时，磁偏角为 5 度，校正成功
  //   console.log(declRot);
  //   current === 0 && declRot === 10 && setCurrent(current + 1);

  //   console.log(cirlPos);
  //   current === 1 && cirlPos <= -0.6 && setCurrent(current + 1);
  // }, [declRot, cirlPos]);

  return (
    <>
      <color attach="background" args={["black"]} />
      <OrthographicCamera
        makeDefault
        position={[0, 2.7, 0]}
        rotation={[0, -Math / 2, 0]}
        zoom={80}
      />
      <Compass />
      <MapControls
        makeDefault
        screenSpacePanning
        enableRotate={false}
        minZoom={65}
      />
      <ambientLight intensity={1} />
    </>
  );
}

export { MainView, CompassView, MiniMapView };

// function CompassView() {
//   return (
//     <>
//       <color attach="background" args={["black"]} />
//       <PanelCamera />
//       <Scene />
//       <MapControls
//         makeDefault
//         screenSpacePanning
//         enableRotate={false}
//         minZoom={65}
//       />
//       <ambientLight intensity={1} />
//     </>
//   );
// }

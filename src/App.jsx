import "./App.css";

import {
  Bvh,
  CameraControls,
  Environment,
  Image,
  KeyboardControls,
  Loader,
  MapControls,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  Preload,
  Stats,
  View,
} from "@react-three/drei";
// import { useControls } from "leva";

import { CompassView, MiniMapView, MainView } from "./components/Views";
// import Layout, { Content } from "antd/es/layout/layout";
// import Sider from "antd/es/layout/Sider";
import { Button, Divider } from "antd";
// DONE: stepper
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import useStore, { useExploreStore, usePlayerPosStore } from "./stores";
import Aside from "./components/Aside";
import { Stepper } from "./components/ChapterOne";
import { titles } from "./stores/constants";
import { useState } from "react";
import { Perf } from "r3f-perf";
import { Scene } from "./components/Scene";

// function GuiControl() {
//   const { toggleMap, toggleView } = useControls({ Map: false, FPV: true });
// }

function App() {
  const mainView = useRef();
  const compassView = useRef();
  const mapView = useRef();

  const player = useRef();
  const ground = useRef();

  const cameraControlsRef = useRef();

  const [currentCh, setCurrentCh] = useStore((state) => [
    state.currentCh,
    state.updateCurrentCh,
  ]);
  const isExplore = useExploreStore((state) => state.isExplore);
  const [cameraPos, setCameraPos] = useState([0, 4, 0]);

  const keymap = useMemo(() => [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "left", keys: ["ArrowLeft", "KeyA"] },
    { name: "right", keys: ["ArrowRight", "KeyD"] },
    // { name: "jump", keys: ["Space"] },
  ]);

  return (
    <>
      <div className="container">
        <Canvas
          gl={{ antialias: false }}
          className="canvas"
          eventSource={document.getElementById("root")}
        >
          <Suspense fallback={null}>
            <KeyboardControls map={keymap}>
              <View index={1} track={mainView}>
                <Scene />
              </View>
            </KeyboardControls>

            <View index={2} track={compassView}>
              <CompassView />
            </View>
            {/* <View index={3} track={view3}>
            </View> */}
          </Suspense>
          <Preload all />
          <Perf position="bottom-right" />
        </Canvas>

        <Loader />

        {/* Tracking div's, regular HTML and made responsive with CSS media-queries ... */}
        <div
          ref={mainView}
          className="panel main"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          }}
        ></div>

        <div
          ref={compassView}
          className="panel compass"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "300px",
            height: "300px",
          }}
        ></div>

        <div
          ref={mapView}
          className="panel compass"
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            width: "300px",
            height: "300px",
          }}
        ></div>
      </div>

      <Aside title={titles[currentCh]}>
        {currentCh === 0 && <Stepper />}
        <Divider />
        {/* TODO */}
        <Button type="primary" disabled>
          下一章
        </Button>
      </Aside>
    </>
  );
}

export default App;

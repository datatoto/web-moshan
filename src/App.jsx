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
import { Stepper } from "./components/Stepper";
import { useState } from "react";
import { Perf } from "r3f-perf";
import { Scene } from "./components/Scene";
import { ASIDE } from ".//stores/constants";
import { Ground } from "./models/Ground";

// function GuiControl() {
//   const { toggleMap, toggleView } = useControls({ Map: false, FPV: true });
// }

function App() {
  const mainView = useRef();
  // const compassView = useRef();
  // const mapView = useRef();
  const ground = useRef(null);

  const [currentCh, setCurrentCh] = useState(0);
  // const [currentCh, setCurrentCh] = useStore((state) => [
  //   state.currentCh,
  //   state.updateCurrentCh,
  // ]);
  const [isExplore, toggleExpolre] = useExploreStore((state) => [
    state.isExplore,
    state.toggleExplore,
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
            <View index={1} track={mainView}>
              <Environment files="background.hdr" background />
              <Bvh firstHitOnly>
                <Ground ref={ground} />
              </Bvh>
              <Scene ground={ground} />
            </View>

            {/* <View index={2} track={compassView}>
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
            </View> */}
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

        {/* <div
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
          className="panel map"
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            width: "300px",
            height: "300px",
          }}
        ></div> */}
      </div>

      <Aside title={ASIDE[currentCh].title} id="aside">
        <Stepper
          data={ASIDE[currentCh]}
          currentCh={currentCh}
          setCurrentCh={setCurrentCh}
        />
        <Divider />
        <Button type="primary" onClick={() => setCurrentCh(currentCh + 1)}>
          下一章
        </Button>
      </Aside>
    </>
  );
}

export default App;

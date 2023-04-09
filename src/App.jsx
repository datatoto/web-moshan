import "./App.css";

import {
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
import { Stepper } from "./components/Stepper";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { asideData } from "./stores/constants";
import useStore from "./stores";

// function GuiControl() {
//   const { toggleMap, toggleView } = useControls({ Map: false, FPV: true });
// }

function App() {
  const mainView = useRef();
  const compassView = useRef();
  // TODO: mapView
  const mapView = useRef();

  const currentCh = useStore((state) => state.currentCh);

  // const canvasRef = useRef();
  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext("2d");
  //   //Our first draw
  //   context.fillStyle = "#ffffff";
  //   context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  // });

  const keymap = useMemo(() => [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "left", keys: ["ArrowLeft", "KeyA"] },
    { name: "right", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
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
                <MainView steps={asideData[currentCh].steps} />
              </View>
            </KeyboardControls>
            <View index={2} track={compassView}>
              <CompassView />
            </View>
            {/* <View index={3} track={view3}>
            </View> */}
            {/* <Stats showPanel={0} className="stats" /> */}
          </Suspense>
          <Preload all />
        </Canvas>
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

        <Loader />
      </div>

      <aside
        className="glass aside"
        style={{
          position: "absolute",
          top: "0px",
          width: "25vw",
          height: "98vh",
          padding: "0 10px",
          overflowY: "scroll",
          margin: "10px",
          zIndex: "5",
        }}
      >
        <h3
          style={{
            textAlign: "center",
          }}
        >
          {asideData[currentCh].title}
        </h3>
        {/* <Divider style={{ backgroundColor: "black" }} /> */}
        <Stepper steps={asideData[currentCh].steps} />

        {/* <Button
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
          }}
          onClick={toggleMap}
        >
          地图
        </Button> */}
      </aside>
    </>
  );
}

export default App;

import "./App.css";

import {
  Environment,
  Loader,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  Stats,
  View,
} from "@react-three/drei";
// import { useControls } from "leva";

import { CompassView, MiniMapView, View1 } from "./components/Scene";
// import Layout, { Content } from "antd/es/layout/layout";
// import Sider from "antd/es/layout/Sider";
import { Divider } from "antd";
// DONE: stepper
import { Stepper } from "./components/Stepper";
import Typography from "antd/es/typography/Typography";
import { Canvas } from "@react-three/fiber";
import { MainPanel, CompassHud, MiniMapHud } from "./components/Panels";
import { useRef } from "react";

const { Title } = Typography;

// function GuiControl() {
//   const { toggleMap, toggleView } = useControls({ Map: false, FPV: true });
// }

function App() {
  const view1 = useRef();
  const view2 = useRef();
  const view3 = useRef();

  return (
    <>
      <div className="container">
        <Canvas
          className="canvas"
          eventSource={document.getElementById("root")}
        >
          <View index={1} track={view1}>
            <View1 />
          </View>
          <View index={2} track={view2}>
            <CompassView />
          </View>
          <View index={3} track={view3}>
            <MiniMapView />
          </View>
          {/* <Stats showPanel={0} className="stats" /> */}
        </Canvas>

        {/* Tracking div's, regular HTML and made responsive with CSS media-queries ... */}
        <MainPanel ref={view1} />
        <CompassHud ref={view2} />
        <MiniMapHud ref={view3} />

        <Loader />

        {/* <GuiControl /> */}
      </div>

      <aside
        className="glass"
        style={{
          position: "absolute",
          top: "0px",
          width: "25vw",
          height: "98vh",
          padding: "0 10px",
          overflowY: "scroll",
          margin: "10px",
        }}
      >
        <Title
          level={3}
          style={{
            textAlign: "center",
          }}
        >
          判别方位
        </Title>
        <Divider />
        <Stepper />
      </aside>
    </>
  );
}

export default App;

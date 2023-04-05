import "./App.css";

import { Canvas } from "@react-three/fiber";
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

import Scene from "./Scene";
import { Page } from "./components/Page";
import Layout, { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { ConfigProvider, Divider, theme } from "antd";
// DONE: stepper
import { Stepper } from "./components/Stepper";
import Typography from "antd/es/typography/Typography";
import { Suspense, useRef } from "react";
import useRefs from "react-use-refs";
import { Compass } from "./models/Compass";
import { Ground } from "./models/Ground";

const { Title } = Typography;

// function GuiControl() {
//   const { toggleMap, toggleView } = useControls({ Map: false, FPV: true });
// }

function Target() {
  return (
    <>
      <Suspense fallback={null}>
        <Compass />
        <Ground />
      </Suspense>
      <Environment files="background.hdr" background />
    </>
  );
}

function App() {
  const [ref, view1, view2] = useRefs();

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Layout style={{ minHeight: "100vh" }}>
        {/* TODO: sider */}
        <Sider width={"23vw"} style={{ padding: "5px 10px", overflow: "auto" }}>
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
        </Sider>
        <Layout>
          <Content ref={ref}>
            <div className="view1" ref={view1} />
            <div className="view2" ref={view2} />
            {/* <GuiControl /> */}
            <Canvas eventSource={ref}>
              <View index={1} track={view1}>
                <PerspectiveCamera makeDefault position={[0, 20, 0]} />
                <Target />
                <OrbitControls makeDefault />
              </View>
              <View index={2} track={view2}>
                <OrthographicCamera
                  makeDefault
                  position={[0, 2, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  near={0.1}
                  far={20}
                  zoom={110}
                />
                <Target />
                <OrbitControls makeDefault />
              </View>
              {/* <Scene track={view1} /> */}
              <Stats showPanel={0} className="stats" />
            </Canvas>
            <Loader />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
